import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

interface FeatureCardProps {
  title: string;
  icon: 'laptop' | 'gamepad' | 'pencil' | 'rocket' | 'link' | 'setting' | 'git';
  delay?: number;
  children: React.ReactNode;
}

const iconColors: Record<string, { from: string; to: string }> = {
  laptop: { from: '#0891B2', to: '#22D3EE' },      // 青蓝
  gamepad: { from: '#8B5CF6', to: '#EC4899' },     // 紫粉
  pencil: { from: '#10B981', to: '#34D399' },      // 绿色
  rocket: { from: '#F97316', to: '#FBBF24' },      // 橙黄
  link: { from: '#6366F1', to: '#818CF8' },        // 靛蓝
  setting: { from: '#0EA5E9', to: '#38BDF8' },     // 天蓝
  git: { from: '#64748B', to: '#94A3B8' },         // 灰蓝
};

const icons: Record<string, JSX.Element> = {
  laptop: (
    <>
      <rect width="18" height="12" x="3" y="4" rx="2" ry="2"/>
      <line x1="2" x2="22" y1="20" y2="20"/>
    </>
  ),
  gamepad: (
    <>
      <line x1="6" x2="10" y1="12" y2="12"/>
      <line x1="8" x2="8" y1="10" y2="14"/>
      <line x1="15" x2="15.01" y1="13" y2="13"/>
      <line x1="18" x2="18.01" y1="11" y2="11"/>
      <rect width="20" height="12" x="2" y="6" rx="2"/>
    </>
  ),
  pencil: (
    <>
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
      <path d="m15 5 4 4"/>
    </>
  ),
  rocket: (
    <>
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </>
  ),
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </>
  ),
  setting: (
    <>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
      <circle cx="12" cy="12" r="3"/>
    </>
  ),
  git: (
    <>
      <circle cx="12" cy="18" r="3"/>
      <circle cx="6" cy="6" r="3"/>
      <circle cx="18" cy="6" r="3"/>
      <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/>
      <path d="M12 12v3"/>
    </>
  ),
};

export default function FeatureCard({ title, icon, delay = 0, children }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);
  const colors = iconColors[icon] || iconColors.laptop;

  useEffect(() => {
    // 检测深色模式
    const checkDark = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDark(theme === 'dark');
    };
    
    checkDark();
    
    // 监听主题变化
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    const iconWrapper = iconRef.current;
    
    if (!card || !iconWrapper) return;

    // 入场动画
    gsap.fromTo(card, 
      { 
        opacity: 0, 
        y: 60,
        scale: 0.9,
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: delay / 1000,
        ease: 'power3.out',
      }
    );

    // 图标入场动画
    gsap.fromTo(iconWrapper,
      {
        scale: 0,
        rotation: -180,
      },
      {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        delay: delay / 1000 + 0.2,
        ease: 'back.out(1.7)',
      }
    );

    // Hover 动画
    const handleEnter = () => {
      gsap.to(card, {
        y: -8,
        boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.3)' : '0 20px 40px rgba(0,0,0,0.15)',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(iconWrapper, {
        scale: 1.15,
        rotation: 5,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleLeave = () => {
      gsap.to(card, {
        y: 0,
        boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.25)' : '0 4px 20px rgba(0,0,0,0.06)',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(iconWrapper, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleEnter);
    card.addEventListener('mouseleave', handleLeave);

    return () => {
      card.removeEventListener('mouseenter', handleEnter);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, [delay, isDark]);

  return (
    <div
      ref={cardRef}
      style={{
        background: isDark ? 'rgba(30, 41, 59, 0.85)' : 'rgba(255, 255, 255, 0.85)',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.25)' : '0 4px 20px rgba(0, 0, 0, 0.06)',
        border: isDark ? '1px solid rgba(51, 65, 85, 0.6)' : '1px solid rgba(226, 232, 240, 0.6)',
        cursor: 'default',
        willChange: 'transform',
      }}
    >
      <div
        ref={iconRef}
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icons[icon]}
        </svg>
      </div>
      <h3 style={{
        fontSize: '1.125rem',
        fontWeight: 600,
        color: isDark ? '#ECFEFF' : '#164E63',
        margin: '0 0 0.5rem 0',
      }}>
        {title}
      </h3>
      <div style={{
        color: isDark ? '#94a3b8' : '#64748b',
        lineHeight: 1.6,
        fontSize: '0.9rem',
      }}>
        {children}
      </div>
    </div>
  );
}
