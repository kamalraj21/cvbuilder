import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { createSection, SECTION_TYPES, SECTION_TYPE_LABELS } from '../../constants/sectionTypes';
import { Button } from '../ui/Button';

const ADDABLE = [
  SECTION_TYPES.EXPERIENCE,
  SECTION_TYPES.EDUCATION,
  SECTION_TYPES.SKILLS,
  SECTION_TYPES.PROJECTS,
  SECTION_TYPES.CERTIFICATIONS,
  SECTION_TYPES.SUMMARY,
  SECTION_TYPES.CUSTOM,
];

export function AddSectionMenu() {
  const [open, setOpen] = useState(false);
  const addSection = useCVStore((s) => s.addSection);

  function handleAdd(type) {
    addSection(createSection(type));
    setOpen(false);
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        className="w-full justify-center"
      >
        <Plus size={14} /> Add Section <ChevronDown size={12} className={open ? 'rotate-180 transition-transform' : 'transition-transform'} />
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute bottom-full mb-1 left-0 right-0 z-20 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            {ADDABLE.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleAdd(type)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {SECTION_TYPE_LABELS[type]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
