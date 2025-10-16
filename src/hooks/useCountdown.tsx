import { useEffect, useState } from 'react';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

export function useCountdown(targetIsoDate: string, timeString?: string): CountdownState {
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const target = new Date(`${targetIsoDate} ${timeString || ''}`.trim()).getTime();
  const diff = Math.max(0, target - now);
  const expired = target - now <= 0;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, expired };
}


