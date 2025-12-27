'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCountryById } from '@/lib/countries';
import { Calendar, DollarSign, Languages, Star, Lightbulb, MessageCircle, Heart, CheckCircle } from 'lucide-react';

export default function CountryDetailPage() {
  const params = useParams();
  const country = getCountryById(params.id as string);

  if (!country) {
    return <div style={{ padding: '20px', color: '#fff' }}>Country not found</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a' }}>
      {/* Cover Image */}
      <div style={{ position: 'relative', height: '250px' }}>
        <Image
          src={country.coverImage}
          alt={country.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Header Card */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        background: '#1a365d',
        margin: '-30px 16px 0',
        padding: '20px',
        borderRadius: '16px',
        position: 'relative',
        zIndex: 1,
      }}>
        <span style={{ fontSize: '48px' }}>{country.flagEmoji}</span>
        <div style={{ marginLeft: '16px', flex: 1 }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>{country.name}</h1>
          <p style={{ color: '#a0aec0', marginTop: '4px' }}>{country.continent}</p>
        </div>
        {country.visited && (
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '18px',
            background: 'rgba(79,209,197,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <CheckCircle size={20} color="#4fd1c5" />
          </div>
        )}
      </div>

      {/* Quick Info */}
      <div style={{
        display: 'flex',
        background: '#1e3a5f',
        margin: '16px',
        padding: '16px',
        borderRadius: '16px',
      }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <Calendar size={20} color="#4fd1c5" style={{ margin: '0 auto' }} />
          <div style={{ fontSize: '10px', color: '#a0aec0', marginTop: '8px' }}>Best Time</div>
          <div style={{ fontSize: '12px', color: '#fff', marginTop: '4px' }}>{country.bestTimeToVisit}</div>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <DollarSign size={20} color="#4fd1c5" style={{ margin: '0 auto' }} />
          <div style={{ fontSize: '10px', color: '#a0aec0', marginTop: '8px' }}>Currency</div>
          <div style={{ fontSize: '12px', color: '#fff', marginTop: '4px' }}>{country.currency}</div>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <Languages size={20} color="#4fd1c5" style={{ margin: '0 auto' }} />
          <div style={{ fontSize: '10px', color: '#a0aec0', marginTop: '8px' }}>Language</div>
          <div style={{ fontSize: '12px', color: '#fff', marginTop: '4px' }}>{country.language}</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '0 16px' }}>
        {/* About */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' }}>About</h2>
          <p style={{ color: '#cbd5e1', lineHeight: '24px' }}>{country.description}</p>
        </section>

        {/* Highlights */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' }}>Highlights</h2>
          {country.highlights.map((highlight, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px', gap: '12px' }}>
              <Star size={16} color="#f59e0b" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span style={{ color: '#cbd5e1', lineHeight: '22px' }}>{highlight}</span>
            </div>
          ))}
        </section>

        {/* Travel Tips */}
        <section style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' }}>Travel Tips</h2>
          {country.travelTips.map((tip, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '12px', gap: '12px' }}>
              <Lightbulb size={16} color="#4fd1c5" style={{ flexShrink: 0, marginTop: '3px' }} />
              <span style={{ color: '#cbd5e1', lineHeight: '22px' }}>{tip}</span>
            </div>
          ))}
        </section>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', padding: '16px', paddingBottom: '90px' }}>
        <Link
          href={`/country/${country.id}/chat`}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: '#7c3aed',
            padding: '16px',
            borderRadius: '12px',
            color: '#fff',
            fontWeight: 600,
          }}
        >
          <MessageCircle size={24} /> Join Chat
        </Link>
        <Link
          href={`/country/${country.id}/match`}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: '#ec4899',
            padding: '16px',
            borderRadius: '12px',
            color: '#fff',
            fontWeight: 600,
          }}
        >
          <Heart size={24} /> Find Buddies
        </Link>
      </div>
    </div>
  );
}
