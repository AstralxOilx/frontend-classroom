// playSound.ts

import { useNotificationContext } from "@/context/notification-context";

export const playSound = (volume:number) => {
    const audio = new Audio('/sound/Photo-flash-sound-effect.mp3');
    audio.volume = volume;
    audio.play();
  };