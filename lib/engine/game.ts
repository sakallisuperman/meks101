import type { GameState, Player, Tile, TileGroup } from '../types/game';
import { createFullDeck, shuffle } from './deck';
import { dealTiles } from './deal';
import { isValidGroup } from './groups';
import { canOpen, canFinish } from './rules';

// Yeni bir oyun durumu oluşturur ve taşları dağıtır
export function createGame(playerNames: [string, string, string]): GameState {
  const deck = shuffle(createFullDeck());
  const { hands, indicatorTile, okeyTile, remainingDeck } = dealTiles(deck);

  const players: [Player, Player, Player] = playerNames.map((name, i) => ({
    id: `player-${i}`,
    name,
    hand: hands[i],
    openedGroups: [],
    hasOpened: false,
    score: 0,
  })) as [Player, Player, Player];

  return {
    players,
    deck: remainingDeck,
    discardPile: [],
    indicatorTile,
    okeyTile,
    currentPlayerIndex: 0,
    phase: 'drawing',
    winnerId: null,
  };
}

// Sıradaki oyuncu desteden taş çeker
export function drawTile(state: GameState): GameState {
  if (state.deck.length === 0) {
    // Deste bitti, el berabere bitebilir (MVP: state değişmez)
    return state;
  }

  const [drawn, ...remainingDeck] = state.deck;
  const playerIndex = state.currentPlayerIndex;

  const updatedPlayers = state.players.map((p, i) =>
    i === playerIndex ? { ...p, hand: [...p.hand, drawn] } : p
  ) as [Player, Player, Player];

  return {
    ...state,
    deck: remainingDeck,
    players: updatedPlayers,
    phase: 'discarding',
  };
}

// Sıradaki oyuncu bir taşını atar
export function discardTile(state: GameState, tileId: string): GameState {
  const playerIndex = state.currentPlayerIndex;
  const player = state.players[playerIndex];

  const tileIndex = player.hand.findIndex((t) => t.id === tileId);
  if (tileIndex === -1) return state; // taş elde yok

  const discardedTile = player.hand[tileIndex];
  const newHand = player.hand.filter((_, i) => i !== tileIndex);

  const updatedPlayers = state.players.map((p, i) =>
    i === playerIndex ? { ...p, hand: newHand } : p
  ) as [Player, Player, Player];

  // Sırayı bir sonraki oyuncuya ver
  const nextIndex = ((playerIndex + 1) % 3) as 0 | 1 | 2;

  return {
    ...state,
    players: updatedPlayers,
    discardPile: [...state.discardPile, discardedTile],
    currentPlayerIndex: nextIndex,
    phase: 'drawing',
  };
}

// Oyuncu elindeki grupları yere açar (121 kontrolü dahil)
export function openGroups(
  state: GameState,
  playerId: string,
  groups: TileGroup[]
): GameState {
  const playerIndex = state.players.findIndex((p) => p.id === playerId);
  if (playerIndex === -1) return state;

  const player = state.players[playerIndex];

  if (!canOpen(player, groups)) return state; // koşul sağlanmıyor

  // Açılan taşları elden çıkar
  const openedTileIds = new Set(groups.flat().map((t) => t.id));
  const newHand = player.hand.filter((t) => !openedTileIds.has(t.id));

  const updatedPlayer: Player = {
    ...player,
    hand: newHand,
    openedGroups: [...player.openedGroups, ...groups],
    hasOpened: true,
  };

  const updatedPlayers = state.players.map((p, i) =>
    i === playerIndex ? updatedPlayer : p
  ) as [Player, Player, Player];

  return { ...state, players: updatedPlayers };
}

// Oyuncu eli bitirip kazanıyor
export function finishGame(state: GameState, playerId: string): GameState {
  const playerIndex = state.players.findIndex((p) => p.id === playerId);
  if (playerIndex === -1) return state;

  const player = state.players[playerIndex];
  if (!canFinish(player)) return state;

  // Kazanan oyuncuya puan ekle (basit MVP: 101 puan)
  const updatedPlayers = state.players.map((p, i) =>
    i === playerIndex ? { ...p, score: p.score + 101 } : p
  ) as [Player, Player, Player];

  return {
    ...state,
    players: updatedPlayers,
    phase: 'finished',
    winnerId: playerId,
  };
}
