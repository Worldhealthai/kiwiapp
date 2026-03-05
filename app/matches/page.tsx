'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  MessageCircle, Calendar, Heart, Send, ArrowLeft,
  Sparkles, Users, Check, MapPin, X
} from 'lucide-react';

const mockMatches = [
  {
    id: '1',
    name: 'Sophie Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    country: 'New Zealand',
    countryFlag: '🇳🇿',
    travelDates: 'Mar 1 – Mar 21',
    lastMessage: 'Excited to meet up in Queenstown! 🏔️',
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
    travelDates: 'Apr 5 – Apr 20',
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
    travelDates: 'Feb 10 – Feb 28',
    lastMessage: 'The temples in Chiang Mai are amazing!',
    lastMessageTime: '3d ago',
    unread: 0,
    isOnline: true,
    matchPercentage: 92,
    sharedInterests: ['Culture', 'Temples', 'Relaxation'],
  },
];

type Match = typeof mockMatches[0];

function ChatView({ match, onBack }: { match: Match; onBack: () => void }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: match.lastMessage, isMe: false, time: match.lastMessageTime },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), text: message.trim(), isMe: true, time: 'Just now' }]);
    setMessage('');
  };

  return (
    <div style={{
      height: '100dvh',
      background: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
        background: 'rgba(3,7,18,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px' }}>
          <button onClick={onBack} className="pressable" style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ArrowLeft size={20} color="#fff" />
          </button>

          <div style={{ position: 'relative' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '14px',
              overflow: 'hidden',
              border: '1.5px solid rgba(20,184,166,0.3)',
            }}>
              <Image src={match.avatar} alt={match.name} width={44} height={44} style={{ objectFit: 'cover' }} />
            </div>
            {match.isOnline && (
              <div style={{
                position: 'absolute', bottom: '-1px', right: '-1px',
                width: '13px', height: '13px',
                borderRadius: '50%',
                background: '#22c55e',
                border: '2px solid #030712',
              }} />
            )}
          </div>

          <div style={{ flex: 1 }}>
            <p style={{ color: '#f8fafc', fontWeight: 700, fontSize: '16px', lineHeight: 1 }}>{match.name}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
              <span style={{ fontSize: '13px' }}>{match.countryFlag}</span>
              <span style={{ color: '#64748b', fontSize: '12px' }}>{match.country}</span>
              {match.isOnline && <span style={{ color: '#22c55e', fontSize: '11px', fontWeight: 600 }}>· Online</span>}
            </div>
          </div>

          <div style={{
            background: 'rgba(20,184,166,0.12)',
            border: '1px solid rgba(20,184,166,0.2)',
            borderRadius: '10px',
            padding: '5px 10px',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <Sparkles size={12} color="#14b8a6" />
            <span style={{ color: '#14b8a6', fontSize: '12px', fontWeight: 700 }}>{match.matchPercentage}%</span>
          </div>
        </div>

        {/* Shared interests */}
        <div style={{ padding: '0 16px 12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {match.sharedInterests.map((interest, i) => (
            <span key={i} style={{
              background: 'rgba(20,184,166,0.1)',
              border: '1px solid rgba(20,184,166,0.2)',
              padding: '3px 10px',
              borderRadius: '100px',
              color: '#2dd4bf',
              fontSize: '11px', fontWeight: 600,
            }}>
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {/* Match moment */}
        <div style={{
          textAlign: 'center',
          background: 'rgba(236,72,153,0.08)',
          border: '1px solid rgba(236,72,153,0.15)',
          borderRadius: '16px',
          padding: '14px',
          marginBottom: '20px',
          animation: 'fade-in 0.4s ease-out',
        }}>
          <Heart size={20} color="#ec4899" fill="#ec4899" style={{ margin: '0 auto 6px' }} />
          <p style={{ color: '#f472b6', fontSize: '13px', fontWeight: 600 }}>You matched with {match.name.split(' ')[0]}!</p>
          <p style={{ color: '#64748b', fontSize: '12px', marginTop: '3px' }}>Both heading to {match.country} · {match.travelDates}</p>
        </div>

        {messages.map(msg => (
          <div key={msg.id} style={{
            display: 'flex',
            justifyContent: msg.isMe ? 'flex-end' : 'flex-start',
            marginBottom: '12px',
            animation: 'slide-up 0.25s ease-out',
          }}>
            {!msg.isMe && (
              <div style={{
                width: '32px', height: '32px',
                borderRadius: '10px',
                overflow: 'hidden',
                marginRight: '8px',
                flexShrink: 0,
              }}>
                <Image src={match.avatar} alt={match.name} width={32} height={32} style={{ objectFit: 'cover' }} />
              </div>
            )}
            <div style={{ maxWidth: '78%' }}>
              <div style={{
                background: msg.isMe
                  ? 'linear-gradient(135deg, #14b8a6, #0d9488)'
                  : 'rgba(255,255,255,0.07)',
                border: msg.isMe ? 'none' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: msg.isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                padding: '11px 14px',
              }}>
                <p style={{ color: '#fff', fontSize: '14px', lineHeight: 1.5 }}>{msg.text}</p>
              </div>
              <p style={{ color: '#475569', fontSize: '11px', marginTop: '4px', textAlign: msg.isMe ? 'right' : 'left', paddingLeft: msg.isMe ? 0 : '4px' }}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{
        background: 'rgba(3,7,18,0.92)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '12px 16px',
        paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))',
        flexShrink: 0,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '10px 14px',
        }}>
          <input
            type="text"
            placeholder="Message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            style={{ flex: 1, background: 'none', border: 'none', color: '#f8fafc', fontSize: '15px' }}
          />
          <button
            onClick={sendMessage}
            disabled={!message.trim()}
            className="pressable"
            style={{
              width: '36px', height: '36px',
              borderRadius: '12px',
              background: message.trim() ? 'linear-gradient(135deg, #14b8a6, #0d9488)' : 'rgba(255,255,255,0.05)',
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s ease',
              boxShadow: message.trim() ? '0 4px 12px rgba(20,184,166,0.3)' : 'none',
            }}
          >
            <Send size={16} color={message.trim() ? '#fff' : '#475569'} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MatchesPage() {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);

  const match = selectedMatch ? mockMatches.find(m => m.id === selectedMatch) : null;
  if (match) return <ChatView match={match} onBack={() => setSelectedMatch(null)} />;

  const totalUnread = mockMatches.reduce((s, m) => s + m.unread, 0);
  const onlineCount = mockMatches.filter(m => m.isOnline).length;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>

      {/* Header */}
      <div style={{
        paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)',
        padding: 'calc(env(safe-area-inset-top, 0px) + 16px) 20px 16px',
        background: 'rgba(3,7,18,0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px', height: '44px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #ec4899, #db2777)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(236,72,153,0.3)',
          }}>
            <Heart size={22} color="#fff" fill="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#f8fafc' }}>Matches</h1>
            <p style={{ color: '#64748b', fontSize: '13px', marginTop: '1px' }}>
              {mockMatches.length} travel buddies
            </p>
          </div>
          {totalUnread > 0 && (
            <div style={{
              marginLeft: 'auto',
              background: '#ec4899',
              borderRadius: '100px',
              padding: '4px 10px',
              fontSize: '12px', fontWeight: 700, color: '#fff',
            }}>
              {totalUnread} new
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', padding: '16px 20px' }}>
        {[
          { label: 'Total', value: mockMatches.length, color: '#14b8a6', Icon: Users },
          { label: 'Online', value: onlineCount, color: '#22c55e', Icon: Sparkles },
          { label: 'Unread', value: totalUnread, color: '#ec4899', Icon: MessageCircle },
        ].map(({ label, value, color, Icon }) => (
          <div key={label} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '16px',
            padding: '14px 12px',
            textAlign: 'center',
          }}>
            <Icon size={16} color={color} style={{ margin: '0 auto 6px' }} />
            <div style={{ fontSize: '22px', fontWeight: 800, color }}>{value}</div>
            <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Matches List */}
      <div style={{ padding: '0 20px' }}>
        {mockMatches.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '24px',
          }}>
            <div style={{
              width: '72px', height: '72px', margin: '0 auto 20px',
              borderRadius: '24px',
              background: 'rgba(236,72,153,0.1)',
              border: '1px solid rgba(236,72,153,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Heart size={36} color="#ec4899" />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px' }}>No matches yet</h2>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, maxWidth: '260px', margin: '0 auto' }}>
              Explore countries and find travel buddies heading the same way!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {mockMatches.map((match, i) => (
              <button
                key={match.id}
                onClick={() => setSelectedMatch(match.id)}
                className="card-press pressable"
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${match.unread > 0 ? 'rgba(20,184,166,0.2)' : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: '20px',
                  padding: '14px 16px',
                  textAlign: 'left',
                  animation: 'slide-up 0.4s ease-out forwards',
                  animationDelay: `${i * 0.06}s`,
                  opacity: 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  {/* Avatar */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <div style={{
                      width: '58px', height: '58px',
                      borderRadius: '18px',
                      overflow: 'hidden',
                      border: `2px solid ${match.isOnline ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.08)'}`,
                    }}>
                      <Image src={match.avatar} alt={match.name} width={58} height={58} style={{ objectFit: 'cover' }} />
                    </div>
                    {match.isOnline && (
                      <div style={{
                        position: 'absolute', bottom: '-2px', right: '-2px',
                        width: '16px', height: '16px',
                        borderRadius: '50%',
                        background: '#22c55e',
                        border: '2.5px solid #030712',
                      }} />
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: '#f8fafc', fontWeight: 700, fontSize: '15px' }}>{match.name}</span>
                        {match.unread > 0 && (
                          <div style={{
                            minWidth: '18px', height: '18px',
                            borderRadius: '9px',
                            background: '#ec4899',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            padding: '0 5px',
                          }}>
                            <span style={{ color: '#fff', fontSize: '10px', fontWeight: 800 }}>{match.unread}</span>
                          </div>
                        )}
                      </div>
                      <span style={{ color: '#475569', fontSize: '11px', flexShrink: 0 }}>{match.lastMessageTime}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '14px' }}>{match.countryFlag}</span>
                      <span style={{ color: '#14b8a6', fontSize: '12px', fontWeight: 600 }}>{match.country}</span>
                      <span style={{ color: '#334155', fontSize: '12px' }}>·</span>
                      <Sparkles size={11} color="#64748b" />
                      <span style={{ color: '#64748b', fontSize: '12px' }}>{match.matchPercentage}%</span>
                    </div>

                    <p style={{
                      color: match.unread > 0 ? '#cbd5e1' : '#64748b',
                      fontSize: '13px',
                      lineHeight: 1.4,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontWeight: match.unread > 0 ? 500 : 400,
                      marginBottom: '8px',
                    }}>
                      {match.lastMessage}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={11} color="#475569" />
                      <span style={{ color: '#475569', fontSize: '11px' }}>{match.travelDates}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom padding */}
      <div style={{ height: '16px' }} />
    </div>
  );
}
