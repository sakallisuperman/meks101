'use client';

import { useState } from 'react';
import { createGame } from '@/lib/engine/game';
import GameTable from '@/components/ui/GameTable';

export default function PlayPage() {
  // Oyun başlangıç durumunu bir kez oluştur
  const [gameState] = useState(() => createGame(['Sen', 'Hatice', 'Mehmet']));
  return <GameTable gameState={gameState} />;
}
