import { SECTION_TYPES } from '../../../constants/sectionTypes';
import { formatDateRange } from '../../../utils/dateHelpers';

function SectionTitle({ title }) {
  return (
    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3 mt-1">
      {title}
    </h2>
  );
}

function ExperienceSection({ section }) {
  return (
    <div className="mb-6">
      <SectionTitle title={section.title} />
      {(section.entries || []).map((entry) => (
        <div key={entry.id} className="mb-4">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-900">{entry.role}</span>
            <span className="text-xs text-gray-400">
              {formatDateRange(entry.startMonth, entry.startYear, entry.endMonth, entry.endYear, entry.current)}
            </span>
          </div>
          <div className="text-xs text-gray-500 mb-1">{entry.company}{entry.location ? ` — ${entry.location}` : ''}</div>
          {(entry.bullets || []).filter(Boolean).map((b, i) => (
            <p key={i} className="text-xs text-gray-700 mt-0.5 pl-2 border-l border-gray-200">{b}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

function EducationSection({ section }) {
  return (
    <div className="mb-6">
      <SectionTitle title={section.title} />
      {(section.entries || []).map((entry) => (
        <div key={entry.id} className="mb-2 flex justify-between">
          <div>
            <div className="text-sm font-medium text-gray-900">{entry.institution}</div>
            <div className="text-xs text-gray-500">{[entry.degree, entry.fieldOfStudy].filter(Boolean).join(', ')}</div>
          </div>
          {entry.graduationYear && <span className="text-xs text-gray-400">{entry.graduationYear}</span>}
        </div>
      ))}
    </div>
  );
}

function SkillsSection({ section }) {
  return (
    <div className="mb-6">
      <SectionTitle title={section.title} />
      {(section.groups || []).map((group) => (
        <p key={group.id} className="text-xs text-gray-600 mb-1">
          {group.category && <span className="font-medium text-gray-700">{group.category} </span>}
          {(group.tags || []).join(', ')}
        </p>
      ))}
    </div>
  );
}

function ProjectsSection({ section }) {
  return (
    <div className="mb-6">
      <SectionTitle title={section.title} />
      {(section.entries || []).map((entry) => (
        <div key={entry.id} className="mb-3">
          <div className="text-sm font-medium text-gray-900">{entry.name}</div>
          {(entry.techStack || []).length > 0 && (
            <div className="text-xs text-gray-400 italic">{entry.techStack.join(', ')}</div>
          )}
          {(entry.bullets || []).filter(Boolean).map((b, i) => (
            <p key={i} className="text-xs text-gray-600 mt-0.5">{b}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

function CertsSection({ section }) {
  return (
    <div className="mb-6">
      <SectionTitle title={section.title} />
      {(section.entries || []).map((entry) => (
        <div key={entry.id} className="flex justify-between text-xs mb-1">
          <span className="text-gray-700">{entry.name}{entry.issuer && ` — ${entry.issuer}`}</span>
          <span className="text-gray-400">{entry.date}</span>
        </div>
      ))}
    </div>
  );
}

function TextSection({ section }) {
  return (
    <div className="mb-6">
      <SectionTitle title={section.title} />
      <p className="text-xs text-gray-600 leading-relaxed">{section.content}</p>
    </div>
  );
}

export function MinimalTemplate({ personalInfo, sections, accentColor }) {
  const visibleSections = sections.filter((s) => s.visible);

  return (
    <div style={{ fontFamily: "'Lato', sans-serif", padding: '56px 64px', minHeight: 1123 }}>
      {/* Minimal header */}
      <div className="mb-8">
        {personalInfo.fullName && (
          <h1 className="text-3xl font-light text-gray-900 tracking-wide">{personalInfo.fullName}</h1>
        )}
        {personalInfo.headline && (
          <p className="text-sm text-gray-500 mt-1">{personalInfo.headline}</p>
        )}
        <div className="flex flex-wrap gap-x-4 mt-3 text-xs text-gray-400 border-t border-gray-100 pt-3">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {visibleSections.map((section) => {
        switch (section.type) {
          case SECTION_TYPES.EXPERIENCE: return <ExperienceSection key={section.id} section={section} />;
          case SECTION_TYPES.EDUCATION: return <EducationSection key={section.id} section={section} />;
          case SECTION_TYPES.SKILLS: return <SkillsSection key={section.id} section={section} />;
          case SECTION_TYPES.PROJECTS: return <ProjectsSection key={section.id} section={section} />;
          case SECTION_TYPES.CERTIFICATIONS: return <CertsSection key={section.id} section={section} />;
          case SECTION_TYPES.SUMMARY:
          case SECTION_TYPES.CUSTOM:
            return <TextSection key={section.id} section={section} />;
          default: return null;
        }
      })}
    </div>
  );
}
