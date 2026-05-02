"use client";

import { NeoText } from '@/components/atoms/neo-text';
import { ComponentPreview } from '@/components/molecules/component-preview';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function BoardDemoPage() {
  const [board, setBoard] = useState<(string|null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every((square) => square !== null);

  function handleClick(i: number) {
    if (board[i] || winner) {
      return;
    }
    const nextBoard = board.slice();
    nextBoard[i] = xIsNext ? "❌" : "⭕";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  function reset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl pb-20">
      <div>
        <NeoText variant="title">Interactive Board</NeoText>
        <NeoText variant="body" className="text-muted-foreground mt-2">
          Papan interaktif contoh implementasi mini-game atau board.
        </NeoText>
      </div>

      <ComponentPreview
        title="Tic Tac Toe Board"
        description="Contoh papan permainan interaktif menggunakan grid layout dan neo-brutalism styling."
        code={`// Example Grid Board
<div className="grid grid-cols-3 gap-2 bg-border p-2 rounded-2xl border-4 border-border shadow-neo w-64 h-64">
  {board.map((cell, i) => (
    <button 
      key={i} 
      onClick={() => handlePlay(i)}
      className="bg-card w-full h-full flex items-center justify-center text-4xl hover:bg-muted transition-colors rounded-lg border-2 border-border shadow-neo-sm active:translate-y-1 active:translate-x-1 active:shadow-none"
    >
      {cell}
    </button>
  ))}
</div>`}
      >
        <div className="flex flex-col items-center gap-6 p-8 bg-muted rounded-3xl border-4 border-border shadow-neo">
          <NeoText variant="h3" as="h3">
            {winner ? `Pemenang: ${winner}` : isDraw ? 'Seri!' : `Giliran: ${xIsNext ? '❌' : '⭕'}`}
          </NeoText>
          
          <div className="grid grid-cols-3 gap-2 bg-border p-2 rounded-2xl border-4 border-border shadow-neo w-64 h-64">
            {board.map((cell, i) => (
              <button 
                key={i} 
                onClick={() => handleClick(i)}
                className="bg-card w-full h-full flex items-center justify-center text-5xl hover:bg-white transition-colors rounded-lg border-2 border-border shadow-neo-sm hover:shadow-neo active:translate-y-1 active:translate-x-1 active:shadow-none"
              >
                {cell}
              </button>
            ))}
          </div>

          <Button onClick={reset} variant={winner || isDraw ? 'accent' : 'outline'}>
            Main Lagi
          </Button>
        </div>
      </ComponentPreview>
    </div>
  );
}

function calculateWinner(squares: (string|null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
