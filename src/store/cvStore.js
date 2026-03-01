import { create } from 'zustand';
import { createDefaultCV } from '../constants/defaultCV';
import { loadSlot, loadSettings, saveSettings } from '../utils/storage';

const savedSettings = loadSettings();
const initialSlot = savedSettings?.activeSlot ?? 0;
const savedCV = loadSlot(initialSlot);
const defaultCV = createDefaultCV();

const initialState = {
  personalInfo: savedCV?.personalInfo ?? defaultCV.personalInfo,
  sections: savedCV?.sections ?? defaultCV.sections,
  activeTemplate: savedSettings?.activeTemplate ?? 'modern',
  accentColor: savedSettings?.accentColor ?? '#2563eb',
  activeSlot: initialSlot,
};

export const useCVStore = create((set, get) => ({
  ...initialState,

  // Personal info
  setPersonalInfo: (field, value) =>
    set((state) => ({
      personalInfo: { ...state.personalInfo, [field]: value },
    })),

  // Sections
  setSections: (sections) => set({ sections }),

  addSection: (section) =>
    set((state) => ({ sections: [...state.sections, section] })),

  removeSection: (sectionId) =>
    set((state) => ({
      sections: state.sections.filter((s) => s.id !== sectionId),
    })),

  updateSection: (sectionId, updates) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId ? { ...s, ...updates } : s
      ),
    })),

  toggleSectionVisibility: (sectionId) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId ? { ...s, visible: !s.visible } : s
      ),
    })),

  // Entries (experience, education, projects, certifications)
  addEntry: (sectionId, entry) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId ? { ...s, entries: [...(s.entries || []), entry] } : s
      ),
    })),

  removeEntry: (sectionId, entryId) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId
          ? { ...s, entries: (s.entries || []).filter((e) => e.id !== entryId) }
          : s
      ),
    })),

  updateEntry: (sectionId, entryId, updates) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              entries: (s.entries || []).map((e) =>
                e.id === entryId ? { ...e, ...updates } : e
              ),
            }
          : s
      ),
    })),

  reorderEntries: (sectionId, entries) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId ? { ...s, entries } : s
      ),
    })),

  // Skill groups
  addSkillGroup: (sectionId, group) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId ? { ...s, groups: [...(s.groups || []), group] } : s
      ),
    })),

  removeSkillGroup: (sectionId, groupId) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId
          ? { ...s, groups: (s.groups || []).filter((g) => g.id !== groupId) }
          : s
      ),
    })),

  updateSkillGroup: (sectionId, groupId, updates) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              groups: (s.groups || []).map((g) =>
                g.id === groupId ? { ...g, ...updates } : g
              ),
            }
          : s
      ),
    })),

  // Content sections (summary, custom)
  setSectionContent: (sectionId, content) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId ? { ...s, content } : s
      ),
    })),

  // Settings
  setTemplate: (template) => {
    set({ activeTemplate: template });
    const s = get();
    saveSettings({ activeTemplate: template, accentColor: s.accentColor, activeSlot: s.activeSlot });
  },

  setAccentColor: (color) => {
    set({ accentColor: color });
    const s = get();
    saveSettings({ activeTemplate: s.activeTemplate, accentColor: color, activeSlot: s.activeSlot });
  },

  // Slot management
  setActiveSlot: (slot) => {
    set({ activeSlot: slot });
    const s = get();
    saveSettings({ activeTemplate: s.activeTemplate, accentColor: s.accentColor, activeSlot: slot });
  },

  loadCVFromData: (data) =>
    set({
      personalInfo: data.personalInfo,
      sections: data.sections,
    }),

  resetCV: () => {
    const fresh = createDefaultCV();
    set({ personalInfo: fresh.personalInfo, sections: fresh.sections });
  },
}));
