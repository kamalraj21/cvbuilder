const SLOT_KEY = (slot) => `cv_slot_${slot}`;
const SETTINGS_KEY = 'cv_settings';

export function saveSlot(slot, cvData) {
  try {
    localStorage.setItem(SLOT_KEY(slot), JSON.stringify(cvData));
  } catch (e) {
    console.error('Failed to save CV:', e);
  }
}

export function loadSlot(slot) {
  try {
    const raw = localStorage.getItem(SLOT_KEY(slot));
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Failed to load CV:', e);
    return null;
  }
}

export function deleteSlot(slot) {
  localStorage.removeItem(SLOT_KEY(slot));
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function getSlotMeta() {
  return [0, 1, 2].map((slot) => {
    const data = loadSlot(slot);
    return {
      slot,
      empty: !data,
      name: data?.personalInfo?.fullName || `Slot ${slot + 1}`,
    };
  });
}
