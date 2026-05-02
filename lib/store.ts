import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatar: string; // This will be the seed
  avatarStyle: string;
  stars: number;
  completedMissions: string[];
}

interface AppState {
  currentProfile: ChildProfile | null;
  profiles: ChildProfile[];
  totalStars: number;
  
  setCurrentProfile: (profile: ChildProfile | null) => void;
  addStars: (amount: number) => void;
  completeMission: (missionId: string) => void;
  updateProfile: (id: string, updates: Partial<ChildProfile>) => void;
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
          completedMissions: [],
        },
        {
          id: '2',
          name: 'Ani',
          age: 4,
          avatar: 'Luna',
          avatarStyle: 'adventurer',
          stars: 85,
          completedMissions: [],
        }
      ],
      totalStars: 205,

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
      })
    }),
    {
      name: 'saya-baca-storage',
    }
  )
);
