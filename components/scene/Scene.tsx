'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { createGame } from '@/lib/engine/game';
import Table from './Table';
import PlayerHand from './PlayerHand';
import PlayerSeat from './PlayerSeat';

export default function Scene() {
  // Oyun başlangıç durumunu bir kez oluştur (lazy initializer)
  const [gameState] = useState(() => createGame(['Sen', 'Ayşe', 'Mehmet']));

  // Geliştirme için taş sayılarını logla
  console.log('Oyun durumu:', gameState);
  console.log('Senin elin:', gameState.players[0].hand.length, 'taş');
  console.log('Ayşe:', gameState.players[1].hand.length, 'taş');
  console.log('Mehmet:', gameState.players[2].hand.length, 'taş');

  return (
    <Canvas camera={{ position: [0, 2.2, 2.2], fov: 45 }}>
      {/* Kamera — makeDefault ile varsayılan kamera olarak ayarla */}
      <PerspectiveCamera makeDefault position={[0, 2.2, 2.2]} fov={45} />

      {/* Genel ortam ışığı */}
      <ambientLight intensity={0.4} />

      {/* Yönlü ışık, gölge aktif */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
      />

      <Table />

      {/* Oyuncunun eli — ön taraf, kameraya yakın */}
      <PlayerHand
        tiles={gameState.players[0].hand}
        position={[0, 0, 0.9]}
        rotation={[0, 0, 0]}
      />

      {/* Ayşe — sol taraf */}
      <PlayerSeat
        name="Ayşe"
        tileCount={gameState.players[1].hand.length}
        position={[-1.5, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />

      {/* Mehmet — sağ taraf */}
      <PlayerSeat
        name="Mehmet"
        tileCount={gameState.players[2].hand.length}
        position={[1.5, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />

      {/* Geliştirme aşamasında fareyle döndürme — zoom kapalı */}
      <OrbitControls enableZoom={false} target={[0, 0, 0.3]} />
    </Canvas>
  );
}
