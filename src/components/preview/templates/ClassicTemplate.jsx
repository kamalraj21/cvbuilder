import { SECTION_TYPES } from '../../../constants/sectionTypes';
import { formatDateRange } from '../../../utils/dateHelpers';

function Divider() {
  return <hr className="border-gray-300 my-2" />;
}

function SectionTitle({ title }) {
  return (
    <div className="mb-2">
      <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">{title}</h2>
      <hr className="border-gray-800 mt-0.5" />
    </div>
  );
}

function ExperienceSection({ section }) {
  return (
    <div className="mb-4">
      <SectionTitle title={section.title} />
      {(section.entries || []).map((entry) => (
        <div key={entry.id} className="mb-3">
          <div className="flex justify-between items-baseline">
            <span className="font-bold text-sm text-gray-900">{entry.company}</span>
            <span className="text-xs text-gray-600">
              {formatDateRange(entry.startMonth, entry.startYear, entry.endMonth, entry.endYear, entry.current)}
            </span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="text-sm italic text-gray-700">{entry.role}</span>
            {entry.location && <span className="text-xs text-gray-500">{entry.location}</span>}
          </div>
          {(entry.bullets || []).filter(Boolean).length > 0 && (
            <ul className="list-disc ml-4 mt-1 space-y-0.5">
              {entry.bullets.filter(Boolean).map((b, i) => (
                <li key={i} className="text-xs text-gray-700">{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function EducationSection({ section }) {
  return (
    <div className="mb-4">
      <SectionTitle title={section.title} />
      {(section.entries || []).map((entry) => (
        <div key={entry.id} className="mb-2">
          <div className="flex justify-between items-baseline">
            <span className="font-bold text-sm">{entry.institution}</span>
            {entry.graduationYear && <span className="text-xs text-gray-600">{entry.graduationYear}</span>}
          </div>
          <div className="text-sm text-gray-700">
            {[entry.degree, entry.fieldOfStudy].filter(Boolean).join(', ')}
            {entry.gpa && <span className="text-xs text-gray-500 ml-2">GPA: {entry.gpa}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsSection({ section }) {
  return (
    <div className="mb-4">
      <SectionTitle title={section.title} />
      {(section.groups || []).map((group) => (
        <div key={group.id} className="mb-1 text-xs text-gray-700">
          {group.category && <span className="font-semibold">{group.category}: </span>}
          {(group.tags || []).join(' · ')}
        </div>
      ))}
    </div>
  );
}

function ProjectsSection({ section }) {
  return (
    <div className="mb-4">
      <SectionTitle title={section.title} />
      {(section.entries || []).map((entry) => (
        <div key={entry.id} className="mb-2">
          <div className="flex justify-between items-baseline">
            <span className="font-bold text-sm">{entry.name}</span>
            {entry.url && <span className="text-xs text-blue-600">{entry.url}</span>}
          </div>
          {(entry.techStack || []).length > 0 && (
            <div className="text-xs text-gray-500 italic">{entry.techStack.join(', ')}</div>
          )}
          {(entry.bullets || []).filter(Boolean).map((b, i) => (
            <div key={i} className="text-xs text-gray-700 ml-2">• {b}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function CertsSection({ section }) {
  return (
    <div className="mb-4">
      <SectionTitle title={section.title} />
      {(section.entries || []).map((entry) => (
        <div key={entry.id} className="flex justify-between text-xs text-gray-700 mb-1">
          <span className="font-semibold">{entry.name}{entry.issuer && ` — ${entry.issuer}`}</span>
          <span className="text-gray-500">{entry.date}</span>
        </div>
      ))}
    </div>
  );
}

function TextSection({ section }) {
  return (
    <div className="mb-4">
      <SectionTitle title={section.title} />
      <p className="text-xs text-gray-700 leading-relaxed">{section.content}</p>
    </div>
  );
}

export function ClassicTemplate({ personalInfo, sections, accentColor }) {
  const visibleSections = sections.filter((s) => s.visible);

  return (
    <div
      style={{ fontFamily: "'Libre Baskerville', Georgia, serif", padding: '48px 52px', minHeight: 1123 }}
    >
      {/* Header */}
      <div className="text-center mb-6">
        {personalInfo.fullName && (
          <h1 className="text-2xl font-bold text-gray-900 tracking-wide uppercase">
            {personalInfo.fullName}
          </h1>
        )}
        {personalInfo.headline && (
          <p className="text-sm italic text-gray-600 mt-0.5">{personalInfo.headline}</p>
        )}
        <div className="flex flex-wrap justify-center gap-3 mt-2 text-xs text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.github && <span>{personalInfo.github}</span>}
          {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
        </div>
      </div>

      {/* Sections */}
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
