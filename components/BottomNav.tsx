'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe2, Heart, User } from 'lucide-react';

const navItems = [
  { href: '/', icon: Globe2, label: 'Explore' },
  { href: '/matches', icon: Heart, label: 'Matches' },
  { href: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      background: 'rgba(3, 7, 18, 0.92)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.07)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '64px',
        padding: '0 8px',
      }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="pressable"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                flex: 1,
                height: '100%',
                position: 'relative',
              }}
            >
              {/* Active indicator */}
              {isActive && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '32px',
                  height: '2px',
                  background: 'linear-gradient(90deg, #14b8a6, #2dd4bf)',
                  borderRadius: '0 0 4px 4px',
                  animation: 'fade-in 0.2s ease-out',
                }} />
              )}

              {/* Icon wrapper */}
              <div style={{
                width: '44px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                background: isActive ? 'rgba(20, 184, 166, 0.12)' : 'transparent',
                transition: 'background 0.25s ease',
              }}>
                <Icon
                  size={22}
                  color={isActive ? '#14b8a6' : '#475569'}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  style={{ transition: 'color 0.25s ease' }}
                />
              </div>

              <span style={{
                fontSize: '10px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#14b8a6' : '#475569',
                letterSpacing: '0.03em',
                transition: 'color 0.25s ease',
                lineHeight: 1,
              }}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
