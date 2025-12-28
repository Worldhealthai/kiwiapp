'use client';

import './globals.css'
import { useState, useEffect } from 'react'
import BottomNav from '@/components/BottomNav'
import SplashScreen from '@/components/SplashScreen'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showSplash, setShowSplash] = useState(true);
  const [hasShownSplash, setHasShownSplash] = useState(false);

  useEffect(() => {
    // Check if splash has been shown in this session
    const splashShown = sessionStorage.getItem('splashShown');
    if (splashShown) {
      setShowSplash(false);
      setHasShownSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setHasShownSplash(true);
    sessionStorage.setItem('splashShown', 'true');
  };

  return (
    <html lang="en">
      <body style={{ paddingBottom: '70px' }}>
        {showSplash && !hasShownSplash && (
          <SplashScreen onComplete={handleSplashComplete} />
        )}
        {children}
        <BottomNav />
      </body>
    </html>
  )
}
