import type { Color, Tile } from '../types/game';
import { FAKE_JOKER_COUNT } from './constants';

const COLORS: Color[] = ['red', 'blue', 'black', 'yellow'];

// TOTAL_DECK_SIZE taşlık tam Türk okey takımı oluşturur
export function createFullDeck(): Tile[] {
  const tiles: Tile[] = [];

  // Her renk, her sayı için 2 adet taş (4 renk × 13 sayı × 2 = 104 taş)
  for (const color of COLORS) {
    for (let number = 1; number <= 13; number++) {
      for (let copy = 0; copy < 2; copy++) {
        tiles.push({
          id: `${color}-${number}-${copy}`,
          color,
          number,
          isFakeJoker: false,
        });
      }
    }
  }

  // FAKE_JOKER_COUNT adet sahte okey taşı
  for (let i = 0; i < FAKE_JOKER_COUNT; i++) {
    tiles.push({ id: `fake-joker-${i}`, color: 'red', number: 0, isFakeJoker: true });
  }

  return tiles;
}

// Fisher-Yates algoritmasıyla deste karıştırma (yeni dizi döndürür)
export function shuffle(deck: Tile[]): Tile[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Gösterge taşına göre okey taşını belirler
// Klasik kural: göstergenin aynı renginden bir sonraki sayı; 13'ten sonra 1 gelir
export function determineOkey(indicator: Tile): Tile {
  if (indicator.isFakeJoker) {
    // Sahte okey gösterge olursa okey = siyah 7 (yaygın kural)
    return { id: 'okey-from-fake', color: 'black', number: 7, isFakeJoker: false };
  }
  const okeyNumber = indicator.number === 13 ? 1 : indicator.number + 1;
  return {
    id: `okey-ref-${indicator.color}-${okeyNumber}`,
    color: indicator.color,
    number: okeyNumber,
    isFakeJoker: false,
  };
}
