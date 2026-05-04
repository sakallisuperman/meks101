import { createGame } from '../lib/engine/game';
import { isPer, isSeri, isValidGroup } from '../lib/engine/groups';
import {
  TILES_PER_PLAYER,
  STARTING_PLAYER_BONUS,
  DRAW_PILE_SIZE,
} from '../lib/engine/constants';
import type { Color, Tile, TileGroup } from '../lib/types/game';

// Renk → emoji eşleşmesi
const COLOR_EMOJI: Record<Color, string> = {
  red: '🔴',
  blue: '🔵',
  black: '⚫',
  yellow: '🟡',
};

// Taşı okunabilir formatta gösterir
function formatTile(tile: Tile): string {
  if (tile.isFakeJoker) return '🃏';
  return `${COLOR_EMOJI[tile.color]}${tile.number}`;
}

// Oyuncunun elini terminale basar
function printHand(name: string, hand: Tile[]): void {
  const sorted = [...hand].sort((a, b) => {
    if (a.color !== b.color) return a.color.localeCompare(b.color);
    return a.number - b.number;
  });
  console.log(`\n  ${name} (${hand.length} taş):`);
  console.log('  ' + sorted.map(formatTile).join(' '));
}

// PASS / FAIL ile test sonucu basar
function test(label: string, result: boolean): void {
  const status = result ? '\x1b[32mPASS\x1b[0m' : '\x1b[31mFAIL\x1b[0m';
  console.log(`  [${status}] ${label}`);
}

// Yardımcı: belirtilen parametrelerle taş oluşturur
function t(color: Color, number: number, id?: string): Tile {
  return { id: id ?? `${color}-${number}-test`, color, number, isFakeJoker: false };
}
function joker(id?: string): Tile {
  return { id: id ?? 'fake-joker-test', color: 'red', number: 0, isFakeJoker: true };
}

// ── OYUN BAŞLAT ──────────────────────────────────────────────
console.log('\n═══════════════════════════════════════');
console.log('  meks101 — Oyun Motoru CLI Testi');
console.log('═══════════════════════════════════════');

const state = createGame(['Ayşe', 'Mehmet', 'Ali']);

console.log('\n▸ Gösterge taşı :', formatTile(state.indicatorTile));
console.log('▸ Okey taşı     :', formatTile(state.okeyTile));
console.log('▸ Çekme destesi :', state.deck.length, 'taş');
console.log('▸ Başlayan oyuncu:', state.players[state.currentPlayerIndex].name);

// ── ELLERİ GÖSTER ────────────────────────────────────────────
console.log('\n── Oyuncu Elleri ──────────────────────');
for (const player of state.players) {
  printHand(player.name, player.hand);
}

// ── DAĞITIM TESTLERİ ─────────────────────────────────────────
console.log('\n── Dağıtım Testleri ───────────────────');

const startingCount = TILES_PER_PLAYER + STARTING_PLAYER_BONUS;

test(
  `Başlayan oyuncu ${startingCount} taş aldı`,
  state.players[0].hand.length === startingCount
);
test(
  `2. oyuncu ${TILES_PER_PLAYER} taş aldı`,
  state.players[1].hand.length === TILES_PER_PLAYER
);
test(
  `3. oyuncu ${TILES_PER_PLAYER} taş aldı`,
  state.players[2].hand.length === TILES_PER_PLAYER
);
test(
  `Çekme destesinde ${DRAW_PILE_SIZE} taş kaldı`,
  state.deck.length === DRAW_PILE_SIZE
);

// ── PER / SERİ TESTLERİ ───────────────────────────────────────
console.log('\n── Per / Seri Testleri ────────────────');

// Per testleri
const perValid3: TileGroup = [t('red', 7), t('blue', 7), t('black', 7)];
const perValid4: TileGroup = [t('red', 7), t('blue', 7), t('black', 7), t('yellow', 7)];
const perInvalidSameColor: TileGroup = [t('red', 7), t('red', 7), t('black', 7)];
const perInvalidDiffNumber: TileGroup = [t('red', 7), t('blue', 8), t('black', 7)];
const perWithJoker: TileGroup = [t('red', 7), t('blue', 7), joker()];

test('Per: 3 taş, farklı renk, aynı sayı → geçerli', isPer(perValid3));
test('Per: 4 taş, 4 farklı renk, aynı sayı → geçerli', isPer(perValid4));
test('Per: aynı renk var → geçersiz', !isPer(perInvalidSameColor));
test('Per: farklı sayı var → geçersiz', !isPer(perInvalidDiffNumber));
test('Per: jokerle 3 taş → geçerli', isPer(perWithJoker));

// Seri testleri
const seriValid: TileGroup = [t('red', 5), t('red', 6), t('red', 7)];
const seriValid5: TileGroup = [t('blue', 9), t('blue', 10), t('blue', 11), t('blue', 12), t('blue', 13)];
const seriInvalidColor: TileGroup = [t('red', 5), t('blue', 6), t('red', 7)];
const seriInvalidGap: TileGroup = [t('red', 5), t('red', 7), t('red', 8)]; // boşluk var, joker yok
const seriWithJoker: TileGroup = [t('black', 3), joker(), t('black', 5)];  // joker 4'ü tamamlar

test('Seri: 3 taş, aynı renk, ardışık → geçerli', isSeri(seriValid));
test('Seri: 5 taş, aynı renk, ardışık → geçerli', isSeri(seriValid5));
test('Seri: farklı renkler → geçersiz', !isSeri(seriInvalidColor));
test('Seri: joker olmadan boşluk → geçersiz', !isSeri(seriInvalidGap));
test('Seri: jokerin boşluğu kapattığı seri → geçerli', isSeri(seriWithJoker));

// isValidGroup
test('isValidGroup: per ise geçerli', isValidGroup(perValid3));
test('isValidGroup: seri ise geçerli', isValidGroup(seriValid));
test('isValidGroup: ne per ne seri → geçersiz', !isValidGroup([t('red', 1), t('blue', 3), t('black', 7)]));

console.log('\n═══════════════════════════════════════\n');
