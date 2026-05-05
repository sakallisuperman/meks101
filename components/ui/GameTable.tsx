import type { GameState } from '@/lib/types/game';
import OpponentSeat from './OpponentSeat';
import PlayerHand from './PlayerHand';
import Tile from './Tile';

type GameTableProps = {
  gameState: GameState;
};

// Ana oyun ekranı: yeşil çuhalı arka plan, rakipler üstte, el altta
export default function GameTable({ gameState }: GameTableProps) {
  const { players, deck, discardPile, indicatorTile, currentPlayerIndex } = gameState;
  const [me, ayse, mehmet] = players;

  // Atılan taşların en üstü (varsa)
  const lastDiscard = discardPile.length > 0 ? discardPile[discardPile.length - 1] : null;

  return (
    <div className="min-h-screen w-full bg-emerald-900 flex flex-col text-white">

      {/* Üst bölüm — rakipler */}
      <div className="flex justify-center gap-8 p-6">
        <OpponentSeat
          name={ayse.name}
          tileCount={ayse.hand.length}
          isCurrentTurn={currentPlayerIndex === 1}
        />
        <OpponentSeat
          name={mehmet.name}
          tileCount={mehmet.hand.length}
          isCurrentTurn={currentPlayerIndex === 2}
        />
      </div>

      {/* Orta bölüm — deste, gösterge, atılan */}
      <div className="flex justify-center items-center gap-6 py-4 px-6">

        {/* Çekme destesi */}
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-16 sm:w-14 sm:h-20 bg-stone-700 border-2 border-stone-500 rounded-md flex items-center justify-center shadow-lg">
            <span className="text-xs text-stone-300 font-medium">{deck.length}</span>
          </div>
          <span className="text-xs text-emerald-300">Deste</span>
        </div>

        {/* Gösterge taşı */}
        <div className="flex flex-col items-center gap-1">
          <Tile tile={indicatorTile} />
          <span className="text-xs text-emerald-300">Gösterge</span>
        </div>

        {/* Atılan taşlar */}
        <div className="flex flex-col items-center gap-1">
          {lastDiscard ? (
            <Tile tile={lastDiscard} />
          ) : (
            <div className="w-12 h-16 sm:w-14 sm:h-20 border-2 border-dashed border-stone-500 rounded-md" />
          )}
          <span className="text-xs text-emerald-300">Atılan</span>
        </div>

      </div>

      {/* Sıra göstergesi */}
      <div className="text-center text-sm text-amber-300 pb-2">
        {currentPlayerIndex === 0 ? '🟢 Senin sıran' : `⏳ ${players[currentPlayerIndex].name} oynuyor`}
      </div>

      {/* Alt bölüm — oyuncunun eli */}
      <div className="mt-auto p-4">
        <p className="text-xs text-emerald-300 mb-2">
          Senin elin ({me.hand.length} taş)
          {currentPlayerIndex === 0 && <span className="ml-2 text-amber-300 font-semibold">← Senin sıran</span>}
        </p>
        <PlayerHand tiles={me.hand} />
      </div>

    </div>
  );
}
