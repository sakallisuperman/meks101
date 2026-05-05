type OpponentSeatProps = {
  name: string;
  tileCount: number;
  isCurrentTurn: boolean;
};

// Rakip oyuncunun gösterimi: isim, taş sayısı, sıra göstergesi
export default function OpponentSeat({ name, tileCount, isCurrentTurn }: OpponentSeatProps) {
  // Sıra varsa altın renkli halka
  const ringClass = isCurrentTurn ? 'ring-2 ring-amber-400' : '';

  return (
    <div className={`bg-stone-800 text-amber-100 px-4 py-3 rounded-lg ${ringClass}`}>
      <p className="font-semibold">{name}</p>
      <p className="text-sm opacity-80">{tileCount} taş</p>

      {/* Taş ikonları — max 21 küçük gri kutucuk */}
      <div className="flex flex-wrap gap-0.5 mt-2">
        {Array.from({ length: Math.min(tileCount, 21) }).map((_, i) => (
          <div key={i} className="w-2 h-3 bg-stone-500 rounded-sm" />
        ))}
      </div>
    </div>
  );
}
