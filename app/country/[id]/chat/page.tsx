'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getCountryById } from '@/lib/countries';
import { Send, ImageIcon, Heart } from 'lucide-react';

const mockMessages = [
  { id: '1', user: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', message: 'Just got back! The bungee jumping was incredible!', time: '2h ago', likes: 12 },
  { id: '2', user: 'Mike', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', message: 'Anyone have recommendations for hiking tracks?', time: '3h ago', likes: 8 },
  { id: '3', user: 'Emma', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', message: 'Book your huts early! They fill up months in advance.', time: '4h ago', likes: 15 },
];

export default function CountryChatPage() {
  const params = useParams();
  const country = getCountryById(params.id as string);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  if (!country) {
    return <div style={{ padding: '20px', color: '#fff' }}>Country not found</div>;
  }

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, {
      id: Date.now().toString(),
      user: 'You',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      message: message.trim(),
      time: 'Just now',
      likes: 0,
    }]);
    setMessage('');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '16px',
        background: '#1a365d',
        borderBottom: '1px solid #2d4a6f',
      }}>
        <span style={{ fontSize: '36px' }}>{country.flagEmoji}</span>
        <div style={{ marginLeft: '12px' }}>
          <h1 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>{country.name} Community</h1>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4fd1c5', marginRight: '6px' }} />
            <span style={{ fontSize: '12px', color: '#a0aec0' }}>24 travelers online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto', paddingBottom: '80px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ display: 'flex', marginBottom: '16px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '18px', overflow: 'hidden', flexShrink: 0 }}>
              <Image src={msg.avatar} alt={msg.user} width={36} height={36} />
            </div>
            <div style={{
              marginLeft: '8px',
              background: '#1e3a5f',
              borderRadius: '16px',
              borderBottomLeftRadius: '4px',
              padding: '12px',
              maxWidth: '75%',
            }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#4fd1c5', marginBottom: '4px' }}>{msg.user}</div>
              <p style={{ color: '#fff', fontSize: '14px', lineHeight: '20px' }}>{msg.message}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>{msg.time}</span>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}>
                  <Heart size={14} color="#a0aec0" />
                  <span style={{ fontSize: '11px', color: '#a0aec0' }}>{msg.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{
        position: 'fixed',
        bottom: '70px',
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'flex-end',
        padding: '12px',
        background: '#1a365d',
        borderTop: '1px solid #2d4a6f',
      }}>
        <button style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}>
          <ImageIcon size={24} color="#a0aec0" />
        </button>
        <input
          type="text"
          placeholder="Share your travel tips..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          style={{
            flex: 1,
            background: '#0f172a',
            border: 'none',
            borderRadius: '20px',
            padding: '10px 16px',
            color: '#fff',
            fontSize: '14px',
            margin: '0 8px',
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!message.trim()}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '20px',
            background: message.trim() ? '#2563eb' : '#1e3a5f',
            border: 'none',
            cursor: message.trim() ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Send size={20} color={message.trim() ? '#fff' : '#64748b'} />
        </button>
      </div>
    </div>
  );
}
