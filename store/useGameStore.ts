import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface GameProfile {
  id: string;
  name: string;
  avatarSeed: string;
  globalExp: number;
  energy: number;
  coins: number;
  lastEnergyRefillAt: string | null;
  longestStreak: number;
  currentStreak: number;
  level: number;
}

interface GameState {
  // Global Setup
  activeProfile: GameProfile | null;
  setActiveProfile: (p: GameProfile | null) => void;
  
  // HUD Visibility Control
  isBottomNavVisible: boolean;
  setBottomNavVisible: (val: boolean) => void;
  
  // HUD Game Mode Control
  isImmersiveMode: boolean;
  setImmersiveMode: (val: boolean) => void;

  // Realtime Live Session (Learn/Quiz/Minigame)
  currentSessionPoints: number;
  addSessionPoints: (pts: number) => void;
  resetSessionPoints: () => void;
  comboCount: number; // For Minigame multiplier
  setComboCount: (count: number) => void;
  
  // Timer State (For Fun Game)
  timerSeconds: number;
  setTimerSeconds: (secs: number) => void;
  
  // Realtime Player Stats
  globalExp: number;
  setGlobalExp: (exp: number) => void;
  addGlobalExp: (exp: number) => void;
  
  energy: number;
  decreaseEnergy: () => void;
  setEnergy: (energy: number) => void;
  
  coins: number;
  addCoins: (coins: number) => void;
  setCoins: (coins: number) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      activeProfile: null,
      setActiveProfile: (profile) => set({ 
        activeProfile: profile, 
        globalExp: profile?.globalExp || 0,
        energy: profile?.energy !== undefined ? profile.energy : 5,
        coins: profile?.coins || 0
      }),
      
      isBottomNavVisible: true,
      setBottomNavVisible: (val) => set({ isBottomNavVisible: val }),
      
      isImmersiveMode: false,
      setImmersiveMode: (val) => set({ isImmersiveMode: val }),
      
      currentSessionPoints: 0,
      addSessionPoints: (pts) => set((state) => ({ currentSessionPoints: state.currentSessionPoints + pts })),
      resetSessionPoints: () => set({ currentSessionPoints: 0 }),
      
      comboCount: 0,
      setComboCount: (count) => set({ comboCount: count }),
      
      timerSeconds: 0,
      setTimerSeconds: (secs) => set({ timerSeconds: secs }),
      
      globalExp: 0,
      setGlobalExp: (exp) => set({ globalExp: exp }),
      addGlobalExp: (exp) => set((state) => ({ globalExp: state.globalExp + exp })),
      
      energy: 5,
      setEnergy: (energy) => set({ energy }),
      decreaseEnergy: () => set((state) => ({ energy: Math.max(0, state.energy - 1) })),
      
      coins: 0,
      setCoins: (coins) => set({ coins }),
      addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
    }),
    {
      name: 'saya-baca-game-storage',
      // only persist basic things
    }
  )
);
