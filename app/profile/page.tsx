'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { countries } from '@/lib/countries';
import { Camera, MapPin, Calendar, Globe, Settings, LogOut, Edit2, CheckCircle, Sparkles, User, Heart } from 'lucide-react';

const mockUser = {
  name: 'Alex Thompson',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  bio: 'Adventure seeker and photography enthusiast exploring the world one country at a time',
  memberSince: 'January 2024',
  travelStyle: ['Adventure', 'Photography', 'Culture', 'Food'],
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const visitedCountries = countries.filter(c => c.visited && !c.parentCountry);
  const wishlistCountries = countries.filter(c => !c.visited && !c.parentCountry);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #030712 0%, #0f172a 50%, #030712 100%)',
      paddingBottom: '90px'
    }}>
      {/* Background orbs */}
      <div style={{
        position: 'fixed', top: '0', right: '-100px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '200px', left: '-100px',
        width: '250px', height: '250px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{
        position: 'relative',
        padding: '40px 20px 30px',
        textAlign: 'center',
      }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '60px',
            overflow: 'hidden',
            border: '3px solid rgba(20,184,166,0.3)',
            background: 'rgba(255,255,255,0.05)',
            boxShadow: '0 8px 32px rgba(20,184,166,0.2)',
          }}>
            <Image src={mockUser.avatar} alt={mockUser.name} width={120} height={120} style={{ objectFit: 'cover' }} />
          </div>
          <button style={{
            position: 'absolute',
            bottom: '4px',
            right: '4px',
            width: '36px',
            height: '36px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            border: '2px solid #030712',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(20,184,166,0.3)',
          }}>
            <Camera size={18} color="#fff" />
          </button>
        </div>

        <h1 style={{
          fontSize: '28px',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '6px',
        }}>
          {mockUser.name}
        </h1>

        <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px' }}>{mockUser.email}</p>

        <p style={{
          color: '#94a3b8',
          lineHeight: 1.6,
          fontSize: '15px',
          maxWidth: '320px',
          margin: '0 auto 16px'
        }}>
          {mockUser.bio}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
          {mockUser.travelStyle.map((style, i) => (
            <span key={i} style={{
              background: 'rgba(20,184,166,0.1)',
              border: '1px solid rgba(20,184,166,0.2)',
              padding: '6px 14px',
              borderRadius: '100px',
              color: '#14b8a6',
              fontSize: '12px',
              fontWeight: 600,
            }}>
              {style}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        margin: '0 20px 32px',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          padding: '20px 12px',
          textAlign: 'center',
        }}>
          <CheckCircle size={20} color="#14b8a6" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#14b8a6', marginBottom: '4px' }}>
            {visitedCountries.length}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Visited
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          padding: '20px 12px',
          textAlign: 'center',
        }}>
          <Sparkles size={20} color="#ec4899" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#ec4899', marginBottom: '4px' }}>
            {wishlistCountries.length}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Wishlist
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px',
          padding: '20px 12px',
          textAlign: 'center',
        }}>
          <Heart size={20} color="#8b5cf6" style={{ margin: '0 auto 8px' }} />
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#8b5cf6', marginBottom: '4px' }}>3</div>
          <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Buddies
          </div>
        </div>
      </div>

      {/* Visited Countries */}
      <div style={{ padding: '0 20px', marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#fff',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle size={20} color="#14b8a6" />
          Visited Countries
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {visitedCountries.map((country) => (
            <Link
              key={country.id}
              href={`/country/${country.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(20,184,166,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(20,184,166,0.2)',
                padding: '10px 16px',
                borderRadius: '100px',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '20px' }}>{country.flagEmoji}</span>
              <span style={{ color: '#14b8a6', fontSize: '14px', fontWeight: 600 }}>{country.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Wishlist */}
      <div style={{ padding: '0 20px', marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: 700,
          color: '#fff',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Sparkles size={20} color="#ec4899" />
          Wishlist
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {wishlistCountries.map((country) => (
            <Link
              key={country.id}
              href={`/country/${country.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(236,72,153,0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(236,72,153,0.2)',
                padding: '10px 16px',
                borderRadius: '100px',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '20px' }}>{country.flagEmoji}</span>
              <span style={{ color: '#ec4899', fontSize: '14px', fontWeight: 600 }}>{country.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div style={{ padding: '0 20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>Settings</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '18px 20px',
            borderRadius: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(20,184,166,0.1)',
              border: '1px solid rgba(20,184,166,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Edit2 size={20} color="#14b8a6" />
            </div>
            <span style={{ color: '#e2e8f0', flex: 1, textAlign: 'left', fontSize: '15px', fontWeight: 600 }}>
              Edit Profile
            </span>
          </button>

          <button style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '18px 20px',
            borderRadius: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(139,92,246,0.1)',
              border: '1px solid rgba(139,92,246,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Settings size={20} color="#8b5cf6" />
            </div>
            <span style={{ color: '#e2e8f0', flex: 1, textAlign: 'left', fontSize: '15px', fontWeight: 600 }}>
              Preferences
            </span>
          </button>

          <button style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '18px 20px',
            borderRadius: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <LogOut size={20} color="#ef4444" />
            </div>
            <span style={{ color: '#ef4444', flex: 1, textAlign: 'left', fontSize: '15px', fontWeight: 600 }}>
              Sign Out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
