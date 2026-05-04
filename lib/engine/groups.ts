import type { TileGroup } from '../types/game';

// Per: 3-4 taş, hepsinin numarası aynı, hepsinin rengi farklı
export function isPer(tiles: TileGroup): boolean {
  if (tiles.length < 3 || tiles.length > 4) return false;

  // Sahte joker hariç taşları al
  const realTiles = tiles.filter((t) => !t.isFakeJoker);
  if (realTiles.length === 0) return false;

  const number = realTiles[0].number;
  const colorsUsed = new Set<string>();

  for (const tile of realTiles) {
    if (tile.number !== number) return false; // farklı sayı var
    if (colorsUsed.has(tile.color)) return false; // aynı renk tekrar edilmiş
    colorsUsed.add(tile.color);
  }

  return true;
}

// Seri: 3+ taş, aynı renk, ardışık sayılar (MVP'de 13'ten sonra 1'e dönmüyor)
export function isSeri(tiles: TileGroup): boolean {
  if (tiles.length < 3) return false;

  // Sahte jokerleri çıkar
  const realTiles = tiles.filter((t) => !t.isFakeJoker);
  if (realTiles.length === 0) return false;

  const color = realTiles[0].color;

  // Tüm gerçek taşlar aynı renk mi?
  if (!realTiles.every((t) => t.color === color)) return false;

  // Joker sayısını belirle (sahte joker adeti)
  const jokerCount = tiles.length - realTiles.length;

  // Sayıları sırala
  const numbers = realTiles.map((t) => t.number).sort((a, b) => a - b);

  // Ardışıklık boşluklarını jokerlerle doldurabilir miyiz?
  let jokersNeeded = 0;
  for (let i = 1; i < numbers.length; i++) {
    const gap = numbers[i] - numbers[i - 1] - 1;
    if (gap < 0) return false; // aynı sayı iki kez
    jokersNeeded += gap;
  }

  return jokersNeeded <= jokerCount;
}

// Grup geçerli mi? (per veya seri)
export function isValidGroup(tiles: TileGroup): boolean {
  return isPer(tiles) || isSeri(tiles);
}

// Grubun puan değeri = tüm taş numaralarının toplamı (jokerler max sayı sayılır)
export function groupValue(tiles: TileGroup): number {
  return tiles.reduce((sum, tile) => {
    // Sahte joker puan sayılmaz; gerçek okey taşı kendi değerindedir
    if (tile.isFakeJoker) return sum;
    return sum + tile.number;
  }, 0);
}
