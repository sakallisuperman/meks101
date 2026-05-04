import type { Tile } from '../types/game';
import { determineOkey } from './deck';

type DealResult = {
  hands: [Tile[], Tile[], Tile[]];  // 3 oyuncunun elleri
  indicatorTile: Tile;              // gösterge taşı
  okeyTile: Tile;                   // okey taşı
  remainingDeck: Tile[];            // kalan çekme destesi
};

// Karıştırılmış desteden 3 oyuncuya taş dağıtır
// Başlayan oyuncu (index 0) 29 taş, diğerleri 28 taş alır
// 1 taş gösterge olarak çekilir, kalan 21 taş çekme destesi olur
export function dealTiles(shuffledDeck: Tile[]): DealResult {
  const deck = [...shuffledDeck];

  // İlk taşı gösterge olarak ayır
  const indicatorTile = deck.shift()!;
  const okeyTile = determineOkey(indicatorTile);

  // Dağıtım: oyuncu 0 → 29, oyuncu 1 → 28, oyuncu 2 → 28
  const hand0 = deck.splice(0, 29);
  const hand1 = deck.splice(0, 28);
  const hand2 = deck.splice(0, 28);

  // Kalan 21 taş çekme destesi
  const remainingDeck = deck;

  return {
    hands: [hand0, hand1, hand2],
    indicatorTile,
    okeyTile,
    remainingDeck,
  };
}
