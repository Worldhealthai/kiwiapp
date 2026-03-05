'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Status = 'visited' | 'wishlist' | null;

interface UserJourneyContextType {
  userVisited: string[];
  userWishlist: string[];
  markVisited: (id: string) => void;
  addToWishlist: (id: string) => void;
  removeFromJourney: (id: string) => void;
  getUserStatus: (id: string) => Status;
}

const UserJourneyContext = createContext<UserJourneyContextType | null>(null);

const LS_VISITED  = 'kiwi_user_visited';
const LS_WISHLIST = 'kiwi_user_wishlist';

export function UserJourneyProvider({ children }: { children: ReactNode }) {
  const [userVisited,  setUserVisited]  = useState<string[]>([]);
  const [userWishlist, setUserWishlist] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Read localStorage once on mount (client-only)
  useEffect(() => {
    try {
      setUserVisited(JSON.parse(localStorage.getItem(LS_VISITED)  || '[]'));
      setUserWishlist(JSON.parse(localStorage.getItem(LS_WISHLIST) || '[]'));
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
    if (userVisited.includes(id)) return; // already visited — no change
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

  return (
    <UserJourneyContext.Provider value={{
      userVisited, userWishlist,
      markVisited, addToWishlist, removeFromJourney, getUserStatus,
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
