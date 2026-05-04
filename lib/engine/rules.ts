import type { Player, TileGroup } from '../types/game';
import { isValidGroup, groupValue } from './groups';
import { OPENING_THRESHOLD } from './constants';

// Oyuncunun yere açmak istediği grupların toplam puanı OPENING_THRESHOLD'u sağlıyor mu?
// Tüm gruplar geçerli per veya seri olmalı
export function canOpen(player: Player, groups: TileGroup[]): boolean {
  if (groups.length === 0) return false;

  // Her grubun geçerli olup olmadığını kontrol et
  if (!groups.every(isValidGroup)) return false;

  // Toplam puan OPENING_THRESHOLD veya üstü mü?
  const total = groups.reduce((sum, group) => sum + groupValue(group), 0);
  return total >= OPENING_THRESHOLD;
}

// Oyuncunun tüm taşları bitmiş mi? (kazanma koşulu)
export function canFinish(player: Player): boolean {
  return player.hand.length === 0;
}
