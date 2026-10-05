'use client';

import Image from 'next/image';
import Link from 'next/link';
import { countries } from '@/lib/countries';
import { CURATOR } from '@/lib/curator';
import { useUserJourney } from '@/contexts/UserJourneyContext';
import {
  Camera, Settings, Edit2, LogOut,
  ChevronRight, BookOpen, CheckCircle, Star, Globe2, Footprints
} from 'lucide-react';

const myInfo = {
  name: 'Your Name',
  handle: '@your.travels',
  bio: 'Tap Edit Profile to set up your travel identity ✈️',
  memberSince: 'March 2026',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
};

export default function ProfilePage() {
  const { userVisited, userWishlist } = useUserJourney();
  const visitedCount = userVisited.length;
  const wishlistCount = userWishlist.length;
  const curatorVisited = countries.filter(c => c.visited && !c.parentCountry).length;

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>

      {/* Cover */}
      <div style={{ position: 'relative', height: '200px' }}>
        <Image src={myInfo.coverImage} alt="Cover" fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(3,7,18,0.08) 0%, rgba(3,7,18,0.65) 100%)' }} />
        <button className="pressable" style={{
          position: 'absolute', top: 'calc(16px + env(safe-area-inset-top, 0px))', right: '16px',
          width: '40px', height: '40px', borderRadius: '13px',
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Settings size={18} color="#fff" />
        </button>
      </div>

      {/* Avatar row */}
      <div style={{ position: 'relative', padding: '0 20px', marginTop: '-44px', marginBottom: '0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: '88px', height: '88px', borderRadius: '26px', overflow: 'hidden', border: '3px solid var(--bg-primary)', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
              <Image src={myInfo.avatar} alt={myInfo.name} width={88} height={88} style={{ objectFit: 'cover' }} />
            </div>
            <button className="pressable" style={{
              position: 'absolute', bottom: '2px', right: '-4px',
              width: '28px', height: '28px', borderRadius: '9px',
              background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
              border: '2px solid var(--bg-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Camera size={13} color="#fff" />
            </button>
          </div>
          <button className="pressable" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '12px', padding: '8px 14px',
            color: '#e2e8f0', fontSize: '13px', fontWeight: 600,
            marginBottom: '6px',
          }}>
            <Edit2 size={13} />Edit Profile
          </button>
        </div>
      </div>

      {/* User info */}
      <div style={{ padding: '14px 20px 0' }}>
        <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#f8fafc' }}>{myInfo.name}</h1>
        <p style={{ color: '#14b8a6', fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>{myInfo.handle}</p>
        <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, marginTop: '8px' }}>{myInfo.bio}</p>
      </div>

      {/* Journey quick stats */}
      <div style={{ margin: '20px 20px 0' }}>
        <Link href="/journey" className="pressable" style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          background: 'linear-gradient(135deg, rgba(20,184,166,0.08), rgba(139,92,246,0.06))',
          border: '1px solid rgba(20,184,166,0.16)',
          borderRadius: '18px', padding: '16px',
          textDecoration: 'none',
        }}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '14px',
            background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Footprints size={22} color="#14b8a6" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: '#f8fafc', fontSize: '15px', fontWeight: 700 }}>My Journey</p>
            <p style={{ color: '#64748b', fontSize: '12px', marginTop: '2px' }}>
              {visitedCount > 0 || wishlistCount > 0
                ? `${visitedCount} visited · ${wishlistCount} on wishlist`
                : 'Start tracking your travels'
              }
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
            {visitedCount > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle size={13} color="#22c55e" />
                <span style={{ color: '#22c55e', fontSize: '13px', fontWeight: 700 }}>{visitedCount}</span>
              </div>
            )}
            {wishlistCount > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={13} color="#ec4899" />
                <span style={{ color: '#ec4899', fontSize: '13px', fontWeight: 700 }}>{wishlistCount}</span>
              </div>
            )}
            <ChevronRight size={18} color="#475569" />
          </div>
        </Link>
      </div>

      {/* Kiwifootsteps guide section */}
      <div style={{ margin: '16px 20px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(20,184,166,0.07) 0%, rgba(139,92,246,0.07) 100%)',
          border: '1px solid rgba(20,184,166,0.16)', borderRadius: '20px', padding: '18px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '17px', overflow: 'hidden', border: '2px solid rgba(20,184,166,0.4)' }}>
                <Image src={CURATOR.avatar} alt={CURATOR.name} width={56} height={56} style={{ objectFit: 'cover' }} />
              </div>
              <div style={{
                position: 'absolute', bottom: '-3px', right: '-3px',
                width: '20px', height: '20px', borderRadius: '7px',
                background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                border: '2px solid #030712',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <BookOpen size={10} color="#fff" />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 800 }}>Kiwifootsteps</p>
              <p style={{ color: '#14b8a6', fontSize: '12px', fontWeight: 600, marginTop: '1px' }}>{CURATOR.handle}</p>
              <p style={{ color: '#64748b', fontSize: '12px', marginTop: '3px' }}>
                {curatorVisited} first-hand travel guides
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
            {[
              { label: 'Guides', value: curatorVisited, color: '#14b8a6' },
              { label: 'Experiences', value: countries.filter(c => c.visited).reduce((s, c) => s + c.experiences.length, 0), color: '#8b5cf6' },
              { label: 'Tips', value: countries.filter(c => c.visited).reduce((s, c) => s + c.topTips.length, 0), color: '#f59e0b' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '11px', padding: '9px 4px' }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color }}>{value}</div>
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '14px' }}>
            {CURATOR.travelStyle.map((style, i) => (
              <span key={i} style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)', padding: '4px 10px', borderRadius: '100px', color: '#14b8a6', fontSize: '11px', fontWeight: 600 }}>{style}</span>
            ))}
          </div>

          <Link href="/" className="pressable" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.22)',
            padding: '13px 16px', borderRadius: '14px',
            color: '#2dd4bf', fontWeight: 700, fontSize: '14px',
          }}>
            <span>Browse Kiwifootsteps Guides</span>
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>

      {/* Account */}
      <div style={{ margin: '20px 20px 0' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#475569', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Account</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            { Icon: Edit2,    label: 'Edit Profile', color: '#14b8a6', bg: 'rgba(20,184,166,0.1)',  border: 'rgba(20,184,166,0.2)'  },
            { Icon: Settings, label: 'Preferences',  color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.2)' },
            { Icon: Globe2,   label: 'About App',    color: '#60a5fa', bg: 'rgba(96,165,250,0.1)',  border: 'rgba(96,165,250,0.2)'  },
            { Icon: LogOut,   label: 'Sign Out',     color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.2)'   },
          ].map(({ Icon, label, color, bg, border }) => (
            <button key={label} className="pressable" style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              padding: '13px 14px', borderRadius: '15px',
            }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '11px', background: bg, border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={17} color={color} />
              </div>
              <span style={{ color: label === 'Sign Out' ? '#ef4444' : '#e2e8f0', flex: 1, textAlign: 'left', fontSize: '14px', fontWeight: 600 }}>
                {label}
              </span>
              {label !== 'Sign Out' && <ChevronRight size={17} color="#334155" />}
            </button>
          ))}
        </div>
        <p style={{ color: '#1e293b', fontSize: '12px', textAlign: 'center', marginTop: '20px', paddingBottom: '8px' }}>
          Kiwifootsteps v1.0 · Member since {myInfo.memberSince}
        </p>
      </div>
    </div>
  );
}
