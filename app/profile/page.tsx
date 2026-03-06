'use client';

import { useState } from 'react';
import Link from 'next/link';
import { countries } from '@/lib/countries';
import { CURATOR } from '@/lib/curator';
import { useUserJourney, UserProfile } from '@/contexts/UserJourneyContext';
import {
  Globe2, Settings, Edit2, LogOut,
  CheckCircle, Sparkles, Heart, ChevronRight, TrendingUp,
  BookOpen, Star, ArrowRight, X, Check,
} from 'lucide-react';

const TRAVEL_STYLES = [
  'Adventure', 'Culture', 'Food', 'Photography', 'Nature', 'Beach',
  'Hiking', 'History', 'Backpacker', 'Luxury', 'Road Trip', 'Solo',
  'Nightlife', 'Wellness', 'Wildlife', 'Architecture',
];

function InitialsAvatar({ name, size = 96 }: { name: string; size?: number }) {
  const initials = name.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const radius = Math.round(size * 0.29);
  return (
    <div style={{
      width: size, height: size, borderRadius: `${radius}px`,
      background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: '3px solid var(--bg-primary)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      flexShrink: 0,
    }}>
      <span style={{ color: '#fff', fontWeight: 800, fontSize: size * 0.34 }}>{initials || '?'}</span>
    </div>
  );
}

