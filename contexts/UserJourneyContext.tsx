'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Status = 'visited' | 'wishlist' | null;

export interface UserProfile {
  name: string;
  handle: string;
  bio: string;
  travelStyle: string[];
  memberSince: string;
}

interface UserJourneyContextType {
  userVisited: string[];
  userWishlist: string[];
  markVisited: (id: string) => void;
  addToWishlist: (id: string) => void;
  removeFromJourney: (id: string) => void;
  getUserStatus: (id: string) => Status;
  profile: UserProfile | null;
  saveProfile: (p: UserProfile) => void;
  clearAll: () => void;
  hydrated: boolean;
}

const UserJourneyContext = createContext<UserJourneyContextType | null>(null);

const LS_VISITED  = 'kiwi_user_visited';
const LS_WISHLIST = 'kiwi_user_wishlist';
const LS_PROFILE  = 'kiwi_user_profile';

export function UserJourneyProvider({ children }: { children: ReactNode }) {
  const [userVisited,  setUserVisited]  = useState<string[]>([]);
  const [userWishlist, setUserWishlist] = useState<string[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      setUserVisited(JSON.parse(localStorage.getItem(LS_VISITED)  || '[]'));
      setUserWishlist(JSON.parse(localStorage.getItem(LS_WISHLIST) || '[]'));
      const raw = localStorage.getItem(LS_PROFILE);
      if (raw) setProfile(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  const persist = (visited: string[], wishlist: string[]) => {
    localStorage.setItem(LS_VISITED,  JSON.stringify(visited));
    localStorage.setItem(LS_WISHLIST, JSON.stringify(wishlist));
  };

  const markVisited = (id: string) => {
    const visited  = userVisited.includes(id) ? userVisited : [...userVisited, id];
    const wishlist = userWishlist.filter(x => x !== id);
    setUserVisited(visited);
    setUserWishlist(wishlist);
    persist(visited, wishlist);
  };

  const addToWishlist = (id: string) => {
    if (userVisited.includes(id)) return;
    const wishlist = userWishlist.includes(id) ? userWishlist : [...userWishlist, id];
    setUserWishlist(wishlist);
    persist(userVisited, wishlist);
  };

  const removeFromJourney = (id: string) => {
    const visited  = userVisited.filter(x => x !== id);
    const wishlist = userWishlist.filter(x => x !== id);
    setUserVisited(visited);
    setUserWishlist(wishlist);
    persist(visited, wishlist);
  };

  const getUserStatus = (id: string): Status => {
    if (userVisited.includes(id))  return 'visited';
    if (userWishlist.includes(id)) return 'wishlist';
    return null;
  };

  const saveProfile = (p: UserProfile) => {
    setProfile(p);
    localStorage.setItem(LS_PROFILE, JSON.stringify(p));
  };

  const clearAll = () => {
    setProfile(null);
    setUserVisited([]);
    setUserWishlist([]);
    localStorage.removeItem(LS_PROFILE);
    localStorage.removeItem(LS_VISITED);
    localStorage.removeItem(LS_WISHLIST);
    sessionStorage.removeItem('splashShown');
  };

  return (
    <UserJourneyContext.Provider value={{
      userVisited, userWishlist,
      markVisited, addToWishlist, removeFromJourney, getUserStatus,
      profile, saveProfile, clearAll, hydrated,
    }}>
      {children}
    </UserJourneyContext.Provider>
  );
}

export function useUserJourney() {
  const ctx = useContext(UserJourneyContext);
  if (!ctx) throw new Error('useUserJourney must be inside UserJourneyProvider');
  return ctx;
}
