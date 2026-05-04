import type { Player, TileGroup } from '../types/game';
import { isValidGroup, groupValue } from './groups';

// Oyuncunun yere açmak istediği grupların toplam puanı 121'i sağlıyor mu?
// Tüm gruplar geçerli per veya seri olmalı
export function canOpen(player: Player, groups: TileGroup[]): boolean {
  if (groups.length === 0) return false;

  // Her grubun geçerli olup olmadığını kontrol et
  if (!groups.every(isValidGroup)) return false;

  // Toplam puan 121 veya üstü mü?
  const total = groups.reduce((sum, group) => sum + groupValue(group), 0);
  return total >= 121;
}

// Oyuncunun tüm taşları bitmiş mi? (kazanma koşulu)
export function canFinish(player: Player): boolean {
  return player.hand.length === 0;
}
