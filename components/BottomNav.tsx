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
      background: '#1a365d',
      borderTop: '1px solid #2d4a6f',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      zIndex: 1000,
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
              color: isActive ? '#4fd1c5' : '#a0aec0',
              padding: '8px 16px',
            }}
          >
            <Icon size={24} />
            <span style={{ fontSize: '12px' }}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
