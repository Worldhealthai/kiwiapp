'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { countries } from '@/lib/countries';
import { useUserJourney } from '@/contexts/UserJourneyContext';
import {
  Globe2, CheckCircle, Star, TrendingUp, ArrowRight,
  MapPin, ChevronRight, X
} from 'lucide-react';

const CONT_COLOR: Record<string, string> = {
  'Europe': '#a78bfa', 'Asia': '#f472b6', 'Africa': '#fbbf24',
  'North America': '#34d399', 'South America': '#f87171', 'Oceania': '#60a5fa',
};

export default function JourneyPage() {
  const { userVisited, userWishlist, removeFromJourney } = useUserJourney();
  const [tab, setTab] = useState<'visited' | 'wishlist'>('visited');

  const visitedCountries = countries.filter(c => userVisited.includes(c.id));
  const wishlistCountries = countries.filter(c => userWishlist.includes(c.id));

  const continentBreakdown = visitedCountries.reduce((acc, c) => {
    acc[c.continent] = (acc[c.continent] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalCountries = countries.filter(c => !c.parentCountry).length;
  const total = visitedCountries.length + wishlistCountries.length;

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)', paddingTop: 'env(safe-area-inset-top, 0px)' }}>

      {/* Header */}
      <div style={{ padding: '20px 20px 0' }}>
        <p style={{ color: '#14b8a6', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
          My Travel Story
        </p>
        <h1 style={{ fontSize: '30px', fontWeight: 900, color: '#f8fafc', letterSpacing: '-0.02em' }}>
          My Journey
        </h1>
      </div>

      {total === 0 ? (
        /* Empty state */
        <div style={{ padding: '60px 24px', textAlign: 'center' }}>
          <div style={{
            width: '88px', height: '88px', margin: '0 auto 24px',
            borderRadius: '28px',
            background: 'linear-gradient(135deg, rgba(20,184,166,0.12), rgba(139,92,246,0.08))',
            border: '1px solid rgba(20,184,166,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Globe2 size={38} color="#14b8a6" />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#f8fafc', marginBottom: '10px' }}>
            Your journey starts here
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.7, maxWidth: '280px', margin: '0 auto 28px' }}>
            Browse destinations and mark countries you&apos;ve visited or want to explore next
          </p>
          <Link href="/" className="pressable" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
            padding: '14px 28px', borderRadius: '16px',
            color: '#fff', fontSize: '15px', fontWeight: 700,
            boxShadow: '0 6px 24px rgba(20,184,166,0.35)',
          }}>
            Browse Destinations
            <ArrowRight size={17} />
          </Link>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: '20px 20px 0' }}>
            {[
              { value: visitedCountries.length, label: 'Visited', color: '#22c55e', Icon: CheckCircle },
              { value: wishlistCountries.length, label: 'Wishlist', color: '#ec4899', Icon: Star },
              { value: Object.keys(continentBreakdown).length, label: 'Continents', color: '#8b5cf6', Icon: Globe2 },
            ].map(({ value, label, color, Icon }) => (
              <div key={label} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px', padding: '16px 10px', textAlign: 'center',
              }}>
                <Icon size={16} color={color} style={{ margin: '0 auto 6px' }} />
                <div style={{ fontSize: '26px', fontWeight: 900, color, lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Progress */}
          {visitedCountries.length > 0 && (
            <div style={{ margin: '14px 20px 0', padding: '16px', background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.14)', borderRadius: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <TrendingUp size={15} color="#22c55e" />
                  <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 700 }}>World Progress</span>
                </div>
                <span style={{ color: '#22c55e', fontSize: '13px', fontWeight: 800 }}>
                  {visitedCountries.length}/{totalCountries} countries
                </span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{
                  width: `${Math.max(2, Math.round((visitedCountries.length / totalCountries) * 100))}%`,
                  height: '100%', background: 'linear-gradient(90deg,#22c55e,#14b8a6)', borderRadius: '3px',
                  transition: 'width 0.6s ease',
                }} />
              </div>
              {Object.keys(continentBreakdown).length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                  {Object.entries(continentBreakdown).map(([cont, count]) => (
                    <span key={cont} style={{
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)',
                      borderRadius: '7px', padding: '3px 9px',
                      color: CONT_COLOR[cont] || '#94a3b8', fontSize: '11px', fontWeight: 600,
                    }}>
                      {cont.replace(' America', '')}: {count}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab switch */}
          <div style={{ margin: '16px 20px 0' }}>
            <div style={{
              display: 'flex', background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '14px', padding: '3px', gap: '3px',
            }}>
              {(['visited', 'wishlist'] as const).map(t => (
                <button key={t} onClick={() => setTab(t)} className="pressable" style={{
                  flex: 1, padding: '10px',
                  borderRadius: '11px',
                  background: tab === t
                    ? t === 'visited' ? 'rgba(34,197,94,0.15)' : 'rgba(236,72,153,0.15)'
                    : 'transparent',
                  color: tab === t
                    ? t === 'visited' ? '#4ade80' : '#f472b6'
                    : '#64748b',
                  fontSize: '13px', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  transition: 'all 0.2s',
                }}>
                  {t === 'visited' ? <CheckCircle size={14} /> : <Star size={14} />}
                  {t === 'visited'
                    ? `Visited (${visitedCountries.length})`
                    : `Wishlist (${wishlistCountries.length})`
                  }
                </button>
              ))}
            </div>
          </div>

          {/* Country list */}
          <div style={{ padding: '12px 20px 24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {(tab === 'visited' ? visitedCountries : wishlistCountries).map(country => (
              <div key={country.id} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px', padding: '12px 14px',
                animation: 'slide-up 0.3s ease-out forwards',
              }}>
                <div style={{ position: 'relative', width: '52px', height: '52px', borderRadius: '13px', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.07)' }}>
                  <Image src={country.coverImage} alt={country.name} fill sizes="52px" style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '16px' }}>{country.flagEmoji}</span>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#f8fafc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{country.name}</h3>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px' }}>
                    <MapPin size={10} color="#64748b" />
                    <span style={{ color: '#64748b', fontSize: '11px' }}>{country.city} · {country.continent}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  <Link href={`/country/${country.id}`} className="pressable" style={{
                    width: '34px', height: '34px', borderRadius: '11px',
                    background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <ChevronRight size={16} color="#14b8a6" />
                  </Link>
                  <button
                    onClick={() => removeFromJourney(country.id)}
                    className="pressable"
                    style={{
                      width: '34px', height: '34px', borderRadius: '11px',
                      background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <X size={14} color="#f87171" />
                  </button>
                </div>
              </div>
            ))}
            {(tab === 'visited' ? visitedCountries : wishlistCountries).length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <p style={{ color: '#475569', fontSize: '14px', fontWeight: 600 }}>
                  {tab === 'visited' ? 'No visited countries yet' : 'No wishlist countries yet'}
                </p>
                <Link href="/" style={{ color: '#14b8a6', fontSize: '13px', marginTop: '8px', display: 'block' }}>
                  Browse destinations →
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
