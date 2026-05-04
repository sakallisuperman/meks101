import type { Tile } from '../types/game';
import { determineOkey } from './deck';
import { TILES_PER_PLAYER, STARTING_PLAYER_BONUS } from './constants';

type DealResult = {
  hands: [Tile[], Tile[], Tile[]];  // 3 oyuncunun elleri
  indicatorTile: Tile;              // gösterge taşı
  okeyTile: Tile;                   // okey taşı
  remainingDeck: Tile[];            // kalan çekme destesi
};

// Karıştırılmış desteden 3 oyuncuya taş dağıtır
// Başlayan oyuncu (index 0) TILES_PER_PLAYER + STARTING_PLAYER_BONUS taş alır
// Diğer oyuncular TILES_PER_PLAYER taş alır
// 1 taş gösterge olarak çekilir, kalan DRAW_PILE_SIZE taş çekme destesi olur
export function dealTiles(shuffledDeck: Tile[]): DealResult {
  const deck = [...shuffledDeck];

  // İlk taşı gösterge olarak ayır
  const indicatorTile = deck.shift()!;
  const okeyTile = determineOkey(indicatorTile);

  // Dağıtım: başlayan oyuncuya bir fazla taş
  const hand0 = deck.splice(0, TILES_PER_PLAYER + STARTING_PLAYER_BONUS);
  const hand1 = deck.splice(0, TILES_PER_PLAYER);
  const hand2 = deck.splice(0, TILES_PER_PLAYER);

  // Kalan DRAW_PILE_SIZE taş çekme destesi
  const remainingDeck = deck;

  return {
    hands: [hand0, hand1, hand2],
    indicatorTile,
    okeyTile,
    remainingDeck,
  };
}
