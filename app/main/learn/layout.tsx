'use client';

import React, { useEffect } from 'react';
import { useGameStore } from '@/store/useGameStore';

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  const setImmersiveMode = useGameStore(state => state.setImmersiveMode);
  const setBottomNavVisible = useGameStore(state => state.setBottomNavVisible);

  useEffect(() => {
    setImmersiveMode(true);
    setBottomNavVisible(false);

    return () => {
      setImmersiveMode(false);
      setBottomNavVisible(true);
    };
  }, [setImmersiveMode, setBottomNavVisible]);

  return <>{children}</>;
}
