import { SECTION_TYPES } from '../constants/sectionTypes';

export function scoreCV(personalInfo, sections) {
  const results = [];
  let total = 0;

  // 1. Contact info complete (email + phone + location) — 20 pts
  const hasContact =
    personalInfo.email?.trim() &&
    personalInfo.phone?.trim() &&
    personalInfo.location?.trim();
  results.push({
    id: 'contact',
    label: 'Contact info complete (email, phone, location)',
    points: 20,
    passed: !!hasContact,
  });
  if (hasContact) total += 20;

  // 2. Professional summary (>50 chars) — 15 pts
  const summarySection = sections.find((s) => s.type === SECTION_TYPES.SUMMARY);
  const hasSummary = summarySection?.content?.trim().length > 50;
  results.push({
    id: 'summary',
    label: 'Professional summary present (>50 characters)',
    points: 15,
    passed: !!hasSummary,
  });
  if (hasSummary) total += 15;

  // 3. All experience entries have dates — 20 pts
  const expSection = sections.find((s) => s.type === SECTION_TYPES.EXPERIENCE);
  const hasExpDates =
    expSection?.entries?.length > 0 &&
    expSection.entries.every(
      (e) => e.startYear && (e.current || e.endYear)
    );
  results.push({
    id: 'exp_dates',
    label: 'All experience entries have dates',
    points: 20,
    passed: !!hasExpDates,
  });
  if (hasExpDates) total += 20;

  // 4. Skills section populated — 15 pts
  const skillsSection = sections.find((s) => s.type === SECTION_TYPES.SKILLS);
  const hasSkills =
    skillsSection?.groups?.length > 0 &&
    skillsSection.groups.some((g) => g.tags?.length > 0);
  results.push({
    id: 'skills',
    label: 'Skills section populated',
    points: 15,
    passed: !!hasSkills,
  });
  if (hasSkills) total += 15;

  // 5. LinkedIn URL — 10 pts
  const hasLinkedIn = !!personalInfo.linkedin?.trim();
  results.push({
    id: 'linkedin',
    label: 'LinkedIn URL included',
    points: 10,
    passed: hasLinkedIn,
  });
  if (hasLinkedIn) total += 10;

  // 6. GitHub URL — 10 pts
  const hasGithub = !!personalInfo.github?.trim();
  results.push({
    id: 'github',
    label: 'GitHub URL included',
    points: 10,
    passed: hasGithub,
  });
  if (hasGithub) total += 10;

  // 7. No tables/images (architecturally guaranteed) — 10 pts
  results.push({
    id: 'ats_safe',
    label: 'ATS-safe format (no images/tables)',
    points: 10,
    passed: true,
  });
  total += 10;

  return { score: total, checks: results };
}
