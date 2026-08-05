import React, { createContext, useContext, useState } from 'react';

export type PitchRole = 'CITIZEN' | 'COUNCIL_ADMIN';

interface PresenterContextType {
  role: PitchRole;
  setRole: (role: PitchRole) => void;
  selectedNeighborhood: string;
  setSelectedNeighborhood: (neighborhood: string) => void;
  userPoints: number;
  addPoints: (amount: number) => void;
  userWaterings: number;
  incrementWaterings: () => void;
  userName: string;
  setUserName: (name: string) => void;
}

const PresenterContext = createContext<PresenterContextType | undefined>(undefined);

export const PresenterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<PitchRole>('CITIZEN');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('ALL');
  const [userPoints, setUserPoints] = useState<number>(350);
  const [userWaterings, setUserWaterings] = useState<number>(7);
  const [userName, setUserName] = useState<string>('Elena Popa');

  const addPoints = (amount: number) => setUserPoints(prev => prev + amount);
  const incrementWaterings = () => setUserWaterings(prev => prev + 1);

  return (
    <PresenterContext.Provider
      value={{
        role,
        setRole,
        selectedNeighborhood,
        setSelectedNeighborhood,
        userPoints,
        addPoints,
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
