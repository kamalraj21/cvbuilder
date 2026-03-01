import { useEffect, useRef } from 'react';
import { useCVStore } from '../store/cvStore';
import { saveSlot } from '../utils/storage';

export function useAutoSave() {
  const personalInfo = useCVStore((s) => s.personalInfo);
  const sections = useCVStore((s) => s.sections);
  const activeSlot = useCVStore((s) => s.activeSlot);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      saveSlot(activeSlot, { personalInfo, sections });
    }, 1500);
    return () => clearTimeout(timerRef.current);
  }, [personalInfo, sections, activeSlot]);
}
