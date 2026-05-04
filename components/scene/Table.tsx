// Yeşil çuhalı okey masası
export default function Table() {
  return (
    <mesh position={[0, 0, 0]}>
      {/* Genişlik 4, yükseklik 0.1, derinlik 3 */}
      <boxGeometry args={[4, 0.1, 3]} />
      <meshStandardMaterial
        color="#0a4d3a"
        roughness={0.8}
        metalness={0}
      />
    </mesh>
  );
}
