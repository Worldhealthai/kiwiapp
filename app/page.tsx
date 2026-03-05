'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { countries, Country } from '@/lib/countries';
import { CURATOR } from '@/lib/curator';
import { useUserJourney } from '@/contexts/UserJourneyContext';
import {
  X, Compass, MessageCircle, Heart, MapPin, ChevronRight,
  Sparkles, Globe2, Check, Search, Bell, TrendingUp,
  BookOpen, PlusCircle, CheckCircle2, Star
} from 'lucide-react';

const continents = ['Europe', 'Asia', 'Africa', 'North America', 'South America', 'Oceania'] as const;
const continentConfig: Record<string, { color: string; glow: string; emoji: string }> = {
  'Europe':        { color: '#a78bfa', glow: 'rgba(167,139,250,0.12)', emoji: '🏰' },
  'Asia':          { color: '#f472b6', glow: 'rgba(244,114,182,0.12)', emoji: '🏯' },
  'Africa':        { color: '#fbbf24', glow: 'rgba(251,191,36,0.12)',  emoji: '🦁' },
  'North America': { color: '#34d399', glow: 'rgba(52,211,153,0.12)',  emoji: '🗽' },
  'South America': { color: '#f87171', glow: 'rgba(248,113,113,0.12)', emoji: '🌿' },
  'Oceania':       { color: '#60a5fa', glow: 'rgba(96,165,250,0.12)',  emoji: '🌊' },
};

