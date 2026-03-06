'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getCountryById } from '@/lib/countries';
import { useUserJourney } from '@/contexts/UserJourneyContext';
import { Send, Heart, ArrowLeft, Users, Smile, Paperclip, MessageSquare } from 'lucide-react';

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  time: string;
  likes: number;
  isLiked: boolean;
  isMe: boolean;
}

export default function CountryChatPage() {
  const params = useParams();
  const country = getCountryById(params.id as string);
  const { profile } = useUserJourney();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const userName = profile?.name || 'You';

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      user: userName,
      message: message.trim(),
      time: 'Just now',
      likes: 0,
      isLiked: false,
      isMe: true,
    };
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const toggleLike = (id: string) => {
    setMessages(prev => prev.map(msg =>
      msg.id === id
        ? { ...msg, likes: msg.isLiked ? msg.likes - 1 : msg.likes + 1, isLiked: !msg.isLiked }
        : msg
    ));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #030712 0%, #0f172a 100%)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'linear-gradient(180deg, #1e293b 0%, rgba(30,41,59,0.95) 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '16px 20px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href={`/country/${params.id}`} style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <ArrowLeft size={20} color="#fff" />
          </Link>

          <div style={{
            width: '48px', height: '48px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', flexShrink: 0,
          }}>
            {country.flagEmoji}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{
              fontSize: '17px', fontWeight: 700, color: '#fff', marginBottom: '2px',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {country.name} Community
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#14b8a6',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }} />
              <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>
                Community chat
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '20px',
        display: 'flex', flexDirection: 'column', gap: '16px',
      }}>
        {/* Welcome banner */}
        <div style={{
          background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)',
          borderRadius: '16px', padding: '16px', textAlign: 'center',
        }}>
          <Users size={24} color="#14b8a6" style={{ margin: '0 auto 8px' }} />
          <p style={{ color: '#14b8a6', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
            Welcome to {country.name} Community
          </p>
          <p style={{ color: '#64748b', fontSize: '13px', lineHeight: 1.5 }}>
            Share travel tips, ask questions, and connect with fellow travelers
          </p>
        </div>

        {/* Empty state when no messages */}
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '30px 20px' }}>
            <div style={{
              width: '60px', height: '60px', borderRadius: '18px', margin: '0 auto 14px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <MessageSquare size={26} color="#334155" />
            </div>
            <p style={{ color: '#475569', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
              No messages yet
            </p>
            <p style={{ color: '#334155', fontSize: '13px', lineHeight: 1.5 }}>
              Be the first to share a tip about {country.name}!
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} style={{
            display: 'flex', gap: '12px', alignItems: 'flex-start',
            flexDirection: msg.isMe ? 'row-reverse' : 'row',
            animation: 'slide-up 0.3s ease-out',
          }}>
            {/* Avatar initials */}
            {!msg.isMe && (
              <div style={{
                width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                border: '2px solid rgba(20,184,166,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#fff', fontSize: '14px', fontWeight: 700 }}>
                  {msg.user.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            <div style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: msg.isMe ? 'flex-end' : 'flex-start',
            }}>
              {!msg.isMe && (
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#14b8a6', marginBottom: '6px' }}>
                  {msg.user}
                </div>
              )}

              <div style={{
                maxWidth: '85%',
                background: msg.isMe
                  ? 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)'
                  : 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(10px)',
                border: msg.isMe ? 'none' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: msg.isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                padding: '12px 16px',
              }}>
                <p style={{ color: msg.isMe ? '#fff' : '#e2e8f0', fontSize: '15px', lineHeight: 1.5, wordWrap: 'break-word' }}>
                  {msg.message}
                </p>
              </div>

              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px',
                paddingLeft: msg.isMe ? 0 : '4px', paddingRight: msg.isMe ? '4px' : 0,
              }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>{msg.time}</span>
                {!msg.isMe && (
                  <button onClick={() => toggleLike(msg.id)} style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                  }}>
                    <Heart size={14} color={msg.isLiked ? '#ec4899' : '#64748b'} fill={msg.isLiked ? '#ec4899' : 'none'} />
                    {msg.likes > 0 && (
                      <span style={{ fontSize: '12px', color: msg.isLiked ? '#ec4899' : '#64748b', fontWeight: 600 }}>
                        {msg.likes}
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        position: 'sticky', bottom: '70px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(3,7,18,0.98) 20%, #030712 40%)',
        padding: '16px 20px 20px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: '12px',
          background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '12px 16px',
        }}>
          <button style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
          }}>
            <Paperclip size={18} color="#94a3b8" />
          </button>

          <input
            type="text"
            placeholder="Share your travel tips..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            style={{
              flex: 1, background: 'none', border: 'none',
              color: '#fff', fontSize: '15px', outline: 'none', fontFamily: 'inherit',
            }}
          />

          <button style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
          }}>
            <Smile size={18} color="#94a3b8" />
          </button>

          <button onClick={sendMessage} disabled={!message.trim()} style={{
            width: '40px', height: '40px', borderRadius: '12px', border: 'none',
            background: message.trim() ? 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)' : 'rgba(255,255,255,0.05)',
            cursor: message.trim() ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            transition: 'all 0.2s ease',
            boxShadow: message.trim() ? '0 4px 16px rgba(20,184,166,0.3)' : 'none',
          }}>
            <Send size={18} color={message.trim() ? '#fff' : '#64748b'} />
          </button>
        </div>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#64748b', marginTop: '12px' }}>
          Be respectful and share helpful travel advice
        </p>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
