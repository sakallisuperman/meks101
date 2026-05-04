// Oyun kuralları sabitleri — değiştirmek için tek nokta
export const PLAYER_COUNT = 3;
export const TILES_PER_PLAYER = 21;
export const STARTING_PLAYER_BONUS = 1; // Başlayan oyuncuya +1 fazla taş
export const OPENING_THRESHOLD = 121;   // Yere açılış için minimum puan
export const TOTAL_DECK_SIZE = 106;     // 1-13 × 4 renk × 2 + 2 sahte okey
export const FAKE_JOKER_COUNT = 2;

// Hesaplanan değerler
export const DEALT_TILES_TOTAL = (PLAYER_COUNT * TILES_PER_PLAYER) + STARTING_PLAYER_BONUS;
export const DRAW_PILE_SIZE = TOTAL_DECK_SIZE - DEALT_TILES_TOTAL - 1; // -1 gösterge için
