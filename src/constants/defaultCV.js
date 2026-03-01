import { createSection, SECTION_TYPES } from './sectionTypes';

export function createDefaultCV() {
  return {
    personalInfo: {
      fullName: '',
      headline: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      portfolio: '',
    },
    sections: [
      createSection(SECTION_TYPES.SUMMARY, 'Professional Summary'),
      createSection(SECTION_TYPES.EXPERIENCE, 'Work Experience'),
      createSection(SECTION_TYPES.EDUCATION, 'Education'),
      createSection(SECTION_TYPES.SKILLS, 'Skills'),
      createSection(SECTION_TYPES.PROJECTS, 'Projects'),
    ],
  };
}
