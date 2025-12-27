import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demo
const mockUser: User = {
  id: 'user-1',
  name: 'Travel Explorer',
  username: 'explorer',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  bio: 'Passionate traveler exploring the world one country at a time 🌍',
  countriesVisited: ['NZ', 'AU', 'JP', 'TH', 'FR'],
  countriesWantToVisit: ['IT', 'GR', 'PE', 'IS'],
  joinedDate: '2024-01-01',
  isOnline: true,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(mockUser); // Start logged in for demo

  const login = async (email: string, password: string) => {
    // In production, this would call your auth API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser(mockUser);
  };

  const register = async (name: string, email: string, password: string) => {
    // In production, this would call your auth API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUser({
      ...mockUser,
      name,
      username: email.split('@')[0],
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
