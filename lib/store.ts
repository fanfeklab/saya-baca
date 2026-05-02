import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatar: string; // This will be the seed
  avatarStyle: string;
  stars: number;
  energy: number;
  lastRefill: number; // timestamp
  completedMissions: string[];
}

interface GlobalSettings {
  studyTimer: number; // in minutes, 0 means off
  isTTSEnabled: boolean;
  textSize: 'normal' | 'large';
  isUppercaseOnly: boolean;
  parentPin: string | null;
}

interface AppState {
  currentProfile: ChildProfile | null;
  profiles: ChildProfile[];
  totalStars: number;
  settings: GlobalSettings;
  
  setCurrentProfile: (profile: ChildProfile | null) => void;
  addStars: (amount: number) => void;
  completeMission: (missionId: string) => void;
  updateProfile: (id: string, updates: Partial<ChildProfile>) => void;
  deleteProfile: (id: string) => void;
  addProfile: (profile: Omit<ChildProfile, 'id' | 'stars' | 'completedMissions' | 'energy' | 'lastRefill'>) => void;
  updateSettings: (updates: Partial<GlobalSettings>) => void;
  loseEnergy: () => void;
  refillEnergy: (amount: number) => void;
  resetData: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      currentProfile: {
        id: '1',
        name: 'Budi',
        age: 5,
        avatar: 'Felix',
        avatarStyle: 'adventurer',
        stars: 120,
        energy: 5,
        lastRefill: Date.now(),
        completedMissions: [],
      },
      profiles: [
        {
          id: '1',
          name: 'Budi',
          age: 5,
          avatar: 'Felix',
          avatarStyle: 'adventurer',
          stars: 120,
          energy: 5,
          lastRefill: Date.now(),
          completedMissions: [],
        },
        {
          id: '2',
          name: 'Ani',
          age: 4,
          avatar: 'Luna',
          avatarStyle: 'adventurer',
          stars: 85,
          energy: 3,
          lastRefill: Date.now(),
          completedMissions: [],
        }
      ],
      totalStars: 205,
      settings: {
        studyTimer: 0,
        isTTSEnabled: true,
        textSize: 'normal',
        isUppercaseOnly: false,
        parentPin: null,
      },

      setCurrentProfile: (profile) => set({ currentProfile: profile }),
      
      addStars: (amount) => set((state) => {
        if (!state.currentProfile) return state;
        const newStars = state.currentProfile.stars + amount;
        const updatedProfiles = state.profiles.map(p => 
          p.id === state.currentProfile?.id ? { ...p, stars: newStars } : p
        );
        return {
          currentProfile: { ...state.currentProfile, stars: newStars },
          profiles: updatedProfiles,
          totalStars: state.totalStars + amount
        };
      }),

      completeMission: (missionId) => set((state) => {
        if (!state.currentProfile) return state;
        if (state.currentProfile.completedMissions.includes(missionId)) return state;
        
        const updatedMissions = [...state.currentProfile.completedMissions, missionId];
        const updatedProfiles = state.profiles.map(p => 
          p.id === state.currentProfile?.id ? { ...p, completedMissions: updatedMissions } : p
        );
        
        return {
          currentProfile: { ...state.currentProfile, completedMissions: updatedMissions },
          profiles: updatedProfiles
        };
      }),

      updateProfile: (id, updates) => set((state) => {
        const updatedProfiles = state.profiles.map(p => 
          p.id === id ? { ...p, ...updates } : p
        );
        const updatedCurrent = state.currentProfile?.id === id 
          ? { ...state.currentProfile, ...updates } 
          : state.currentProfile;
        
        return {
          profiles: updatedProfiles,
          currentProfile: updatedCurrent
        };
      }),

      deleteProfile: (id) => set((state) => {
        const updatedProfiles = state.profiles.filter(p => p.id !== id);
        const updatedCurrent = state.currentProfile?.id === id ? null : state.currentProfile;
        return {
          profiles: updatedProfiles,
          currentProfile: updatedCurrent
        };
      }),

      addProfile: (newProfile) => set((state) => {
        const id = Math.random().toString(36).substring(7);
        const profile: ChildProfile = {
          ...newProfile,
          id,
          stars: 0,
          energy: 5,
          lastRefill: Date.now(),
          completedMissions: [],
        };
        return {
          profiles: [...state.profiles, profile]
        };
      }),

      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates }
      })),

      loseEnergy: () => set((state) => {
        if (!state.currentProfile || state.currentProfile.energy <= 0) return state;
        const newEnergy = state.currentProfile.energy - 1;
        const updatedProfiles = state.profiles.map(p => 
          p.id === state.currentProfile?.id ? { ...p, energy: newEnergy } : p
        );
        return {
          currentProfile: { ...state.currentProfile, energy: newEnergy },
          profiles: updatedProfiles
        };
      }),

      refillEnergy: (amount) => set((state) => {
        if (!state.currentProfile) return state;
        const newEnergy = Math.min(5, state.currentProfile.energy + amount);
        const updatedProfiles = state.profiles.map(p => 
          p.id === state.currentProfile?.id ? { ...p, energy: newEnergy, lastRefill: Date.now() } : p
        );
        return {
          currentProfile: { ...state.currentProfile, energy: newEnergy, lastRefill: Date.now() },
          profiles: updatedProfiles
        };
      }),

      resetData: () => set({
        currentProfile: null,
        profiles: [],
        totalStars: 0,
        settings: {
          studyTimer: 0,
          isTTSEnabled: true,
          textSize: 'normal',
          isUppercaseOnly: false,
          parentPin: null,
        }
      })
    }),
    {
      name: 'saya-baca-storage',
    }
  )
);
