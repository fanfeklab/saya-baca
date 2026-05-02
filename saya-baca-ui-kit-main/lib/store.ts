import { create } from 'zustand';

interface AppState {
  user: {
    id: string;
    name: string;
    role: string;
    level: number;
    stars: number;
    avatar: string;
  };
  dailyMission: {
    total: number;
    completed: number;
  };
  settings: {
    soundEffects: boolean;
    animations: boolean;
  };
  updateUser: (data: Partial<AppState['user']>) => void;
  addStars: (amount: number) => void;
  toggleSound: () => void;
  toggleAnimation: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: {
    id: 'USR-001',
    name: 'Budi',
    role: 'KID',
    level: 3,
    stars: 1250,
    avatar: 'Felix',
  },
  dailyMission: {
    total: 3,
    completed: 1,
  },
  settings: {
    soundEffects: true,
    animations: true,
  },
  updateUser: (data) =>
    set((state) => ({ user: { ...state.user, ...data } })),
  addStars: (amount) =>
    set((state) => ({
      user: { ...state.user, stars: state.user.stars + amount },
    })),
  toggleSound: () =>
    set((state) => ({
      settings: { ...state.settings, soundEffects: !state.settings.soundEffects },
    })),
  toggleAnimation: () =>
    set((state) => ({
      settings: { ...state.settings, animations: !state.settings.animations },
    })),
}));
