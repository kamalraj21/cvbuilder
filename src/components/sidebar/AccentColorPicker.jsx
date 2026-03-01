import { useCVStore } from '../../store/cvStore';
import { ACCENT_COLORS } from '../../constants/accentColors';
import { Check } from 'lucide-react';

export function AccentColorPicker() {
  const accentColor = useCVStore((s) => s.accentColor);
  const setAccentColor = useCVStore((s) => s.setAccentColor);

  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Accent Color</h3>
      <div className="flex flex-wrap gap-2">
        {ACCENT_COLORS.map((c) => (
          <button
            key={c.value}
            onClick={() => setAccentColor(c.value)}
            title={c.label}
            className="relative w-7 h-7 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400"
            style={{ backgroundColor: c.value }}
          >
            {accentColor === c.value && (
              <Check size={12} className="absolute inset-0 m-auto text-white" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
