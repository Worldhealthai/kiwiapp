'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCountryById } from '@/lib/countries';
import { X, Heart, Calendar, Users, MessageCircle, Globe, ArrowLeft, Sparkles, MapPin } from 'lucide-react';

const mockProfiles = [
  {
    id: '1',
    name: 'Sophie Chen',
    age: 28,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    bio: 'Looking for hiking buddies! Planning to do the Routeburn Track and explore the fjords.',
    travelDates: 'Mar 1 - Mar 21',
    travelStyle: ['Adventure', 'Nature', 'Photography'],
    countriesVisited: 14,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    age: 32,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    bio: 'Bungee jumping enthusiast! Looking for adrenaline junkies to conquer extreme sports together.',
    travelDates: 'Feb 15 - Mar 5',
    travelStyle: ['Extreme Sports', 'Foodie', 'Road Trip'],
    countriesVisited: 23,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Emma Wilson',
    age: 25,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    bio: 'Interested in local culture and wine regions. Love meeting new people and trying authentic cuisine.',
    travelDates: 'Apr 1 - Apr 30',
    travelStyle: ['Culture', 'Wine', 'Relaxation'],
    countriesVisited: 19,
    isOnline: true,
  },
  {
    id: '4',
    name: 'Alex Rodriguez',
    age: 30,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Solo traveler seeking adventure companions. Into surfing, snorkeling, and beach vibes.',
    travelDates: 'Mar 10 - Mar 24',
    travelStyle: ['Beach', 'Water Sports', 'Social'],
    countriesVisited: 17,
    isOnline: true,
  },
];

