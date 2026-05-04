// Taş renkleri
export type Color = 'red' | 'blue' | 'black' | 'yellow';

// Tek bir okey taşı
export type Tile = {
  id: string;
  color: Color;
  number: number;      // 1-13; sahte okey ise 0
  isFakeJoker: boolean; // sahte okey taşı mı?
};

// Yere açılan bir per veya seri
export type TileGroup = Tile[];

// Oyuncunun durumu
export type Player = {
  id: string;
  name: string;
  hand: Tile[];
  openedGroups: TileGroup[];
  hasOpened: boolean;  // OPENING_THRESHOLD puan yapıp yere açtı mı?
  score: number;
};

// Oyunun tüm anlık durumu
export type GameState = {
  players: [Player, Player, Player];
  deck: Tile[];               // çekme destesi
  discardPile: Tile[];        // atma destesi
  indicatorTile: Tile;        // gösterge taşı
  okeyTile: Tile;             // okey taşı (göstergenin bir fazlası)
  currentPlayerIndex: 0 | 1 | 2;
  phase: 'waiting' | 'drawing' | 'discarding' | 'finished';
  winnerId: string | null;
};