function EditProfileModal({ profile, onSave, onClose }: {
  profile: UserProfile;
  onSave: (p: UserProfile) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(profile.name);
  const [handle, setHandle] = useState(profile.handle);
  const [bio, setBio] = useState(profile.bio);
  const [styles, setStyles] = useState<string[]>(profile.travelStyle);

  const toggleStyle = (s: string) =>
    setStyles(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const canSave = name.trim().length >= 2;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }} onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '480px',
          background: '#0f172a',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px 24px 0 0',
          padding: '20px 20px 40px',
          maxHeight: '90dvh', overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ color: '#f8fafc', fontSize: '18px', fontWeight: 800 }}>Edit Profile</h2>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <X size={18} color="#94a3b8" />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>Name *</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              style={{
                width: '100%', padding: '12px 14px', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', color: '#f8fafc', fontSize: '15px', outline: 'none',
              }}
            />
          </div>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>Username</label>
            <input
              value={handle}
              onChange={e => setHandle(e.target.value)}
              style={{
                width: '100%', padding: '12px 14px', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', color: '#14b8a6', fontSize: '15px', outline: 'none',
              }}
            />
          </div>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '6px' }}>Bio</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={3}
              style={{
                width: '100%', padding: '12px 14px', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', color: '#f8fafc', fontSize: '14px', outline: 'none',
                resize: 'none', fontFamily: 'inherit', lineHeight: 1.6,
              }}
            />
          </div>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '9px' }}>Travel Style</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {TRAVEL_STYLES.map(style => {
                const active = styles.includes(style);
                return (
                  <button key={style} onClick={() => toggleStyle(style)} style={{
                    padding: '6px 12px', borderRadius: '100px',
                    background: active ? 'rgba(20,184,166,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${active ? 'rgba(20,184,166,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    color: active ? '#14b8a6' : '#64748b',
                    fontSize: '12px', fontWeight: active ? 600 : 400, cursor: 'pointer',
                  }}>
                    {style}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (!canSave) return;
            onSave({ ...profile, name: name.trim(), handle, bio: bio.trim(), travelStyle: styles });
            onClose();
          }}
          disabled={!canSave}
          style={{
            width: '100%', marginTop: '20px', padding: '14px', borderRadius: '14px', border: 'none',
            background: canSave ? 'linear-gradient(135deg, #14b8a6, #0d9488)' : 'rgba(255,255,255,0.07)',
            color: canSave ? '#fff' : '#475569', fontSize: '15px', fontWeight: 700,
            cursor: canSave ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
          }}
        >
          <Check size={16} /> Save Changes
        </button>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { userVisited, userWishlist, profile, saveProfile, clearAll } = useUserJourney();
  const [activeTab, setActiveTab] = useState<'visited' | 'wishlist'>('visited');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  if (!profile) return null;

  const myVisitedCountries = countries.filter(c => userVisited.includes(c.id));
  const myWishlistCountries = countries.filter(c => userWishlist.includes(c.id));

  const continentBreakdown = myVisitedCountries.reduce((acc, c) => {
    acc[c.continent] = (acc[c.continent] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalAdded = myVisitedCountries.length + myWishlistCountries.length;
  const curatorVisited = countries.filter(c => c.visited && !c.parentCountry).length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingBottom: '90px' }}>

      {showEditModal && (
        <EditProfileModal
          profile={profile}
          onSave={saveProfile}
          onClose={() => setShowEditModal(false)}
        />
      )}

      {showSignOutConfirm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
        }} onClick={() => setShowSignOutConfirm(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px', padding: '24px', maxWidth: '320px', width: '100%', textAlign: 'center',
          }}>
            <LogOut size={32} color="#ef4444" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ color: '#f8fafc', fontSize: '17px', fontWeight: 700, marginBottom: '8px' }}>Sign Out?</h3>
            <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.6, marginBottom: '20px' }}>
              This will clear your profile and journey data from this device.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowSignOutConfirm(false)} style={{
                flex: 1, padding: '12px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#94a3b8', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              }}>Cancel</button>
              <button onClick={clearAll} style={{
                flex: 1, padding: '12px', borderRadius: '12px',
                background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)',
                color: '#ef4444', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              }}>Sign Out</button>
            </div>
          </div>
        </div>
      )}

      {/* Cover gradient */}
      <div style={{ position: 'relative', height: '190px' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, #0d9488 0%, #7c3aed 50%, #db2777 100%)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(3,7,18,0.1) 0%, rgba(3,7,18,0.6) 100%)' }} />
        <button className="pressable" style={{
          position: 'absolute', top: 'calc(16px + env(safe-area-inset-top, 0px))', right: '16px',
          width: '40px', height: '40px', borderRadius: '14px',
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Settings size={18} color="#fff" />
        </button>
      </div>

      {/* Avatar overlapping cover */}
      <div style={{ position: 'relative', marginTop: '-48px', padding: '0 20px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <InitialsAvatar name={profile.name} size={96} />
          <button onClick={() => setShowEditModal(true)} className="pressable" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '12px', padding: '9px 16px', marginBottom: '4px',
            color: '#e2e8f0', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
          }}>
            <Edit2 size={14} />Edit Profile
          </button>
        </div>
      </div>

      {/* User info */}
      <div style={{ padding: '14px 20px 0' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#f8fafc' }}>{profile.name}</h1>
        <p style={{ color: '#14b8a6', fontSize: '13px', fontWeight: 600, marginTop: '2px' }}>{profile.handle}</p>
        {profile.bio ? (
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, marginTop: '8px', maxWidth: '320px' }}>{profile.bio}</p>
        ) : (
          <p style={{ color: '#334155', fontSize: '14px', lineHeight: 1.6, marginTop: '8px', fontStyle: 'italic' }}>
            No bio yet — tap Edit Profile to add one
          </p>
        )}
        {profile.travelStyle.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
            {profile.travelStyle.map((style, i) => (
              <span key={i} style={{
                background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)',
                padding: '4px 11px', borderRadius: '100px', color: '#14b8a6', fontSize: '12px', fontWeight: 600,
              }}>{style}</span>
            ))}
          </div>
        )}
      </div>

      {/* ── MY JOURNEY STATS ── */}
      <div style={{ margin: '20px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#f8fafc' }}>My Journey</h2>
          {totalAdded === 0 && (
            <span style={{
              background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)',
              borderRadius: '100px', padding: '2px 8px',
              color: '#14b8a6', fontSize: '10px', fontWeight: 700,
            }}>NEW</span>
          )}
        </div>

        {totalAdded === 0 ? (
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px', padding: '28px 20px', textAlign: 'center',
          }}>
            <Globe2 size={40} color="#1e293b" style={{ margin: '0 auto 14px' }} />
            <p style={{ color: '#475569', fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>Your journey is empty</p>
            <p style={{ color: '#334155', fontSize: '13px', lineHeight: 1.5, maxWidth: '240px', margin: '0 auto 16px' }}>
              Tap any destination on the Explore tab and mark it as visited or add to your wishlist
            </p>
            <Link href="/" className="pressable" style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
              padding: '11px 20px', borderRadius: '13px',
              color: '#fff', fontSize: '14px', fontWeight: 700,
              boxShadow: '0 4px 16px rgba(20,184,166,0.3)',
            }}>
              Start Exploring
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '14px' }}>
              {[
                { value: myVisitedCountries.length,                         label: 'Visited',    color: '#22c55e', Icon: CheckCircle },
                { value: myWishlistCountries.length,                        label: 'Wishlist',   color: '#ec4899', Icon: Star       },
                { value: Object.keys(continentBreakdown).length,            label: 'Continents', color: '#8b5cf6', Icon: Globe2     },
              ].map(({ value, label, color, Icon }) => (
                <div key={label} style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '15px', padding: '14px 10px', textAlign: 'center',
                }}>
                  <Icon size={16} color={color} style={{ margin: '0 auto 5px' }} />
                  <div style={{ fontSize: '24px', fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                </div>
              ))}
            </div>

            {myVisitedCountries.length > 0 && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(20,184,166,0.08))',
                border: '1px solid rgba(34,197,94,0.15)',
                borderRadius: '16px', padding: '14px', marginBottom: '16px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <TrendingUp size={15} color="#22c55e" />
                    <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 700 }}>World Progress</span>
                  </div>
                  <span style={{ color: '#22c55e', fontSize: '13px', fontWeight: 800 }}>
                    {myVisitedCountries.length}/{countries.filter(c => !c.parentCountry).length}
                  </span>
                </div>
                <div style={{ height: '7px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '10px' }}>
                  <div style={{
                    width: `${Math.round((myVisitedCountries.length / countries.filter(c => !c.parentCountry).length) * 100)}%`,
                    height: '100%', background: 'linear-gradient(90deg, #22c55e, #14b8a6)', borderRadius: '4px',
                  }} />
                </div>
                {Object.keys(continentBreakdown).length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {Object.entries(continentBreakdown).map(([cont, count]) => (
                      <span key={cont} style={{
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '7px', padding: '3px 8px',
                        color: '#94a3b8', fontSize: '10px', fontWeight: 600,
                      }}>
                        {cont.replace(' America', '')}: {count}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div style={{
              display: 'flex',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '13px', padding: '3px', marginBottom: '14px', gap: '3px',
            }}>
              {(['visited', 'wishlist'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className="pressable" style={{
                  flex: 1, padding: '9px', borderRadius: '10px',
                  background: activeTab === tab
                    ? tab === 'visited' ? 'rgba(34,197,94,0.18)' : 'rgba(236,72,153,0.18)'
                    : 'transparent',
                  color: activeTab === tab
                    ? tab === 'visited' ? '#4ade80' : '#f472b6'
                    : '#64748b',
                  fontSize: '12px', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                  transition: 'all 0.2s ease',
                }}>
                  {tab === 'visited' ? <CheckCircle size={13} /> : <Star size={13} />}
                  {tab === 'visited'
                    ? `Been There (${myVisitedCountries.length})`
                    : `Wishlist (${myWishlistCountries.length})`}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {(activeTab === 'visited' ? myVisitedCountries : myWishlistCountries).map(country => (
                <Link key={country.id} href={`/country/${country.id}`} className="pressable" style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  background: activeTab === 'visited' ? 'rgba(34,197,94,0.08)' : 'rgba(236,72,153,0.08)',
                  border: `1px solid ${activeTab === 'visited' ? 'rgba(34,197,94,0.2)' : 'rgba(236,72,153,0.2)'}`,
                  padding: '7px 13px', borderRadius: '100px',
                }}>
                  <span style={{ fontSize: '16px' }}>{country.flagEmoji}</span>
                  <span style={{
                    color: activeTab === 'visited' ? '#4ade80' : '#f472b6',
                    fontSize: '13px', fontWeight: 600,
                  }}>{country.name}</span>
                </Link>
              ))}
              {(activeTab === 'visited' ? myVisitedCountries : myWishlistCountries).length === 0 && (
                <p style={{ color: '#334155', fontSize: '13px', padding: '8px 4px' }}>
                  {activeTab === 'visited' ? 'No visited countries yet' : 'No wishlist countries yet'}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {/* ── CURATOR GUIDE SECTION ── */}
      <div style={{ margin: '28px 20px 0' }}>
        <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#f8fafc', marginBottom: '12px' }}>
          Kiwifootsteps Guide
        </h2>
        <div style={{
          background: 'linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(139,92,246,0.08) 100%)',
          border: '1px solid rgba(20,184,166,0.18)',
          borderRadius: '20px', padding: '18px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
            <div style={{ position: 'relative' }}>
              <InitialsAvatar name={CURATOR.name} size={60} />
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
              <p style={{ color: '#f8fafc', fontSize: '16px', fontWeight: 800 }}>{CURATOR.name}</p>
              <p style={{ color: '#14b8a6', fontSize: '12px', fontWeight: 600, marginTop: '1px' }}>{CURATOR.handle}</p>
              <p style={{ color: '#64748b', fontSize: '12px', marginTop: '3px', lineHeight: 1.4 }}>
                {curatorVisited} countries explored · first-hand guides
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {[
              { label: 'Guides',      value: curatorVisited,                                                                              color: '#14b8a6' },
              { label: 'Experiences', value: countries.filter(c => c.visited).reduce((s, c) => s + c.experiences.length, 0),             color: '#8b5cf6' },
              { label: 'Tips',        value: countries.filter(c => c.visited).reduce((s, c) => s + c.topTips.length, 0),                 color: '#f59e0b' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{
                flex: 1, textAlign: 'center',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '11px', padding: '9px 6px',
              }}>
                <div style={{ fontSize: '18px', fontWeight: 800, color }}>{value}</div>
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '16px' }}>
            {CURATOR.travelStyle.map((style, i) => (
              <span key={i} style={{
                background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)',
                padding: '4px 10px', borderRadius: '100px', color: '#14b8a6', fontSize: '11px', fontWeight: 600,
              }}>{style}</span>
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
      <div style={{ margin: '24px 20px 0' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#f8fafc', marginBottom: '10px' }}>Account</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          {[
            { Icon: Edit2,    label: 'Edit Profile', color: '#14b8a6', bg: 'rgba(20,184,166,0.1)',  border: 'rgba(20,184,166,0.2)',  onClick: () => setShowEditModal(true) },
            { Icon: Settings, label: 'Preferences',  color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.2)', onClick: () => {} },
            { Icon: LogOut,   label: 'Sign Out',     color: '#ef4444', bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.2)',   onClick: () => setShowSignOutConfirm(true) },
          ].map(({ Icon, label, color, bg, border, onClick }) => (
            <button key={label} onClick={onClick} className="pressable" style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '13px',
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
              padding: '14px 16px', borderRadius: '15px', cursor: 'pointer',
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '11px',
                background: bg, border: `1px solid ${border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={17} color={color} />
              </div>
              <span style={{ color: label === 'Sign Out' ? '#ef4444' : '#e2e8f0', flex: 1, textAlign: 'left', fontSize: '14px', fontWeight: 600 }}>
                {label}
              </span>
              {label !== 'Sign Out' && <ChevronRight size={17} color="#334155" />}
            </button>
          ))}
        </div>
        <p style={{ color: '#334155', fontSize: '12px', textAlign: 'center', marginTop: '20px' }}>
          Member since {profile.memberSince} · Kiwi Travel v1.0
        </p>
      </div>
    </div>
  );
}
