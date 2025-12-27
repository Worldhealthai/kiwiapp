'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MessageCircle, Calendar, MapPin } from 'lucide-react';

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
  },
];

export default function MatchesPage() {
  const [selectedMatch, setSelectedMatch] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  if (selectedMatch) {
    const match = mockMatches.find(m => m.id === selectedMatch);
    if (!match) return null;

    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', flexDirection: 'column' }}>
        {/* Chat Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          background: '#1a365d',
          borderBottom: '1px solid #2d4a6f',
        }}>
          <button
            onClick={() => setSelectedMatch(null)}
            style={{ background: 'none', border: 'none', color: '#4fd1c5', fontSize: '16px', cursor: 'pointer', marginRight: '12px' }}
          >
            ← Back
          </button>
          <div style={{ width: '40px', height: '40px', borderRadius: '20px', overflow: 'hidden' }}>
            <Image src={match.avatar} alt={match.name} width={40} height={40} />
          </div>
          <div style={{ marginLeft: '12px', flex: 1 }}>
            <div style={{ color: '#fff', fontWeight: 600 }}>{match.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>{match.countryFlag}</span>
              <span style={{ color: '#a0aec0', fontSize: '12px' }}>{match.country}</span>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
          <div style={{
            background: '#1e3a5f',
            padding: '12px 16px',
            borderRadius: '16px',
            maxWidth: '80%',
            marginBottom: '12px',
          }}>
            <p style={{ color: '#fff', fontSize: '14px' }}>{match.lastMessage}</p>
            <span style={{ color: '#64748b', fontSize: '11px' }}>{match.lastMessageTime}</span>
          </div>
          <p style={{ color: '#64748b', textAlign: 'center', fontSize: '12px', marginTop: '20px' }}>
            Start your conversation!
          </p>
        </div>

        {/* Chat Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px',
          background: '#1a365d',
          borderTop: '1px solid #2d4a6f',
          marginBottom: '70px',
        }}>
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{
              flex: 1,
              background: '#0f172a',
              border: 'none',
              borderRadius: '20px',
              padding: '10px 16px',
              color: '#fff',
              fontSize: '14px',
            }}
          />
          <button style={{
            marginLeft: '8px',
            width: '40px',
            height: '40px',
            borderRadius: '20px',
            background: '#2563eb',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <MessageCircle size={20} color="#fff" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', padding: '16px', paddingBottom: '90px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>Your Matches</h1>
      <p style={{ color: '#a0aec0', marginBottom: '24px' }}>Connect with your travel buddies</p>

      {mockMatches.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <MessageCircle size={64} color="#4fd1c5" style={{ margin: '0 auto' }} />
          <h2 style={{ color: '#fff', marginTop: '20px', fontSize: '20px' }}>No matches yet</h2>
          <p style={{ color: '#a0aec0', marginTop: '8px' }}>
            Find travel buddies by exploring countries!
          </p>
        </div>
      ) : (
        <div>
          {mockMatches.map((match) => (
            <button
              key={match.id}
              onClick={() => setSelectedMatch(match.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                background: '#1e3a5f',
                padding: '16px',
                borderRadius: '16px',
                marginBottom: '12px',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <div style={{ position: 'relative' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '28px', overflow: 'hidden' }}>
                  <Image src={match.avatar} alt={match.name} width={56} height={56} />
                </div>
                {match.isOnline && (
                  <div style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    width: '14px',
                    height: '14px',
                    borderRadius: '7px',
                    background: '#4fd1c5',
                    border: '2px solid #1e3a5f',
                  }} />
                )}
              </div>
              <div style={{ flex: 1, marginLeft: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{match.name}</span>
                  <span style={{ color: '#64748b', fontSize: '12px' }}>{match.lastMessageTime}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <span>{match.countryFlag}</span>
                  <span style={{ color: '#4fd1c5', fontSize: '12px' }}>{match.country}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                  <p style={{ color: '#a0aec0', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                    {match.lastMessage}
                  </p>
                  {match.unread > 0 && (
                    <div style={{
                      minWidth: '20px',
                      height: '20px',
                      borderRadius: '10px',
                      background: '#ec4899',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '0 6px',
                    }}>
                      <span style={{ color: '#fff', fontSize: '11px', fontWeight: 600 }}>{match.unread}</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
