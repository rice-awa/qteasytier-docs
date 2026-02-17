import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface FeatureCardGridProps {
  columns?: 2 | 3;
  children: React.ReactNode;
}

export default function FeatureCardGrid({ columns = 2, children }: FeatureCardGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // Grid 容器淡入
    gsap.fromTo(grid,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }
    );
  }, []);

  return (
    <div
      ref={gridRef}
      style={{
        display: 'grid',
        gap: '1.5rem',
        margin: '1.5rem 0',
        gridTemplateColumns: 'repeat(1, 1fr)',
      }}
    >
      <style>{`
        @media (min-width: 640px) {
          .grid-cols-${columns} {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .grid-cols-3 {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
      {children}
    </div>
  );
}
