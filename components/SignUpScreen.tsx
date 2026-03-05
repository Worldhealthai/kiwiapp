'use client';

import { useState, useMemo } from 'react';
import { Globe2, MapPin, Heart, ArrowRight, Check, Search, X, Plane, ChevronRight } from 'lucide-react';
import { useUserJourney, UserProfile } from '@/contexts/UserJourneyContext';
import { countries } from '@/lib/countries';

const TRAVEL_STYLES = [
  'Adventure', 'Culture', 'Food', 'Photography', 'Nature', 'Beach',
  'Hiking', 'History', 'Backpacker', 'Luxury', 'Road Trip', 'Solo',
  'Nightlife', 'Wellness', 'Wildlife', 'Architecture',
];

const topLevelCountries = countries
  .filter(c => !c.parentCountry)
  .sort((a, b) => a.name.localeCompare(b.name));

function toHandle(name: string) {
  return '@' + name.trim().toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9.]/g, '');
}

function CountryPicker({
  selected,
  onToggle,
  label,
  color,
}: {
  selected: string[];
  onToggle: (id: string) => void;
  label: string;
  color: string;
}) {
  const [search, setSearch] = useState('');
  const filtered = useMemo(
    () => topLevelCountries.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.flagEmoji.includes(search)
    ),
    [search]
  );

  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '14px',
        padding: '10px 14px',
        marginBottom: '12px',
      }}>
        <Search size={16} color="#64748b" />
        <input
          type="text"
          placeholder={`Search ${label.toLowerCase()}...`}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            flex: 1, background: 'none', border: 'none',
            color: '#f8fafc', fontSize: '14px', outline: 'none',
          }}
        />
        {search && (
          <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            <X size={14} color="#64748b" />
          </button>
        )}
      </div>

      {selected.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
          {selected.map(id => {
            const c = topLevelCountries.find(x => x.id === id);
            if (!c) return null;
            return (
              <button
                key={id}
                onClick={() => onToggle(id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                  background: `${color}20`,
                  border: `1px solid ${color}44`,
                  borderRadius: '100px', padding: '4px 10px',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '14px' }}>{c.flagEmoji}</span>
                <span style={{ color, fontSize: '12px', fontWeight: 600 }}>{c.name}</span>
                <X size={10} color={color} />
              </button>
            );
          })}
        </div>
      )}

      <div style={{
        maxHeight: '220px', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', gap: '4px',
      }}>
        {filtered.map(c => {
          const isSelected = selected.includes(c.id);
          return (
            <button
              key={c.id}
              onClick={() => onToggle(c.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: isSelected ? `${color}12` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isSelected ? `${color}30` : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '11px', padding: '10px 13px',
                textAlign: 'left', cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{c.flagEmoji}</span>
              <span style={{ flex: 1, color: isSelected ? color : '#cbd5e1', fontSize: '14px', fontWeight: isSelected ? 600 : 400 }}>
                {c.name}
              </span>
              {isSelected && (
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Check size={11} color="#fff" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function SignUpScreen() {
  const { saveProfile, markVisited, addToWishlist } = useUserJourney();
  const [step, setStep] = useState(0);

  // Step 0: profile info
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [bio, setBio] = useState('');
  const [handleEdited, setHandleEdited] = useState(false);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  // Steps 1 & 2: countries
  const [visitedIds, setVisitedIds] = useState<string[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  const handleNameChange = (v: string) => {
    setName(v);
    if (!handleEdited) setHandle(toHandle(v));
  };

  const toggleStyle = (s: string) =>
    setSelectedStyles(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const toggleVisited = (id: string) => {
    setVisitedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setWishlistIds(prev => prev.filter(x => x !== id));
  };

  const toggleWishlist = (id: string) => {
    setWishlistIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setVisitedIds(prev => prev.filter(x => x !== id));
  };

  const finish = () => {
    const profile: UserProfile = {
      name: name.trim(),
      handle: handle || toHandle(name),
      bio: bio.trim(),
      travelStyle: selectedStyles,
      memberSince: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
    };
    saveProfile(profile);
    visitedIds.forEach(id => markVisited(id));
    wishlistIds.forEach(id => addToWishlist(id));
  };

  // ── Shared wrapper ──
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'linear-gradient(180deg, #030712 0%, #0f172a 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px',
      overflow: 'hidden',
    }}>
      {/* Background orbs */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '260px', height: '260px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(20,184,166,0.18) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: '260px', height: '260px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'relative', width: '100%', maxWidth: '420px',
        maxHeight: '90dvh', overflowY: 'auto',
      }}>
        {children}
      </div>
    </div>
  );

  // ── Step dots ──
  const StepDots = ({ current, total }: { current: number; total: number }) => (
    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '28px' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === current ? '20px' : '7px',
          height: '7px', borderRadius: '4px',
          background: i <= current ? '#14b8a6' : 'rgba(255,255,255,0.12)',
          transition: 'all 0.3s ease',
        }} />
      ))}
    </div>
  );

  // ── Step 0: Profile ──
  if (step === 0) {
    const canContinue = name.trim().length >= 2;
    return (
      <Wrapper>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '72px', height: '72px', borderRadius: '22px',
            background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 12px 40px rgba(20,184,166,0.3)',
          }}>
            <Globe2 size={36} color="#fff" strokeWidth={2.5} />
          </div>
          <h1 style={{
            fontSize: '28px', fontWeight: 800,
            background: 'linear-gradient(135deg, #fff 0%, #14b8a6 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: '6px',
          }}>Welcome to Kiwi</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Create your travel profile to get started</p>
        </div>

        <StepDots current={0} total={3} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Name */}
          <div>
            <label style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '7px' }}>
              Your Name *
            </label>
            <input
              type="text"
              placeholder="e.g. Alex Johnson"
              value={name}
              onChange={e => handleNameChange(e.target.value)}
              autoFocus
              style={{
                width: '100%', padding: '13px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${name.trim().length >= 2 ? 'rgba(20,184,166,0.4)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '13px', color: '#f8fafc', fontSize: '15px',
                outline: 'none', boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
            />
          </div>

          {/* Handle */}
          <div>
            <label style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '7px' }}>
              Username
            </label>
            <input
              type="text"
              placeholder="@your.handle"
              value={handle}
              onChange={e => { setHandle(e.target.value); setHandleEdited(true); }}
              style={{
                width: '100%', padding: '13px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '13px', color: '#14b8a6', fontSize: '15px',
                outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Bio */}
          <div>
            <label style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '7px' }}>
              Bio <span style={{ color: '#475569', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
            </label>
            <textarea
              placeholder="Tell other travelers about yourself..."
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={3}
              style={{
                width: '100%', padding: '13px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '13px', color: '#f8fafc', fontSize: '14px',
                outline: 'none', resize: 'none', boxSizing: 'border-box',
                fontFamily: 'inherit', lineHeight: 1.6,
              }}
            />
          </div>

          {/* Travel style */}
          <div>
            <label style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '9px' }}>
              Travel Style <span style={{ color: '#475569', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {TRAVEL_STYLES.map(style => {
                const active = selectedStyles.includes(style);
                return (
                  <button
                    key={style}
                    onClick={() => toggleStyle(style)}
                    style={{
                      padding: '7px 13px', borderRadius: '100px',
                      background: active ? 'rgba(20,184,166,0.15)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${active ? 'rgba(20,184,166,0.4)' : 'rgba(255,255,255,0.08)'}`,
                      color: active ? '#14b8a6' : '#64748b',
                      fontSize: '13px', fontWeight: active ? 600 : 400,
                      cursor: 'pointer', transition: 'all 0.15s ease',
                    }}
                  >
                    {style}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <button
          onClick={() => setStep(1)}
          disabled={!canContinue}
          style={{
            width: '100%', marginTop: '24px',
            padding: '15px', borderRadius: '15px', border: 'none',
            background: canContinue ? 'linear-gradient(135deg, #14b8a6, #0d9488)' : 'rgba(255,255,255,0.07)',
            color: canContinue ? '#fff' : '#475569',
            fontSize: '16px', fontWeight: 700, cursor: canContinue ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            boxShadow: canContinue ? '0 6px 20px rgba(20,184,166,0.3)' : 'none',
            transition: 'all 0.2s ease',
          }}
        >
          Next <ArrowRight size={18} />
        </button>
      </Wrapper>
    );
  }

  // ── Step 1: Visited Countries ──
  if (step === 1) {
    return (
      <Wrapper>
        <button
          onClick={() => setStep(0)}
          style={{
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px', padding: '8px 14px', cursor: 'pointer',
            color: '#94a3b8', fontSize: '13px', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px',
          }}
        >
          ← Back
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '18px',
            background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 12px',
          }}>
            <MapPin size={28} color="#22c55e" />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
            Where have you been?
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Add countries you&apos;ve visited</p>
        </div>

        <StepDots current={1} total={3} />

        <CountryPicker
          selected={visitedIds}
          onToggle={toggleVisited}
          label="Visited countries"
          color="#22c55e"
        />

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button
            onClick={() => setStep(2)}
            style={{
              flex: 1, padding: '13px', borderRadius: '13px', border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)', color: '#94a3b8',
              fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            }}
          >
            Skip
          </button>
          <button
            onClick={() => setStep(2)}
            style={{
              flex: 2, padding: '13px', borderRadius: '13px', border: 'none',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
              boxShadow: '0 6px 20px rgba(34,197,94,0.25)',
            }}
          >
            {visitedIds.length > 0 ? `Add ${visitedIds.length} ${visitedIds.length === 1 ? 'Country' : 'Countries'}` : 'Continue'}
            <ChevronRight size={16} />
          </button>
        </div>
      </Wrapper>
    );
  }

  // ── Step 2: Wishlist Countries ──
  return (
    <Wrapper>
      <button
        onClick={() => setStep(1)}
        style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px', padding: '8px 14px', cursor: 'pointer',
          color: '#94a3b8', fontSize: '13px', fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px',
        }}
      >
        ← Back
      </button>

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{
          width: '60px', height: '60px', borderRadius: '18px',
          background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 12px',
        }}>
          <Heart size={28} color="#ec4899" />
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
          Dream destinations?
        </h2>
        <p style={{ color: '#64748b', fontSize: '14px' }}>Build your travel wishlist</p>
      </div>

      <StepDots current={2} total={3} />

      <CountryPicker
        selected={wishlistIds}
        onToggle={toggleWishlist}
        label="Wishlist countries"
        color="#ec4899"
      />

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button
          onClick={finish}
          style={{
            flex: 1, padding: '13px', borderRadius: '13px', border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)', color: '#94a3b8',
            fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          }}
        >
          Skip
        </button>
        <button
          onClick={finish}
          style={{
            flex: 2, padding: '13px', borderRadius: '13px', border: 'none',
            background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
            color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
            boxShadow: '0 6px 20px rgba(20,184,166,0.3)',
          }}
        >
          <Plane size={16} />
          Let&apos;s Go!
        </button>
      </div>
    </Wrapper>
  );
}
