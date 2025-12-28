'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Heart, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Globe, label: 'Explore' },
    { href: '/matches', icon: Heart, label: 'Matches' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '70px',
      background: 'rgba(3, 7, 18, 0.95)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.06)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 1000,
      padding: '0 20px',
    }}>
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 24px',
              borderRadius: '16px',
              background: isActive ? 'rgba(20, 184, 166, 0.1)' : 'transparent',
              transition: 'all 0.3s ease',
            }}
          >
            <Icon
              size={22}
              color={isActive ? '#14b8a6' : '#64748b'}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span style={{
              fontSize: '11px',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#14b8a6' : '#64748b',
              letterSpacing: '0.02em',
            }}>
              {label}
            </span>
            {isActive && (
              <div style={{
                position: 'absolute',
                bottom: '8px',
                width: '4px',
                height: '4px',
                borderRadius: '2px',
                background: '#14b8a6',
              }} />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
