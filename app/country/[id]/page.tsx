'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCountryById } from '@/lib/countries';
import { CURATOR } from '@/lib/curator';
import { useUserJourney } from '@/contexts/UserJourneyContext';
import {
  ArrowLeft, MapPin, Star, Lightbulb, Utensils, Luggage, Home,
  ExternalLink, MessageCircle, Heart, ChevronDown, ChevronUp,
  Sparkles, Check, Globe2, BookOpen, CheckCircle2, X
} from 'lucide-react';

const tabs = [
  { key: 'places',      label: 'Places',      icon: Star      },
  { key: 'experiences', label: 'Experiences', icon: Sparkles  },
  { key: 'tips',        label: 'Tips',        icon: Lightbulb },
] as const;

export default function CountryDetailPage() {
  const params = useParams();
  const country = getCountryById(params.id as string);
  const { getUserStatus, markVisited, addToWishlist, removeFromJourney } = useUserJourney();
  const [activeTab, setActiveTab] = useState<'places' | 'experiences' | 'tips'>('places');
  const [expandedPlace, setExpandedPlace] = useState<number | null>(null);
  const [showJourneySheet, setShowJourneySheet] = useState(false);

  if (!country) {
    return (
      <div style={{
        minHeight: '100dvh', background: 'var(--bg-primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '16px',
      }}>
        <Globe2 size={48} color="#1e293b" />
        <p style={{ color: '#475569', fontSize: '16px', fontWeight: 600 }}>Destination not found</p>
        <Link href="/" style={{
          background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)',
          color: '#14b8a6', padding: '10px 20px', borderRadius: '12px',
          fontSize: '14px', fontWeight: 600,
        }}>Go back home</Link>
      </div>
    );
  }

  const userStatus = getUserStatus(country.id);

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: '320px' }}>
        <Image src={country.coverImage} alt={country.name} fill priority sizes="100vw" style={{ objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(3,7,18,0.35) 0%, rgba(3,7,18,0.1) 40%, rgba(3,7,18,0.85) 100%)',
        }} />

        {/* Back */}
        <Link href="/" className="pressable" style={{
          position: 'absolute',
          top: 'calc(16px + env(safe-area-inset-top, 0px))', left: '16px',
          width: '42px', height: '42px', borderRadius: '14px',
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ArrowLeft size={20} color="#fff" />
        </Link>

        {/* Curator badge (if they wrote a guide) */}
        {country.visited && (
          <div style={{
            position: 'absolute',
            top: 'calc(16px + env(safe-area-inset-top, 0px))', right: '16px',
            background: 'rgba(20,184,166,0.88)', backdropFilter: 'blur(4px)',
            padding: '6px 11px', borderRadius: '12px',
            display: 'flex', alignItems: 'center', gap: '5px',
          }}>
            <Image src={CURATOR.avatar} alt={CURATOR.name} width={16} height={16} style={{ borderRadius: '5px', objectFit: 'cover' }} />
            <span style={{ color: '#fff', fontSize: '11px', fontWeight: 700 }}>KIWI GUIDE</span>
          </div>
        )}

        {/* Country info */}
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '14px' }}>
            <span style={{ fontSize: '52px', lineHeight: 1, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}>{country.flagEmoji}</span>
            <div>
              <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#fff', lineHeight: 1, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
                {country.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '5px' }}>
                <MapPin size={13} color="#94a3b8" />
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>{country.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Journey quick-bar */}
      <div style={{ padding: '14px 20px 0' }}>
        <div style={{
          display: 'flex', gap: '8px', alignItems: 'center',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '16px',
          padding: '12px 14px',
        }}>
          <div style={{ flex: 1 }}>
            <p style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '3px' }}>My Journey</p>
            <p style={{ color: userStatus === 'visited' ? '#4ade80' : userStatus === 'wishlist' ? '#f472b6' : '#475569', fontSize: '13px', fontWeight: 600 }}>
              {userStatus === 'visited' ? '✓ I\'ve been here' : userStatus === 'wishlist' ? '★ On my wishlist' : 'Not added yet'}
            </p>
          </div>
          <button
            onClick={() => setShowJourneySheet(true)}
            className="pressable"
            style={{
              background: userStatus
                ? userStatus === 'visited' ? 'rgba(34,197,94,0.15)' : 'rgba(236,72,153,0.15)'
                : 'rgba(20,184,166,0.15)',
              border: `1px solid ${userStatus
                ? userStatus === 'visited' ? 'rgba(34,197,94,0.3)' : 'rgba(236,72,153,0.3)'
                : 'rgba(20,184,166,0.3)'}`,
              borderRadius: '12px',
              padding: '8px 14px',
              color: userStatus === 'visited' ? '#4ade80' : userStatus === 'wishlist' ? '#f472b6' : '#14b8a6',
              fontSize: '13px', fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            {userStatus === 'visited' ? <Check size={14} /> : userStatus === 'wishlist' ? <Star size={14} /> : <CheckCircle2 size={14} />}
            {userStatus ? 'Update' : 'Add'}
          </button>
        </div>
      </div>

      {/* Curator intro (if they have a guide) */}
      {country.visited && (
        <div style={{ padding: '12px 20px 0' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'rgba(20,184,166,0.06)',
            border: '1px solid rgba(20,184,166,0.14)',
            borderRadius: '14px', padding: '12px 14px',
          }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '11px',
              overflow: 'hidden', border: '1.5px solid rgba(20,184,166,0.3)', flexShrink: 0,
            }}>
              <Image src={CURATOR.avatar} alt={CURATOR.name} width={36} height={36} style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <p style={{ color: '#2dd4bf', fontSize: '12px', fontWeight: 700 }}>
                <BookOpen size={11} style={{ display: 'inline', marginRight: '4px' }} />
                Kiwifootsteps Guide
              </p>
              <p style={{ color: '#64748b', fontSize: '11px', marginTop: '1px' }}>
                First-hand tips, places &amp; experiences from my visit
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: '12px 20px 0' }}>
        {[
          { label: 'Places',      value: country.places.length,      color: '#14b8a6' },
          { label: 'Experiences', value: country.experiences.length,  color: '#8b5cf6' },
          { label: 'Tips',        value: country.topTips.length,      color: '#f59e0b' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '13px', padding: '11px', textAlign: 'center',
          }}>
            <div style={{ fontSize: '20px', fontWeight: 800, color }}>{value}</div>
            <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Wishlist notice */}
      {!country.visited && (
        <div style={{
          margin: '12px 20px 0',
          padding: '11px 14px',
          background: 'rgba(236,72,153,0.07)', border: '1px solid rgba(236,72,153,0.16)',
          borderRadius: '13px', display: 'flex', alignItems: 'center', gap: '9px',
        }}>
          <Sparkles size={15} color="#ec4899" />
          <span style={{ color: '#f472b6', fontSize: '13px' }}>
            On the Kiwifootsteps wishlist — planning to visit soon!
          </span>
        </div>
      )}

      {/* Sticky tabs */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(3,7,18,0.88)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '0 16px', marginTop: '14px',
      }}>
        <div style={{ display: 'flex', gap: '4px', padding: '8px 0' }}>
          {tabs.map(({ key, label, icon: Icon }) => {
            const isActive = activeTab === key;
            const count = key === 'places' ? country.places.length : key === 'experiences' ? country.experiences.length : country.topTips.length;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="pressable"
                style={{
                  flex: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                  padding: '9px 6px',
                  borderRadius: '11px',
                  background: isActive ? 'rgba(20,184,166,0.14)' : 'transparent',
                  border: isActive ? '1px solid rgba(20,184,166,0.22)' : '1px solid transparent',
                  color: isActive ? '#2dd4bf' : '#64748b',
                  fontSize: '12px', fontWeight: 600,
                  transition: 'all 0.2s ease', whiteSpace: 'nowrap',
                }}
              >
                <Icon size={13} />
                {label}
                <span style={{
                  background: isActive ? 'rgba(20,184,166,0.2)' : 'rgba(255,255,255,0.06)',
                  padding: '1px 6px', borderRadius: '7px', fontSize: '10px',
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {country.places.map((place, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${expandedPlace === i ? 'rgba(20,184,166,0.2)' : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '18px', overflow: 'hidden',
                transition: 'border-color 0.2s ease',
              }}>
                <button
                  onClick={() => setExpandedPlace(expandedPlace === i ? null : i)}
                  className="pressable"
                  style={{ width: '100%', padding: '16px', textAlign: 'left' }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{
                      width: '30px', height: '30px', flexShrink: 0, borderRadius: '9px',
                      background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '12px', fontWeight: 800, color: '#fff',
                    }}>{i + 1}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>{place.name}</h3>
                      <p style={{
                        color: '#94a3b8', fontSize: '13px', lineHeight: 1.6,
                        display: '-webkit-box', WebkitLineClamp: expandedPlace === i ? 'unset' : 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }}>{place.description}</p>
                    </div>
                    <div style={{
                      width: '26px', height: '26px', flexShrink: 0, borderRadius: '8px',
                      background: 'rgba(255,255,255,0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {expandedPlace === i ? <ChevronUp size={15} color="#64748b" /> : <ChevronDown size={15} color="#64748b" />}
                    </div>
                  </div>
                </button>
                {expandedPlace === i && (
                  <div style={{ padding: '0 16px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{
                      display: 'flex', gap: '9px', alignItems: 'flex-start',
                      marginTop: '12px', padding: '11px 13px',
                      background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.16)',
                      borderRadius: '11px',
                    }}>
                      <Lightbulb size={15} color="#f59e0b" style={{ flexShrink: 0, marginTop: '1px' }} />
                      <p style={{ color: '#fbbf24', fontSize: '13px', lineHeight: 1.6 }}>{place.tips}</p>
                    </div>
                    {country.visited && place.link && (
                      <a href={place.link} target="_blank" rel="noopener noreferrer" className="pressable" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                        marginTop: '10px', padding: '12px',
                        background: place.isBooking ? 'linear-gradient(135deg, #14b8a6, #0d9488)' : 'rgba(255,255,255,0.05)',
                        border: place.isBooking ? 'none' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '11px', color: '#fff', fontSize: '13px', fontWeight: 600,
                        boxShadow: place.isBooking ? '0 4px 14px rgba(20,184,166,0.25)' : 'none',
                      }}>
                        <ExternalLink size={14} />
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {country.experiences.map((exp, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '18px', padding: '16px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '9px' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '11px',
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.2))',
                    border: '1px solid rgba(139,92,246,0.22)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Sparkles size={17} color="#a78bfa" />
                  </div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f8fafc', flex: 1 }}>{exp.name}</h3>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.7 }}>{exp.description}</p>
                {country.visited && exp.link && (
                  <a href={exp.link} target="_blank" rel="noopener noreferrer" className="pressable" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    marginTop: '12px', padding: '8px 15px',
                    background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.22)',
                    borderRadius: '100px', color: '#a78bfa', fontSize: '12px', fontWeight: 600,
                  }}>
                    <ExternalLink size={12} />
                    {exp.isBooking ? 'Book Experience' : 'Learn More'}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tips */}
        {activeTab === 'tips' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {[
              { title: 'Top Tips',      icon: Lightbulb, color: '#14b8a6', bg: 'rgba(20,184,166,0.07)',  border: 'rgba(20,184,166,0.14)',  items: country.topTips,   textColor: '#e2e8f0'  },
              { title: 'Food & Drinks', icon: Utensils,  color: '#f59e0b', bg: 'rgba(245,158,11,0.07)',  border: 'rgba(245,158,11,0.14)',  items: country.foodRecs,  textColor: '#fcd34d'  },
            ].map(({ title, icon: Icon, color, bg, border, items, textColor }) => (
              <div key={title}>
                <h3 style={{
                  fontSize: '11px', fontWeight: 700, color, textTransform: 'uppercase',
                  letterSpacing: '0.08em', marginBottom: '9px',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <Icon size={13} />{title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {items.map((item, i) => (
                    <div key={i} style={{
                      padding: '13px 14px', background: bg,
                      border: `1px solid ${border}`, borderRadius: '13px',
                      display: 'flex', alignItems: 'flex-start', gap: '9px',
                    }}>
                      <Icon size={13} color={color} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <p style={{ color: textColor, fontSize: '13px', lineHeight: 1.6 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div>
              <h3 style={{ fontSize: '11px', fontWeight: 700, color: '#8b5cf6', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '9px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Home size={13} />Where to Stay
              </h3>
              <div style={{ padding: '14px', background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.14)', borderRadius: '13px' }}>
                <p style={{ color: '#c4b5fd', fontSize: '13px', lineHeight: 1.7 }}>{country.accommodationTips}</p>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '11px', fontWeight: 700, color: '#ec4899', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '9px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Luggage size={13} />What to Pack
              </h3>
              <div style={{ padding: '14px', background: 'rgba(236,72,153,0.07)', border: '1px solid rgba(236,72,153,0.14)', borderRadius: '13px' }}>
                <p style={{ color: '#f9a8d4', fontSize: '13px', lineHeight: 1.7 }}>{country.whatToPack}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating action bar */}
      <div style={{
        position: 'fixed', bottom: 'calc(var(--nav-height) + 8px)',
        left: 0, right: 0, padding: '0 16px', zIndex: 50,
      }}>
        <div style={{
          display: 'flex', gap: '8px',
          background: 'rgba(3,7,18,0.88)', backdropFilter: 'blur(16px)',
          borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)',
          padding: '10px',
        }}>
          <Link href={`/country/${country.id}/chat`} className="pressable" style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
            background: 'rgba(139,92,246,0.14)', border: '1px solid rgba(139,92,246,0.22)',
            padding: '13px', borderRadius: '13px',
            color: '#a78bfa', fontWeight: 600, fontSize: '13px',
          }}>
            <MessageCircle size={17} /><span>Chat</span>
          </Link>
          <Link href={`/country/${country.id}/match`} className="pressable" style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
            background: 'linear-gradient(135deg, #ec4899, #db2777)',
            padding: '13px', borderRadius: '13px',
            color: '#fff', fontWeight: 700, fontSize: '13px',
            boxShadow: '0 4px 16px rgba(236,72,153,0.25)',
          }}>
            <Heart size={17} /><span>Find Buddies</span>
          </Link>
        </div>
      </div>

      {/* Journey action sheet */}
      {showJourneySheet && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1100,
            background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'flex-end',
          }}
          onClick={() => setShowJourneySheet(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #1a2744 0%, #0f172a 100%)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              borderTopLeftRadius: '28px', borderTopRightRadius: '28px',
              padding: '20px 20px calc(20px + env(safe-area-inset-bottom, 0px))',
              width: '100%',
              animation: 'slide-up 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <div style={{ width: '36px', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', margin: '0 auto 20px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '36px' }}>{country.flagEmoji}</span>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 800 }}>{country.name}</h2>
                <p style={{ color: '#64748b', fontSize: '13px', marginTop: '2px' }}>Add to your personal journey</p>
              </div>
              <button onClick={() => setShowJourneySheet(false)} className="pressable" style={{
                marginLeft: 'auto', width: '34px', height: '34px', borderRadius: '11px',
                background: 'rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <X size={16} color="#94a3b8" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={() => { markVisited(country.id); setShowJourneySheet(false); }}
                className="pressable"
                style={{
                  width: '100%', padding: '16px 18px',
                  borderRadius: '16px',
                  background: userStatus === 'visited' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'rgba(34,197,94,0.1)',
                  border: `1px solid ${userStatus === 'visited' ? 'transparent' : 'rgba(34,197,94,0.25)'}`,
                  color: userStatus === 'visited' ? '#fff' : '#4ade80',
                  display: 'flex', alignItems: 'center', gap: '12px',
                  fontSize: '15px', fontWeight: 700,
                  boxShadow: userStatus === 'visited' ? '0 4px 20px rgba(34,197,94,0.3)' : 'none',
                }}
              >
                <CheckCircle2 size={20} />
                <div style={{ textAlign: 'left' }}>
                  <div>{userStatus === 'visited' ? 'I\'ve been here ✓' : 'Mark as Visited'}</div>
                  <div style={{ fontSize: '12px', fontWeight: 400, opacity: 0.75, marginTop: '1px' }}>
                    {userStatus === 'visited' ? 'Already in your visited list' : 'Add to your visited countries'}
                  </div>
                </div>
              </button>

              <button
                onClick={() => { addToWishlist(country.id); setShowJourneySheet(false); }}
                disabled={userStatus === 'visited'}
                className="pressable"
                style={{
                  width: '100%', padding: '16px 18px',
                  borderRadius: '16px',
                  background: userStatus === 'wishlist' ? 'linear-gradient(135deg, #ec4899, #db2777)' : 'rgba(236,72,153,0.1)',
                  border: `1px solid ${userStatus === 'wishlist' ? 'transparent' : 'rgba(236,72,153,0.25)'}`,
                  color: userStatus === 'wishlist' ? '#fff' : '#f472b6',
                  display: 'flex', alignItems: 'center', gap: '12px',
                  fontSize: '15px', fontWeight: 700,
                  boxShadow: userStatus === 'wishlist' ? '0 4px 20px rgba(236,72,153,0.3)' : 'none',
                  opacity: userStatus === 'visited' ? 0.4 : 1,
                }}
              >
                <Star size={20} />
                <div style={{ textAlign: 'left' }}>
                  <div>{userStatus === 'wishlist' ? 'On my wishlist ★' : 'Add to Wishlist'}</div>
                  <div style={{ fontSize: '12px', fontWeight: 400, opacity: 0.75, marginTop: '1px' }}>
                    {userStatus === 'wishlist' ? 'Already on your wishlist' : 'Save to plan for later'}
                  </div>
                </div>
              </button>

              {userStatus && (
                <button
                  onClick={() => { removeFromJourney(country.id); setShowJourneySheet(false); }}
                  className="pressable"
                  style={{
                    width: '100%', padding: '14px 18px',
                    borderRadius: '16px',
                    background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.18)',
                    color: '#f87171', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    fontSize: '14px', fontWeight: 600,
                  }}
                >
                  <X size={16} />
                  Remove from my journey
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
