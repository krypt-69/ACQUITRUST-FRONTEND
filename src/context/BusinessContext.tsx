'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface BusinessContextType {
  selectedBusinessId: string | null;
  setSelectedBusinessId: (id: string) => void;
}

const BusinessContext = createContext<BusinessContextType>({
  selectedBusinessId: null,
  setSelectedBusinessId: () => {},
});

export function BusinessProvider({ children }: { children: ReactNode }) {
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  return (
    <BusinessContext.Provider value={{ selectedBusinessId, setSelectedBusinessId }}>
      {children}
    </BusinessContext.Provider>
  );
}

export const useBusiness = () => useContext(BusinessContext);
