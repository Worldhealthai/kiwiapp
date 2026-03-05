'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCountryById } from '@/lib/countries';
import {
  ArrowLeft, MapPin, Star, Lightbulb, Utensils, Luggage, Home,
  ExternalLink, MessageCircle, Heart, ChevronDown, ChevronUp,
  Sparkles, Check, Globe2
} from 'lucide-react';

const tabs = [
  { key: 'places', label: 'Places', icon: Star },
  { key: 'experiences', label: 'Experiences', icon: Sparkles },
  { key: 'tips', label: 'Tips', icon: Lightbulb },
] as const;

export default function CountryDetailPage() {
  const params = useParams();
  const country = getCountryById(params.id as string);
  const [activeTab, setActiveTab] = useState<'places' | 'experiences' | 'tips'>('places');
  const [expandedPlace, setExpandedPlace] = useState<number | null>(null);

  if (!country) {
    return (
      <div style={{
        minHeight: '100dvh',
        background: 'var(--bg-primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '16px',
      }}>
        <Globe2 size={48} color="#1e293b" />
        <p style={{ color: '#475569', fontSize: '16px', fontWeight: 600 }}>Destination not found</p>
        <Link href="/" style={{
          background: 'rgba(20,184,166,0.1)',
          border: '1px solid rgba(20,184,166,0.2)',
          color: '#14b8a6',
          padding: '10px 20px',
          borderRadius: '12px',
          fontSize: '14px', fontWeight: 600,
        }}>
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>

      {/* Hero Image */}
      <div style={{ position: 'relative', height: '320px' }}>
        <Image
          src={country.coverImage}
          alt={country.name}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        {/* Gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(3,7,18,0.35) 0%, rgba(3,7,18,0.1) 40%, rgba(3,7,18,0.85) 100%)',
        }} />

        {/* Back button */}
        <Link
          href="/"
          className="pressable"
          style={{
            position: 'absolute',
            top: 'calc(16px + env(safe-area-inset-top, 0px))',
            left: '16px',
            width: '42px', height: '42px',
            borderRadius: '14px',
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <ArrowLeft size={20} color="#fff" />
        </Link>

        {/* Status badge */}
        {country.visited && (
          <div style={{
            position: 'absolute',
            top: 'calc(16px + env(safe-area-inset-top, 0px))',
            right: '16px',
            background: 'rgba(20,184,166,0.88)',
            backdropFilter: 'blur(4px)',
            padding: '7px 12px',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', gap: '5px',
          }}>
            <Check size={13} color="#fff" />
            <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em' }}>VISITED</span>
          </div>
        )}

        {/* Country info at bottom of hero */}
        <div style={{
          position: 'absolute', bottom: '20px', left: '20px', right: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '14px' }}>
            <span style={{ fontSize: '52px', lineHeight: 1, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}>{country.flagEmoji}</span>
            <div>
              <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#fff', lineHeight: 1, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                {country.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '5px' }}>
                <MapPin size={14} color="#94a3b8" />
                <span style={{ color: '#94a3b8', fontSize: '14px' }}>{country.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        padding: '16px 20px',
      }}>
        {[
          { label: 'Places', value: country.places.length, color: '#14b8a6' },
          { label: 'Experiences', value: country.experiences.length, color: '#8b5cf6' },
          { label: 'Tips', value: country.topTips.length, color: '#f59e0b' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '14px',
            padding: '12px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '22px', fontWeight: 800, color }}>{value}</div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Wishlist notice */}
      {!country.visited && (
        <div style={{
          margin: '0 20px 0',
          padding: '12px 16px',
          background: 'rgba(236,72,153,0.08)',
          border: '1px solid rgba(236,72,153,0.18)',
          borderRadius: '14px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <Sparkles size={16} color="#ec4899" />
          <span style={{ color: '#f472b6', fontSize: '13px', fontWeight: 500 }}>
            On my wishlist — discover why I can&apos;t wait to visit!
          </span>
        </div>
      )}

      {/* Sticky tab navigation */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'rgba(3,7,18,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '0 16px',
        marginTop: '16px',
      }}>
        <div style={{ display: 'flex', gap: '4px', padding: '10px 0' }}>
          {tabs.map(({ key, label, icon: Icon }) => {
            const isActive = activeTab === key;
            const count = key === 'places' ? country.places.length
              : key === 'experiences' ? country.experiences.length
              : country.topTips.length;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="pressable"
                style={{
                  flex: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  padding: '10px 8px',
                  borderRadius: '12px',
                  background: isActive ? 'rgba(20,184,166,0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(20,184,166,0.25)' : '1px solid transparent',
                  color: isActive ? '#2dd4bf' : '#64748b',
                  fontSize: '12px', fontWeight: 600,
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <Icon size={14} />
                {label}
                <span style={{
                  background: isActive ? 'rgba(20,184,166,0.2)' : 'rgba(255,255,255,0.06)',
                  padding: '1px 6px',
                  borderRadius: '8px',
                  fontSize: '11px',
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ padding: '16px 20px 160px' }}>

        {/* Places */}
        {activeTab === 'places' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {country.places.map((place, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${expandedPlace === i ? 'rgba(20,184,166,0.2)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '18px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <button
                  onClick={() => setExpandedPlace(expandedPlace === i ? null : i)}
                  className="pressable"
                  style={{ width: '100%', padding: '18px', textAlign: 'left' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      width: '32px', height: '32px', flexShrink: 0,
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '13px', fontWeight: 800, color: '#fff',
                    }}>
                      {i + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', marginBottom: '5px' }}>{place.name}</h3>
                      <p style={{
                        color: '#94a3b8', fontSize: '13px', lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: expandedPlace === i ? 'unset' : 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {place.description}
                      </p>
                    </div>
                    <div style={{
                      width: '28px', height: '28px', flexShrink: 0,
                      borderRadius: '9px',
                      background: 'rgba(255,255,255,0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {expandedPlace === i ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
                    </div>
                  </div>
                </button>

                {expandedPlace === i && (
                  <div style={{ padding: '0 18px 18px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{
                      display: 'flex', gap: '10px', alignItems: 'flex-start',
                      marginTop: '14px',
                      padding: '12px 14px',
                      background: 'rgba(245,158,11,0.08)',
                      border: '1px solid rgba(245,158,11,0.18)',
                      borderRadius: '12px',
                    }}>
                      <Lightbulb size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: '1px' }} />
                      <p style={{ color: '#fbbf24', fontSize: '13px', lineHeight: 1.6 }}>{place.tips}</p>
                    </div>

                    {country.visited && place.link && (
                      <a
                        href={place.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pressable"
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                          marginTop: '12px', padding: '13px',
                          background: place.isBooking
                            ? 'linear-gradient(135deg, #14b8a6, #0d9488)'
                            : 'rgba(255,255,255,0.05)',
                          border: place.isBooking ? 'none' : '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          color: '#fff', fontSize: '14px', fontWeight: 600,
                          boxShadow: place.isBooking ? '0 4px 16px rgba(20,184,166,0.25)' : 'none',
                        }}
                      >
                        <ExternalLink size={15} />
                        {place.isBooking ? 'Book Now' : 'Learn More'}
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Experiences */}
        {activeTab === 'experiences' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {country.experiences.map((exp, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '18px',
                  padding: '18px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.2))',
                    border: '1px solid rgba(139,92,246,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Sparkles size={18} color="#a78bfa" />
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', flex: 1 }}>{exp.name}</h3>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.7 }}>{exp.description}</p>
                {country.visited && exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pressable"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      marginTop: '14px', padding: '9px 16px',
                      background: 'rgba(139,92,246,0.12)',
                      border: '1px solid rgba(139,92,246,0.25)',
                      borderRadius: '100px',
                      color: '#a78bfa', fontSize: '13px', fontWeight: 600,
                    }}
                  >
                    <ExternalLink size={13} />
                    {exp.isBooking ? 'Book Experience' : 'Learn More'}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tips */}
        {activeTab === 'tips' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              {
                title: 'Top Tips',
                icon: Lightbulb,
                color: '#14b8a6',
                bg: 'rgba(20,184,166,0.07)',
                border: 'rgba(20,184,166,0.15)',
                items: country.topTips,
                textColor: '#e2e8f0',
              },
              {
                title: 'Food & Drinks',
                icon: Utensils,
                color: '#f59e0b',
                bg: 'rgba(245,158,11,0.07)',
                border: 'rgba(245,158,11,0.15)',
                items: country.foodRecs,
                textColor: '#fcd34d',
              },
            ].map(({ title, icon: Icon, color, bg, border, items, textColor }) => (
              <div key={title}>
                <h3 style={{
                  fontSize: '12px', fontWeight: 700, color,
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                  marginBottom: '10px',
                  display: 'flex', alignItems: 'center', gap: '7px',
                }}>
                  <Icon size={14} />
                  {title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {items.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '14px 16px',
                        background: bg,
                        border: `1px solid ${border}`,
                        borderRadius: '14px',
                        display: 'flex', alignItems: 'flex-start', gap: '10px',
                      }}
                    >
                      <div style={{
                        width: '22px', height: '22px', borderRadius: '7px',
                        background: `rgba(${color === '#14b8a6' ? '20,184,166' : '245,158,11'},0.15)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, marginTop: '1px',
                      }}>
                        <Icon size={12} color={color} />
                      </div>
                      <p style={{ color: textColor, fontSize: '13px', lineHeight: 1.6 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Accommodation */}
            <div>
              <h3 style={{
                fontSize: '12px', fontWeight: 700, color: '#8b5cf6',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '10px',
                display: 'flex', alignItems: 'center', gap: '7px',
              }}>
                <Home size={14} />
                Where to Stay
              </h3>
              <div style={{
                padding: '16px',
                background: 'rgba(139,92,246,0.07)',
                border: '1px solid rgba(139,92,246,0.15)',
                borderRadius: '14px',
              }}>
                <p style={{ color: '#c4b5fd', fontSize: '13px', lineHeight: 1.7 }}>
                  {country.accommodationTips}
                </p>
              </div>
            </div>

            {/* Pack */}
            <div>
              <h3 style={{
                fontSize: '12px', fontWeight: 700, color: '#ec4899',
                textTransform: 'uppercase', letterSpacing: '0.08em',
                marginBottom: '10px',
                display: 'flex', alignItems: 'center', gap: '7px',
              }}>
                <Luggage size={14} />
                What to Pack
              </h3>
              <div style={{
                padding: '16px',
                background: 'rgba(236,72,153,0.07)',
                border: '1px solid rgba(236,72,153,0.15)',
                borderRadius: '14px',
              }}>
                <p style={{ color: '#f9a8d4', fontSize: '13px', lineHeight: 1.7 }}>
                  {country.whatToPack}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating action bar */}
      <div style={{
        position: 'fixed',
        bottom: 'calc(var(--nav-height) + 8px)',
        left: 0, right: 0,
        padding: '0 16px',
        zIndex: 50,
      }}>
        <div style={{
          display: 'flex', gap: '10px',
          background: 'rgba(3,7,18,0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '12px',
        }}>
          <Link
            href={`/country/${country.id}/chat`}
            className="pressable"
            style={{
              flex: 1, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px',
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.25)',
              padding: '14px',
              borderRadius: '14px',
              color: '#a78bfa', fontWeight: 600, fontSize: '14px',
            }}
          >
            <MessageCircle size={18} />
            <span>Join Chat</span>
          </Link>
          <Link
            href={`/country/${country.id}/match`}
            className="pressable"
            style={{
              flex: 1, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #ec4899, #db2777)',
              padding: '14px',
              borderRadius: '14px',
              color: '#fff', fontWeight: 700, fontSize: '14px',
              boxShadow: '0 6px 20px rgba(236,72,153,0.3)',
            }}
          >
            <Heart size={18} />
            <span>Find Buddies</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
