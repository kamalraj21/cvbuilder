import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { SECTION_TYPES } from '../../../constants/sectionTypes';
import { formatDateRange } from '../../../utils/dateHelpers';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'LibreBaskerville',
    fontSize: 10,
    paddingHorizontal: 52,
    paddingVertical: 44,
    backgroundColor: '#ffffff',
  },
  header: { alignItems: 'center', marginBottom: 18 },
  name: { fontSize: 20, fontWeight: 700, color: '#111827', letterSpacing: 1 },
  headline: { fontSize: 10, color: '#6b7280', fontStyle: 'italic', marginTop: 3 },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 6,
  },
  contactItem: { flexDirection: 'row', alignItems: 'center' },
  contactText: { fontSize: 8.5, color: '#6b7280' },
  contactSep: { fontSize: 8.5, color: '#d1d5db', marginHorizontal: 5 },
  section: { marginBottom: 12 },
  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#111827',
    marginBottom: 2,
  },
  sectionLine: { height: 0.75, backgroundColor: '#374151', marginBottom: 7 },
  entryBlock: { marginBottom: 8 },
  entryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 },
  entryCompany: { fontSize: 10, fontWeight: 700, color: '#111827' },
  entryRole: { fontSize: 9.5, fontStyle: 'italic', color: '#374151' },
  entryDate: { fontSize: 8.5, color: '#6b7280' },
  bullet: { flexDirection: 'row', marginTop: 1.5 },
  bulletDot: { width: 10, fontSize: 9 },
  bulletText: { flex: 1, fontSize: 9, color: '#374151', lineHeight: 1.5 },
  skillRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 3 },
  skillLabel: { fontSize: 9, fontWeight: 700 },
  skillText: { fontSize: 9, color: '#374151' },
  summaryText: { fontSize: 9.5, color: '#374151', lineHeight: 1.6 },
});

function SectionHeader({ title }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionLine} />
    </View>
  );
}

function ContactRow({ personalInfo }) {
  const items = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.github,
    personalInfo.portfolio,
  ].filter(Boolean);

  return (
    <View style={styles.contactRow}>
      {items.map((v, i) => (
        <View key={i} style={styles.contactItem}>
          {i > 0 && <Text style={styles.contactSep}>|</Text>}
          <Text style={styles.contactText}>{v}</Text>
        </View>
      ))}
    </View>
  );
}

function ExperienceSection({ section }) {
  return (
    <View style={styles.section}>
      <SectionHeader title={section.title} />
      {(section.entries || []).map((e) => (
        <View key={e.id} style={styles.entryBlock} wrap={false}>
          <View style={styles.entryRow}>
            <Text style={styles.entryCompany}>{e.company || ''}</Text>
            <Text style={styles.entryDate}>
              {formatDateRange(e.startMonth, e.startYear, e.endMonth, e.endYear, e.current)}
            </Text>
          </View>
          <View style={styles.entryRow}>
            <Text style={styles.entryRole}>{e.role || ''}</Text>
            {e.location ? <Text style={styles.entryDate}>{e.location}</Text> : null}
          </View>
          {(e.bullets || []).filter(Boolean).map((b, i) => (
            <View key={i} style={styles.bullet}>
              <Text style={styles.bulletDot}>• </Text>
              <Text style={styles.bulletText}>{b}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function EducationSection({ section }) {
  return (
    <View style={styles.section}>
      <SectionHeader title={section.title} />
      {(section.entries || []).map((e) => (
        <View key={e.id} style={{ marginBottom: 6 }} wrap={false}>
          <View style={styles.entryRow}>
            <Text style={styles.entryCompany}>{e.institution || ''}</Text>
            {e.graduationYear ? (
              <Text style={styles.entryDate}>{e.graduationYear}</Text>
            ) : null}
          </View>
          <Text style={styles.entryRole}>
            {[e.degree, e.fieldOfStudy].filter(Boolean).join(', ')}
          </Text>
          {e.gpa ? <Text style={styles.entryDate}>GPA: {e.gpa}</Text> : null}
        </View>
      ))}
    </View>
  );
}

function SkillsSection({ section }) {
  return (
    <View style={styles.section}>
      <SectionHeader title={section.title} />
      {(section.groups || []).map((g) => (
        <View key={g.id} style={styles.skillRow}>
          {g.category ? (
            <Text style={styles.skillLabel}>{g.category}: </Text>
          ) : null}
          <Text style={styles.skillText}>{(g.tags || []).join(' · ')}</Text>
        </View>
      ))}
    </View>
  );
}

function ProjectsSection({ section }) {
  return (
    <View style={styles.section}>
      <SectionHeader title={section.title} />
      {(section.entries || []).map((e) => (
        <View key={e.id} style={{ marginBottom: 6 }} wrap={false}>
          <View style={styles.entryRow}>
            <Text style={styles.entryCompany}>{e.name || ''}</Text>
            {e.url ? (
              <Text style={{ fontSize: 8.5, color: '#2563eb' }}>{e.url}</Text>
            ) : null}
          </View>
          {(e.techStack || []).length > 0 && (
            <Text style={{ fontSize: 8, color: '#9ca3af', fontStyle: 'italic' }}>
              {e.techStack.join(', ')}
            </Text>
          )}
          {(e.bullets || []).filter(Boolean).map((b, i) => (
            <View key={i} style={styles.bullet}>
              <Text style={styles.bulletDot}>• </Text>
              <Text style={styles.bulletText}>{b}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function CertsSection({ section }) {
  return (
    <View style={styles.section}>
      <SectionHeader title={section.title} />
      {(section.entries || []).map((e) => (
        <View key={e.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }} wrap={false}>
          <Text style={styles.bulletText}>
            {e.name || ''}{e.issuer ? ` — ${e.issuer}` : ''}
          </Text>
          <Text style={styles.entryDate}>{e.date || ''}</Text>
        </View>
      ))}
    </View>
  );
}

function TextSection({ section }) {
  return (
    <View style={styles.section}>
      <SectionHeader title={section.title} />
      <Text style={styles.summaryText}>{section.content || ''}</Text>
    </View>
  );
}

export function ClassicPDFTemplate({ personalInfo, sections }) {
  const visibleSections = (sections || []).filter((s) => s.visible);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {personalInfo.fullName ? (
            <Text style={styles.name}>{personalInfo.fullName.toUpperCase()}</Text>
          ) : null}
          {personalInfo.headline ? (
            <Text style={styles.headline}>{personalInfo.headline}</Text>
          ) : null}
          <ContactRow personalInfo={personalInfo} />
        </View>

        {/* Sections */}
        {visibleSections.map((section) => {
          switch (section.type) {
            case SECTION_TYPES.EXPERIENCE:
              return <ExperienceSection key={section.id} section={section} />;
            case SECTION_TYPES.EDUCATION:
              return <EducationSection key={section.id} section={section} />;
            case SECTION_TYPES.SKILLS:
              return <SkillsSection key={section.id} section={section} />;
            case SECTION_TYPES.PROJECTS:
              return <ProjectsSection key={section.id} section={section} />;
            case SECTION_TYPES.CERTIFICATIONS:
              return <CertsSection key={section.id} section={section} />;
            case SECTION_TYPES.SUMMARY:
            case SECTION_TYPES.CUSTOM:
              return <TextSection key={section.id} section={section} />;
            default:
              return null;
          }
        })}
      </Page>
    </Document>
  );
}