export default function MatchPage() {
  const params = useParams();
  const country = getCountryById(params.id as string);
  const [isOptedIn, setIsOptedIn] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  if (!country) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #030712 0%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        color: '#fff'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#64748b' }}>Country not found</p>
          <Link
            href="/"
            style={{
              color: '#14b8a6',
              marginTop: '16px',
              display: 'inline-block',
              textDecoration: 'underline'
            }}
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating) return;

    setIsAnimating(true);
    setSwipeDirection(direction);

    setTimeout(() => {
      setCurrentIndex(i => i + 1);
      setSwipeDirection(null);
      setIsAnimating(false);
    }, 400);
  };

  if (!isOptedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #030712 0%, #0f172a 100%)',
        position: 'relative',
      }}>
        {/* Background orbs */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-100px', left: '-100px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />

        <div style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '30px',
        }}>
          {/* Back Button */}
          <Link
            href="/"
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowLeft size={20} color="#fff" />
          </Link>

          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 20px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'pulse 2s ease-in-out infinite',
            }}>
              <Heart size={40} color="#fff" />
            </div>

            <h1 style={{
              fontSize: '32px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '8px',
            }}>
              Find Travel Buddies
            </h1>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '24px',
            }}>
              <span style={{ fontSize: '32px' }}>{country.flagEmoji}</span>
              <p style={{
                color: '#14b8a6',
                fontSize: '18px',
                fontWeight: 600,
              }}>
                {country.name}
              </p>
            </div>

            <p style={{
              color: '#94a3b8',
              marginBottom: '32px',
              lineHeight: 1.6,
              fontSize: '15px',
            }}>
              Connect with travelers planning to visit {country.name}. Swipe to find your perfect travel companion!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {[
                { icon: Users, text: 'Meet like-minded travelers', color: '#14b8a6' },
                { icon: Calendar, text: 'Match your travel dates', color: '#8b5cf6' },
                { icon: MessageCircle, text: 'Chat with your matches', color: '#ec4899' },
              ].map(({ icon: Icon, text, color }, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  animation: 'slide-up 0.5s ease-out forwards',
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0,
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `${color}22`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={24} color={color} />
                  </div>
                  <span style={{ color: '#e2e8f0', fontSize: '15px', fontWeight: 500 }}>{text}</span>
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
                background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                padding: '18px 24px',
                borderRadius: '16px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 700,
                color: '#fff',
                boxShadow: '0 8px 32px rgba(236,72,153,0.3)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(236,72,153,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(236,72,153,0.3)';
              }}
            >
              <Heart size={24} />
              <span>Start Matching</span>
            </button>

            <p style={{
              color: '#64748b',
              fontSize: '13px',
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}>
              <Sparkles size={14} />
              <span>Your profile will be visible to other travelers</span>
            </p>
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  if (currentIndex >= mockProfiles.length) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #030712 0%, #0f172a 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        textAlign: 'center',
      }}>
        <div>
          <div style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 24px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Globe size={60} color="#fff" />
          </div>

          <h1 style={{
            fontSize: '28px',
            fontWeight: 800,
            color: '#fff',
            marginBottom: '12px',
          }}>
            No More Travelers
          </h1>

          <p style={{
            color: '#94a3b8',
            marginBottom: '32px',
            lineHeight: 1.6,
            fontSize: '15px',
          }}>
            You&apos;ve seen all travelers heading to {country.name}.<br />
            Check back later for new matches!
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              onClick={() => setCurrentIndex(0)}
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '14px 24px',
                borderRadius: '14px',
                cursor: 'pointer',
                color: '#fff',
                fontSize: '15px',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
            >
              Review Again
            </button>
            <Link
              href="/"
              style={{
                background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                padding: '14px 24px',
                borderRadius: '14px',
                color: '#fff',
                fontSize: '15px',
                fontWeight: 600,
                display: 'inline-block',
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const profile = mockProfiles[currentIndex];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #030712 0%, #0f172a 100%)',
      padding: '16px',
      paddingBottom: '90px',
      position: 'relative',
    }}>
      {/* Back Button */}
      <Link
        href="/"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 10,
          width: '44px',
          height: '44px',
          borderRadius: '14px',
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ArrowLeft size={20} color="#fff" />
      </Link>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '20px',
        marginTop: '8px',
      }}>
        <span style={{ fontSize: '24px' }}>{country.flagEmoji}</span>
        <span style={{
          color: '#fff',
          fontSize: '18px',
          fontWeight: 700,
        }}>
          Travelers to {country.name}
        </span>
      </div>

      {/* Progress Indicator */}
      <div style={{
        display: 'flex',
        gap: '4px',
        marginBottom: '20px',
        padding: '0 20px',
      }}>
        {mockProfiles.map((_, index) => (
          <div
            key={index}
            style={{
              flex: 1,
              height: '3px',
              borderRadius: '2px',
              background: index < currentIndex
                ? '#14b8a6'
                : index === currentIndex
                ? 'linear-gradient(90deg, #14b8a6 0%, rgba(255,255,255,0.1) 100%)'
                : 'rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Card */}
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        position: 'relative',
        perspective: '1000px',
      }}>
        <div
          style={{
            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            border: '1px solid rgba(255,255,255,0.06)',
            transform: swipeDirection === 'left'
              ? 'translateX(-150%) rotate(-15deg)'
              : swipeDirection === 'right'
              ? 'translateX(150%) rotate(15deg)'
              : 'translateX(0) rotate(0)',
            transition: isAnimating ? 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
            opacity: swipeDirection ? 0 : 1,
          }}
        >
          <div style={{ position: 'relative', height: '400px' }}>
            <Image
              src={profile.avatar}
              alt={profile.name}
              fill
              style={{ objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8) 100%)',
            }} />

            {/* Online Status */}
            {profile.isOnline && (
              <div style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(20,184,166,0.9)',
                backdropFilter: 'blur(4px)',
                padding: '6px 12px',
                borderRadius: '100px',
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#fff',
                  animation: 'pulse-dot 2s ease-in-out infinite',
                }} />
                <span style={{ color: '#fff', fontSize: '12px', fontWeight: 600 }}>Online</span>
              </div>
            )}

            {/* Name & Age */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              right: '20px',
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '4px',
              }}>
                {profile.name}, {profile.age}
              </h2>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: '#94a3b8',
                fontSize: '14px',
              }}>
                <MapPin size={14} />
                <span>{profile.countriesVisited} countries visited</span>
              </div>
            </div>
          </div>

          <div style={{ padding: '24px' }}>
            {/* Bio */}
            <p style={{
              color: '#cbd5e1',
              lineHeight: 1.7,
              marginBottom: '20px',
              fontSize: '15px',
            }}>
              {profile.bio}
            </p>

            {/* Travel Dates */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '16px',
              padding: '12px 16px',
              background: 'rgba(20,184,166,0.1)',
              border: '1px solid rgba(20,184,166,0.2)',
              borderRadius: '12px',
            }}>
              <Calendar size={18} color="#14b8a6" />
              <span style={{ color: '#14b8a6', fontSize: '14px', fontWeight: 600 }}>
                {profile.travelDates}
              </span>
            </div>

            {/* Travel Styles */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}>
              {profile.travelStyle.map((style, i) => (
                <span
                  key={i}
                  style={{
                    background: 'rgba(139,92,246,0.15)',
                    border: '1px solid rgba(139,92,246,0.3)',
                    padding: '8px 16px',
                    borderRadius: '100px',
                    color: '#a78bfa',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        marginTop: '32px',
        maxWidth: '500px',
        margin: '32px auto 0',
      }}>
        <button
          onClick={() => handleSwipe('left')}
          disabled={isAnimating}
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(220,38,38,0.2) 100%)',
            border: '2px solid rgba(239,68,68,0.4)',
            cursor: isAnimating ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
            transform: 'scale(1)',
          }}
          onMouseEnter={e => !isAnimating && (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <X size={32} color="#ef4444" strokeWidth={3} />
        </button>

        <button
          onClick={() => handleSwipe('right')}
          disabled={isAnimating}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
            border: 'none',
            cursor: isAnimating ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(236,72,153,0.4)',
            transition: 'all 0.2s ease',
            transform: 'scale(1)',
          }}
          onMouseEnter={e => !isAnimating && (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Heart size={36} color="#fff" fill="#fff" />
        </button>
      </div>

      <style jsx>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
