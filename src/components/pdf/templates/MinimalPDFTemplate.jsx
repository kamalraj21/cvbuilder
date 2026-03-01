import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { SECTION_TYPES } from '../../../constants/sectionTypes';
import { formatDateRange } from '../../../utils/dateHelpers';

const styles = StyleSheet.create({
  page: { fontFamily: 'Lato', fontSize: 9, paddingHorizontal: 56, paddingVertical: 48, backgroundColor: '#ffffff' },
  header: { marginBottom: 24 },
  name: { fontSize: 22, fontWeight: 400, color: '#111827', letterSpacing: 0.5 },
  headline: { fontSize: 10, color: '#9ca3af', marginTop: 3 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  contactText: { fontSize: 8, color: '#9ca3af' },
  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 7, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#9ca3af', marginBottom: 10 },
  entryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 },
  entryTitle: { fontSize: 9, fontWeight: 700, color: '#111827' },
  entrySubtitle: { fontSize: 8, color: '#9ca3af' },
  entryDate: { fontSize: 8, color: '#9ca3af' },
  bullet: { marginTop: 2, paddingLeft: 8, borderLeftWidth: 1, borderLeftColor: '#e5e7eb' },
  bulletText: { fontSize: 8, color: '#374151', lineHeight: 1.5 },
  skillText: { fontSize: 8, color: '#6b7280', marginBottom: 2 },
  skillLabel: { fontWeight: 700, color: '#374151' },
});

function ExperienceSection({ section }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {(section.entries || []).map((e) => (
        <View key={e.id} style={{ marginBottom: 10 }}>
          <View style={styles.entryRow}>
            <Text style={styles.entryTitle}>{e.role}</Text>
            <Text style={styles.entryDate}>{formatDateRange(e.startMonth, e.startYear, e.endMonth, e.endYear, e.current)}</Text>
          </View>
          <Text style={styles.entrySubtitle}>{[e.company, e.location].filter(Boolean).join(' — ')}</Text>
          {(e.bullets || []).filter(Boolean).map((b, i) => (
            <View key={i} style={styles.bullet}>
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
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {(section.entries || []).map((e) => (
        <View key={e.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.entryTitle}>{e.institution}</Text>
            <Text style={styles.entrySubtitle}>{[e.degree, e.fieldOfStudy].filter(Boolean).join(', ')}</Text>
          </View>
          <Text style={styles.entryDate}>{e.graduationYear}</Text>
        </View>
      ))}
    </View>
  );
}

function SkillsSection({ section }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {(section.groups || []).map((g) => (
        <Text key={g.id} style={styles.skillText}>
          {g.category ? <Text style={styles.skillLabel}>{g.category} </Text> : null}
          {(g.tags || []).join(', ')}
        </Text>
      ))}
    </View>
  );
}

function ProjectsSection({ section }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {(section.entries || []).map((e) => (
        <View key={e.id} style={{ marginBottom: 6 }}>
          <Text style={styles.entryTitle}>{e.name}</Text>
          {(e.techStack || []).length > 0 && (
            <Text style={{ fontSize: 7, color: '#9ca3af', fontStyle: 'italic' }}>{e.techStack.join(', ')}</Text>
          )}
          {(e.bullets || []).filter(Boolean).map((b, i) => (
            <Text key={i} style={styles.bulletText}>{b}</Text>
          ))}
        </View>
      ))}
    </View>
  );
}

function CertsSection({ section }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {(section.entries || []).map((e) => (
        <View key={e.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
          <Text style={styles.skillText}>{e.name}{e.issuer ? ` — ${e.issuer}` : ''}</Text>
          <Text style={styles.entryDate}>{e.date}</Text>
        </View>
      ))}
    </View>
  );
}

function TextSection({ section }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.bulletText}>{section.content}</Text>
    </View>
  );
}

export function MinimalPDFTemplate({ personalInfo, sections, accentColor }) {
  const visibleSections = sections.filter((s) => s.visible);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {personalInfo.fullName ? <Text style={styles.name}>{personalInfo.fullName}</Text> : null}
          {personalInfo.headline ? <Text style={styles.headline}>{personalInfo.headline}</Text> : null}
          <View style={styles.contactRow}>
            {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin, personalInfo.github, personalInfo.portfolio]
              .filter(Boolean)
              .map((v, i) => <Text key={i} style={styles.contactText}>{v}</Text>)}
          </View>
        </View>
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
      </Page>
    </Document>
  );
}
