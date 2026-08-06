import React, { createContext, useContext, useState } from 'react';

export type PitchRole = 'CITIZEN' | 'COUNCIL_ADMIN';

interface PresenterContextType {
  role: PitchRole;
  setRole: (role: PitchRole) => void;
  selectedNeighborhood: string;
  setSelectedNeighborhood: (neighborhood: string) => void;
  userPoints: number;
  addPoints: (amount: number) => void;
  lifetimePoints: number;
  spendPoints: (amount: number) => boolean;
  userWaterings: number;
  incrementWaterings: () => void;
  userName: string;
  setUserName: (name: string) => void;
}

const PresenterContext = createContext<PresenterContextType | undefined>(undefined);

export const PresenterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<PitchRole>('CITIZEN');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('ALL');
  const [userPoints, setUserPoints] = useState<number>(780);
  const [lifetimePoints, setLifetimePoints] = useState<number>(780);
  const [userWaterings, setUserWaterings] = useState<number>(7);
  const [userName, setUserName] = useState<string>('Elena Popa');

  const addPoints = (amount: number) => {
    setUserPoints(prev => prev + amount);
    setLifetimePoints(prev => prev + amount);
  };
  const incrementWaterings = () => setUserWaterings(prev => prev + 1);

  // Atomic check-and-decrement: two rapid/synchronous calls (e.g. a double
  // click before React re-renders) must not both read the same stale
  // `userPoints` and both pass their balance check, which could drive the
  // balance negative. The check happens *inside* the functional updater, so
  // it always sees the latest queued value rather than the closed-over
  // `userPoints` from render time. Callers should still disable/close the
  // triggering UI immediately (defense in depth — see Rewards.tsx) since the
  // `ok` return value here is only reliable once React has processed the
  // update, not synchronously for callers that fire multiple updates in the
  // same tick without reading each other's result.
  const spendPoints = (amount: number): boolean => {
    let ok = false;
    setUserPoints(prev => {
      if (prev >= amount) {
        ok = true;
        return prev - amount;
      }
      return prev;
    });
    return ok;
  };

  return (
    <PresenterContext.Provider
      value={{
        role,
        setRole,
        selectedNeighborhood,
        setSelectedNeighborhood,
        userPoints,
        addPoints,
        lifetimePoints,
        spendPoints,
        userWaterings,
        incrementWaterings,
        userName,
        setUserName,
      }}
    >
      {children}
    </PresenterContext.Provider>
  );
};

export const usePresenter = (): PresenterContextType => {
  const context = useContext(PresenterContext);
  if (!context) {
    throw new Error('usePresenter must be used within a PresenterProvider');
  }
  return context;
};
