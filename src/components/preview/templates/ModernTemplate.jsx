import { SECTION_TYPES } from '../../../constants/sectionTypes';
import { formatDateRange } from '../../../utils/dateHelpers';

function SectionTitle({ title, accentColor }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>
        {title}
      </h2>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

function ExperienceSection({ section, accentColor }) {
  return (
    <div className="mb-5">
      <SectionTitle title={section.title} accentColor={accentColor} />
      {(section.entries || []).map((entry) => (
        <div key={entry.id} className="mb-3">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm font-semibold text-gray-900">{entry.role}</div>
              <div className="text-sm text-gray-600">{entry.company}{entry.location ? ` · ${entry.location}` : ''}</div>
            </div>
            <div className="text-xs text-gray-500 shrink-0 ml-2 pt-0.5">
              {formatDateRange(entry.startMonth, entry.startYear, entry.endMonth, entry.endYear, entry.current)}
            </div>
          </div>
          {(entry.bullets || []).filter(Boolean).length > 0 && (
            <ul className="mt-1 space-y-0.5">
              {entry.bullets.filter(Boolean).map((b, i) => (
                <li key={i} className="text-xs text-gray-700 flex gap-1.5">
                  <span className="mt-0.5" style={{ color: accentColor }}>▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function EducationSection({ section, accentColor }) {
  return (
    <div className="mb-5">
      <SectionTitle title={section.title} accentColor={accentColor} />
      {(section.entries || []).map((entry) => (
        <div key={entry.id} className="flex justify-between mb-1.5">
          <div>
            <div className="text-sm font-semibold text-gray-900">{entry.institution}</div>
            <div className="text-xs text-gray-600">
              {[entry.degree, entry.fieldOfStudy].filter(Boolean).join(', ')}
            </div>
            {entry.gpa && <div className="text-xs text-gray-500">GPA: {entry.gpa}</div>}
          </div>
          {entry.graduationYear && (
            <div className="text-xs text-gray-500 shrink-0">{entry.graduationYear}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function SkillsSection({ section, accentColor }) {
  return (
    <div className="mb-5">
      <SectionTitle title={section.title} accentColor={accentColor} />
      <div className="flex flex-col gap-1">
        {(section.groups || []).map((group) => (
          <div key={group.id} className="flex gap-1 flex-wrap text-xs">
            {group.category && (
              <span className="font-semibold text-gray-700 shrink-0">{group.category}:</span>
            )}
            <span className="text-gray-600">{(group.tags || []).join(' · ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsSection({ section, accentColor }) {
  return (
    <div className="mb-5">
      <SectionTitle title={section.title} accentColor={accentColor} />
      {(section.entries || []).map((entry) => (
        <div key={entry.id} className="mb-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold text-gray-900">{entry.name}</span>
            {(entry.techStack || []).length > 0 && (
              <span className="text-xs text-gray-400">({entry.techStack.join(', ')})</span>
            )}
          </div>
          {entry.url && <div className="text-xs" style={{ color: accentColor }}>{entry.url}</div>}
          {(entry.bullets || []).filter(Boolean).map((b, i) => (
            <div key={i} className="text-xs text-gray-700 flex gap-1.5">
              <span style={{ color: accentColor }}>▸</span><span>{b}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function CertsSection({ section, accentColor }) {
  return (
    <div className="mb-5">
      <SectionTitle title={section.title} accentColor={accentColor} />
      {(section.entries || []).map((entry) => (
        <div key={entry.id} className="flex justify-between text-xs text-gray-700 mb-1">
          <span className="font-medium">{entry.name}{entry.issuer && <span className="text-gray-500"> · {entry.issuer}</span>}</span>
          <span className="text-gray-400">{entry.date}</span>
        </div>
      ))}
    </div>
  );
}

function TextSection({ section, accentColor }) {
  return (
    <div className="mb-5">
      <SectionTitle title={section.title} accentColor={accentColor} />
      <p className="text-xs text-gray-700 leading-relaxed">{section.content}</p>
    </div>
  );
}

export function ModernTemplate({ personalInfo, sections, accentColor }) {
  const visibleSections = sections.filter((s) => s.visible);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: 1123 }}>
      {/* Accent header */}
      <div style={{ backgroundColor: accentColor }} className="px-12 py-8">
        {personalInfo.fullName && (
          <h1 className="text-2xl font-bold text-white tracking-wide">{personalInfo.fullName}</h1>
        )}
        {personalInfo.headline && (
          <p className="text-sm text-white/80 mt-0.5">{personalInfo.headline}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-white/70">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Body */}
      <div className="px-12 py-6">
        {visibleSections.map((section) => {
          switch (section.type) {
            case SECTION_TYPES.EXPERIENCE: return <ExperienceSection key={section.id} section={section} accentColor={accentColor} />;
            case SECTION_TYPES.EDUCATION: return <EducationSection key={section.id} section={section} accentColor={accentColor} />;
            case SECTION_TYPES.SKILLS: return <SkillsSection key={section.id} section={section} accentColor={accentColor} />;
            case SECTION_TYPES.PROJECTS: return <ProjectsSection key={section.id} section={section} accentColor={accentColor} />;
            case SECTION_TYPES.CERTIFICATIONS: return <CertsSection key={section.id} section={section} accentColor={accentColor} />;
            case SECTION_TYPES.SUMMARY:
            case SECTION_TYPES.CUSTOM:
              return <TextSection key={section.id} section={section} accentColor={accentColor} />;
            default: return null;
          }
        })}
      </div>
    </div>
  );
}
