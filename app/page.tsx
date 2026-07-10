'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { countries, Country } from '@/lib/countries';
import { CURATOR } from '@/lib/curator';
import { useUserJourney } from '@/contexts/UserJourneyContext';
import {
  X, MapPin, ChevronRight, Globe2, Check,
  Search, BookOpen, CheckCircle2, Star, Heart, MessageCircle, Compass
} from 'lucide-react';

const CONTINENTS = ['All', 'Europe', 'Asia', 'Africa', 'North America', 'South America', 'Oceania'] as const;

const CONT_EMOJI: Record<string, string> = {
  'All': '🌍', 'Europe': '🏰', 'Asia': '🏯', 'Africa': '🦁',
  'North America': '🗽', 'South America': '🌿', 'Oceania': '🌊',
};

export default function HomePage() {
  const { getUserStatus, markVisited, addToWishlist, removeFromJourney } = useUserJourney();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCityGroup, setSelectedCityGroup] = useState<Country[] | null>(null);
  const [continent, setContinent] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const displayCountries = useMemo(() => {
    const grouped = new Map<string, Country[]>();
    const standalone: Country[] = [];
    countries.forEach(c => {
      if (c.parentCountry) {
        if (!grouped.has(c.parentCountry)) grouped.set(c.parentCountry, []);
        grouped.get(c.parentCountry)!.push(c);
      } else {
        standalone.push(c);
      }
    });
    const result: any[] = [];
    grouped.forEach(cities => result.push({ ...cities[0], isMultiCity: true, cities }));
    standalone.forEach(c => result.push(c));
    return result;
  }, []);

  const featured = displayCountries.filter((c: any) => c.visited).slice(0, 6);

  const filtered = useMemo(() => {
    let list = displayCountries;
    if (continent !== 'All') list = list.filter((c: any) => c.continent === continent);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c: any) =>
        c.name.toLowerCase().includes(q) ||
        c.city?.toLowerCase().includes(q) ||
        c.continent?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [displayCountries, continent, search]);

  const handleCardTap = (country: any) => {
    if (country.isMultiCity) setSelectedCityGroup(country.cities);
    else setSelectedCountry(country);
  };

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg-primary)' }}>

      {/* ── Header ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        paddingTop: 'env(safe-area-inset-top, 0px)',
        background: 'rgba(3,7,18,0.94)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {showSearch ? (
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', gap: '10px',
              background: 'rgba(255,255,255,0.07)', borderRadius: '14px',
              border: '1px solid rgba(20,184,166,0.35)', padding: '11px 14px',
            }}>
              <Search size={16} color="#14b8a6" style={{ flexShrink: 0 }} />
              <input
                autoFocus
                type="text"
                placeholder="Search destinations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ flex: 1, background: 'none', border: 'none', color: '#f8fafc', fontSize: '15px' }}
              />
              {search && <button onClick={() => setSearch('')}><X size={15} color="#64748b" /></button>}
            </div>
            <button
              onClick={() => { setShowSearch(false); setSearch(''); }}
              style={{ color: '#14b8a6', fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap' }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ fontSize: '20px' }}>🥝</span>
                <span style={{
                  fontSize: '20px', fontWeight: 800,
                  fontFamily: 'Space Grotesk, sans-serif',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>Kiwifootsteps</span>
              </div>
            </div>
            <button
              onClick={() => setShowSearch(true)}
              className="pressable"
              style={{
                width: '40px', height: '40px', borderRadius: '13px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Search size={18} color="#94a3b8" />
            </button>
            <Link href="/profile" className="pressable" style={{
              width: '40px', height: '40px', borderRadius: '13px',
              overflow: 'hidden', border: '1.5px solid rgba(20,184,166,0.35)',
              flexShrink: 0,
            }}>
              <Image src={CURATOR.avatar} alt="Profile" width={40} height={40} style={{ objectFit: 'cover' }} />
            </Link>
          </div>
        )}
      </div>

      {/* ── Guides strip ── */}
      {!search && (
        <div style={{ paddingTop: '22px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 20px 12px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc' }}>Guides</h2>
              <p style={{ color: '#475569', fontSize: '12px', marginTop: '2px' }}>First-hand from Kiwifootsteps</p>
            </div>
            <span style={{ color: '#14b8a6', fontSize: '12px', fontWeight: 600 }}>{featured.length} places</span>
          </div>
          <div className="hide-scrollbar" style={{ display: 'flex', gap: '10px', padding: '0 20px 4px', overflowX: 'auto' }}>
            {featured.map((c: any, i: number) => {
              const status = getUserStatus(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => handleCardTap(c)}
                  className="pressable"
                  style={{
                    position: 'relative', width: '130px', height: '175px',
                    flexShrink: 0, borderRadius: '18px', overflow: 'hidden',
                    border: status === 'visited'
                      ? '1.5px solid rgba(34,197,94,0.45)'
                      : status === 'wishlist'
                      ? '1.5px solid rgba(236,72,153,0.4)'
                      : '1.5px solid rgba(20,184,166,0.25)',
                    animation: 'slide-up 0.35s ease-out forwards', opacity: 0,
                    animationDelay: `${i * 0.05}s`,
                  }}
                >
                  <Image src={c.coverImage} alt={c.name} fill sizes="130px" style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,0.05) 20%,rgba(0,0,0,0.82) 100%)' }} />
                  {status && (
                    <div style={{
                      position: 'absolute', top: '8px', right: '8px',
                      width: '20px', height: '20px', borderRadius: '50%',
                      background: status === 'visited' ? '#22c55e' : '#ec4899',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                    }}>
                      {status === 'visited' ? <Check size={11} color="#fff" strokeWidth={3} /> : <Star size={10} color="#fff" />}
                    </div>
                  )}
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px' }}>
                    <span style={{ fontSize: '20px', lineHeight: 1 }}>{c.flagEmoji}</span>
                    <p style={{ color: '#fff', fontSize: '12px', fontWeight: 700, marginTop: '4px', lineHeight: 1.2 }}>{c.name}</p>
                    <p style={{ color: '#94a3b8', fontSize: '10px', marginTop: '2px' }}>{c.city}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Continent filter ── */}
      <div style={{ marginTop: '24px' }}>
        <div className="hide-scrollbar" style={{ display: 'flex', gap: '7px', padding: '0 20px', overflowX: 'auto', paddingBottom: '2px' }}>
          {CONTINENTS.map(cont => {
            const active = continent === cont;
            return (
              <button
                key={cont}
                onClick={() => setContinent(cont)}
                className="pressable"
                style={{
                  padding: '7px 13px', borderRadius: '100px', whiteSpace: 'nowrap',
                  background: active ? 'rgba(20,184,166,0.15)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${active ? 'rgba(20,184,166,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  color: active ? '#2dd4bf' : '#64748b',
                  fontSize: '12px', fontWeight: active ? 700 : 500,
                  transition: 'all 0.2s ease',
                  display: 'flex', alignItems: 'center', gap: '5px',
                }}
              >
                <span>{CONT_EMOJI[cont]}</span>
                <span>{cont === 'All' ? 'All' : cont.replace(' America', '')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Section label ── */}
      <div style={{ padding: '18px 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#f8fafc' }}>
          {search ? `Results for "${search}"` : continent === 'All' ? 'All Destinations' : continent}
        </h2>
        <span style={{ color: '#475569', fontSize: '12px' }}>{filtered.length} places</span>
      </div>

      {/* ── Grid ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', padding: '0 20px 24px' }}>
        {filtered.map((country: any, i: number) => {
          const cId = country.isMultiCity ? country.cities[0].id : country.id;
          const status = getUserStatus(cId);
          return (
            <button
              key={country.id}
              onClick={() => handleCardTap(country)}
              className="card-press"
              style={{
                position: 'relative', height: '200px',
                borderRadius: '18px', overflow: 'hidden', textAlign: 'left',
                border: status === 'visited'
                  ? '1.5px solid rgba(34,197,94,0.4)'
                  : status === 'wishlist'
                  ? '1.5px solid rgba(236,72,153,0.35)'
                  : country.visited
                  ? '1.5px solid rgba(20,184,166,0.2)'
                  : '1.5px solid rgba(255,255,255,0.07)',
                animation: 'slide-up 0.35s ease-out forwards', opacity: 0,
                animationDelay: `${i * 0.03}s`,
              }}
            >
              <Image
                src={country.coverImage} alt={country.name} fill
                sizes="(max-width:640px) 50vw, 200px"
                style={{ objectFit: 'cover', filter: country.visited ? 'none' : 'brightness(0.72)' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(180deg,rgba(0,0,0,0.04) 25%,rgba(0,0,0,0.84) 100%)',
              }} />

              {/* Guide badge */}
              {country.visited && (
                <div style={{
                  position: 'absolute', top: '9px', left: '9px',
                  background: 'rgba(20,184,166,0.9)', backdropFilter: 'blur(4px)',
                  borderRadius: '7px', padding: '3px 7px',
                  display: 'flex', alignItems: 'center', gap: '3px',
                }}>
                  <BookOpen size={9} color="#fff" />
                  <span style={{ color: '#fff', fontSize: '9px', fontWeight: 700 }}>GUIDE</span>
                </div>
              )}

              {/* User status dot */}
              {status && (
                <div style={{
                  position: 'absolute', top: '9px', right: '9px',
                  width: '22px', height: '22px', borderRadius: '50%',
                  background: status === 'visited' ? '#22c55e' : '#ec4899',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                }}>
                  {status === 'visited'
                    ? <Check size={11} color="#fff" strokeWidth={3} />
                    : <Star size={10} color="#fff" />
                  }
                </div>
              )}

              <div style={{ position: 'absolute', bottom: '11px', left: '12px', right: '12px' }}>
                <span style={{ fontSize: '22px', lineHeight: 1 }}>{country.flagEmoji}</span>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginTop: '4px', lineHeight: 1.2 }}>
                  {country.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '3px' }}>
                  <MapPin size={9} color="#94a3b8" />
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>
                    {country.isMultiCity ? `${country.cities.length} cities` : country.city}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: '60px 20px', textAlign: 'center' }}>
          <Globe2 size={40} color="#1e293b" style={{ margin: '0 auto 14px' }} />
          <p style={{ color: '#475569', fontSize: '15px', fontWeight: 600 }}>No destinations found</p>
          <p style={{ color: '#334155', fontSize: '13px', marginTop: '6px' }}>Try a different search or filter</p>
        </div>
      )}

      {/* ── City group sheet ── */}
      {selectedCityGroup && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)', zIndex: 1001, display: 'flex', alignItems: 'flex-end' }}
          onClick={() => setSelectedCityGroup(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg,#1a2744 0%,#0f172a 100%)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              borderTopLeftRadius: '28px', borderTopRightRadius: '28px',
              padding: '20px 20px calc(20px + env(safe-area-inset-bottom, 0px))',
              width: '100%', maxHeight: '80vh', overflow: 'auto',
              animation: 'slide-up 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <div style={{ width: '36px', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', margin: '0 auto 20px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
              <span style={{ fontSize: '40px' }}>{selectedCityGroup[0].flagEmoji}</span>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '22px', fontWeight: 800 }}>{selectedCityGroup[0].name}</h2>
                <p style={{ color: '#64748b', fontSize: '13px' }}>{selectedCityGroup.length} cities with guides</p>
              </div>
              <button onClick={() => setSelectedCityGroup(null)} className="pressable" style={{ width: '34px', height: '34px', borderRadius: '11px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={16} color="#94a3b8" />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedCityGroup.map(city => (
                <Link key={city.id} href={`/country/${city.id}`} className="pressable" style={{ position: 'relative', height: '100px', borderRadius: '16px', overflow: 'hidden', display: 'block', border: '1.5px solid rgba(20,184,166,0.2)' }}>
                  <Image src={city.coverImage} alt={city.city} fill sizes="100vw" style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 20%,rgba(0,0,0,0.8) 100%)' }} />
                  <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff' }}>{city.city}</h3>
                      <p style={{ color: '#94a3b8', fontSize: '11px', marginTop: '2px' }}>{city.places.length} places · {city.experiences.length} experiences</p>
                    </div>
                    <ChevronRight size={18} color="#14b8a6" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Country quick-view sheet ── */}
      {selectedCountry && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)', zIndex: 1001, display: 'flex', alignItems: 'flex-end' }}
          onClick={() => setSelectedCountry(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg,#1a2744 0%,#0f172a 100%)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              borderTopLeftRadius: '28px', borderTopRightRadius: '28px',
              width: '100%', maxHeight: '90vh', overflow: 'auto',
              animation: 'slide-up 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {/* Hero */}
            <div style={{ position: 'relative', height: '200px' }}>
              <Image src={selectedCountry.coverImage} alt={selectedCountry.name} fill sizes="100vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,0.1) 0%,rgba(26,39,68,0.96) 100%)' }} />
              <button onClick={() => setSelectedCountry(null)} className="pressable" style={{
                position: 'absolute', top: '14px', right: '14px',
                width: '34px', height: '34px', borderRadius: '11px',
                background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.1)',
              }}>
                <X size={17} color="#fff" />
              </button>
            </div>

            <div style={{ padding: '18px 20px calc(24px + env(safe-area-inset-bottom, 0px))' }}>
              {/* Country header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                <span style={{ fontSize: '44px' }}>{selectedCountry.flagEmoji}</span>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 800 }}>{selectedCountry.name}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                    <MapPin size={12} color="#64748b" />
                    <span style={{ color: '#64748b', fontSize: '13px' }}>{selectedCountry.city}</span>
                  </div>
                </div>
                {selectedCountry.visited && (
                  <div style={{ background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.25)', borderRadius: '10px', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <BookOpen size={12} color="#14b8a6" />
                    <span style={{ color: '#14b8a6', fontSize: '10px', fontWeight: 700 }}>GUIDE</span>
                  </div>
                )}
              </div>

              {/* Journey actions */}
              {(() => {
                const status = getUserStatus(selectedCountry.id);
                return (
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <button
                      onClick={() => markVisited(selectedCountry.id)}
                      className="pressable"
                      style={{
                        flex: 1, padding: '14px 8px', borderRadius: '14px',
                        background: status === 'visited' ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'rgba(34,197,94,0.1)',
                        border: `1px solid ${status === 'visited' ? 'transparent' : 'rgba(34,197,94,0.25)'}`,
                        color: status === 'visited' ? '#fff' : '#4ade80',
                        fontSize: '13px', fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        boxShadow: status === 'visited' ? '0 4px 16px rgba(34,197,94,0.3)' : 'none',
                      }}
                    >
                      <CheckCircle2 size={16} />
                      {status === 'visited' ? 'Been Here ✓' : 'Mark Visited'}
                    </button>
                    <button
                      onClick={() => status === 'wishlist' ? removeFromJourney(selectedCountry.id) : addToWishlist(selectedCountry.id)}
                      disabled={status === 'visited'}
                      className="pressable"
                      style={{
                        flex: 1, padding: '14px 8px', borderRadius: '14px',
                        background: status === 'wishlist' ? 'linear-gradient(135deg,#ec4899,#db2777)' : 'rgba(236,72,153,0.1)',
                        border: `1px solid ${status === 'wishlist' ? 'transparent' : 'rgba(236,72,153,0.25)'}`,
                        color: status === 'wishlist' ? '#fff' : '#f472b6',
                        fontSize: '13px', fontWeight: 700,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                        boxShadow: status === 'wishlist' ? '0 4px 16px rgba(236,72,153,0.3)' : 'none',
                        opacity: status === 'visited' ? 0.4 : 1,
                      }}
                    >
                      <Star size={16} />
                      {status === 'wishlist' ? 'Wishlisted ★' : 'Wishlist'}
                    </button>
                    {status && (
                      <button
                        onClick={() => removeFromJourney(selectedCountry.id)}
                        className="pressable"
                        style={{ width: '48px', borderRadius: '14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                );
              })()}

              {/* Stats row */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {[
                  { label: 'Places', value: selectedCountry.places.length, color: '#14b8a6' },
                  { label: 'Experiences', value: selectedCountry.experiences.length, color: '#8b5cf6' },
                  { label: 'Tips', value: selectedCountry.topTips.length, color: '#f59e0b' },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '10px 6px' }}>
                    <div style={{ fontSize: '20px', fontWeight: 800, color }}>{value}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Primary CTA */}
              <Link
                href={`/country/${selectedCountry.id}`}
                className="pressable"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'linear-gradient(135deg,#14b8a6,#0d9488)',
                  padding: '16px 18px', borderRadius: '16px', color: '#fff',
                  fontWeight: 700, fontSize: '15px', marginBottom: '8px',
                  boxShadow: '0 6px 20px rgba(20,184,166,0.3)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Compass size={18} />
                  <span>{selectedCountry.visited ? 'Read Kiwifootsteps Guide' : 'Explore Destination'}</span>
                </div>
                <ChevronRight size={18} />
              </Link>

              <div style={{ display: 'flex', gap: '8px' }}>
                <Link href={`/country/${selectedCountry.id}/chat`} className="pressable" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', padding: '13px', borderRadius: '13px', color: '#a78bfa', fontWeight: 600, fontSize: '13px' }}>
                  <MessageCircle size={16} />Chat
                </Link>
                <Link href={`/country/${selectedCountry.id}/match`} className="pressable" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', background: 'rgba(236,72,153,0.12)', border: '1px solid rgba(236,72,153,0.25)', padding: '13px', borderRadius: '13px', color: '#f472b6', fontWeight: 600, fontSize: '13px' }}>
                  <Heart size={16} />Buddies
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
