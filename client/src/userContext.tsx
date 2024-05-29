"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
}

interface Agency {
  id: string;
  companyName: string;
  logo: string | null;
  streetName: string;
  area: string;
  lga: string;
  state: string;
  phone: string | null;
  userId: string | null;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  agency: Agency | null;
  setAgency: React.Dispatch<React.SetStateAction<Agency | null>>;
  logout: () => void;
  logContextData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [agency, setAgency] = useState<Agency | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedAgency = localStorage.getItem('agency');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedAgency) {
      setAgency(JSON.parse(storedAgency));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (agency) {
      localStorage.setItem('agency', JSON.stringify(agency));
    } else {
      localStorage.removeItem('agency');
    }
  }, [agency]);

  const logout = () => {
    setUser(null);
    setAgency(null);
    localStorage.removeItem('user');
    localStorage.removeItem('agency');
    router.push('/login');
  };

  const logContextData = () => {
    console.log('User:', user);
    console.log('Agency:', agency);
  };

  return (
    <UserContext.Provider value={{ user, setUser, agency, setAgency, logout, logContextData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
