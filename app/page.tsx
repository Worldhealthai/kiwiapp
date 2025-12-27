'use client';

import { useState } from 'react';
import Link from 'next/link';
import { countries, Country } from '@/lib/countries';
import { X, Compass, MessageCircle, Heart, List, CheckCircle } from 'lucide-react';

export default function HomePage() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showList, setShowList] = useState(false);
  const [rotation, setRotation] = useState(0);

  const visitedCount = countries.filter(c => c.visited).length;

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>Kiwi Travel</h1>
          <p style={{ fontSize: '14px', color: '#a0aec0' }}>Explore the world</p>
        </div>
        <button
          onClick={() => setShowList(true)}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '22px',
            background: '#1e3a5f',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <List size={24} color="#fff" />
        </button>
      </div>

      {/* Stats */}
      <div style={{
        display: 'flex',
        background: '#1e3a5f',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '20px',
      }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4fd1c5' }}>{visitedCount}</div>
          <div style={{ fontSize: '12px', color: '#a0aec0' }}>Visited</div>
        </div>
        <div style={{ width: '1px', background: '#2d4a6f' }} />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4fd1c5' }}>{countries.length}</div>
          <div style={{ fontSize: '12px', color: '#a0aec0' }}>Total</div>
        </div>
        <div style={{ width: '1px', background: '#2d4a6f' }} />
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4fd1c5' }}>
            {Math.round((visitedCount / countries.length) * 100)}%
          </div>
          <div style={{ fontSize: '12px', color: '#a0aec0' }}>Explored</div>
        </div>
      </div>

      {/* Globe */}
      <div
        style={{
          position: 'relative',
          height: '350px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'grab',
        }}
        onMouseMove={(e) => {
          if (e.buttons === 1) {
            setRotation(r => r + e.movementX * 0.5);
          }
        }}
      >
        {/* Globe circle */}
        <div style={{
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #2563eb 100%)',
          boxShadow: '0 0 60px rgba(59, 130, 246, 0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Grid lines */}
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: '100%',
              height: '1px',
              background: 'rgba(255,255,255,0.1)',
              top: `${20 + i * 15}%`,
            }} />
          ))}
        </div>

        {/* Country markers */}
        {countries.map((country) => {
          const angle = (country.coordinates.lng + rotation) * (Math.PI / 180);
          const x = Math.cos(angle) * 120;
          const z = Math.sin(angle);
          const y = country.coordinates.lat * -1.5;

          if (z < -0.3) return null;

          return (
            <button
              key={country.id}
              onClick={() => setSelectedCountry(country)}
              style={{
                position: 'absolute',
                left: `calc(50% + ${x}px - 20px)`,
                top: `calc(50% + ${y}px - 20px)`,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                opacity: 0.5 + z * 0.5,
                transform: `scale(${0.7 + z * 0.3})`,
                zIndex: Math.round(z * 10) + 10,
                transition: 'opacity 0.2s',
              }}
            >
              <span style={{ fontSize: '32px' }}>{country.flagEmoji}</span>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: country.visited ? '#4fd1c5' : '#f59e0b',
                margin: '4px auto 0',
              }} />
            </button>
          );
        })}

        <p style={{
          position: 'absolute',
          bottom: '10px',
          color: '#a0aec0',
          fontSize: '12px',
        }}>
          Drag to rotate globe
        </p>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4fd1c5' }} />
          <span style={{ color: '#a0aec0', fontSize: '12px' }}>Visited</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
          <span style={{ color: '#a0aec0', fontSize: '12px' }}>Bucket List</span>
        </div>
      </div>

      {/* Country Modal */}
      {selectedCountry && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 1001,
            display: 'flex',
            alignItems: 'flex-end',
          }}
          onClick={() => setSelectedCountry(null)}
        >
          <div
            style={{
              background: '#1a365d',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '24px',
              width: '100%',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '48px', marginRight: '16px' }}>{selectedCountry.flagEmoji}</span>
              <div style={{ flex: 1 }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>{selectedCountry.name}</h2>
                <p style={{ color: '#a0aec0' }}>{selectedCountry.continent}</p>
              </div>
              <button
                onClick={() => setSelectedCountry(null)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '18px',
                  background: '#2d4a6f',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={24} color="#fff" />
              </button>
            </div>

            <p style={{ color: '#cbd5e1', lineHeight: '22px', marginBottom: '16px' }}>
              {selectedCountry.description}
            </p>

            {selectedCountry.visited && (
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(79,209,197,0.1)',
                padding: '8px 12px',
                borderRadius: '8px',
                marginBottom: '16px',
              }}>
                <CheckCircle size={16} color="#4fd1c5" />
                <span style={{ color: '#4fd1c5', fontSize: '14px' }}>You have been here!</span>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <Link
                href={`/country/${selectedCountry.id}`}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#2563eb',
                  padding: '14px',
                  borderRadius: '12px',
                  color: '#fff',
                  fontWeight: 600,
                }}
              >
                <Compass size={20} /> Explore
              </Link>
              <Link
                href={`/country/${selectedCountry.id}/chat`}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#7c3aed',
                  padding: '14px',
                  borderRadius: '12px',
                  color: '#fff',
                  fontWeight: 600,
                }}
              >
                <MessageCircle size={20} /> Chat
              </Link>
              <Link
                href={`/country/${selectedCountry.id}/match`}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: '#ec4899',
                  padding: '14px',
                  borderRadius: '12px',
                  color: '#fff',
                  fontWeight: 600,
                }}
              >
                <Heart size={20} /> Match
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Country List Modal */}
      {showList && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 1001,
          }}
          onClick={() => setShowList(false)}
        >
          <div
            style={{
              background: '#1a365d',
              marginTop: '100px',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              height: 'calc(100% - 100px)',
              overflow: 'hidden',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px',
              borderBottom: '1px solid #2d4a6f',
            }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>All Countries</h2>
              <button
                onClick={() => setShowList(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={24} color="#fff" />
              </button>
            </div>
            <div style={{ overflowY: 'auto', height: 'calc(100% - 65px)' }}>
              {countries.map(country => (
                <button
                  key={country.id}
                  onClick={() => {
                    setShowList(false);
                    setSelectedCountry(country);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: '16px',
                    borderBottom: '1px solid #2d4a6f',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{ fontSize: '32px', marginRight: '16px' }}>{country.flagEmoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontSize: '16px', fontWeight: 600 }}>{country.name}</div>
                    <div style={{ color: '#a0aec0', fontSize: '12px' }}>{country.continent}</div>
                  </div>
                  {country.visited && <CheckCircle size={20} color="#4fd1c5" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
