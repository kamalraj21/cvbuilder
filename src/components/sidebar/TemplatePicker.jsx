import { useCVStore } from '../../store/cvStore';
import { TEMPLATES } from '../../constants/templates';
import { Check } from 'lucide-react';

export function TemplatePicker() {
  const activeTemplate = useCVStore((s) => s.activeTemplate);
  const setTemplate = useCVStore((s) => s.setTemplate);

  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Template</h3>
      <div className="flex flex-col gap-1.5">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-left text-xs transition-colors ${
              activeTemplate === t.id
                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                : 'hover:bg-gray-50 text-gray-700 border border-transparent'
            }`}
          >
            <span className="flex-1">
              <span className="font-medium block">{t.label}</span>
              <span className="text-gray-400">{t.description}</span>
            </span>
            {activeTemplate === t.id && <Check size={13} className="text-blue-600 shrink-0" />}
          </button>
        ))}
      </div>
    </div>
  );
}
