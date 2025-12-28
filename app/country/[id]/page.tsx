'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCountryById } from '@/lib/countries';
import {
  ArrowLeft, MapPin, Star, Lightbulb, Utensils, Luggage, Home,
  ExternalLink, MessageCircle, Heart, ChevronDown, ChevronUp, Sparkles
} from 'lucide-react';

export default function CountryDetailPage() {
  const params = useParams();
  const country = getCountryById(params.id as string);
  const [activeTab, setActiveTab] = useState<'places' | 'experiences' | 'tips'>('places');
  const [expandedPlace, setExpandedPlace] = useState<number | null>(null);

  if (!country) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748b' }}>
        <p>Country not found</p>
        <Link href="/" style={{ color: '#14b8a6', marginTop: '16px', display: 'inline-block' }}>
          Go back home
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #030712 0%, #0f172a 100%)',
    }}>
      {/* Hero Image */}
      <div style={{ position: 'relative', height: '300px' }}>
        <Image
          src={country.coverImage}
          alt={country.name}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(3,7,18,0.3) 0%, rgba(3,7,18,0.9) 100%)',
        }} />

        {/* Back Button */}
        <Link
          href="/"
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            width: '44px',
            height: '44px',
            borderRadius: '14px',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <ArrowLeft size={22} color="#fff" />
        </Link>

        {/* Header Info */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: '20px',
          right: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            {country.visited && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(20,184,166,0.2)',
                backdropFilter: 'blur(4px)',
                padding: '6px 12px',
                borderRadius: '100px',
                border: '1px solid rgba(20,184,166,0.3)',
              }}>
                <Sparkles size={14} color="#14b8a6" />
                <span style={{ color: '#14b8a6', fontSize: '12px', fontWeight: 600 }}>VISITED</span>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
            <span style={{ fontSize: '56px' }}>{country.flagEmoji}</span>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#fff' }}>{country.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                <MapPin size={16} color="#94a3b8" />
                <span style={{ color: '#94a3b8', fontSize: '15px' }}>{country.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '8px',
        padding: '20px',
        overflowX: 'auto',
        background: 'rgba(15,23,42,0.8)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}>
        {[
          { key: 'places', label: 'Must-See Places', icon: Star, count: country.places.length },
          { key: 'experiences', label: 'Experiences', icon: Sparkles, count: country.experiences.length },
          { key: 'tips', label: 'Travel Tips', icon: Lightbulb, count: country.topTips.length },
        ].map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as any)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 18px',
              borderRadius: '100px',
              border: 'none',
              background: activeTab === key
                ? 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)'
                : 'rgba(255,255,255,0.05)',
              color: activeTab === key ? '#fff' : '#94a3b8',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease',
            }}
          >
            <Icon size={16} />
            <span>{label}</span>
            <span style={{
              background: activeTab === key ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
              padding: '2px 8px',
              borderRadius: '100px',
              fontSize: '11px',
            }}>
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '0 20px 120px' }}>
        {/* Places Tab */}
        {activeTab === 'places' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            {country.places.map((place, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setExpandedPlace(expandedPlace === index ? null : index)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#fff',
                        }}>
                          {index + 1}
                        </div>
                        <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#fff' }}>{place.name}</h3>
                      </div>
                      <p style={{
                        color: '#94a3b8',
                        fontSize: '14px',
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: expandedPlace === index ? 'unset' : 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}>
                        {place.description}
                      </p>
                    </div>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: '12px',
                      flexShrink: 0,
                    }}>
                      {expandedPlace === index ? (
                        <ChevronUp size={18} color="#94a3b8" />
                      ) : (
                        <ChevronDown size={18} color="#94a3b8" />
                      )}
                    </div>
                  </div>
                </button>

                {expandedPlace === index && (
                  <div style={{
                    padding: '0 20px 20px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    {/* Tips */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      marginTop: '16px',
                      padding: '14px',
                      background: 'rgba(245,158,11,0.1)',
                      borderRadius: '12px',
                      border: '1px solid rgba(245,158,11,0.2)',
                    }}>
                      <Lightbulb size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <p style={{ color: '#fbbf24', fontSize: '13px', lineHeight: 1.6 }}>
                        {place.tips}
                      </p>
                    </div>

                    {/* Booking Link */}
                    {country.visited && place.link && (
                      <a
                        href={place.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          marginTop: '16px',
                          padding: '14px',
                          background: place.isBooking
                            ? 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)'
                            : 'rgba(255,255,255,0.05)',
                          border: place.isBooking ? 'none' : '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          color: '#fff',
                          fontSize: '14px',
                          fontWeight: 600,
                        }}
                      >
                        <ExternalLink size={16} />
                        {place.isBooking ? 'Book Now' : 'Learn More'}
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Experiences Tab */}
        {activeTab === 'experiences' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            {country.experiences.map((exp, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '20px',
                  padding: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(236,72,153,0.2) 100%)',
                    border: '1px solid rgba(139,92,246,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <Sparkles size={20} color="#a78bfa" />
                  </div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#fff', flex: 1 }}>{exp.name}</h3>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.7 }}>
                  {exp.description}
                </p>
                {country.visited && exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginTop: '16px',
                      padding: '10px 18px',
                      background: 'rgba(139,92,246,0.15)',
                      border: '1px solid rgba(139,92,246,0.3)',
                      borderRadius: '100px',
                      color: '#a78bfa',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}
                  >
                    <ExternalLink size={14} />
                    {exp.isBooking ? 'Book Experience' : 'Learn More'}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <div style={{ marginTop: '16px' }}>
            {/* Top Tips */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#14b8a6',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
              }}>
                Top Tips
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {country.topTips.map((tip, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '16px',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      borderRadius: '14px',
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '8px',
                      background: 'rgba(20,184,166,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Lightbulb size={14} color="#14b8a6" />
                    </div>
                    <p style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: 1.6 }}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Food Recommendations */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#f59e0b',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <Utensils size={16} />
                Food & Drinks
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {country.foodRecs.map((food, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '16px',
                      background: 'rgba(245,158,11,0.08)',
                      border: '1px solid rgba(245,158,11,0.15)',
                      borderRadius: '14px',
                    }}
                  >
                    <p style={{ color: '#fcd34d', fontSize: '14px', lineHeight: 1.6 }}>{food}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Accommodation */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#8b5cf6',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <Home size={16} />
                Where to Stay
              </h3>
              <div style={{
                padding: '16px',
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.15)',
                borderRadius: '14px',
              }}>
                <p style={{ color: '#c4b5fd', fontSize: '14px', lineHeight: 1.7 }}>
                  {country.accommodationTips}
                </p>
              </div>
            </div>

            {/* What to Pack */}
            <div>
              <h3 style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#ec4899',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <Luggage size={16} />
                What to Pack
              </h3>
              <div style={{
                padding: '16px',
                background: 'rgba(236,72,153,0.08)',
                border: '1px solid rgba(236,72,153,0.15)',
                borderRadius: '14px',
              }}>
                <p style={{ color: '#f9a8d4', fontSize: '14px', lineHeight: 1.7 }}>
                  {country.whatToPack}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div style={{
        position: 'fixed',
        bottom: '70px',
        left: 0,
        right: 0,
        padding: '16px 20px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(3,7,18,0.95) 20%)',
      }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link
            href={`/country/${country.id}/chat`}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: 'rgba(139,92,246,0.2)',
              border: '1px solid rgba(139,92,246,0.3)',
              padding: '16px',
              borderRadius: '14px',
              color: '#a78bfa',
              fontWeight: 600,
              fontSize: '15px',
            }}
          >
            <MessageCircle size={22} />
            <span>Join Chat</span>
          </Link>
          <Link
            href={`/country/${country.id}/match`}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              padding: '16px',
              borderRadius: '14px',
              color: '#fff',
              fontWeight: 600,
              fontSize: '15px',
            }}
          >
            <Heart size={22} />
            <span>Find Buddies</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
