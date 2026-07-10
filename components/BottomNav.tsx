'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe2, BookOpen, Footprints, User } from 'lucide-react';

const navItems = [
  { href: '/',        icon: Globe2,      label: 'Explore'  },
  { href: '/journey', icon: Footprints,  label: 'Journey'  },
  { href: '/matches', icon: BookOpen,    label: 'Connect'  },
  { href: '/profile', icon: User,        label: 'Profile'  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      background: 'rgba(3,7,18,0.95)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
    }}>
      <div style={{ display: 'flex', height: '60px' }}>
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="pressable"
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '3px',
                position: 'relative',
              }}
            >
              {isActive && (
                <div style={{
                  position: 'absolute', top: 0, left: '50%',
                  transform: 'translateX(-50%)',
                  width: '28px', height: '2px',
                  background: 'linear-gradient(90deg,#14b8a6,#2dd4bf)',
                  borderRadius: '0 0 3px 3px',
                }} />
              )}
              <div style={{
                width: '38px', height: '30px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '10px',
                background: isActive ? 'rgba(20,184,166,0.12)' : 'transparent',
                transition: 'background 0.2s',
              }}>
                <Icon
                  size={20}
                  color={isActive ? '#14b8a6' : '#475569'}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#14b8a6' : '#475569',
                letterSpacing: '0.02em',
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
