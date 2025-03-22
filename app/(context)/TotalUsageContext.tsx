"use client"; // Ensures the context runs on the client side

import { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context value
interface TotalUsageContextType {
  totalUsage: number;
  setTotalUsage: (value: number) => void;
}

// Create the context
export const TotalUsageContext = createContext<TotalUsageContextType | undefined>(undefined);

// Create a provider component
export function TotalUsageProvider({ children }: { children: ReactNode }) {
  const [totalUsage, setTotalUsage] = useState(0);

  return (
    <TotalUsageContext.Provider value={{ totalUsage, setTotalUsage }}>
      {children}
    </TotalUsageContext.Provider>
  );
}

// Custom hook to use the context
export function useTotalUsage() {
  const context = useContext(TotalUsageContext);
  if (!context) {
    throw new Error('useTotalUsage must be used within a TotalUsageProvider');
  }
  return context;
}