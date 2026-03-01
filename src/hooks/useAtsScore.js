import { useMemo } from 'react';
import { useCVStore } from '../store/cvStore';
import { scoreCV } from '../utils/atsScorer';

export function useAtsScore() {
  const personalInfo = useCVStore((s) => s.personalInfo);
  const sections = useCVStore((s) => s.sections);
  return useMemo(() => scoreCV(personalInfo, sections), [personalInfo, sections]);
}
