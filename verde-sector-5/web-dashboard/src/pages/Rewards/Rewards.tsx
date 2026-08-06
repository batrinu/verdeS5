import React, { useRef, useState } from 'react';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { usePresenter } from '../../context/PresenterContext';
import { getRewards, getRedemptions, redeemReward } from '../../services/gamificationStorage';
import { SEED_SPONSORS } from '../../data/gamificationSeedData';
import type { RewardItem, RedemptionItem } from '../../types/gamification';
import { useModalA11y } from '../../hooks/useModalA11y';
import { Coins, Gift, Ticket } from 'lucide-react';
import './Rewards.css';

interface ConfirmRedeemModalProps {
  reward: RewardItem;
  userPoints: number;
  onCancel: () => void;
  onConfirm: (reward: RewardItem) => void;
}

// Wired through useModalA11y exactly like WateringModal: the ref + role +
// aria-modal + tabIndex all live on the actual dialog content container (not
// the backdrop), matching the existing a11y convention (focus trap + Escape).
const ConfirmRedeemModal: React.FC<ConfirmRedeemModalProps> = ({ reward, userPoints, onCancel, onConfirm }) => {
  const dialogRef = useModalA11y<HTMLDivElement>(onCancel);

  return (
    <div
      className="reward-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        ref={dialogRef}
        className="reward-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Confirmă revendicarea"
        tabIndex={-1}
      >
        <h3>Revendici „{reward.title}"?</h3>
        <p>Costă {reward.costPoints} EcoPuncte. Rămâi cu {userPoints - reward.costPoints}.</p>
        <div className="reward-modal-actions">
          <button className="btn-secondary" onClick={onCancel}>Renunță</button>
          <button className="btn-redeem" onClick={() => onConfirm(reward)}>Confirmă</button>
        </div>
      </div>
    </div>
  );
};

interface VoucherIssuedModalProps {
  redemption: RedemptionItem;
  onClose: () => void;
}

const VoucherIssuedModal: React.FC<VoucherIssuedModalProps> = ({ redemption, onClose }) => {
  const dialogRef = useModalA11y<HTMLDivElement>(onClose);

  return (
    <div
      className="reward-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="reward-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Voucher emis"
        tabIndex={-1}
      >
        <h3>🎉 Voucher emis!</h3>
        <p>{redemption.rewardTitle}</p>
        <code className="voucher-code voucher-code-big">{redemption.code}</code>
        <p className="voucher-note">Arată codul la partener. Valabil 30 de zile (demo).</p>
        <div className="reward-modal-actions">
          <button className="btn-redeem" onClick={onClose}>Am notat codul</button>
        </div>
      </div>
    </div>
  );
};

// Rewards catalog + redemption (spec §3.5). Local-first: catalog and voucher
// codes work fully offline; merchant vouchers are demo data.
const Rewards: React.FC = () => {
  const { userPoints, spendPoints } = usePresenter();
  const [rewards, setRewards] = useState<RewardItem[]>(getRewards());
  const [redemptions, setRedemptions] = useState<RedemptionItem[]>(getRedemptions());
  const [confirmTarget, setConfirmTarget] = useState<RewardItem | null>(null);
  const [issued, setIssued] = useState<RedemptionItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Reentrancy guard: handleRedeem is synchronous, but a very fast
  // double-click can still fire it twice before React removes the confirm
  // modal from the DOM (state updates are batched/async, not synchronous).
  // This ref blocks a second concurrent call outright; setConfirmTarget(null)
  // is also the *first* state update below so the modal closes immediately.
  // Together with the atomic updater-based guard in
  // PresenterContext.spendPoints, this makes it impossible for two redemptions
  // to both read the same stale balance and drive it negative.
  const redeemingRef = useRef(false);

  const sponsorName = (id?: string | null) => SEED_SPONSORS.find(s => s.id === id)?.name;

  const handleRedeem = (reward: RewardItem) => {
    if (redeemingRef.current) return;
    redeemingRef.current = true;

    setConfirmTarget(null);
    setError(null);

    if (userPoints < reward.costPoints) {
      setError('Nu ai destule EcoPuncte pentru această recompensă.');
      redeemingRef.current = false;
      return;
    }

    const result = redeemReward(reward.id, userPoints);
    if (!result.ok) {
      setError(result.error === 'out_of_stock'
        ? 'Stoc epuizat — încearcă altă recompensă.'
        : 'Nu s-a putut emite voucherul. Încearcă din nou.');
      redeemingRef.current = false;
      return;
    }

    const spent = spendPoints(reward.costPoints);
    if (!spent) {
      // Extremely unlikely given the guards above, but stay honest rather
      // than silently issuing a voucher the balance can't cover.
      setError('Soldul de EcoPuncte s-a schimbat între timp. Încearcă din nou.');
      redeemingRef.current = false;
      return;
    }

    setRewards(getRewards());
    setRedemptions(getRedemptions());
    setIssued(result.redemption);
    redeemingRef.current = false;
  };

  return (
    <div className="rewards-root">
      <PitchHeader />
      <main className="rewards-main">
        <header className="rewards-header">
          <h1><Gift size={20} aria-hidden="true" /> Recompense</h1>
          <p className="rewards-balance"><Coins size={15} aria-hidden="true" /> {userPoints} EcoPuncte disponibile</p>
          <p className="rewards-hint">Punctele cheltuite nu îți scad nivelul de gardian.</p>
        </header>

        {error && <p className="rewards-error" role="alert">{error}</p>}

        <div className="rewards-grid">
          {rewards.map(r => (
            <article key={r.id} className="reward-card">
              <h3>{r.title}</h3>
              <p className="reward-desc">{r.description}</p>
              <p className="reward-merchant">
                {r.merchantName}
                {sponsorName(r.sponsorId) && <span className="reward-sponsor"> · oferit de {sponsorName(r.sponsorId)} (demo)</span>}
              </p>
              <footer className="reward-footer">
                <span className="reward-cost"><Coins size={13} aria-hidden="true" /> {r.costPoints}</span>
                <span className="reward-stock">{r.stock > 0 ? `${r.stock} disponibile` : 'stoc epuizat'}</span>
                <button
                  className="btn-redeem"
                  disabled={r.stock <= 0 || userPoints < r.costPoints}
                  onClick={() => setConfirmTarget(r)}
                >
                  Revendică
                </button>
              </footer>
            </article>
          ))}
        </div>

        <section className="my-vouchers" aria-label="Voucherele mele">
          <h2><Ticket size={16} aria-hidden="true" /> Voucherele mele</h2>
          {redemptions.length === 0 ? (
            <p className="vouchers-empty">Niciun voucher încă — revendică prima ta recompensă!</p>
          ) : (
            <ul>
              {redemptions.map(v => (
                <li key={v.id}>
                  <code className="voucher-code">{v.code}</code>
                  <span>{v.rewardTitle}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      {confirmTarget && (
        <ConfirmRedeemModal
          reward={confirmTarget}
          userPoints={userPoints}
          onCancel={() => setConfirmTarget(null)}
          onConfirm={handleRedeem}
        />
      )}

      {issued && (
        <VoucherIssuedModal redemption={issued} onClose={() => setIssued(null)} />
      )}
    </div>
  );
};

export default Rewards;
