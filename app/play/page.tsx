'use client';

import dynamic from 'next/dynamic';

// Three.js window objesine ihtiyaç duyar — SSR'da çalışmaz, ssr: false zorunlu
const Scene = dynamic(() => import('@/components/scene/Scene'), { ssr: false });

export default function PlayPage() {
  return (
    <main style={{ width: '100vw', height: '100vh', background: '#1a1a1a' }}>
      <Scene />
    </main>
  );
}
