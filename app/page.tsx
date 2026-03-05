'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { countries, Country } from '@/lib/countries';
import {
  X, Compass, MessageCircle, Heart, MapPin, ChevronRight,
  Sparkles, Globe2, Check, Search, Bell, TrendingUp
} from 'lucide-react';

const continents = ['Europe', 'Asia', 'Africa', 'North America', 'South America', 'Oceania'] as const;

const continentConfig = {
  'Europe':        { color: '#a78bfa', glow: 'rgba(167,139,250,0.2)', emoji: '🏰' },
  'Asia':          { color: '#f472b6', glow: 'rgba(244,114,182,0.2)', emoji: '🏯' },
  'Africa':        { color: '#fbbf24', glow: 'rgba(251,191,36,0.2)',  emoji: '🦁' },
  'North America': { color: '#34d399', glow: 'rgba(52,211,153,0.2)',  emoji: '🗽' },
  'South America': { color: '#f87171', glow: 'rgba(248,113,113,0.2)', emoji: '🌿' },
  'Oceania':       { color: '#60a5fa', glow: 'rgba(96,165,250,0.2)',  emoji: '🌊' },
};

type ContinentKey = typeof continents[number];

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCityGroup, setSelectedCityGroup] = useState<Country[] | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'visited' | 'wishlist'>('all');
  const [selectedContinent, setSelectedContinent] = useState<ContinentKey | 'all'>('all');
  const [search, setSearch] = useState('');

  const visitedCount = countries.filter(c => c.visited && !c.parentCountry).length;
  const wishlistCount = countries.filter(c => !c.visited && !c.parentCountry).length;
  const totalCount = visitedCount + wishlistCount;
  const progressPct = Math.round((visitedCount / totalCount) * 100);

  // Group multi-city countries
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

    const result: Array<Country & { isMultiCity?: boolean; cities?: Country[] }> = [];
    grouped.forEach((cities) => {
      result.push({ ...cities[0], isMultiCity: true, cities } as any);
    });
    standalone.forEach(c => result.push(c));
    return result;
  }, []);

  // Featured = visited countries with best images (first 5)
  const featured = displayCountries.filter((c: any) => c.visited).slice(0, 5);

  // Filtered list
  const filtered = useMemo(() => {
    let list = displayCountries;
    if (activeFilter === 'visited') list = list.filter((c: any) => c.visited);
    if (activeFilter === 'wishlist') list = list.filter((c: any) => !c.visited);
    if (selectedContinent !== 'all') list = list.filter((c: any) => c.continent === selectedContinent);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c: any) =>
        c.name.toLowerCase().includes(q) ||
        c.city?.toLowerCase().includes(q) ||
        c.continent.toLowerCase().includes(q)
      );
    }
    return list;
  }, [displayCountries, activeFilter, selectedContinent, search]);

  const handleCountryClick = (country: any) => {
    if (country.isMultiCity && country.cities) {
      setSelectedCityGroup(country.cities);
    } else {
      setSelectedCountry(country);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

      {/* ── Sticky Header ── */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        paddingTop: 'env(safe-area-inset-top, 0px)',
        background: 'rgba(3,7,18,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ padding: '14px 20px 12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <Globe2 size={14} color="#14b8a6" />
              <span style={{ color: '#14b8a6', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Kiwi Travel
              </span>
            </div>
            <h1 style={{
              fontSize: '22px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Footsteps
            </h1>
          </div>
          <button
            className="pressable"
            style={{
              width: '42px', height: '42px',
              borderRadius: '14px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Bell size={18} color="#94a3b8" />
            <div style={{
              position: 'absolute', top: '10px', right: '10px',
              width: '7px', height: '7px',
              background: '#ec4899', borderRadius: '50%',
              border: '1.5px solid #030712',
            }} />
          </button>
          <Link href="/profile" className="pressable">
            <div style={{
              width: '42px', height: '42px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, rgba(20,184,166,0.2) 0%, rgba(236,72,153,0.2) 100%)',
              border: '1px solid rgba(20,184,166,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                alt="Profile"
                width={42}
                height={42}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </Link>
        </div>

        {/* Search bar */}
        <div style={{ padding: '0 20px 14px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${search ? 'rgba(20,184,166,0.4)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: '14px',
            padding: '11px 16px',
            transition: 'border-color 0.2s ease',
          }}>
            <Search size={16} color={search ? '#14b8a6' : '#475569'} style={{ flexShrink: 0, transition: 'color 0.2s ease' }} />
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                color: '#f8fafc',
                fontSize: '15px',
                outline: 'none',
              }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="pressable">
                <X size={16} color="#64748b" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Progress Banner ── */}
      {!search && (
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(20,184,166,0.1) 0%, rgba(139,92,246,0.1) 100%)',
            border: '1px solid rgba(20,184,166,0.2)',
            borderRadius: '20px',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            animation: 'slide-up 0.5s ease-out',
          }}>
            <div style={{
              width: '52px', height: '52px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #14b8a6 0%, #8b5cf6 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <TrendingUp size={24} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 600 }}>World Explorer</span>
                <span style={{ color: '#14b8a6', fontSize: '14px', fontWeight: 700 }}>{progressPct}%</span>
              </div>
              <div style={{
                height: '6px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '3px',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${progressPct}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #14b8a6, #8b5cf6)',
                  borderRadius: '3px',
                  transition: 'width 1s ease',
                }} />
              </div>
              <p style={{ color: '#64748b', fontSize: '12px', marginTop: '6px' }}>
                {visitedCount} visited · {wishlistCount} on your wishlist
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Featured (horizontal scroll of visited) ── */}
      {!search && activeFilter !== 'wishlist' && featured.length > 0 && (
        <div style={{ marginTop: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', marginBottom: '14px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc' }}>My Footsteps</h2>
            <span style={{ color: '#14b8a6', fontSize: '13px', fontWeight: 600 }}>{visitedCount} places</span>
          </div>
          <div
            className="hide-scrollbar"
            style={{
              display: 'flex',
              gap: '12px',
              padding: '0 20px 4px',
              overflowX: 'auto',
            }}
          >
            {featured.map((country: any, i) => (
              <button
                key={country.id}
                onClick={() => handleCountryClick(country)}
                className="pressable"
                style={{
                  position: 'relative',
                  width: '140px',
                  height: '190px',
                  flexShrink: 0,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1.5px solid rgba(20,184,166,0.25)',
                  animation: 'slide-up 0.4s ease-out forwards',
                  animationDelay: `${i * 0.06}s`,
                  opacity: 0,
                }}
              >
                <Image
                  src={country.coverImage}
                  alt={country.name}
                  fill
                  sizes="140px"
                  style={{ objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.75) 100%)',
                }} />
                <div style={{
                  position: 'absolute',
                  top: '10px', right: '10px',
                  background: 'rgba(20,184,166,0.9)',
                  borderRadius: '8px',
                  padding: '3px 7px',
                  display: 'flex', alignItems: 'center', gap: '3px',
                }}>
                  <Check size={10} color="#fff" />
                  <span style={{ color: '#fff', fontSize: '9px', fontWeight: 700 }}>VISITED</span>
                </div>
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                  <span style={{ fontSize: '24px' }}>{country.flagEmoji}</span>
                  <p style={{ color: '#fff', fontSize: '14px', fontWeight: 700, marginTop: '4px', lineHeight: 1.2 }}>{country.name}</p>
                  <p style={{ color: '#94a3b8', fontSize: '11px', marginTop: '2px' }}>{country.city}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Filters ── */}
      <div style={{ padding: '24px 20px 0' }}>
        {/* Status filter */}
        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '14px',
          padding: '4px',
          marginBottom: '14px',
          gap: '4px',
        }}>
          {[
            { key: 'all', label: 'All' },
            { key: 'visited', label: '✓ Visited' },
            { key: 'wishlist', label: '✦ Wishlist' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key as any)}
              className="pressable"
              style={{
                flex: 1,
                padding: '9px 8px',
                borderRadius: '10px',
                background: activeFilter === key
                  ? key === 'visited'
                    ? 'linear-gradient(135deg, rgba(20,184,166,0.3) 0%, rgba(20,184,166,0.15) 100%)'
                    : key === 'wishlist'
                    ? 'linear-gradient(135deg, rgba(236,72,153,0.3) 0%, rgba(236,72,153,0.15) 100%)'
                    : 'rgba(255,255,255,0.1)'
                  : 'transparent',
                color: activeFilter === key
                  ? key === 'visited' ? '#2dd4bf' : key === 'wishlist' ? '#f472b6' : '#f8fafc'
                  : '#64748b',
                fontSize: '13px',
                fontWeight: 600,
                transition: 'all 0.2s ease',
                border: 'none',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Continent pills */}
        <div
          className="hide-scrollbar"
          style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}
        >
          <button
            onClick={() => setSelectedContinent('all')}
            className="pressable"
            style={{
              padding: '8px 16px',
              borderRadius: '100px',
              border: `1px solid ${selectedContinent === 'all' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)'}`,
              background: selectedContinent === 'all' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
              color: selectedContinent === 'all' ? '#fff' : '#64748b',
              fontSize: '12px', fontWeight: 600,
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
          >
            🌍 All
          </button>
          {continents.map((cont) => {
            const cfg = continentConfig[cont];
            const isSelected = selectedContinent === cont;
            return (
              <button
                key={cont}
                onClick={() => setSelectedContinent(cont)}
                className="pressable"
                style={{
                  padding: '8px 16px',
                  borderRadius: '100px',
                  border: `1px solid ${isSelected ? cfg.color + '66' : 'rgba(255,255,255,0.07)'}`,
                  background: isSelected ? cfg.glow : 'rgba(255,255,255,0.03)',
                  color: isSelected ? cfg.color : '#64748b',
                  fontSize: '12px', fontWeight: 600,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  display: 'flex', alignItems: 'center', gap: '5px',
                }}
              >
                <span>{cfg.emoji}</span>
                <span>{cont.replace(' America', '')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Country Grid ── */}
      <div style={{ padding: '20px 20px 0' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', animation: 'fade-in 0.3s ease-out' }}>
            <Globe2 size={48} color="#1e293b" style={{ margin: '0 auto 16px' }} />
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#475569' }}>No destinations found</p>
            <p style={{ fontSize: '14px', color: '#334155', marginTop: '6px' }}>Try a different filter or search</p>
          </div>
        ) : (
          continents.map((cont) => {
            const group = filtered.filter((c: any) => c.continent === cont);
            if (group.length === 0) return null;
            const cfg = continentConfig[cont];
            const visitedInContinent = group.filter((c: any) => c.visited).length;

            return (
              <div key={cont} style={{ marginBottom: '36px' }}>
                {/* Continent header */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px',
                  background: cfg.glow,
                  border: `1px solid ${cfg.color}33`,
                  borderRadius: '16px',
                  marginBottom: '14px',
                }}>
                  <span style={{ fontSize: '24px' }}>{cfg.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '16px', fontWeight: 700, color: cfg.color }}>{cont}</h2>
                    <p style={{ fontSize: '11px', color: '#64748b', marginTop: '1px' }}>
                      {group.length} {group.length === 1 ? 'destination' : 'destinations'}
                      {visitedInContinent > 0 && ` · ${visitedInContinent} visited`}
                    </p>
                  </div>
                </div>

                {/* Cards grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {group.map((country: any, i: number) => (
                    <button
                      key={country.id}
                      onClick={() => handleCountryClick(country)}
                      className="card-press"
                      style={{
                        position: 'relative',
                        height: '210px',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: country.visited
                          ? '1.5px solid rgba(20,184,166,0.3)'
                          : '1.5px solid rgba(255,255,255,0.06)',
                        textAlign: 'left',
                        animation: 'slide-up 0.45s ease-out forwards',
                        animationDelay: `${i * 0.05}s`,
                        opacity: 0,
                      }}
                    >
                      <Image
                        src={country.coverImage}
                        alt={country.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 200px"
                        style={{
                          objectFit: 'cover',
                          filter: country.visited ? 'none' : 'brightness(0.75)',
                        }}
                      />
                      {/* Overlay */}
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: country.visited
                          ? 'linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.82) 100%)'
                          : 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.88) 100%)',
                      }} />

                      {/* Badge */}
                      <div style={{
                        position: 'absolute', top: '10px', right: '10px',
                        background: country.visited ? 'rgba(20,184,166,0.92)' : 'rgba(0,0,0,0.55)',
                        backdropFilter: 'blur(4px)',
                        border: country.visited ? 'none' : '1px solid rgba(255,255,255,0.15)',
                        padding: '4px 8px',
                        borderRadius: '8px',
                        display: 'flex', alignItems: 'center', gap: '3px',
                      }}>
                        {country.visited
                          ? <Check size={10} color="#fff" />
                          : <Sparkles size={10} color="#f472b6" />
                        }
                        <span style={{
                          color: country.visited ? '#fff' : '#f472b6',
                          fontSize: '9px', fontWeight: 700,
                        }}>
                          {country.visited ? 'VISITED' : 'WISH'}
                        </span>
                      </div>

                      {/* Info */}
                      <div style={{ position: 'absolute', bottom: '14px', left: '14px', right: '14px' }}>
                        <span style={{ fontSize: '26px', lineHeight: 1 }}>{country.flagEmoji}</span>
                        <h3 style={{
                          fontSize: '15px', fontWeight: 700, color: '#fff',
                          marginTop: '6px', lineHeight: 1.2,
                        }}>
                          {country.name}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                          <MapPin size={10} color={country.visited ? '#94a3b8' : '#f472b6'} />
                          <span style={{ fontSize: '11px', color: country.visited ? '#94a3b8' : '#f472b6' }}>
                            {country.isMultiCity ? `${country.cities.length} cities` : country.city}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── City Selection Sheet ── */}
      {selectedCityGroup && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 1001,
            display: 'flex', alignItems: 'flex-end',
          }}
          onClick={() => setSelectedCityGroup(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #1a2744 0%, #0f172a 100%)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              borderTopLeftRadius: '28px',
              borderTopRightRadius: '28px',
              padding: '20px 20px calc(20px + env(safe-area-inset-bottom, 0px))',
              width: '100%',
              maxHeight: '82vh',
              overflow: 'auto',
              animation: 'slide-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Handle */}
            <div style={{ width: '36px', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', margin: '0 auto 20px' }} />

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '14px' }}>
              <span style={{ fontSize: '44px' }}>{selectedCityGroup[0].flagEmoji}</span>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '22px', fontWeight: 800 }}>{selectedCityGroup[0].name}</h2>
                <p style={{ color: '#64748b', fontSize: '13px', marginTop: '2px' }}>
                  {selectedCityGroup.length} cities to explore
                </p>
              </div>
              <button
                onClick={() => setSelectedCityGroup(null)}
                className="pressable"
                style={{
                  width: '36px', height: '36px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <X size={18} color="#94a3b8" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedCityGroup.map(city => (
                <Link
                  key={city.id}
                  href={`/country/${city.id}`}
                  className="pressable"
                  style={{
                    position: 'relative',
                    height: '120px',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    border: '1.5px solid rgba(20,184,166,0.25)',
                    display: 'block',
                  }}
                >
                  <Image src={city.coverImage} alt={city.city} fill sizes="100vw" style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.78) 100%)' }} />
                  <div style={{
                    position: 'absolute', bottom: '14px', left: '16px', right: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>{city.city}</h3>
                      <p style={{ color: '#94a3b8', fontSize: '12px', marginTop: '2px' }}>
                        {city.places.length} places · {city.experiences.length} experiences
                      </p>
                    </div>
                    <ChevronRight size={20} color="#14b8a6" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Country Quick-View Sheet ── */}
      {selectedCountry && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 1001,
            display: 'flex', alignItems: 'flex-end',
          }}
          onClick={() => setSelectedCountry(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #1a2744 0%, #0f172a 100%)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              borderTopLeftRadius: '28px',
              borderTopRightRadius: '28px',
              width: '100%',
              maxHeight: '85vh',
              overflow: 'auto',
              animation: 'slide-up 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Hero Image */}
            <div style={{ position: 'relative', height: '200px' }}>
              <Image
                src={selectedCountry.coverImage}
                alt={selectedCountry.name}
                fill
                sizes="100vw"
                style={{ objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(26,39,68,0.95) 100%)' }} />
              <button
                onClick={() => setSelectedCountry(null)}
                className="pressable"
                style={{
                  position: 'absolute', top: '14px', right: '14px',
                  width: '36px', height: '36px',
                  borderRadius: '12px',
                  background: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <X size={18} color="#fff" />
              </button>
            </div>

            <div style={{ padding: '20px 20px calc(20px + env(safe-area-inset-bottom, 0px))' }}>
              {/* Country info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <span style={{ fontSize: '44px' }}>{selectedCountry.flagEmoji}</span>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 800 }}>{selectedCountry.name}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                    <MapPin size={12} color="#64748b" />
                    <span style={{ color: '#64748b', fontSize: '13px' }}>{selectedCountry.city}</span>
                    <span style={{ color: '#1e293b', fontSize: '13px' }}>·</span>
                    <span style={{
                      color: continentConfig[selectedCountry.continent as ContinentKey]?.color ?? '#94a3b8',
                      fontSize: '12px', fontWeight: 600
                    }}>
                      {selectedCountry.continent}
                    </span>
                  </div>
                </div>
                <div style={{
                  background: selectedCountry.visited ? 'rgba(20,184,166,0.15)' : 'rgba(236,72,153,0.15)',
                  border: `1px solid ${selectedCountry.visited ? 'rgba(20,184,166,0.3)' : 'rgba(236,72,153,0.3)'}`,
                  borderRadius: '10px',
                  padding: '6px 10px',
                  display: 'flex', alignItems: 'center', gap: '4px',
                }}>
                  {selectedCountry.visited
                    ? <Check size={14} color="#14b8a6" />
                    : <Sparkles size={14} color="#ec4899" />
                  }
                  <span style={{
                    fontSize: '11px', fontWeight: 700,
                    color: selectedCountry.visited ? '#14b8a6' : '#ec4899',
                  }}>
                    {selectedCountry.visited ? 'VISITED' : 'WISHLIST'}
                  </span>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {[
                  { label: 'Places', value: selectedCountry.places.length, color: '#14b8a6' },
                  { label: 'Experiences', value: selectedCountry.experiences.length, color: '#8b5cf6' },
                  { label: 'Tips', value: selectedCountry.topTips.length, color: '#f59e0b' },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{
                    flex: 1, textAlign: 'center',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '12px',
                    padding: '12px 8px',
                  }}>
                    <div style={{ fontSize: '22px', fontWeight: 800, color }}>{value}</div>
                    <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <Link
                href={`/country/${selectedCountry.id}`}
                className="pressable"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                  padding: '18px 20px',
                  borderRadius: '16px',
                  color: '#fff', fontWeight: 700, fontSize: '15px',
                  marginBottom: '10px',
                  boxShadow: '0 8px 24px rgba(20,184,166,0.25)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Compass size={20} />
                  <span>Explore Destination</span>
                </div>
                <ChevronRight size={20} />
              </Link>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  href={`/country/${selectedCountry.id}/chat`}
                  className="pressable"
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '8px',
                    background: 'rgba(139,92,246,0.15)',
                    border: '1px solid rgba(139,92,246,0.3)',
                    padding: '16px',
                    borderRadius: '14px',
                    color: '#a78bfa', fontWeight: 600, fontSize: '14px',
                  }}
                >
                  <MessageCircle size={18} />
                  <span>Chat</span>
                </Link>
                <Link
                  href={`/country/${selectedCountry.id}/match`}
                  className="pressable"
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '8px',
                    background: 'rgba(236,72,153,0.15)',
                    border: '1px solid rgba(236,72,153,0.3)',
                    padding: '16px',
                    borderRadius: '14px',
                    color: '#f472b6', fontWeight: 600, fontSize: '14px',
                  }}
                >
                  <Heart size={18} />
                  <span>Buddies</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
