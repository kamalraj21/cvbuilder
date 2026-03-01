import { useState } from 'react';
import { ChevronDown, ChevronRight, Eye, EyeOff, Trash2, GripVertical } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { SECTION_TYPES } from '../../constants/sectionTypes';
import { SummaryEditor } from './sections/SummaryEditor';
import { ExperienceEditor } from './sections/ExperienceEditor';
import { EducationEditor } from './sections/EducationEditor';
import { SkillsEditor } from './sections/SkillsEditor';
import { ProjectsEditor } from './sections/ProjectsEditor';
import { CertificationsEditor } from './sections/CertificationsEditor';
import { CustomSectionEditor } from './sections/CustomSectionEditor';

function SectionBody({ section }) {
  switch (section.type) {
    case SECTION_TYPES.SUMMARY: return <SummaryEditor section={section} />;
    case SECTION_TYPES.EXPERIENCE: return <ExperienceEditor section={section} />;
    case SECTION_TYPES.EDUCATION: return <EducationEditor section={section} />;
    case SECTION_TYPES.SKILLS: return <SkillsEditor section={section} />;
    case SECTION_TYPES.PROJECTS: return <ProjectsEditor section={section} />;
    case SECTION_TYPES.CERTIFICATIONS: return <CertificationsEditor section={section} />;
    case SECTION_TYPES.CUSTOM: return <CustomSectionEditor section={section} />;
    default: return null;
  }
}

export function SectionCard({ section, dragHandleProps, dragHandleAttributes }) {
  const [open, setOpen] = useState(true);
  const toggleSectionVisibility = useCVStore((s) => s.toggleSectionVisibility);
  const removeSection = useCVStore((s) => s.removeSection);
  const updateSection = useCVStore((s) => s.updateSection);

  return (
    <div className={`border rounded-lg overflow-hidden ${section.visible ? 'border-gray-200' : 'border-gray-100 opacity-60'}`}>
      {/* Header */}
      <div className="flex items-center gap-1 px-2 py-2 bg-white">
        {/* Drag handle */}
        <button
          type="button"
          {...dragHandleProps}
          {...dragHandleAttributes}
          className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing p-0.5"
          tabIndex={-1}
        >
          <GripVertical size={15} />
        </button>

        {/* Collapse toggle */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-gray-400 hover:text-gray-600 p-0.5"
        >
          {open ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
        </button>

        {/* Title */}
        <input
          type="text"
          value={section.title}
          onChange={(e) => updateSection(section.id, { title: e.target.value })}
          className="flex-1 text-sm font-semibold text-gray-700 bg-transparent focus:outline-none focus:ring-1 focus:ring-blue-400 rounded px-1"
        />

        {/* Visibility */}
        <button
          type="button"
          onClick={() => toggleSectionVisibility(section.id)}
          className="text-gray-400 hover:text-gray-600 p-0.5"
          title={section.visible ? 'Hide section' : 'Show section'}
        >
          {section.visible ? <Eye size={14} /> : <EyeOff size={14} />}
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={() => removeSection(section.id)}
          className="text-red-300 hover:text-red-500 p-0.5"
          title="Delete section"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Body */}
      {open && (
        <div className="bg-gray-50 border-t border-gray-100">
          <SectionBody section={section} />
        </div>
      )}
    </div>
  );
}
