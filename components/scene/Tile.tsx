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

// Tek bir okey taşı: ahşap taban + krem üst yüz + sayı (veya joker işareti)
export default function Tile({ position, number, color }: TileProps) {
  // Taban yüksekliği 0.15; üst yüzey y = 0.075
  const TOP_Y = 0.075;
  // Krem panel kalınlığı
  const PANEL_H = 0.006;
  // Üst yüzeyin hemen üstü (z-fighting önlemi)
  const SURFACE_Y = TOP_Y + PANEL_H + 0.002;

  // number === 0 ise sahte okey — gerçek taşlarda 0 olmaz
  const isFakeJoker = number === 0;

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

      {isFakeJoker ? (
        // Sahte okey işareti: kırmızı daire, yüzeyin hemen üstünde
        <mesh position={[0, SURFACE_Y, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.04, 32]} />
          <meshStandardMaterial color="#c0392b" />
        </mesh>
      ) : (
        // Normal taş: sayıyı üst yüzeye yaz
        <Text
          position={[0, SURFACE_Y, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.18}
          color={TEXT_COLORS[color]}
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {String(number)}
        </Text>
      )}
    </group>
  );
}
