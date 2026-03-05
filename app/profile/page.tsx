'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { countries } from '@/lib/countries';
import {
  Camera, Globe2, Settings, LogOut, Edit2,
  CheckCircle, Sparkles, Heart, ChevronRight, TrendingUp
} from 'lucide-react';

const mockUser = {
  name: 'Alex Thompson',
  handle: '@alex.travels',
  bio: 'Adventure seeker & photography enthusiast exploring the world one country at a time ✈️',
  memberSince: 'January 2024',
  travelStyle: ['Adventure', 'Photography', 'Culture', 'Food'],
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  coverImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'visited' | 'wishlist'>('visited');
  const visitedCountries = countries.filter(c => c.visited && !c.parentCountry);
  const wishlistCountries = countries.filter(c => !c.visited && !c.parentCountry);
  const totalCountries = visitedCountries.length + wishlistCountries.length;
  const progressPct = Math.round((visitedCountries.length / totalCountries) * 100);

  const continentBreakdown = visitedCountries.reduce((acc, c) => {
    acc[c.continent] = (acc[c.continent] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

      {/* Cover Photo + Avatar */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'relative', height: '200px' }}>
          <Image
            src={mockUser.coverImage}
            alt="Cover"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(3,7,18,0.1) 0%, rgba(3,7,18,0.6) 100%)',
          }} />
          <button
            className="pressable"
            style={{
              position: 'absolute',
              top: 'calc(16px + env(safe-area-inset-top, 0px))',
              right: '16px',
              width: '40px', height: '40px',
              borderRadius: '14px',
              background: 'rgba(0,0,0,0.45)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Settings size={18} color="#fff" />
          </button>
        </div>

        {/* Avatar overlapping cover */}
        <div style={{ position: 'absolute', bottom: '-48px', left: '20px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '96px', height: '96px',
              borderRadius: '28px',
              overflow: 'hidden',
              border: '3px solid var(--bg-primary)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}>
              <Image src={mockUser.avatar} alt={mockUser.name} width={96} height={96} style={{ objectFit: 'cover' }} />
            </div>
            <button
              className="pressable"
              style={{
                position: 'absolute', bottom: '4px', right: '-4px',
                width: '30px', height: '30px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                border: '2px solid var(--bg-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(20,184,166,0.35)',
              }}
            >
              <Camera size={14} color="#fff" />
            </button>
          </div>
        </div>

        {/* Edit profile button */}
        <div style={{ position: 'absolute', bottom: '-42px', right: '20px' }}>
          <button
            className="pressable"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '12px',
              padding: '9px 16px',
              color: '#e2e8f0',
              fontSize: '13px', fontWeight: 600,
            }}
          >
            <Edit2 size={14} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* User Info */}
      <div style={{ padding: '62px 20px 0' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#f8fafc' }}>{mockUser.name}</h1>
        <p style={{ color: '#14b8a6', fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>{mockUser.handle}</p>
        <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, marginTop: '8px', maxWidth: '340px' }}>
          {mockUser.bio}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
          {mockUser.travelStyle.map((style, i) => (
            <span key={i} style={{
              background: 'rgba(20,184,166,0.1)',
              border: '1px solid rgba(20,184,166,0.2)',
              padding: '5px 12px',
              borderRadius: '100px',
              color: '#14b8a6',
              fontSize: '12px', fontWeight: 600,
            }}>
              {style}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', margin: '20px 20px 0' }}>
        {[
          { value: visitedCountries.length, label: 'Visited', color: '#14b8a6', Icon: CheckCircle },
          { value: wishlistCountries.length, label: 'Wishlist', color: '#ec4899', Icon: Sparkles },
          { value: 3, label: 'Buddies', color: '#8b5cf6', Icon: Heart },
        ].map(({ value, label, color, Icon }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px',
            padding: '16px 12px',
            textAlign: 'center',
          }}>
            <Icon size={18} color={color} style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: '26px', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Progress Card */}
      <div style={{ margin: '14px 20px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(20,184,166,0.08), rgba(139,92,246,0.08))',
          border: '1px solid rgba(20,184,166,0.15)',
          borderRadius: '20px',
          padding: '18px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #14b8a6, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <TrendingUp size={20} color="#fff" />
            </div>
            <div>
              <p style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 700 }}>World Explorer</p>
              <p style={{ color: '#64748b', fontSize: '12px' }}>Keep exploring!</p>
            </div>
            <span style={{
              marginLeft: 'auto', fontSize: '20px', fontWeight: 800,
              background: 'linear-gradient(135deg, #14b8a6, #8b5cf6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{progressPct}%</span>
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '14px' }}>
            <div style={{
              width: `${progressPct}%`, height: '100%',
              background: 'linear-gradient(90deg, #14b8a6, #8b5cf6)',
              borderRadius: '4px',
            }} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {Object.entries(continentBreakdown).map(([cont, count]) => (
              <div key={cont} style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                padding: '4px 10px',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                <Globe2 size={11} color="#64748b" />
                <span style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 600 }}>
                  {cont.replace(' America', '')}: {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Countries Tabs */}
      <div style={{ margin: '24px 20px 0' }}>
        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '14px',
          padding: '4px', marginBottom: '16px', gap: '4px',
        }}>
          {(['visited', 'wishlist'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="pressable"
              style={{
                flex: 1, padding: '10px',
                borderRadius: '10px',
                background: activeTab === tab
                  ? tab === 'visited' ? 'rgba(20,184,166,0.2)' : 'rgba(236,72,153,0.2)'
                  : 'transparent',
                color: activeTab === tab
                  ? tab === 'visited' ? '#2dd4bf' : '#f472b6'
                  : '#64748b',
                fontSize: '13px', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                transition: 'all 0.2s ease',
              }}
            >
              {tab === 'visited' ? <CheckCircle size={14} /> : <Sparkles size={14} />}
              {tab === 'visited' ? `Visited (${visitedCountries.length})` : `Wishlist (${wishlistCountries.length})`}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {(activeTab === 'visited' ? visitedCountries : wishlistCountries).map(country => (
            <Link
              key={country.id}
              href={`/country/${country.id}`}
              className="pressable"
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: activeTab === 'visited' ? 'rgba(20,184,166,0.08)' : 'rgba(236,72,153,0.08)',
                border: `1px solid ${activeTab === 'visited' ? 'rgba(20,184,166,0.2)' : 'rgba(236,72,153,0.2)'}`,
                padding: '8px 14px',
                borderRadius: '100px',
              }}
            >
              <span style={{ fontSize: '18px' }}>{country.flagEmoji}</span>
              <span style={{
                color: activeTab === 'visited' ? '#2dd4bf' : '#f472b6',
                fontSize: '13px', fontWeight: 600,
              }}>
                {country.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div style={{ margin: '28px 20px 0' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', marginBottom: '12px' }}>Account</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { Icon: Edit2,   label: 'Edit Profile', color: '#14b8a6', bg: 'rgba(20,184,166,0.1)',  border: 'rgba(20,184,166,0.2)'  },
            { Icon: Settings,label: 'Preferences',  color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.2)' },
            { Icon: LogOut,  label: 'Sign Out',     color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.2)'   },
          ].map(({ Icon, label, color, bg, border }) => (
            <button
              key={label}
              className="pressable"
              style={{
                width: '100%',
                display: 'flex', alignItems: 'center', gap: '14px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '16px 18px',
                borderRadius: '16px',
              }}
            >
              <div style={{
                width: '38px', height: '38px', borderRadius: '12px',
                background: bg, border: `1px solid ${border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={18} color={color} />
              </div>
              <span style={{
                color: label === 'Sign Out' ? '#ef4444' : '#e2e8f0',
                flex: 1, textAlign: 'left', fontSize: '15px', fontWeight: 600,
              }}>
                {label}
              </span>
              {label !== 'Sign Out' && <ChevronRight size={18} color="#334155" />}
            </button>
          ))}
        </div>
        <p style={{ color: '#334155', fontSize: '12px', textAlign: 'center', marginTop: '24px' }}>
          Member since {mockUser.memberSince} · Kiwi Travel v1.0
        </p>
      </div>
    </div>
  );
}
