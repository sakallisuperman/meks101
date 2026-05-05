import { Text, Billboard } from '@react-three/drei';

type PlayerSeatProps = {
  name: string;
  tileCount: number;
  position: [number, number, number];
  rotation: [number, number, number];
};

// Kutu: masa yüzeyinden yükseklik (0.15 / 2 + 0.05 table top)
const BOX_Y = 0.125;

// Rakibin masadaki yerini gösteren yer işareti
// Kutu sabit kalır, etiket Billboard ile her zaman kameraya bakar
export default function PlayerSeat({ name, tileCount, position, rotation }: PlayerSeatProps) {
  return (
    <group position={position} rotation={rotation}>
      {/* Kapalı taş destesi — rakibin elini temsil eder */}
      <mesh position={[0, BOX_Y, 0]}>
        <boxGeometry args={[1.5, 0.15, 0.4]} />
        <meshStandardMaterial color="#2d1505" roughness={0.9} metalness={0} />
      </mesh>

      {/* İsim etiketi — Billboard sayesinde her zaman kameraya bakar */}
      <Billboard position={[0, 0.4, 0]}>
        <Text
          fontSize={0.15}
          color="#f5e6c3"
          anchorX="center"
          anchorY="middle"
        >
          {`${name} — ${tileCount} taş`}
        </Text>
      </Billboard>
    </group>
  );
}
