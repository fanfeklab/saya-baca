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

export interface ModuleProgress {
  moduleId: string;
  learningFinished: boolean;
  bestQuizScore: number;
  totalAttempts: number;
  lastPracticed: any;
  completed: boolean;
}

interface ProgressContextType {
  progress: Record<string, ModuleProgress>;
  loading: boolean;
  markLearningFinished: (moduleId: string) => Promise<void>;
  saveQuizResult: (moduleId: string, score: number) => Promise<{ xpEarned: number, coinsEarned: number }>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { activeProfile, updateActiveProfile } = useProfile();
  const [progress, setProgress] = useState<Record<string, ModuleProgress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!activeProfile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProgress({});
      setLoading(false);
      return;
    }

    const q = collection(db, 'profiles', activeProfile.id, 'progress');
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const progMap: Record<string, ModuleProgress> = {};
      snapshot.forEach((doc) => {
        progMap[doc.id] = { moduleId: doc.id, ...doc.data() } as ModuleProgress;
      });
      setProgress(progMap);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `profiles/${activeProfile.id}/progress`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [activeProfile]);

  const markLearningFinished = async (moduleId: string) => {
    if (!activeProfile) return;

    const path = `profiles/${activeProfile.id}/progress/${moduleId}`;
    try {
      const progRef = doc(db, 'profiles', activeProfile.id, 'progress', moduleId);
      await setDoc(progRef, {
        learningFinished: true,
        lastPracticed: serverTimestamp(),
      }, { merge: true });

      // Give a small initial XP and coins for finishing learning if first time
      if (!progress[moduleId]?.learningFinished) {
        await updateActiveProfile({
          totalXp: (activeProfile.totalXp || 0) + 50,
          coins: (activeProfile.coins || 0) + 10,
        });
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    }
  };

  const saveQuizResult = async (moduleId: string, score: number) => {
    if (!activeProfile) return { xpEarned: 0, coinsEarned: 0 };

    const path = `profiles/${activeProfile.id}/progress/${moduleId}`;
    try {
      const progRef = doc(db, 'profiles', activeProfile.id, 'progress', moduleId);
      const existing = progress[moduleId];
      const previousBest = existing?.bestQuizScore || 0;
      
      // XP & Coins Logic: 
      let xpEarned = 0;
      let coinsEarned = 0;
      if (score > previousBest) {
        xpEarned = score - previousBest;
        coinsEarned = Math.floor(xpEarned / 2); // 1 coin per 2 xp
      } else if (previousBest >= 100) {
        xpEarned = 5;
        coinsEarned = 2; // participation
      } else if (score > 70) {
        xpEarned = 10;
        coinsEarned = 5;
      }

      const newBest = Math.max(previousBest, score);

      await setDoc(progRef, {
        bestQuizScore: newBest,
        totalAttempts: increment(1),
        lastPracticed: serverTimestamp(),
        completed: newBest >= 100
      }, { merge: true });

      if (xpEarned > 0 || coinsEarned > 0) {
        await updateActiveProfile({
          totalXp: (activeProfile.totalXp || 0) + xpEarned,
          coins: (activeProfile.coins || 0) + coinsEarned,
        });
      }

      return { xpEarned, coinsEarned };
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
      return { xpEarned: 0, coinsEarned: 0 };
    }
  };

  return (
    <ProgressContext.Provider value={{ progress, loading, markLearningFinished, saveQuizResult }}>
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
