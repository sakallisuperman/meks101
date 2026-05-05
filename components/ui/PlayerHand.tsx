'use client';

import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import type { Tile as TileData } from '@/lib/types/game';
import Tile from './Tile';

type PlayerHandProps = {
  tiles: TileData[];
  onTileClick?: (tile: TileData) => void;
};

// Oyuncunun elini sürükle-bırak destekli 2 sıra halinde gösterir
export default function PlayerHand({ tiles, onTileClick }: PlayerHandProps) {
  const [orderedTiles, setOrderedTiles] = useState(tiles);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setOrderedTiles(tiles);
  }, [tiles]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOrderedTiles((prev) => {
        const oldIndex = prev.findIndex((t) => t.id === active.id);
        const newIndex = prev.findIndex((t) => t.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }

  const splitAt = Math.ceil(orderedTiles.length / 2);
  const topRow = orderedTiles.slice(0, splitAt);
  const bottomRow = orderedTiles.slice(splitAt);

  const activeTile = activeId ? orderedTiles.find((t) => t.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={orderedTiles.map((t) => t.id)} strategy={rectSortingStrategy}>
        <div className="flex flex-col gap-2 p-4 bg-amber-900/40 rounded-lg">
          {/* Üst sıra */}
          <div className="flex gap-1 flex-wrap">
            {topRow.map((tile) => (
              <Tile
                key={tile.id}
                tile={tile}
                onClick={onTileClick ? () => onTileClick(tile) : undefined}
              />
            ))}
          </div>

          {/* Alt sıra */}
          <div className="flex gap-1 flex-wrap">
            {bottomRow.map((tile) => (
              <Tile
                key={tile.id}
                tile={tile}
                onClick={onTileClick ? () => onTileClick(tile) : undefined}
              />
            ))}
          </div>
        </div>
      </SortableContext>

      <DragOverlay>
        {activeTile ? <Tile tile={activeTile} overlay={true} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
