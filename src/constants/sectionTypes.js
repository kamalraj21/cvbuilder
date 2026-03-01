import { v4 as uuidv4 } from 'uuid';

export const SECTION_TYPES = {
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  SUMMARY: 'summary',
  CERTIFICATIONS: 'certifications',
  CUSTOM: 'custom',
};

export const SECTION_TYPE_LABELS = {
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  summary: 'Summary',
  certifications: 'Certifications',
  custom: 'Custom Section',
};

export function createEntry(type) {
  switch (type) {
    case SECTION_TYPES.EXPERIENCE:
      return {
        id: uuidv4(),
        company: '',
        role: '',
        location: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        current: false,
        bullets: [],
      };
    case SECTION_TYPES.EDUCATION:
      return {
        id: uuidv4(),
        institution: '',
        degree: '',
        fieldOfStudy: '',
        graduationYear: '',
        gpa: '',
      };
    case SECTION_TYPES.SKILLS:
      return {
        id: uuidv4(),
        category: '',
        tags: [],
      };
    case SECTION_TYPES.PROJECTS:
      return {
        id: uuidv4(),
        name: '',
        url: '',
        techStack: [],
        bullets: [],
      };
    case SECTION_TYPES.CERTIFICATIONS:
      return {
        id: uuidv4(),
        name: '',
        issuer: '',
        date: '',
      };
    default:
      return null;
  }
}

export function createSection(type, title) {
  const base = {
    id: uuidv4(),
    type,
    title: title || SECTION_TYPE_LABELS[type] || 'Section',
    visible: true,
  };

  switch (type) {
    case SECTION_TYPES.EXPERIENCE:
      return { ...base, entries: [createEntry(type)] };
    case SECTION_TYPES.EDUCATION:
      return { ...base, entries: [createEntry(type)] };
    case SECTION_TYPES.SKILLS:
      return { ...base, groups: [createEntry(type)] };
    case SECTION_TYPES.PROJECTS:
      return { ...base, entries: [createEntry(type)] };
    case SECTION_TYPES.CERTIFICATIONS:
      return { ...base, entries: [createEntry(type)] };
    case SECTION_TYPES.SUMMARY:
      return { ...base, content: '' };
    case SECTION_TYPES.CUSTOM:
      return { ...base, content: '' };
    default:
      return { ...base, content: '' };
  }
}
