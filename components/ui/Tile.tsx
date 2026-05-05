import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Tile as TileData } from '@/lib/types/game';

// Renk → Tailwind metin rengi
const COLOR_CLASS: Record<string, string> = {
  red: 'text-red-600',
  blue: 'text-blue-700',
  black: 'text-stone-900',
  yellow: 'text-yellow-600',
};

type TileProps = {
  tile: TileData;
  onClick?: () => void;
  // Drag overlay içinde render edilirken sortable davranışı istemiyoruz
  overlay?: boolean;
};

// Tek bir okey taşı: krem zemin, renkli sayı veya joker noktası
// useSortable ile sürükle-bırak desteği — overlay=true ise sadece görsel
export default function Tile({ tile, onClick, overlay = false }: TileProps) {
  const isFakeJoker = tile.isFakeJoker || tile.number === 0;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tile.id, disabled: overlay });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={[
        'flex items-center justify-center',
        'w-12 h-16 sm:w-14 sm:h-20',
        'bg-stone-100 border border-stone-300 rounded-md shadow-md',
        'hover:shadow-lg hover:-translate-y-1 transition-all',
        isDragging ? 'shadow-2xl scale-110' : '',
        onClick ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing',
      ].join(' ')}
    >
      {isFakeJoker ? (
        // Sahte okey — kırmızı dolgun nokta
        <span className="rounded-full bg-red-700 w-3 h-3 block" />
      ) : (
        // Normal taş — renkli sayı
        <span className={`font-bold text-2xl leading-none ${COLOR_CLASS[tile.color]}`}>
          {tile.number}
        </span>
      )}
    </div>
  );
}
