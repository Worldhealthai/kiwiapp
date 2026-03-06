'use client';

import { useState, useEffect, ReactNode } from 'react';
import BottomNav from '@/components/BottomNav';
import SplashScreen from '@/components/SplashScreen';
import SignUpScreen from '@/components/SignUpScreen';
import { useUserJourney } from '@/contexts/UserJourneyContext';

export default function AppShell({ children }: { children: ReactNode }) {
  const { profile, hydrated } = useUserJourney();
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    if (hydrated && profile) {
      const shown = sessionStorage.getItem('splashShown');
      if (!shown) setShowSplash(true);
    }
  }, [hydrated, profile]);

  // Wait for localStorage to hydrate before deciding what to render
  if (!hydrated) {
    return (
      <div style={{
        minHeight: '100dvh',
        background: '#030712',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
          animation: 'pulse 1.5s ease-in-out infinite',
        }} />
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(0.9); }
          }
        `}</style>
      </div>
    );
  }

  // New user — show sign-up
  if (!profile) {
    return <SignUpScreen />;
  }

  return (
    <>
      {showSplash && (
        <SplashScreen onComplete={() => {
          setShowSplash(false);
          sessionStorage.setItem('splashShown', 'true');
        }} />
      )}
      {children}
      <BottomNav />
    </>
  );
}
