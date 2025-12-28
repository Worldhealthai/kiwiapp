'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Calendar, MapPin, Heart, Send, ArrowLeft, Sparkles, Users } from 'lucide-react';

const mockMatches = [
  {
    id: '1',
    name: 'Sophie Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    country: 'New Zealand',
    countryFlag: '🇳🇿',
    travelDates: 'Mar 1 - Mar 21',
    lastMessage: 'Excited to meet up in Queenstown!',
    lastMessageTime: '2h ago',
    unread: 2,
    isOnline: true,
    matchPercentage: 95,
    sharedInterests: ['Adventure', 'Hiking', 'Photography'],
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    country: 'Japan',
    countryFlag: '🇯🇵',
    travelDates: 'Apr 5 - Apr 20',
    lastMessage: 'Have you been to the Tsukiji market?',
    lastMessageTime: '1d ago',
    unread: 0,
    isOnline: false,
    matchPercentage: 87,
    sharedInterests: ['Foodie', 'Culture', 'Photography'],
  },
  {
    id: '3',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    country: 'Thailand',
    countryFlag: '🇹🇭',
    travelDates: 'Feb 10 - Feb 28',
    lastMessage: 'The temples in Chiang Mai are amazing!',
    lastMessageTime: '3d ago',
    unread: 0,
    isOnline: true,
    matchPercentage: 92,
    sharedInterests: ['Culture', 'Temples', 'Relaxation'],
  },
];

