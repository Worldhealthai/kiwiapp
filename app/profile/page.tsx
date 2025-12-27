'use client';

import { useState } from 'react';
import Image from 'next/image';
import { countries } from '@/lib/countries';
import { Camera, MapPin, Calendar, Globe, Settings, LogOut, Edit2, CheckCircle } from 'lucide-react';

const mockUser = {
  name: 'Alex Thompson',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  bio: 'Adventure seeker | Photography enthusiast | 15 countries and counting',
  memberSince: 'January 2024',
  travelStyle: ['Adventure', 'Photography', 'Culture', 'Food'],
};

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const visitedCountries = countries.filter(c => c.visited);
  const wishlistCountries = countries.filter(c => !c.visited);

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #1a365d 0%, #0f172a 100%)',
        padding: '30px 16px',
        textAlign: 'center',
      }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50px', overflow: 'hidden', border: '3px solid #4fd1c5' }}>
            <Image src={mockUser.avatar} alt={mockUser.name} width={100} height={100} />
          </div>
          <button style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '32px',
            height: '32px',
            borderRadius: '16px',
            background: '#4fd1c5',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Camera size={16} color="#0f172a" />
          </button>
        </div>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginTop: '16px' }}>{mockUser.name}</h1>
        <p style={{ color: '#a0aec0', marginTop: '4px' }}>{mockUser.email}</p>
        <p style={{ color: '#cbd5e1', marginTop: '12px', lineHeight: '22px', maxWidth: '300px', margin: '12px auto 0' }}>
          {mockUser.bio}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
          {mockUser.travelStyle.map((style, i) => (
            <span key={i} style={{
              background: 'rgba(79,209,197,0.2)',
              padding: '6px 12px',
              borderRadius: '16px',
              color: '#4fd1c5',
              fontSize: '12px',
              fontWeight: 500,
            }}>
              {style}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'flex',
        background: '#1e3a5f',
        margin: '16px',
        padding: '20px',
        borderRadius: '16px',
      }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4fd1c5' }}>{visitedCountries.length}</div>
          <div style={{ fontSize: '12px', color: '#a0aec0', marginTop: '4px' }}>Countries Visited</div>
        </div>
        <div style={{ width: '1px', background: '#2d4a6f' }} />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ec4899' }}>{wishlistCountries.length}</div>
          <div style={{ fontSize: '12px', color: '#a0aec0', marginTop: '4px' }}>On Wishlist</div>
        </div>
        <div style={{ width: '1px', background: '#2d4a6f' }} />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>3</div>
          <div style={{ fontSize: '12px', color: '#a0aec0', marginTop: '4px' }}>Travel Buddies</div>
        </div>
      </div>

      {/* Visited Countries */}
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={20} color="#4fd1c5" />
          Visited Countries
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {visitedCountries.map((country) => (
            <div key={country.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#1e3a5f',
              padding: '8px 12px',
              borderRadius: '20px',
            }}>
              <span style={{ fontSize: '18px' }}>{country.flagEmoji}</span>
              <span style={{ color: '#fff', fontSize: '13px' }}>{country.name}</span>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Globe size={20} color="#ec4899" />
          Wishlist
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
          {wishlistCountries.map((country) => (
            <div key={country.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#1e3a5f',
              padding: '8px 12px',
              borderRadius: '20px',
              opacity: 0.7,
            }}>
              <span style={{ fontSize: '18px' }}>{country.flagEmoji}</span>
              <span style={{ color: '#fff', fontSize: '13px' }}>{country.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' }}>Settings</h2>

        <button style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: '#1e3a5f',
          padding: '16px',
          borderRadius: '12px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '8px',
        }}>
          <Edit2 size={20} color="#4fd1c5" />
          <span style={{ color: '#fff', flex: 1, textAlign: 'left' }}>Edit Profile</span>
        </button>

        <button style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: '#1e3a5f',
          padding: '16px',
          borderRadius: '12px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '8px',
        }}>
          <Settings size={20} color="#4fd1c5" />
          <span style={{ color: '#fff', flex: 1, textAlign: 'left' }}>Preferences</span>
        </button>

        <button style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: '#1e3a5f',
          padding: '16px',
          borderRadius: '12px',
          border: 'none',
          cursor: 'pointer',
        }}>
          <LogOut size={20} color="#f43f5e" />
          <span style={{ color: '#f43f5e', flex: 1, textAlign: 'left' }}>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
