import React, { useMemo, useRef, useState } from 'react';
import { PitchHeader } from '../../components/Pitch/PitchHeader';
import { usePresenter } from '../../context/PresenterContext';
import { getRewards, getRedemptions, redeemReward } from '../../services/gamificationStorage';
import { SEED_SPONSORS } from '../../data/gamificationSeedData';
import type { RewardItem, RedemptionItem } from '../../types/gamification';
import { useModalA11y } from '../../hooks/useModalA11y';
import { Coins, Gift, Ticket } from 'lucide-react';

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
    <>
      <div className="hig-scrim" onClick={onCancel} />
      <div
        ref={dialogRef}
        className="hig-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Confirmă revendicarea"
        tabIndex={-1}
      >
        <h3>Revendici „{reward.title}"?</h3>
        <p className="hig-secondary">Costă {reward.costPoints} EcoPuncte. Rămâi cu {userPoints - reward.costPoints}.</p>
        <div className="app-sheet-actions">
          <button className="hig-button plain" onClick={onCancel}>Renunță</button>
          <button className="hig-button" onClick={() => onConfirm(reward)}>Confirmă</button>
        </div>
      </div>
    </>
  );
};

interface VoucherIssuedModalProps {
  redemption: RedemptionItem;
  onClose: () => void;
}

const VoucherIssuedModal: React.FC<VoucherIssuedModalProps> = ({ redemption, onClose }) => {
  const dialogRef = useModalA11y<HTMLDivElement>(onClose);

  return (
    <>
      <div className="hig-scrim" onClick={onClose} />
      <div
        ref={dialogRef}
        className="hig-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Voucher emis"
        tabIndex={-1}
      >
        {/* Calm celebration (DESIGN.md): the confirmed code is the reward — no emoji, no glow. */}
        <h3 className="app-voucher-issued-title">Voucher emis!</h3>
        <p className="hig-secondary">{redemption.rewardTitle}</p>
        <code className="app-voucher-modal-code">{redemption.code}</code>
        <p className="hig-footnote hig-secondary app-voucher-note">Arată codul la partener. Valabil 30 de zile (demo).</p>
        <div className="app-sheet-actions">
          <button className="hig-button" onClick={onClose}>Am notat codul</button>
        </div>
      </div>
    </>
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

  // Affordable-first at the decision moment: what the citizen can claim right
  // now leads (cheapest first), unaffordable/out-of-stock items follow.
  const sortedRewards = useMemo(() => {
    const claimable = (r: RewardItem) => r.stock > 0 && userPoints >= r.costPoints;
    return [...rewards].sort((a, b) => {
      const ca = claimable(a) ? 0 : 1;
      const cb = claimable(b) ? 0 : 1;
      return ca !== cb ? ca - cb : a.costPoints - b.costPoints;
    });
  }, [rewards, userPoints]);

  const handleRedeem = (reward: RewardItem) => {
    if (redeemingRef.current) return;
    redeemingRef.current = true;

    try {
      setConfirmTarget(null);
      setError(null);

      if (userPoints < reward.costPoints) {
        setError('Nu ai destule EcoPuncte pentru această recompensă.');
        return;
      }

      const result = redeemReward(reward.id, userPoints);
      if (!result.ok) {
        setError(result.error === 'out_of_stock'
          ? 'Stoc epuizat — încearcă altă recompensă.'
          : 'Nu s-a putut emite voucherul. Încearcă din nou.');
        return;
      }

      const spent = spendPoints(reward.costPoints);
      if (!spent) {
        // Extremely unlikely given the guards above, but stay honest rather
        // than silently issuing a voucher the balance can't cover.
        setError('Soldul de EcoPuncte s-a schimbat între timp. Încearcă din nou.');
        return;
      }

      setRewards(getRewards());
      setRedemptions(getRedemptions());
      setIssued(result.redemption);
    } finally {
      redeemingRef.current = false;
    }
  };

  return (
    <>
      <PitchHeader />
      <div className="app-rewards-page">
        <header className="app-rewards-header">
          <h2><Gift size={20} aria-hidden="true" /> Recompense</h2>
          <p className="app-rewards-balance"><Coins size={15} aria-hidden="true" /> {userPoints} EcoPuncte disponibile</p>
          <p className="hig-footnote hig-secondary">Punctele cheltuite nu îți scad nivelul de gardian.</p>
        </header>

        {error && <p className="app-rewards-error" role="alert">{error}</p>}

        <div className="app-rewards-grid">
          {sortedRewards.map(r => {
            const claimable = r.stock > 0 && userPoints >= r.costPoints;
            return (
              <article key={r.id} className={`hig-card app-reward${claimable ? '' : ' locked'}`}>
                <h3 className="hig-headline">{r.title}</h3>
                <p className="app-reward-desc hig-secondary">{r.description}</p>
                <p className="app-reward-merchant hig-footnote hig-secondary">
                  {r.merchantName}
                  {sponsorName(r.sponsorId) && <span className="app-reward-sponsor"> · oferit de {sponsorName(r.sponsorId)} (demo)</span>}
                </p>
                <footer className="app-reward-footer">
                  <span className="app-reward-cost"><Coins size={13} aria-hidden="true" /> {r.costPoints}</span>
                  <span className="app-reward-stock hig-footnote hig-secondary">{r.stock > 0 ? `${r.stock} disponibile` : 'stoc epuizat'}</span>
                  <button
                    className="hig-button small tinted"
                    disabled={!claimable}
                    onClick={() => setConfirmTarget(r)}
                  >
                    Revendică
                  </button>
                </footer>
              </article>
            );
          })}
        </div>

        <section aria-label="Voucherele mele">
          <div className="hig-section-header"><Ticket size={13} aria-hidden="true" /> Voucherele mele</div>
          {redemptions.length === 0 ? (
            <div className="hig-empty">
              <Ticket className="hig-empty-icon" size={44} aria-hidden="true" />
              <div className="hig-empty-title">Niciun voucher încă — revendică prima ta recompensă!</div>
            </div>
          ) : (
            <ul className="hig-list">
              {redemptions.map(v => (
                <li key={v.id} className="hig-list-item">
                  <code className="app-voucher-code">{v.code}</code>
                  <span className="hig-spacer" />
                  <span className="hig-footnote hig-secondary">{v.rewardTitle}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

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
    </>
  );
};

export default Rewards;