export default function MatchesPage() {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'recent' | 'favorites'>('all');

  if (selectedMatch) {
    const match = mockMatches.find(m => m.id === selectedMatch);
    if (!match) return null;

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #030712 0%, #0f172a 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Chat Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 20px',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <button
            onClick={() => setSelectedMatch(null)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '12px',
            }}
          >
            <ArrowLeft size={20} color="#fff" />
          </button>
          <div style={{ position: 'relative', marginRight: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '22px',
              overflow: 'hidden',
              border: '2px solid rgba(20,184,166,0.3)',
            }}>
              <Image src={match.avatar} alt={match.name} width={44} height={44} style={{ objectFit: 'cover' }} />
            </div>
            {match.isOnline && (
              <div style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '12px',
                height: '12px',
                borderRadius: '6px',
                background: '#14b8a6',
                border: '2px solid #030712',
              }} />
            )}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>{match.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
              <span style={{ fontSize: '14px' }}>{match.countryFlag}</span>
              <span style={{ color: '#64748b', fontSize: '13px' }}>{match.country}</span>
            </div>
          </div>
        </div>

        {/* Match Info Banner */}
        <div style={{
          margin: '16px 20px',
          padding: '16px',
          background: 'rgba(20,184,166,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(20,184,166,0.2)',
          borderRadius: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Sparkles size={18} color="#14b8a6" />
            <span style={{ color: '#14b8a6', fontSize: '14px', fontWeight: 600 }}>
              {match.matchPercentage}% Match
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {match.sharedInterests.map((interest, i) => (
              <span key={i} style={{
                background: 'rgba(20,184,166,0.15)',
                border: '1px solid rgba(20,184,166,0.3)',
                padding: '4px 10px',
                borderRadius: '100px',
                color: '#14b8a6',
                fontSize: '11px',
                fontWeight: 600,
              }}>
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div style={{ flex: 1, padding: '0 20px', overflowY: 'auto' }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '14px 16px',
            borderRadius: '20px 20px 20px 4px',
            maxWidth: '80%',
            marginBottom: '16px',
          }}>
            <p style={{ color: '#e2e8f0', fontSize: '14px', lineHeight: 1.5 }}>{match.lastMessage}</p>
            <span style={{ color: '#64748b', fontSize: '11px', marginTop: '6px', display: 'block' }}>
              {match.lastMessageTime}
            </span>
          </div>
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 16px',
              borderRadius: '30px',
              background: 'rgba(236,72,153,0.1)',
              border: '1px solid rgba(236,72,153,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Heart size={28} color="#ec4899" />
            </div>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6 }}>
              Start your conversation with {match.name.split(' ')[0]}!<br />
              Share your travel plans and experiences
            </p>
          </div>
        </div>

        {/* Chat Input */}
        <div style={{
          padding: '16px 20px',
          background: 'rgba(255,255,255,0.03)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          marginBottom: '70px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '14px',
                padding: '14px 18px',
                color: '#fff',
                fontSize: '14px',
                fontFamily: 'inherit',
              }}
            />
            <button style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(20,184,166,0.3)',
            }}>
              <Send size={20} color="#fff" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #030712 0%, #0f172a 50%, #030712 100%)',
      paddingBottom: '90px',
    }}>
      {/* Background orb */}
      <div style={{
        position: 'fixed', top: '100px', right: '-100px',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      {/* Header */}
      <div style={{ padding: '40px 20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Heart size={24} color="#fff" />
          </div>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Your Matches
            </h1>
          </div>
        </div>
        <p style={{ color: '#64748b', fontSize: '15px', marginLeft: '60px' }}>
          {mockMatches.length} travel {mockMatches.length === 1 ? 'buddy' : 'buddies'} ready to connect
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        padding: '0 20px',
        marginBottom: '24px',
      }}>
        {[
          { label: 'Total', value: mockMatches.length, icon: Users, color: '#14b8a6' },
          { label: 'Online', value: mockMatches.filter(m => m.isOnline).length, icon: Sparkles, color: '#ec4899' },
          { label: 'Unread', value: mockMatches.filter(m => m.unread > 0).length, icon: MessageCircle, color: '#8b5cf6' },
        ].map(({ label, value, icon: Icon, color }, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            padding: '16px 12px',
            textAlign: 'center',
          }}>
            <Icon size={18} color={color} style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: '22px', fontWeight: 700, color, marginBottom: '2px' }}>{value}</div>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Matches List */}
      <div style={{ padding: '0 20px' }}>
        {mockMatches.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '24px',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 24px',
              borderRadius: '40px',
              background: 'rgba(236,72,153,0.1)',
              border: '1px solid rgba(236,72,153,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Heart size={40} color="#ec4899" />
            </div>
            <h2 style={{
              color: '#fff',
              fontSize: '22px',
              fontWeight: 700,
              marginBottom: '8px',
            }}>
              No matches yet
            </h2>
            <p style={{
              color: '#64748b',
              fontSize: '15px',
              lineHeight: 1.6,
              maxWidth: '280px',
              margin: '0 auto',
            }}>
              Find travel buddies by exploring countries and joining matching systems!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {mockMatches.map((match, index) => (
              <button
                key={match.id}
                onClick={() => setSelectedMatch(match.id)}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.03)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '20px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  animation: 'slide-up 0.4s ease-out forwards',
                  animationDelay: `${index * 0.05}s`,
                  opacity: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.borderColor = 'rgba(20,184,166,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      border: '2px solid rgba(20,184,166,0.2)',
                    }}>
                      <Image src={match.avatar} alt={match.name} width={64} height={64} style={{ objectFit: 'cover' }} />
                    </div>
                    {match.isOnline && (
                      <div style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        width: '20px',
                        height: '20px',
                        borderRadius: '10px',
                        background: '#14b8a6',
                        border: '3px solid #030712',
                        animation: 'pulse-ring 2s ease-in-out infinite',
                      }} />
                    )}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#fff', fontWeight: 700, fontSize: '16px' }}>{match.name}</span>
                          {match.unread > 0 && (
                            <div style={{
                              minWidth: '18px',
                              height: '18px',
                              borderRadius: '9px',
                              background: '#ec4899',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '0 5px',
                            }}>
                              <span style={{ color: '#fff', fontSize: '10px', fontWeight: 700 }}>{match.unread}</span>
                            </div>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                          <span style={{ fontSize: '16px' }}>{match.countryFlag}</span>
                          <span style={{ color: '#14b8a6', fontSize: '13px', fontWeight: 600 }}>{match.country}</span>
                          <span style={{ color: '#64748b', fontSize: '13px' }}>• {match.matchPercentage}% match</span>
                        </div>
                      </div>
                      <span style={{ color: '#64748b', fontSize: '11px', flexShrink: 0 }}>
                        {match.lastMessageTime}
                      </span>
                    </div>

                    <p style={{
                      color: '#94a3b8',
                      fontSize: '14px',
                      lineHeight: 1.4,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      marginBottom: '8px',
                    }}>
                      {match.lastMessage}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <Calendar size={12} color="#64748b" />
                      <span style={{ color: '#64748b', fontSize: '12px' }}>{match.travelDates}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-ring {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(20,184,166,0.4);
          }
          50% {
            box-shadow: 0 0 0 6px rgba(20,184,166,0);
          }
        }
      `}</style>
    </div>
  );
}
