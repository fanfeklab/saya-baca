'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './useAuth';
import { handleFirestoreError, OperationType } from '@/lib/firestore-errors';

export interface ChildProfile {
  id: string;
  parentId: string;
  displayName: string;
  avatar: string;
  totalXp: number;
  currentLevel: number;
  currentStreak: number;
  lastActivityAt: any;
  settings: {
    timerMinutes: number;
    fontScale: 'small' | 'default' | 'large' | 'xlarge';
    ttsEnabled: boolean;
    uppercaseOnly: boolean;
  };
}

interface ProfileContextType {
  profiles: ChildProfile[];
  activeProfile: ChildProfile | null;
  loading: boolean;
  selectProfile: (profileId: string) => void;
  createProfile: (name: string, avatar: string) => Promise<void>;
  updateActiveProfile: (data: Partial<ChildProfile>) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const STORAGE_KEY = 'saya_baca_active_profile_id';

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [activeProfile, setActiveProfile] = useState<ChildProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfiles([]);
      setActiveProfile(null);
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'profiles'), where('parentId', '==', user.uid));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const profileList: ChildProfile[] = [];
      snapshot.forEach((doc) => {
        profileList.push({ id: doc.id, ...doc.data() } as ChildProfile);
      });
      
      setProfiles(profileList);

      const savedId = localStorage.getItem(STORAGE_KEY);
      if (savedId) {
        const found = profileList.find(p => p.id === savedId);
        if (found) {
          setActiveProfile(found);
        } else if (profileList.length > 0) {
          setActiveProfile(profileList[0]);
          localStorage.setItem(STORAGE_KEY, profileList[0].id);
        }
      } else if (profileList.length > 0) {
        setActiveProfile(profileList[0]);
        localStorage.setItem(STORAGE_KEY, profileList[0].id);
      }
      
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'profiles');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const selectProfile = useCallback((profileId: string) => {
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      setActiveProfile(profile);
      localStorage.setItem(STORAGE_KEY, profileId);
    }
  }, [profiles]);

  const createProfile = async (name: string, avatar: string) => {
    if (!user) return;
    
    const profileId = `${user.uid}_${Date.now()}`;
    const newProfile: ChildProfile = {
      id: profileId,
      parentId: user.uid,
      displayName: name,
      avatar: avatar,
      totalXp: 0,
      currentLevel: 1,
      currentStreak: 0,
      lastActivityAt: serverTimestamp(),
      settings: {
        timerMinutes: 30,
        fontScale: 'default',
        ttsEnabled: true,
        uppercaseOnly: false,
      }
    };

    try {
      await setDoc(doc(db, 'profiles', profileId), newProfile);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `profiles/${profileId}`);
    }
  };

  const updateActiveProfile = async (data: Partial<ChildProfile>) => {
    if (!activeProfile) return;
    
    try {
      const profileRef = doc(db, 'profiles', activeProfile.id);
      await updateDoc(profileRef, {
        ...data,
        lastActivityAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `profiles/${activeProfile.id}`);
    }
  };

  return (
    <ProfileContext.Provider value={{ 
      profiles, 
      activeProfile, 
      loading, 
      selectProfile, 
      createProfile,
      updateActiveProfile
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
