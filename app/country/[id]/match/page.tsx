'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getCountryById } from '@/lib/countries';
import { X, Heart, Calendar, Users, MessageCircle, Globe } from 'lucide-react';

const mockProfiles = [
  {
    id: '1',
    name: 'Sophie Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    bio: 'Looking for hiking buddies! Planning to do the Routeburn Track.',
    travelDates: 'Mar 1 - Mar 21',
    travelStyle: ['Adventure', 'Nature', 'Photography'],
    countriesVisited: 4,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    bio: 'Bungee jumping enthusiast! Looking for adrenaline junkies.',
    travelDates: 'Feb 15 - Mar 5',
    travelStyle: ['Extreme Sports', 'Foodie', 'Road Trip'],
    countriesVisited: 8,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    bio: 'Interested in local culture and wine regions.',
    travelDates: 'Apr 1 - Apr 30',
    travelStyle: ['Culture', 'Wine', 'Relaxation'],
    countriesVisited: 12,
    isOnline: true,
  },
];

export default function MatchPage() {
  const params = useParams();
  const country = getCountryById(params.id as string);
  const [isOptedIn, setIsOptedIn] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!country) {
    return <div style={{ padding: '20px', color: '#fff' }}>Country not found</div>;
  }

  if (!isOptedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '64px' }}>{country.flagEmoji}</span>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', marginTop: '20px' }}>Find Travel Buddies</h1>
          <p style={{ color: '#4fd1c5', fontSize: '18px', marginTop: '4px' }}>for {country.name}</p>
          <p style={{ color: '#a0aec0', marginTop: '24px', lineHeight: '24px' }}>
            Join the matching system to connect with travelers planning to visit {country.name}.
          </p>

          <div style={{ marginTop: '30px', textAlign: 'left' }}>
            {[
              { icon: Users, text: 'Meet like-minded travelers' },
              { icon: Calendar, text: 'Sync travel dates' },
              { icon: MessageCircle, text: 'Chat with your matches' },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                background: '#1e3a5f',
                padding: '16px',
                borderRadius: '12px',
                marginBottom: '12px',
              }}>
                <Icon size={24} color="#4fd1c5" />
                <span style={{ color: '#fff' }}>{text}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsOptedIn(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              width: '100%',
              background: '#ec4899',
              padding: '18px',
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              marginTop: '30px',
            }}
          >
            <Heart size={24} color="#fff" />
            <span style={{ color: '#fff', fontSize: '18px', fontWeight: 600 }}>Join Matching System</span>
          </button>

          <p style={{ color: '#64748b', fontSize: '12px', marginTop: '16px' }}>
            Your profile will be visible to other travelers
          </p>
        </div>
      </div>
    );
  }

  if (currentIndex >= mockProfiles.length) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0f172a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        textAlign: 'center',
      }}>
        <div>
          <Globe size={80} color="#4fd1c5" style={{ margin: '0 auto' }} />
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginTop: '20px' }}>No More Travelers</h1>
          <p style={{ color: '#a0aec0', marginTop: '12px', lineHeight: '24px' }}>
            Check back later for new matches!
          </p>
          <button
            onClick={() => setCurrentIndex(0)}
            style={{
              background: '#2563eb',
              padding: '14px 30px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              marginTop: '30px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const profile = mockProfiles[currentIndex];

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '16px', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
        <span style={{ fontSize: '24px' }}>{country.flagEmoji}</span>
        <span style={{ color: '#fff', fontSize: '18px', fontWeight: 600 }}>Travelers to {country.name}</span>
      </div>

      {/* Card */}
      <div style={{
        background: '#1e3a5f',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      }}>
        <div style={{ position: 'relative', height: '300px' }}>
          <Image src={profile.avatar} alt={profile.name} fill style={{ objectFit: 'cover' }} />
        </div>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>{profile.name}</h2>
            {profile.isOnline && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(79,209,197,0.2)',
                padding: '4px 10px',
                borderRadius: '12px',
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4fd1c5' }} />
                <span style={{ color: '#4fd1c5', fontSize: '12px' }}>Online</span>
              </div>
            )}
          </div>
          <p style={{ color: '#cbd5e1', marginTop: '8px', lineHeight: '22px' }}>{profile.bio}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
            <Calendar size={16} color="#4fd1c5" />
            <span style={{ color: '#a0aec0', fontSize: '13px' }}>{profile.travelDates}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
            {profile.travelStyle.map((style, i) => (
              <span key={i} style={{
                background: '#2d4a6f',
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
          <p style={{ color: '#64748b', fontSize: '12px', marginTop: '12px' }}>{profile.countriesVisited} countries visited</p>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '30px' }}>
        <button
          onClick={() => setCurrentIndex(i => i + 1)}
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '35px',
            background: '#1e3a5f',
            border: '2px solid #f43f5e',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={36} color="#f43f5e" />
        </button>
        <button
          onClick={() => setCurrentIndex(i => i + 1)}
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '35px',
            background: '#1e3a5f',
            border: '2px solid #4fd1c5',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Heart size={32} color="#4fd1c5" />
        </button>
      </div>
    </div>
  );
}
