'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getCountryById } from '@/lib/countries';
import { Heart, Calendar, Users, MessageCircle, Globe, ArrowLeft, Sparkles, ChevronRight } from 'lucide-react';

export default function MatchPage() {
  const params = useParams();
  const country = getCountryById(params.id as string);
  const [isOptedIn, setIsOptedIn] = useState(false);
  const [hasSetDates, setHasSetDates] = useState(false);
  const [travelMonth, setTravelMonth] = useState('');
  const [travelYear, setTravelYear] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 3 }, (_, i) => currentYear + i);

  if (!country) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #030712 0%, #0f172a 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px', color: '#fff',
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#64748b' }}>Country not found</p>
          <Link href="/" style={{ color: '#14b8a6', marginTop: '16px', display: 'inline-block', textDecoration: 'underline' }}>
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  // ── Opt-in screen ──
  if (!isOptedIn) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #030712 0%, #0f172a 100%)',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
          <Link href={`/country/${params.id}`} style={{
            position: 'absolute', top: '20px', left: '20px',
            width: '44px', height: '44px', borderRadius: '14px',
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ArrowLeft size={20} color="#fff" />
          </Link>

          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <div style={{
              width: '80px', height: '80px', margin: '0 auto 20px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'pulse 2s ease-in-out infinite',
            }}>
              <Heart size={40} color="#fff" />
            </div>

            <h1 style={{
              fontSize: '32px', fontWeight: 800,
              background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px',
            }}>
              Find Travel Buddies
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
              <span style={{ fontSize: '32px' }}>{country.flagEmoji}</span>
              <p style={{ color: '#14b8a6', fontSize: '18px', fontWeight: 600 }}>{country.name}</p>
            </div>

            <p style={{ color: '#94a3b8', marginBottom: '32px', lineHeight: 1.6, fontSize: '15px' }}>
              Connect with travelers planning to visit {country.name}. Enter your travel dates and we&apos;ll match you with compatible companions!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              {[
                { icon: Users,         text: 'Meet like-minded travelers', color: '#14b8a6' },
                { icon: Calendar,      text: 'Match your travel dates',    color: '#8b5cf6' },
                { icon: MessageCircle, text: 'Chat with your matches',     color: '#ec4899' },
              ].map(({ icon: Icon, text, color }, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                  padding: '16px 20px', borderRadius: '16px',
                  animation: 'slide-up 0.5s ease-out forwards', animationDelay: `${i * 0.1}s`, opacity: 0,
                }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={24} color={color} />
                  </div>
                  <span style={{ color: '#e2e8f0', fontSize: '15px', fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setIsOptedIn(true)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
              width: '100%',
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              padding: '18px 24px', borderRadius: '16px', border: 'none', cursor: 'pointer',
              fontSize: '16px', fontWeight: 700, color: '#fff',
              boxShadow: '0 8px 32px rgba(236,72,153,0.3)',
            }}>
              <Heart size={24} />
              <span>Join Matching System</span>
            </button>

            <p style={{ color: '#64748b', fontSize: '13px', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Sparkles size={14} />
              <span>Your profile will be visible to other travelers</span>
            </p>
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
          @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  // ── Date selection screen ──
  if (!hasSetDates) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #030712 0%, #0f172a 100%)',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px' }}>
          <button onClick={() => setIsOptedIn(false)} style={{
            position: 'absolute', top: '20px', left: '20px',
            width: '44px', height: '44px', borderRadius: '14px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <ArrowLeft size={20} color="#fff" />
          </button>

          <div style={{ textAlign: 'center', maxWidth: '400px', width: '100%' }}>
            <div style={{ width: '80px', height: '80px', margin: '0 auto 20px', borderRadius: '20px', background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={40} color="#fff" />
            </div>

            <h1 style={{ fontSize: '32px', fontWeight: 800, background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
              When Are You Traveling?
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
              <span style={{ fontSize: '32px' }}>{country.flagEmoji}</span>
              <p style={{ color: '#14b8a6', fontSize: '18px', fontWeight: 600 }}>{country.name}</p>
            </div>

            <p style={{ color: '#94a3b8', marginBottom: '32px', lineHeight: 1.6, fontSize: '15px' }}>
              Let us know your travel plans so we can match you with travelers on similar dates
            </p>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', textAlign: 'left', color: '#e2e8f0', fontSize: '14px', fontWeight: 600, marginBottom: '10px' }}>Travel Month</label>
              <select value={travelMonth} onChange={e => setTravelMonth(e.target.value)} style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '15px', fontFamily: 'inherit', cursor: 'pointer' }}>
                <option value="" style={{ background: '#1e293b' }}>Select month...</option>
                {months.map(month => <option key={month} value={month} style={{ background: '#1e293b' }}>{month}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', textAlign: 'left', color: '#e2e8f0', fontSize: '14px', fontWeight: 600, marginBottom: '10px' }}>Travel Year</label>
              <select value={travelYear} onChange={e => setTravelYear(e.target.value)} style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '15px', fontFamily: 'inherit', cursor: 'pointer' }}>
                <option value="" style={{ background: '#1e293b' }}>Select year...</option>
                {years.map(year => <option key={year} value={year} style={{ background: '#1e293b' }}>{year}</option>)}
              </select>
            </div>

            <button onClick={() => setHasSetDates(true)} disabled={!travelMonth || !travelYear} style={{
              width: '100%',
              background: travelMonth && travelYear ? 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)' : 'rgba(255,255,255,0.1)',
              padding: '18px 24px', borderRadius: '16px', border: 'none',
              cursor: travelMonth && travelYear ? 'pointer' : 'not-allowed',
              fontSize: '16px', fontWeight: 700,
              color: travelMonth && travelYear ? '#fff' : '#64748b',
              boxShadow: travelMonth && travelYear ? '0 8px 32px rgba(236,72,153,0.3)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
            }}>
              <span>Find Matches</span>
              <ChevronRight size={20} />
            </button>

            <p style={{ color: '#64748b', fontSize: '13px', marginTop: '16px' }}>
              Your travel dates will be shared with potential matches
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ── No travelers yet screen ──
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #030712 0%, #0f172a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px', textAlign: 'center',
    }}>
      <div>
        <div style={{
          width: '120px', height: '120px', margin: '0 auto 24px', borderRadius: '24px',
          background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Globe size={60} color="#fff" />
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
          You&apos;re on the list!
        </h1>

        {travelMonth && travelYear && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px', marginBottom: '16px',
            background: 'rgba(20,184,166,0.15)', border: '1px solid rgba(20,184,166,0.3)',
            padding: '8px 16px', borderRadius: '100px',
          }}>
            <Calendar size={14} color="#14b8a6" />
            <span style={{ color: '#14b8a6', fontSize: '13px', fontWeight: 600 }}>
              {travelMonth} {travelYear} · {country.flagEmoji} {country.name}
            </span>
          </div>
        )}

        <p style={{ color: '#94a3b8', marginBottom: '32px', lineHeight: 1.7, fontSize: '15px', maxWidth: '300px', margin: '0 auto 32px' }}>
          No other travelers have registered for this destination yet. Check back soon — as the community grows, matches will appear here!
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button onClick={() => { setHasSetDates(false); setIsOptedIn(false); }} style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            padding: '14px 24px', borderRadius: '14px', cursor: 'pointer',
            color: '#fff', fontSize: '15px', fontWeight: 600,
          }}>
            Change Dates
          </button>
          <Link href="/" style={{
            background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            padding: '14px 24px', borderRadius: '14px',
            color: '#fff', fontSize: '15px', fontWeight: 600, display: 'inline-block',
          }}>
            Explore More
          </Link>
        </div>
      </div>
    </div>
  );
}
