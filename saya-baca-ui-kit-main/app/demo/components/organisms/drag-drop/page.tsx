"use client";

import React, { useState } from 'react';
import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sortable Item Component
function SortableItem({ id, value }: { id: string, value: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex-shrink-0 touch-none flex items-center justify-center min-w-16 h-16 px-4 bg-card rounded-2xl border-4 border-border cursor-grab active:cursor-grabbing hover:bg-muted font-black text-xl select-none ${isDragging ? 'opacity-50 scale-105 shadow-neo' : 'shadow-neo-sm hover:-translate-y-1 hover:shadow-neo transition-all duration-200'}`}
    >
      <GripVertical className="size-4 mr-2 text-muted-foreground opacity-50" />
      <span>{value}</span>
    </div>
  );
}

export default function DragDropDemoPage() {
  const [items, setItems] = useState([
    { id: '1', text: 'Saya' },
    { id: '2', text: 'Suka' },
    { id: '3', text: 'Makan' },
    { id: '4', text: 'Apel' },
  ]);

  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        return newItems;
      });
      setIsSuccess(null); // Reset success state when changed
    }
  }

  const checkAnswer = () => {
    // Correct logic: "Saya Suka Makan Apel"
    const order = items.map(i => i.text).join(' ');
    if (order === "Saya Suka Makan Apel") {
      setIsSuccess(true);
    } else {
      setIsSuccess(false);
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Drag & Drop</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Komponen interaktif untuk menyusun kata, gambar, atau objek. Implementasi menggunakan \`@dnd-kit\`.
        </NeoText>
      </div>

      <ComponentPreview
        title="Susun Kalimat (Sortable Row)"
        description="Seret dan lepaskan blok kata untuk menyusun kalimat yang benar."
        code={`import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';

<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
  <SortableContext items={items} strategy={horizontalListSortingStrategy}>
    {items.map((item) => (
      <SortableItem key={item.id} id={item.id} value={item.text} />
    ))}
  </SortableContext>
</DndContext>`}
      >
        <div className="flex flex-col items-center gap-8 w-full max-w-3xl p-8 bg-muted rounded-3xl border-4 border-border shadow-neo">
          <div className="text-center space-y-2">
            <NeoText variant="h3">Susun menjadi kalimat yang benar!</NeoText>
            <span className="text-muted-foreground font-bold">Seret kotak-kotak di bawah ini</span>
          </div>

          <div className="p-8 bg-border/20 rounded-3xl border-4 border-dashed border-border w-full flex items-center justify-center overflow-x-auto overflow-y-hidden pb-12 pt-8">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <div className="flex gap-4">
                <SortableContext
                  items={items.map(i => i.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  {items.map((item) => (
                    <SortableItem key={item.id} id={item.id} value={item.text} />
                  ))}
                </SortableContext>
              </div>
            </DndContext>
          </div>

          <div className="flex flex-col items-center gap-4">
            <Button size="lg" className="h-16 px-12 text-xl rounded-2xl" onClick={checkAnswer}>
              Periksa Jawaban
            </Button>
            
            {isSuccess === true && (
              <div className="text-success font-black text-xl animate-in zoom-in-50 duration-300">
                🎉 Benar Sekali! 🎉
              </div>
            )}
            {isSuccess === false && (
              <div className="text-destructive font-black text-xl animate-in shake duration-300">
                ❌ Coba Lagi! ❌
              </div>
            )}
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
