import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { SECTION_TYPES } from '../../../constants/sectionTypes';
import { formatDateRange } from '../../../utils/dateHelpers';

const mkStyles = (accentColor) =>
  StyleSheet.create({
    page: {
      fontFamily: 'Inter',
      fontSize: 10,
      backgroundColor: '#ffffff',
    },
    header: {
      backgroundColor: accentColor,
      paddingHorizontal: 40,
      paddingVertical: 24,
    },
    name: { fontSize: 22, fontWeight: 700, color: '#ffffff' },
    headline: { fontSize: 10, color: 'rgba(255,255,255,0.85)', marginTop: 3 },
    contactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 10,
    },
    contactItem: { flexDirection: 'row', alignItems: 'center', marginRight: 4 },
    contactText: { fontSize: 8.5, color: 'rgba(255,255,255,0.8)' },
    contactSep: { fontSize: 8.5, color: 'rgba(255,255,255,0.4)', marginHorizontal: 4 },
    body: { paddingHorizontal: 40, paddingVertical: 22 },
    section: { marginBottom: 14 },
    sectionHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 7 },
    sectionTitle: {
      fontSize: 8,
      fontWeight: 700,
      color: accentColor,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    },
    sectionLine: { flex: 1, height: 0.75, backgroundColor: '#e5e7eb', marginLeft: 6 },
    entryBlock: { marginBottom: 9 },
    entryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 1 },
    entryTitle: { fontSize: 10, fontWeight: 600, color: '#111827' },
    entrySubtitle: { fontSize: 9, color: '#6b7280' },
    entryDate: { fontSize: 8.5, color: '#9ca3af' },
    bullet: { flexDirection: 'row', marginTop: 2, paddingLeft: 2 },
    bulletDot: { width: 10, fontSize: 8.5, color: accentColor },
    bulletText: { flex: 1, fontSize: 8.5, color: '#374151', lineHeight: 1.5 },
    skillRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 3 },
    skillLabel: { fontSize: 9, fontWeight: 600, color: '#374151' },
    skillText: { fontSize: 9, color: '#6b7280', flex: 1, flexWrap: 'wrap' },
    summaryText: { fontSize: 9.5, color: '#374151', lineHeight: 1.6 },
  });

function SectionHeader({ title, styles }) {
  return (
    <View style={styles.sectionHeaderRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionLine} />
    </View>
  );
}

function ContactRow({ personalInfo, styles }) {
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

function ExperienceSection({ section, styles }) {
  return (
    <View style={styles.section}>
      <SectionHeader title={section.title} styles={styles} />
      {(section.entries || []).map((e) => (
        <View key={e.id} style={styles.entryBlock} wrap={false}>
          <View style={styles.entryRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.entryTitle}>{e.role || ''}</Text>
              <Text style={styles.entrySubtitle}>
                {[e.company, e.location].filter(Boolean).join(' · ')}
              </Text>
            </View>
            <Text style={styles.entryDate}>
              {formatDateRange(e.startMonth, e.startYear, e.endMonth, e.endYear, e.current)}
            </Text>
          </View>
          {(e.bullets || []).filter(Boolean).map((b, i) => (
            <View key={i} style={styles.bullet}>
              <Text style={styles.bulletDot}>▸ </Text>
              <Text style={styles.bulletText}>{b}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function EducationSection({ section, styles }) {
  return (
    <View style={styles.section}>
      <SectionHeader title={section.title} styles={styles} />
      {(section.entries || []).map((e) => (
        <View key={e.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }} wrap={false}>
          <View style={{ flex: 1 }}>
            <Text style={styles.entryTitle}>{e.institution || ''}</Text>
            <Text style={styles.entrySubtitle}>
              {[e.degree, e.fieldOfStudy].filter(Boolean).join(', ')}
            </Text>
            {e.gpa ? <Text style={styles.entryDate}>GPA: {e.gpa}</Text> : null}
          </View>
          <Text style={styles.entryDate}>{e.graduationYear || ''}</Text>
        </View>
      ))}
    </View>
  );
}

function SkillsSection({ section, styles }) {
  return (
    <View style={styles.section}>
      <SectionHeader title={section.title} styles={styles} />
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

function ProjectsSection({ section, styles }) {
  return (
    <View style={styles.section}>
      <SectionHeader title={section.title} styles={styles} />
      {(section.entries || []).map((e) => (
        <View key={e.id} style={styles.entryBlock} wrap={false}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 1 }}>
            <Text style={styles.entryTitle}>{e.name || ''}</Text>
            {(e.techStack || []).length > 0 && (
              <Text style={{ ...styles.entrySubtitle, marginLeft: 6, fontSize: 8 }}>
                ({e.techStack.join(', ')})
              </Text>
            )}
          </View>
          {(e.bullets || []).filter(Boolean).map((b, i) => (
            <View key={i} style={styles.bullet}>
              <Text style={styles.bulletDot}>▸ </Text>
              <Text style={styles.bulletText}>{b}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function CertsSection({ section, styles }) {
  return (
    <View style={styles.section}>
      <SectionHeader title={section.title} styles={styles} />
      {(section.entries || []).map((e) => (
        <View key={e.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }} wrap={false}>
          <Text style={styles.entryTitle}>
            {e.name || ''}{e.issuer ? ` · ${e.issuer}` : ''}
          </Text>
          <Text style={styles.entryDate}>{e.date || ''}</Text>
        </View>
      ))}
    </View>
  );
}

function TextSection({ section, styles }) {
  return (
    <View style={styles.section}>
      <SectionHeader title={section.title} styles={styles} />
      <Text style={styles.summaryText}>{section.content || ''}</Text>
    </View>
  );
}

export function ModernPDFTemplate({ personalInfo, sections, accentColor }) {
  const styles = mkStyles(accentColor || '#2563eb');
  const visibleSections = (sections || []).filter((s) => s.visible);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {personalInfo.fullName ? (
            <Text style={styles.name}>{personalInfo.fullName}</Text>
          ) : null}
          {personalInfo.headline ? (
            <Text style={styles.headline}>{personalInfo.headline}</Text>
          ) : null}
          <ContactRow personalInfo={personalInfo} styles={styles} />
        </View>

        {/* Body */}
        <View style={styles.body}>
          {visibleSections.map((section) => {
            switch (section.type) {
              case SECTION_TYPES.EXPERIENCE:
                return <ExperienceSection key={section.id} section={section} styles={styles} />;
              case SECTION_TYPES.EDUCATION:
                return <EducationSection key={section.id} section={section} styles={styles} />;
              case SECTION_TYPES.SKILLS:
                return <SkillsSection key={section.id} section={section} styles={styles} />;
              case SECTION_TYPES.PROJECTS:
                return <ProjectsSection key={section.id} section={section} styles={styles} />;
              case SECTION_TYPES.CERTIFICATIONS:
                return <CertsSection key={section.id} section={section} styles={styles} />;
              case SECTION_TYPES.SUMMARY:
              case SECTION_TYPES.CUSTOM:
                return <TextSection key={section.id} section={section} styles={styles} />;
              default:
                return null;
            }
          })}
        </View>
      </Page>
    </Document>
  );
}
