"use client";

import { useAppStore } from "@/lib/store";
import React from "react";

export function useTTS() {
  const isEnabled = useAppStore((state) => state.settings.isTTSEnabled);

  const speak = React.useCallback((text: string) => {
    if (!isEnabled || !window.speechSynthesis) return;

    // Stop existing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    utterance.rate = 0.9;
    utterance.pitch = 1.1;

    window.speechSynthesis.speak(utterance);
  }, [isEnabled]);

  return { speak };
}
