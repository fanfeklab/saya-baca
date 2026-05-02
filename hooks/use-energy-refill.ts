"use client";

import React from "react";
import { useAppStore } from "@/lib/store";

const REFILL_INTERVAL = 30 * 60 * 1000; // 30 minutes in ms

export function useEnergyRefill() {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const refillEnergy = useAppStore((state) => state.refillEnergy);

  React.useEffect(() => {
    if (!currentProfile || currentProfile.energy >= 5) return;

    const checkRefill = () => {
      const now = Date.now();
      const timePassed = now - currentProfile.lastRefill;
      const refillsEarned = Math.floor(timePassed / REFILL_INTERVAL);

      if (refillsEarned >= 1) {
        refillEnergy(refillsEarned);
      }
    };

    // Check immediately
    checkRefill();

    // Then interval
    const interval = setInterval(checkRefill, 60000); // every minute

    return () => clearInterval(interval);
  }, [currentProfile?.id, currentProfile?.energy, currentProfile?.lastRefill, refillEnergy, currentProfile]);
}
