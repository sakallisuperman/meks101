import { Text } from '@react-three/drei';

type TileColor = 'red' | 'blue' | 'black' | 'yellow';

type TileProps = {
  position: [number, number, number];
  number: number;
  color: TileColor;
};

// Renk kodu → yazı rengi eşleşmesi
const TEXT_COLORS: Record<TileColor, string> = {
  red: '#c0392b',
  blue: '#1e3a8a',
  black: '#1a1a1a',
  yellow: '#b8860b',
};

// Tek bir okey taşı: ahşap taban + krem üst yüz + sayı
export default function Tile({ position, number, color }: TileProps) {
  // Taban yüksekliği 0.15; üst yüzey y = 0.075
  const TOP_Y = 0.075;
  // Krem panel kalınlığı
  const PANEL_H = 0.006;

  return (
    <group position={position}>
      {/* Ahşap taban gövde */}
      <mesh>
        <boxGeometry args={[0.3, 0.15, 0.4]} />
        <meshStandardMaterial color="#d4b896" roughness={0.8} metalness={0} />
      </mesh>

      {/* Krem üst panel — ahşap çerçeve görünsün diye biraz küçük */}
      <mesh position={[0, TOP_Y + PANEL_H / 2, 0]}>
        <boxGeometry args={[0.25, PANEL_H, 0.35]} />
        <meshStandardMaterial color="#f7e9c8" roughness={0.5} metalness={0} />
      </mesh>

      {/* Sayı — üst yüzeye bak, z-fighting'i önlemek için panelin biraz üstünde */}
      <Text
        position={[0, TOP_Y + PANEL_H + 0.002, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.18}
        color={TEXT_COLORS[color]}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {String(number)}
      </Text>
    </group>
  );
}
