'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { countries, Country } from '@/lib/countries';
import { X, Compass, MessageCircle, Heart, MapPin, ChevronRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'visited' | 'wishlist'>('all');

  const visitedCount = countries.filter(c => c.visited).length;
  const filteredCountries = countries.filter(c => {
    if (activeFilter === 'visited') return c.visited;
    if (activeFilter === 'wishlist') return !c.visited;
    return true;
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #030712 0%, #0f172a 50%, #030712 100%)',
      paddingBottom: '90px',
    }}>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        padding: '40px 20px 30px',
        overflow: 'hidden',
      }}>
        {/* Background orbs */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-50px', left: '-100px',
          width: '250px', height: '250px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Sparkles size={18} color="#14b8a6" />
            <span style={{ color: '#14b8a6', fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em' }}>
              TRAVEL FOOTSTEPS
            </span>
          </div>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.1,
          }}>
            Explore The<br />World With Me
          </h1>
          <p style={{ color: '#64748b', marginTop: '12px', fontSize: '15px', lineHeight: 1.6 }}>
            Personal travel stories, tips & hidden gems from {countries.length} destinations
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        padding: '0 20px',
        marginBottom: '24px',
      }}>
        {[
          { label: 'Countries', value: countries.length, color: '#14b8a6' },
          { label: 'Visited', value: visitedCount, color: '#8b5cf6' },
          { label: 'Explored', value: `${Math.round((visitedCount / countries.length) * 100)}%`, color: '#ec4899' },
        ].map((stat, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            padding: '16px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '28px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        padding: '0 20px',
        marginBottom: '20px',
      }}>
        {[
          { key: 'all', label: 'All' },
          { key: 'visited', label: 'Visited' },
          { key: 'wishlist', label: 'Wishlist' },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key as any)}
            style={{
              padding: '10px 20px',
              borderRadius: '100px',
              border: 'none',
              background: activeFilter === key
                ? 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)'
                : 'rgba(255,255,255,0.05)',
              color: activeFilter === key ? '#fff' : '#94a3b8',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Country Cards */}
      <div style={{ padding: '0 20px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}>
          {filteredCountries.map((country, index) => (
            <button
              key={country.id}
              onClick={() => setSelectedCountry(country)}
              style={{
                position: 'relative',
                height: '200px',
                borderRadius: '20px',
                overflow: 'hidden',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                animation: 'slide-up 0.5s ease-out forwards',
                animationDelay: `${index * 0.05}s`,
                opacity: 0,
              }}
            >
              <Image
                src={country.coverImage}
                alt={country.name}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.8) 100%)',
              }} />

              {/* Visited badge */}
              {country.visited && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(20,184,166,0.9)',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 10px',
                  borderRadius: '100px',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#fff',
                }}>
                  VISITED
                </div>
              )}

              <div style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                right: '16px',
              }}>
                <span style={{ fontSize: '28px' }}>{country.flagEmoji}</span>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#fff',
                  marginTop: '8px',
                }}>
                  {country.name}
                </h3>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginTop: '4px',
                }}>
                  <MapPin size={12} color="#94a3b8" />
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>{country.city}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Country Modal */}
      {selectedCountry && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 1001,
            display: 'flex',
            alignItems: 'flex-end',
          }}
          onClick={() => setSelectedCountry(null)}
        >
          <div
            style={{
              background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
              borderTopLeftRadius: '32px',
              borderTopRightRadius: '32px',
              padding: '28px 24px 40px',
              width: '100%',
              maxHeight: '80vh',
              overflow: 'auto',
              animation: 'slide-up 0.3s ease-out',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div style={{
              width: '40px',
              height: '4px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '2px',
              margin: '0 auto 20px',
            }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '20px' }}>
              <span style={{ fontSize: '56px', marginRight: '16px' }}>{selectedCountry.flagEmoji}</span>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '28px', fontWeight: 700 }}>{selectedCountry.name}</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <MapPin size={14} color="#64748b" />
                  <span style={{ color: '#64748b', fontSize: '14px' }}>{selectedCountry.city}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCountry(null)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={20} color="#fff" />
              </button>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '24px',
            }}>
              <div style={{
                flex: 1,
                background: 'rgba(20,184,166,0.1)',
                border: '1px solid rgba(20,184,166,0.2)',
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#14b8a6' }}>{selectedCountry.places.length}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Places</div>
              </div>
              <div style={{
                flex: 1,
                background: 'rgba(139,92,246,0.1)',
                border: '1px solid rgba(139,92,246,0.2)',
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#8b5cf6' }}>{selectedCountry.experiences.length}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Experiences</div>
              </div>
              <div style={{
                flex: 1,
                background: 'rgba(236,72,153,0.1)',
                border: '1px solid rgba(236,72,153,0.2)',
                borderRadius: '12px',
                padding: '12px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#ec4899' }}>{selectedCountry.topTips.length}</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>Tips</div>
              </div>
            </div>

            {selectedCountry.visited && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(20,184,166,0.1)',
                border: '1px solid rgba(20,184,166,0.2)',
                padding: '12px 16px',
                borderRadius: '12px',
                marginBottom: '24px',
              }}>
                <Sparkles size={18} color="#14b8a6" />
                <span style={{ color: '#14b8a6', fontSize: '14px', fontWeight: 500 }}>
                  I&apos;ve been here! Check out my stories and tips.
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link
                href={`/country/${selectedCountry.id}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                  padding: '18px 20px',
                  borderRadius: '16px',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '15px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Compass size={22} />
                  <span>Explore Destination</span>
                </div>
                <ChevronRight size={20} />
              </Link>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Link
                  href={`/country/${selectedCountry.id}/chat`}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: 'rgba(139,92,246,0.2)',
                    border: '1px solid rgba(139,92,246,0.3)',
                    padding: '16px',
                    borderRadius: '14px',
                    color: '#a78bfa',
                    fontWeight: 600,
                    fontSize: '14px',
                  }}
                >
                  <MessageCircle size={20} />
                  <span>Chat</span>
                </Link>
                <Link
                  href={`/country/${selectedCountry.id}/match`}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    background: 'rgba(236,72,153,0.2)',
                    border: '1px solid rgba(236,72,153,0.3)',
                    padding: '16px',
                    borderRadius: '14px',
                    color: '#f472b6',
                    fontWeight: 600,
                    fontSize: '14px',
                  }}
                >
                  <Heart size={20} />
                  <span>Find Buddies</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
