'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Table from './Table';
import Tile from './Tile';

// Test taşları: 5 farklı renk ve sayı, masanın ortasında bir sıra
const TEST_TILES = [
  { position: [-0.8, 0.05, 0] as [number, number, number], number: 1,  color: 'red'    as const },
  { position: [-0.4, 0.05, 0] as [number, number, number], number: 5,  color: 'blue'   as const },
  { position: [ 0.0, 0.05, 0] as [number, number, number], number: 7,  color: 'black'  as const },
  { position: [ 0.4, 0.05, 0] as [number, number, number], number: 10, color: 'yellow' as const },
  { position: [ 0.8, 0.05, 0] as [number, number, number], number: 13, color: 'red'    as const },
];

export default function Scene() {
  return (
    // Canvas kendiliğinden parent boyutunu doldurur
    <Canvas camera={{ position: [0, 3, 4], fov: 50 }}>
      {/* Genel ortam ışığı */}
      <ambientLight intensity={0.4} />

      {/* Yönlü ışık, gölge aktif */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
      />

      <Table />

      {TEST_TILES.map((tile, i) => (
        <Tile
          key={i}
          position={tile.position}
          number={tile.number}
          color={tile.color}
        />
      ))}

      {/* Geliştirme aşamasında sahneyi fareyle döndürmek için */}
      <OrbitControls />
    </Canvas>
  );
}
