// src/components/ContactForm/hooks/useRateLimit.ts
import { useState, useCallback, useEffect } from 'react';

export const useRateLimit = (duration: number, maxAttempts: number) => {
  const [attempts, setAttempts] = useState<number[]>([]);

  const isRateLimited = useCallback(() => {
    const now = Date.now();
    const recentAttempts = attempts.filter(time => now - time < duration);
    return recentAttempts.length >= maxAttempts;
  }, [attempts, duration, maxAttempts]);

  const addAttempt = useCallback(() => {
    setAttempts(prev => [...prev, Date.now()]);
  }, []);

  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setAttempts(prev => prev.filter(time => now - time < duration));
    }, duration);

    return () => clearInterval(cleanup);
  }, [duration]);

  return { isRateLimited, addAttempt };
};