export default function HomePage() {
  const { getUserStatus, markVisited, addToWishlist, removeFromJourney } = useUserJourney();

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCityGroup, setSelectedCityGroup] = useState<Country[] | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'curator' | 'myjourney'>('all');
  const [selectedContinent, setSelectedContinent] = useState<string>('all');
  const [search, setSearch] = useState('');

  // Curator stats (hardcoded data)
  const curatorVisited = countries.filter(c => c.visited && !c.parentCountry).length;

  // Build display countries (group multi-city)
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

  // Featured = curator's visited places
  const featured = displayCountries.filter((c: any) => c.visited).slice(0, 5);

  const filtered = useMemo(() => {
    let list = displayCountries;
    if (activeFilter === 'curator')   list = list.filter((c: any) => c.visited);
    if (activeFilter === 'myjourney') list = list.filter((c: any) => {
      const status = getUserStatus(c.isMultiCity ? c.cities[0].id : c.id);
      return status === 'visited' || status === 'wishlist';
    });
    if (selectedContinent !== 'all')  list = list.filter((c: any) => c.continent === selectedContinent);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c: any) =>
        c.name.toLowerCase().includes(q) ||
        c.city?.toLowerCase().includes(q) ||
        c.continent?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [displayCountries, activeFilter, selectedContinent, search, getUserStatus]);

  const handleCountryClick = (country: any) => {
    if (country.isMultiCity && country.cities) {
      setSelectedCityGroup(country.cities);
    } else {
      setSelectedCountry(country);
    }
  };

  const getJourneyAction = (country: Country) => {
    const status = getUserStatus(country.id);
    if (status === 'visited') {
      return { label: 'Remove from journey', action: () => removeFromJourney(country.id), color: '#ef4444' };
    }
    return null;
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

      {/* Sticky header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        paddingTop: 'env(safe-area-inset-top, 0px)',
        background: 'rgba(3,7,18,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ padding: '14px 20px 12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1px' }}>
              <Globe2 size={13} color="#14b8a6" />
              <span style={{ color: '#14b8a6', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Kiwi Travel
              </span>
            </div>
            <h1 style={{
              fontSize: '22px', fontWeight: 800,
              background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Footsteps
            </h1>
          </div>
          <button className="pressable" style={{
            width: '42px', height: '42px', borderRadius: '14px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <Bell size={18} color="#94a3b8" />
            <div style={{
              position: 'absolute', top: '10px', right: '10px',
              width: '7px', height: '7px',
              background: '#ec4899', borderRadius: '50%',
              border: '1.5px solid #030712',
            }} />
          </button>
          <Link href="/profile" className="pressable" style={{
            width: '42px', height: '42px', borderRadius: '14px',
            overflow: 'hidden',
            border: '1.5px solid rgba(20,184,166,0.3)',
          }}>
            <Image src={CURATOR.avatar} alt="Profile" width={42} height={42} style={{ objectFit: 'cover' }} />
          </Link>
        </div>

        {/* Search */}
        <div style={{ padding: '0 20px 14px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${search ? 'rgba(20,184,166,0.4)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: '14px', padding: '11px 16px',
            transition: 'border-color 0.2s ease',
          }}>
            <Search size={16} color={search ? '#14b8a6' : '#475569'} style={{ flexShrink: 0, transition: 'color 0.2s ease' }} />
            <input
              type="text"
              placeholder="Search destinations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, background: 'none', border: 'none', color: '#f8fafc', fontSize: '15px' }}
            />
            {search && (
              <button onClick={() => setSearch('')} className="pressable">
                <X size={16} color="#64748b" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Curator intro banner — shown when "all" filter, no search */}
      {!search && activeFilter === 'all' && (
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(20,184,166,0.1) 0%, rgba(139,92,246,0.08) 100%)',
            border: '1px solid rgba(20,184,166,0.18)',
            borderRadius: '20px',
            padding: '16px',
            display: 'flex', alignItems: 'center', gap: '14px',
            animation: 'slide-up 0.4s ease-out',
          }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '16px',
                overflow: 'hidden',
                border: '2px solid rgba(20,184,166,0.4)',
              }}>
                <Image src={CURATOR.avatar} alt={CURATOR.name} width={52} height={52} style={{ objectFit: 'cover' }} />
              </div>
              <div style={{
                position: 'absolute', bottom: '-3px', right: '-3px',
                width: '18px', height: '18px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                border: '2px solid #030712',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <BookOpen size={9} color="#fff" />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#f8fafc', fontSize: '14px', fontWeight: 700 }}>
                {CURATOR.name}&apos;s Travel Guide
              </p>
              <p style={{ color: '#64748b', fontSize: '12px', marginTop: '2px', lineHeight: 1.5 }}>
                {curatorVisited} countries explored · browse guides &amp; track your own journey
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Featured curator countries */}
      {!search && activeFilter !== 'myjourney' && featured.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', marginBottom: '12px' }}>
            <div>
              <h2 style={{ fontSize: '17px', fontWeight: 700, color: '#f8fafc' }}>Alex&apos;s Footsteps</h2>
              <p style={{ color: '#64748b', fontSize: '12px', marginTop: '1px' }}>Places with first-hand guides</p>
            </div>
            <span style={{ color: '#14b8a6', fontSize: '12px', fontWeight: 600 }}>{curatorVisited} guides</span>
          </div>
          <div className="hide-scrollbar" style={{ display: 'flex', gap: '12px', padding: '0 20px 4px', overflowX: 'auto' }}>
            {featured.map((country: any, i: number) => (
              <button
                key={country.id}
                onClick={() => handleCountryClick(country)}
                className="pressable"
                style={{
                  position: 'relative', width: '140px', height: '190px',
                  flexShrink: 0, borderRadius: '20px', overflow: 'hidden',
                  border: '1.5px solid rgba(20,184,166,0.3)',
                  animation: 'slide-up 0.4s ease-out forwards',
                  animationDelay: `${i * 0.06}s`, opacity: 0,
                }}
              >
                <Image src={country.coverImage} alt={country.name} fill sizes="140px" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.78) 100%)' }} />
                {/* Curator badge */}
                <div style={{
                  position: 'absolute', top: '9px', left: '9px',
                  background: 'rgba(20,184,166,0.9)',
                  borderRadius: '7px', padding: '3px 7px',
                  display: 'flex', alignItems: 'center', gap: '3px',
                }}>
                  <BookOpen size={9} color="#fff" />
                  <span style={{ color: '#fff', fontSize: '9px', fontWeight: 700 }}>GUIDE</span>
                </div>
                {/* User status badge */}
                {getUserStatus(country.id) && (
                  <div style={{
                    position: 'absolute', top: '9px', right: '9px',
                    background: getUserStatus(country.id) === 'visited' ? 'rgba(34,197,94,0.9)' : 'rgba(236,72,153,0.9)',
                    borderRadius: '7px', padding: '3px 7px',
                    display: 'flex', alignItems: 'center', gap: '3px',
                  }}>
                    {getUserStatus(country.id) === 'visited'
                      ? <Check size={9} color="#fff" />
                      : <Star size={9} color="#fff" />
                    }
                    <span style={{ color: '#fff', fontSize: '9px', fontWeight: 700 }}>
                      {getUserStatus(country.id) === 'visited' ? 'BEEN' : 'WANT'}
                    </span>
                  </div>
                )}
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                  <span style={{ fontSize: '22px' }}>{country.flagEmoji}</span>
                  <p style={{ color: '#fff', fontSize: '13px', fontWeight: 700, marginTop: '4px', lineHeight: 1.2 }}>{country.name}</p>
                  <p style={{ color: '#94a3b8', fontSize: '10px', marginTop: '2px' }}>{country.city}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ padding: '20px 20px 0' }}>
        {/* View switch */}
        <div style={{
          display: 'flex',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '14px',
          padding: '4px', marginBottom: '12px', gap: '4px',
        }}>
          {[
            { key: 'all',        label: '🌍 Discover' },
            { key: 'curator',    label: '📸 Alex\'s Guides' },
            { key: 'myjourney',  label: '✈️ My Journey' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key as any)}
              className="pressable"
              style={{
                flex: 1, padding: '9px 4px',
                borderRadius: '10px',
                background: activeFilter === key ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: activeFilter === key ? '#f8fafc' : '#64748b',
                fontSize: '11px', fontWeight: 600,
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Continent pills */}
        <div className="hide-scrollbar" style={{ display: 'flex', gap: '7px', overflowX: 'auto', paddingBottom: '4px' }}>
          <button
            onClick={() => setSelectedContinent('all')}
            className="pressable"
            style={{
              padding: '7px 14px', borderRadius: '100px',
              border: `1px solid ${selectedContinent === 'all' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.07)'}`,
              background: selectedContinent === 'all' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.03)',
              color: selectedContinent === 'all' ? '#fff' : '#64748b',
              fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap',
            }}
          >
            🌍 All
          </button>
          {continents.map(cont => {
            const cfg = continentConfig[cont];
            const isSelected = selectedContinent === cont;
            return (
              <button
                key={cont}
                onClick={() => setSelectedContinent(cont)}
                className="pressable"
                style={{
                  padding: '7px 14px', borderRadius: '100px',
                  border: `1px solid ${isSelected ? cfg.color + '55' : 'rgba(255,255,255,0.07)'}`,
                  background: isSelected ? cfg.glow : 'rgba(255,255,255,0.03)',
                  color: isSelected ? cfg.color : '#64748b',
                  fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap',
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

      {/* My Journey empty state */}
      {activeFilter === 'myjourney' && filtered.length === 0 && (
        <div style={{ padding: '40px 20px', textAlign: 'center', animation: 'fade-in 0.3s ease-out' }}>
          <div style={{
            width: '72px', height: '72px', margin: '0 auto 20px',
            borderRadius: '24px',
            background: 'rgba(20,184,166,0.1)',
            border: '1px solid rgba(20,184,166,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Globe2 size={32} color="#14b8a6" />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>Your journey starts here</h3>
          <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, maxWidth: '260px', margin: '0 auto 20px' }}>
            Tap any destination and mark it as visited or add it to your wishlist
          </p>
          <button
            onClick={() => setActiveFilter('all')}
            className="pressable"
            style={{
              background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
              padding: '12px 24px', borderRadius: '14px',
              color: '#fff', fontSize: '14px', fontWeight: 700,
              border: 'none',
              boxShadow: '0 6px 20px rgba(20,184,166,0.3)',
            }}
          >
            Browse Destinations
          </button>
        </div>
      )}

      {/* Country grid */}
      <div style={{ padding: '16px 20px 0' }}>
        {filtered.length > 0 && continents.map(cont => {
          const group = filtered.filter((c: any) => c.continent === cont);
          if (group.length === 0) return null;
          const cfg = continentConfig[cont];
          return (
            <div key={cont} style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 14px',
                background: cfg.glow,
                border: `1px solid ${cfg.color}2a`,
                borderRadius: '14px',
                marginBottom: '12px',
              }}>
                <span style={{ fontSize: '22px' }}>{cfg.emoji}</span>
                <h2 style={{ fontSize: '15px', fontWeight: 700, color: cfg.color, flex: 1 }}>{cont}</h2>
                <span style={{ color: '#64748b', fontSize: '11px' }}>{group.length} places</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {group.map((country: any, i: number) => {
                  const cId = country.isMultiCity ? country.cities[0].id : country.id;
                  const userStatus = getUserStatus(cId);
                  return (
                    <button
                      key={country.id}
                      onClick={() => handleCountryClick(country)}
                      className="card-press"
                      style={{
                        position: 'relative', height: '210px',
                        borderRadius: '18px', overflow: 'hidden',
                        textAlign: 'left',
                        border: userStatus
                          ? userStatus === 'visited' ? '1.5px solid rgba(34,197,94,0.4)' : '1.5px solid rgba(236,72,153,0.35)'
                          : country.visited ? '1.5px solid rgba(20,184,166,0.25)' : '1.5px solid rgba(255,255,255,0.06)',
                        animation: 'slide-up 0.4s ease-out forwards',
                        animationDelay: `${i * 0.05}s`, opacity: 0,
                      }}
                    >
                      <Image
                        src={country.coverImage}
                        alt={country.name}
                        fill sizes="(max-width:640px) 50vw, 200px"
                        style={{ objectFit: 'cover', filter: country.visited ? 'none' : 'brightness(0.75)' }}
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: country.visited
                          ? 'linear-gradient(180deg,rgba(0,0,0,0.05) 30%,rgba(0,0,0,0.82) 100%)'
                          : 'linear-gradient(180deg,rgba(0,0,0,0.25) 0%,rgba(0,0,0,0.88) 100%)',
                      }} />

                      {/* Curator guide badge (top left) */}
                      {country.visited && (
                        <div style={{
                          position: 'absolute', top: '9px', left: '9px',
                          background: 'rgba(20,184,166,0.88)',
                          backdropFilter: 'blur(4px)',
                          borderRadius: '7px', padding: '3px 7px',
                          display: 'flex', alignItems: 'center', gap: '3px',
                        }}>
                          <BookOpen size={9} color="#fff" />
                          <span style={{ color: '#fff', fontSize: '9px', fontWeight: 700 }}>GUIDE</span>
                        </div>
                      )}

                      {/* User status badge (top right) */}
                      {userStatus && (
                        <div style={{
                          position: 'absolute', top: '9px', right: '9px',
                          background: userStatus === 'visited' ? 'rgba(34,197,94,0.9)' : 'rgba(236,72,153,0.9)',
                          backdropFilter: 'blur(4px)',
                          borderRadius: '7px', padding: '3px 7px',
                          display: 'flex', alignItems: 'center', gap: '3px',
                        }}>
                          {userStatus === 'visited'
                            ? <Check size={9} color="#fff" />
                            : <Star size={9} color="#fff" />
                          }
                          <span style={{ color: '#fff', fontSize: '9px', fontWeight: 700 }}>
                            {userStatus === 'visited' ? 'BEEN' : 'WANT'}
                          </span>
                        </div>
                      )}

                      <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px' }}>
                        <span style={{ fontSize: '24px', lineHeight: 1 }}>{country.flagEmoji}</span>
                        <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginTop: '5px', lineHeight: 1.2 }}>
                          {country.name}
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
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
            </div>
          );
        })}
      </div>

      {/* City group sheet */}
      {selectedCityGroup && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 1001, display: 'flex', alignItems: 'flex-end',
          }}
          onClick={() => setSelectedCityGroup(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #1a2744 0%, #0f172a 100%)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              borderTopLeftRadius: '28px', borderTopRightRadius: '28px',
              padding: '20px 20px calc(20px + env(safe-area-inset-bottom, 0px))',
              width: '100%', maxHeight: '82vh', overflow: 'auto',
              animation: 'slide-up 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            <div style={{ width: '36px', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', margin: '0 auto 20px' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <span style={{ fontSize: '44px' }}>{selectedCityGroup[0].flagEmoji}</span>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '22px', fontWeight: 800 }}>{selectedCityGroup[0].name}</h2>
                <p style={{ color: '#64748b', fontSize: '13px' }}>{selectedCityGroup.length} cities · Alex&apos;s guides</p>
              </div>
              <button onClick={() => setSelectedCityGroup(null)} className="pressable" style={{
                width: '36px', height: '36px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <X size={18} color="#94a3b8" />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {selectedCityGroup.map(city => (
                <Link key={city.id} href={`/country/${city.id}`} className="pressable" style={{
                  position: 'relative', height: '110px',
                  borderRadius: '16px', overflow: 'hidden',
                  border: '1.5px solid rgba(20,184,166,0.2)',
                  display: 'block',
                }}>
                  <Image src={city.coverImage} alt={city.city} fill sizes="100vw" style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 20%,rgba(0,0,0,0.78) 100%)' }} />
                  <div style={{
                    position: 'absolute', bottom: '12px', left: '14px', right: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <div>
                      <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#fff' }}>{city.city}</h3>
                      <p style={{ color: '#94a3b8', fontSize: '11px', marginTop: '2px' }}>
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

      {/* Country quick-view + journey actions sheet */}
      {selectedCountry && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 1001, display: 'flex', alignItems: 'flex-end',
          }}
          onClick={() => setSelectedCountry(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'linear-gradient(180deg, #1a2744 0%, #0f172a 100%)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              borderTopLeftRadius: '28px', borderTopRightRadius: '28px',
              width: '100%', maxHeight: '90vh', overflow: 'auto',
              animation: 'slide-up 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            }}
          >
            {/* Hero */}
            <div style={{ position: 'relative', height: '180px' }}>
              <Image src={selectedCountry.coverImage} alt={selectedCountry.name} fill sizes="100vw" style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,0.05) 0%,rgba(26,39,68,0.95) 100%)' }} />
              <button
                onClick={() => setSelectedCountry(null)}
                className="pressable"
                style={{
                  position: 'absolute', top: '14px', right: '14px',
                  width: '34px', height: '34px', borderRadius: '11px',
                  background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <X size={17} color="#fff" />
              </button>
            </div>

            <div style={{ padding: '18px 20px calc(20px + env(safe-area-inset-bottom, 0px))' }}>
              {/* Country header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <span style={{ fontSize: '44px' }}>{selectedCountry.flagEmoji}</span>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontSize: '24px', fontWeight: 800 }}>{selectedCountry.name}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                    <MapPin size={12} color="#64748b" />
                    <span style={{ color: '#64748b', fontSize: '13px' }}>{selectedCountry.city}</span>
                  </div>
                </div>
                {/* Curator visited badge */}
                {selectedCountry.visited && (
                  <div style={{
                    background: 'rgba(20,184,166,0.12)',
                    border: '1px solid rgba(20,184,166,0.25)',
                    borderRadius: '10px', padding: '6px 10px',
                    display: 'flex', alignItems: 'center', gap: '5px',
                  }}>
                    <Image src={CURATOR.avatar} alt={CURATOR.name} width={16} height={16} style={{ borderRadius: '5px', objectFit: 'cover' }} />
                    <span style={{ color: '#14b8a6', fontSize: '10px', fontWeight: 700 }}>ALEX&apos;S GUIDE</span>
                  </div>
                )}
              </div>

              {/* ── ADD TO MY JOURNEY ── */}
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '18px',
                padding: '16px',
                marginBottom: '14px',
              }}>
                <p style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '12px' }}>
                  My Journey
                </p>

                {(() => {
                  const status = getUserStatus(selectedCountry.id);
                  return (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => markVisited(selectedCountry.id)}
                        className="pressable"
                        style={{
                          flex: 1, padding: '13px 8px',
                          borderRadius: '14px',
                          background: status === 'visited'
                            ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                            : 'rgba(34,197,94,0.1)',
                          border: `1px solid ${status === 'visited' ? 'transparent' : 'rgba(34,197,94,0.25)'}`,
                          color: status === 'visited' ? '#fff' : '#4ade80',
                          fontSize: '13px', fontWeight: 700,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                          transition: 'all 0.2s ease',
                          boxShadow: status === 'visited' ? '0 4px 16px rgba(34,197,94,0.3)' : 'none',
                        }}
                      >
                        <CheckCircle2 size={16} />
                        {status === 'visited' ? 'Been Here ✓' : 'Mark Visited'}
                      </button>
                      <button
                        onClick={() => status === 'wishlist' ? removeFromJourney(selectedCountry.id) : addToWishlist(selectedCountry.id)}
                        className="pressable"
                        style={{
                          flex: 1, padding: '13px 8px',
                          borderRadius: '14px',
                          background: status === 'wishlist'
                            ? 'linear-gradient(135deg, #ec4899, #db2777)'
                            : 'rgba(236,72,153,0.1)',
                          border: `1px solid ${status === 'wishlist' ? 'transparent' : 'rgba(236,72,153,0.25)'}`,
                          color: status === 'wishlist' ? '#fff' : '#f472b6',
                          fontSize: '13px', fontWeight: 700,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                          transition: 'all 0.2s ease',
                          boxShadow: status === 'wishlist' ? '0 4px 16px rgba(236,72,153,0.3)' : 'none',
                          opacity: status === 'visited' ? 0.4 : 1,
                        }}
                        disabled={status === 'visited'}
                      >
                        <Star size={16} />
                        {status === 'wishlist' ? 'Saved ★' : 'Want to Go'}
                      </button>
                      {status && (
                        <button
                          onClick={() => removeFromJourney(selectedCountry.id)}
                          className="pressable"
                          style={{
                            width: '48px', padding: '13px 0',
                            borderRadius: '14px',
                            background: 'rgba(239,68,68,0.1)',
                            border: '1px solid rgba(239,68,68,0.2)',
                            color: '#f87171', fontSize: '18px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  );
                })()}
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
                {[
                  { label: 'Places', value: selectedCountry.places.length, color: '#14b8a6' },
                  { label: 'Experiences', value: selectedCountry.experiences.length, color: '#8b5cf6' },
                  { label: 'Tips', value: selectedCountry.topTips.length, color: '#f59e0b' },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{
                    flex: 1, textAlign: 'center',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '12px', padding: '10px 6px',
                  }}>
                    <div style={{ fontSize: '20px', fontWeight: 800, color }}>{value}</div>
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
                  background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                  padding: '16px 18px', borderRadius: '16px',
                  color: '#fff', fontWeight: 700, fontSize: '15px',
                  marginBottom: '8px',
                  boxShadow: '0 6px 20px rgba(20,184,166,0.25)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Compass size={18} />
                  <span>{selectedCountry.visited ? 'Read Alex\'s Guide' : 'Explore Destination'}</span>
                </div>
                <ChevronRight size={18} />
              </Link>

              <div style={{ display: 'flex', gap: '8px' }}>
                <Link href={`/country/${selectedCountry.id}/chat`} className="pressable" style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                  background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)',
                  padding: '14px', borderRadius: '13px',
                  color: '#a78bfa', fontWeight: 600, fontSize: '13px',
                }}>
                  <MessageCircle size={16} />Chat
                </Link>
                <Link href={`/country/${selectedCountry.id}/match`} className="pressable" style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                  background: 'rgba(236,72,153,0.12)', border: '1px solid rgba(236,72,153,0.25)',
                  padding: '14px', borderRadius: '13px',
                  color: '#f472b6', fontWeight: 600, fontSize: '13px',
                }}>
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
