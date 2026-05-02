'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  collection, 
  query, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc,
  increment,
  serverTimestamp,
  getDocs,
  where
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useProfile } from './useProfile';
import { handleFirestoreError, OperationType } from '@/lib/firestore-errors';

export interface WordProgress {
  wordId: string;
  mastery: number; // 0 to 100
  attempts: number;
  lastPracticed: any;
  completed: boolean;
}

interface ProgressContextType {
  progress: Record<string, WordProgress>;
  loading: boolean;
  completeWord: (wordId: string, xpEarned: number) => Promise<void>;
  updateProgress: (wordId: string, masteryDelta: number) => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { activeProfile, updateActiveProfile } = useProfile();
  const [progress, setProgress] = useState<Record<string, WordProgress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeProfile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress({});
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    const path = `profiles/${activeProfile.id}/progress`;
    const q = collection(db, 'profiles', activeProfile.id, 'progress');
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const progMap: Record<string, WordProgress> = {};
      snapshot.forEach((doc) => {
        progMap[doc.id] = { wordId: doc.id, ...doc.data() } as WordProgress;
      });
      setProgress(progMap);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [activeProfile]);

  const completeWord = async (wordId: string, xpEarned: number) => {
    if (!activeProfile) return;

    const path = `profiles/${activeProfile.id}/progress/${wordId}`;
    try {
      const progRef = doc(db, 'profiles', activeProfile.id, 'progress', wordId);
      await setDoc(progRef, {
        mastery: 100,
        attempts: increment(1),
        lastPracticed: serverTimestamp(),
        completed: true
      }, { merge: true });

      // Update Profile XP
      await updateActiveProfile({
        totalXp: (activeProfile.totalXp || 0) + xpEarned,
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const updateProgress = async (wordId: string, masteryDelta: number) => {
    if (!activeProfile) return;

    const path = `profiles/${activeProfile.id}/progress/${wordId}`;
    try {
      const progRef = doc(db, 'profiles', activeProfile.id, 'progress', wordId);
      const currentMastery = progress[wordId]?.mastery || 0;
      const newMastery = Math.min(100, Math.max(0, currentMastery + masteryDelta));

      await setDoc(progRef, {
        mastery: newMastery,
        attempts: increment(1),
        lastPracticed: serverTimestamp(),
        completed: newMastery >= 100
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  return (
    <ProgressContext.Provider value={{ progress, loading, completeWord, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
