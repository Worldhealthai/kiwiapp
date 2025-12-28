'use client';

import { useEffect, useState } from 'react';
import { Globe2, Plane, MapPin, Sparkles } from 'lucide-react';

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Stage 1: Logo appears (0-800ms)
    const timer1 = setTimeout(() => setStage(1), 300);

    // Stage 2: Text appears (800-1600ms)
    const timer2 = setTimeout(() => setStage(2), 1000);

    // Stage 3: Icons animate (1600-2400ms)
    const timer3 = setTimeout(() => setStage(3), 1800);

    // Stage 4: Fade out (2400-3000ms)
    const timer4 = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 400);
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(135deg, #030712 0%, #0f172a 50%, #1e293b 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      animation: stage >= 3 ? 'fadeOut 0.4s ease-out forwards' : 'none',
    }}>
      {/* Animated background orbs */}
      <div style={{
        position: 'absolute', top: '20%', right: '10%',
        width: '200px', height: '200px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(20,184,166,0.2) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'float 3s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '10%',
        width: '250px', height: '250px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)',
        filter: 'blur(40px)',
        animation: 'float 4s ease-in-out infinite reverse',
      }} />

      {/* Floating icons */}
      <div style={{
        position: 'absolute',
        top: '25%',
        left: '15%',
        opacity: stage >= 3 ? 1 : 0,
        animation: stage >= 3 ? 'floatIcon 2s ease-in-out infinite' : 'none',
        animationDelay: '0s',
      }}>
        <Plane size={24} color="#14b8a6" style={{ transform: 'rotate(45deg)' }} />
      </div>

      <div style={{
        position: 'absolute',
        top: '30%',
        right: '20%',
        opacity: stage >= 3 ? 1 : 0,
        animation: stage >= 3 ? 'floatIcon 2s ease-in-out infinite' : 'none',
        animationDelay: '0.5s',
      }}>
        <MapPin size={20} color="#ec4899" />
      </div>

      <div style={{
        position: 'absolute',
        bottom: '35%',
        left: '20%',
        opacity: stage >= 3 ? 1 : 0,
        animation: stage >= 3 ? 'floatIcon 2s ease-in-out infinite' : 'none',
        animationDelay: '1s',
      }}>
        <Sparkles size={22} color="#8b5cf6" />
      </div>

      {/* Main logo */}
      <div style={{
        position: 'relative',
        opacity: stage >= 0 ? 1 : 0,
        transform: stage >= 0 ? 'scale(1)' : 'scale(0.5)',
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '30px',
          background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 60px rgba(20,184,166,0.3)',
          animation: stage >= 1 ? 'pulse 2s ease-in-out infinite' : 'none',
        }}>
          <Globe2 size={60} color="#fff" strokeWidth={2.5} />
        </div>

        {/* Rotating ring */}
        <div style={{
          position: 'absolute',
          inset: '-10px',
          border: '2px solid rgba(20,184,166,0.3)',
          borderRadius: '36px',
          animation: stage >= 1 ? 'rotate 3s linear infinite' : 'none',
          borderTopColor: '#14b8a6',
        }} />
      </div>

      {/* App name */}
      <div style={{
        marginTop: '32px',
        opacity: stage >= 1 ? 1 : 0,
        transform: stage >= 1 ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s ease-out',
        textAlign: 'center',
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #fff 0%, #14b8a6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
          letterSpacing: '-0.02em',
        }}>
          Kiwi Travel
        </h1>
        <p style={{
          color: '#64748b',
          fontSize: '15px',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Explore • Connect • Travel
        </p>
      </div>

      {/* Loading indicator */}
      <div style={{
        marginTop: '48px',
        opacity: stage >= 2 ? 1 : 0,
        transition: 'opacity 0.4s ease-out',
      }}>
        <div style={{
          width: '150px',
          height: '3px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            width: '50%',
            height: '100%',
            background: 'linear-gradient(90deg, #14b8a6, #ec4899)',
            borderRadius: '2px',
            animation: 'loading 1s ease-in-out infinite',
          }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeOut {
          to {
            opacity: 0;
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes floatIcon {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 20px 60px rgba(20,184,166,0.3);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 25px 80px rgba(20,184,166,0.5);
          }
        }
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(300%);
          }
        }
      `}</style>
    </div>
  );
}
