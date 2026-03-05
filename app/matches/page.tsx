'use client';

import { Heart, MessageCircle, Users, Sparkles, Compass } from 'lucide-react';
import Link from 'next/link';

export default function MatchesPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingBottom: '90px' }}>

      {/* Header */}
      <div style={{
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 16px)',
        padding: 'calc(env(safe-area-inset-top, 0px) + 16px) 20px 16px',
        background: 'rgba(3,7,18,0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #ec4899, #db2777)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(236,72,153,0.3)',
          }}>
            <Heart size={22} color="#fff" fill="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#f8fafc' }}>Matches</h1>
            <p style={{ color: '#64748b', fontSize: '13px', marginTop: '1px' }}>Find your travel buddies</p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: '16px 20px' }}>
        {[
          { label: 'Matches',  value: 0, color: '#14b8a6', Icon: Users        },
          { label: 'Online',   value: 0, color: '#22c55e', Icon: Sparkles      },
          { label: 'Unread',   value: 0, color: '#ec4899', Icon: MessageCircle },
        ].map(({ label, value, color, Icon }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px', padding: '14px 12px', textAlign: 'center',
          }}>
            <Icon size={16} color={color} style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: '22px', fontWeight: 800, color }}>{value}</div>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      <div style={{ padding: '8px 20px' }}>
        <div style={{
          textAlign: 'center',
          padding: '50px 24px',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '24px',
        }}>
          {/* Animated icon */}
          <div style={{
            width: '80px', height: '80px', margin: '0 auto 20px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(139,92,246,0.15))',
            border: '1px solid rgba(236,72,153,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Heart size={38} color="#ec4899" />
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>
            No matches yet
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7, maxWidth: '270px', margin: '0 auto 24px' }}>
            Explore destinations and tap the match button to find fellow travelers heading the same way!
          </p>

          <Link href="/" className="pressable" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, #ec4899, #db2777)',
            padding: '13px 24px', borderRadius: '14px',
            color: '#fff', fontSize: '14px', fontWeight: 700,
            boxShadow: '0 6px 20px rgba(236,72,153,0.3)',
          }}>
            <Compass size={16} />
            Explore Destinations
          </Link>
        </div>

        {/* How it works */}
        <div style={{ marginTop: '20px' }}>
          <p style={{ color: '#475569', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px' }}>
            How matching works
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { icon: Compass,       color: '#14b8a6', text: 'Open any country guide and tap "Find Travel Buddies"' },
              { icon: Heart,         color: '#ec4899', text: 'Swipe through travelers heading to the same destination' },
              { icon: MessageCircle, color: '#8b5cf6', text: 'Match with people sharing your travel dates and style' },
            ].map(({ icon: Icon, color, text }, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '13px',
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '14px', padding: '13px 15px',
              }}>
                <div style={{
                  width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
                  background: `${color}18`, border: `1px solid ${color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={16} color={color} />
                </div>
                <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.5 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
