import type { Tile as TileData } from '@/lib/types/game';
import TileDisplay from './Tile';

type PlayerHandProps = {
  tiles: TileData[];
  position: [number, number, number];
  rotation: [number, number, number];
};

// Taş genişliği (0.3) + boşluk (0.02)
const TILE_STEP = 0.32;
// Alt ve üst sıra arasındaki z mesafesi
const ROW_DEPTH = 0.42;
// Taşların hafif öne eğikliği (≈12 derece)
const TILE_TILT = -0.21;
// Taşların masa yüzeyinden yüksekliği
const TILE_Y = 0.05;

// n taşı x ekseninde ortalar, index'e göre offset döner
function centeredX(count: number, index: number): number {
  return (index - (count - 1) / 2) * TILE_STEP;
}

// Oyuncunun elini 2 sıra halinde gösterir
// Alt sıra (kameraya yakın): ceil(n/2) taş
// Üst sıra (kameradan uzak) : floor(n/2) taş
export default function PlayerHand({ tiles, position, rotation }: PlayerHandProps) {
  const bottomCount = Math.ceil(tiles.length / 2);
  const bottomTiles = tiles.slice(0, bottomCount);
  const topTiles = tiles.slice(bottomCount);
  const topCount = topTiles.length;

  return (
    <group position={position} rotation={rotation}>
      {/* Alt sıra — kameraya yakın */}
      {bottomTiles.map((tile, i) => (
        <group
          key={tile.id}
          position={[centeredX(bottomCount, i), TILE_Y, ROW_DEPTH / 2]}
          rotation={[TILE_TILT, 0, 0]}
        >
          <TileDisplay
            position={[0, 0, 0]}
            number={tile.number}
            color={tile.color}
          />
        </group>
      ))}

      {/* Üst sıra — kameradan uzak */}
      {topTiles.map((tile, i) => (
        <group
          key={tile.id}
          position={[centeredX(topCount, i), TILE_Y, -ROW_DEPTH / 2]}
          rotation={[TILE_TILT, 0, 0]}
        >
          <TileDisplay
            position={[0, 0, 0]}
            number={tile.number}
            color={tile.color}
          />
        </group>
      ))}
    </group>
  );
}
