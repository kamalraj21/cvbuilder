import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { createSection, createEntry, SECTION_TYPES } from '../constants/sectionTypes';
import { createDefaultCV } from '../constants/defaultCV';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

// ── Text extraction — groups items by y-coordinate so "Work Experience"
//    stays as one line even when pdfjs returns them as separate text runs ──────

async function extractText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pageTexts = [];

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    // Group items by rounded y-coordinate (PDF y-axis is bottom-up)
    const lineMap = new Map();
    for (const item of content.items) {
      if (typeof item.str !== 'string' || !item.str.trim()) continue;
      const y = Math.round(item.transform[5]);
      if (!lineMap.has(y)) lineMap.set(y, []);
      lineMap.get(y).push({ x: item.transform[4], str: item.str });
    }

    // Sort y desc (top of page first), then sort each line's items by x (left→right)
    const lines = [...lineMap.keys()]
      .sort((a, b) => b - a)
      .map((y) =>
        lineMap
          .get(y)
          .sort((a, b) => a.x - b.x)
          .map((item) => item.str)
          .join('')
          .trim()
      )
      .filter(Boolean);

    pageTexts.push(lines.join('\n'));
  }

  return pageTexts.join('\n');
}

// ── Section header detection ──────────────────────────────────────────────────

const SECTION_PATTERNS = [
  {
    type: SECTION_TYPES.SUMMARY,
    re: /^(summary|objective|profile|about\s*me|professional\s*summary|career\s*objective|executive\s*summary|professional\s*profile)\s*:?\s*$/i,
  },
  {
    type: SECTION_TYPES.EXPERIENCE,
    re: /^(experience|work\s*experience|employment|work\s*history|professional\s*experience|career\s*history|employment\s*history|relevant\s*experience)\s*:?\s*$/i,
  },
  {
    type: SECTION_TYPES.EDUCATION,
    re: /^(education|academic|academic\s*background|educational\s*background|qualifications|academic\s*qualifications)\s*:?\s*$/i,
  },
  {
    type: SECTION_TYPES.SKILLS,
    re: /^(skills|technical\s*skills|core\s*competencies|technologies|key\s*skills|competencies|areas\s*of\s*expertise|expertise|tools?\s*&?\s*technologies?)\s*:?\s*$/i,
  },
  {
    type: SECTION_TYPES.PROJECTS,
    re: /^(projects|personal\s*projects|open\s*source|side\s*projects|portfolio|key\s*projects|notable\s*projects)\s*:?\s*$/i,
  },
  {
    type: SECTION_TYPES.CERTIFICATIONS,
    re: /^(certifications?|certificates?|licenses?|credentials?|accreditations?|professional\s*certifications?|awards?\s*&?\s*certifications?)\s*:?\s*$/i,
  },
];

function detectSectionType(line) {
  const trimmed = line.trim();
  for (const { type, re } of SECTION_PATTERNS) {
    if (re.test(trimmed)) return type;
  }
  return null;
}

function splitIntoSections(text) {
  const lines = text.split('\n');
  const sections = [];
  let currentType = null;
  let currentLines = [];
  let headerLines = [];
  let pastHeader = false;

  for (const line of lines) {
    const type = detectSectionType(line);
    if (type) {
      if (!pastHeader) {
        pastHeader = true;
        headerLines = currentLines;
        currentLines = [];
      } else {
        sections.push({ type: currentType, lines: currentLines });
        currentLines = [];
      }
      currentType = type;
    } else {
      currentLines.push(line);
    }
  }

  if (!pastHeader) {
    headerLines = currentLines;
  } else {
    sections.push({ type: currentType, lines: currentLines });
  }

  return { headerLines, sections };
}

// ── Personal info extraction ──────────────────────────────────────────────────

function extractPersonalInfo(headerLines, fullText) {
  const email = (fullText.match(/[\w.+\-]+@[\w\-]+\.[a-z]{2,}/i) || [])[0] || '';
  const phone =
    (fullText.match(/(\+?[\d][\d\s\-().]{5,}\d)/) || [])[0]?.trim() || '';

  // LinkedIn: capture full path after linkedin.com/in/
  const linkedinMatch = fullText.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([\w\-]+)/i);
  const linkedin = linkedinMatch ? `linkedin.com/in/${linkedinMatch[1]}` : '';

  // GitHub: capture username
  const githubMatch = fullText.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([\w\-]+)/i);
  const github = githubMatch ? `github.com/${githubMatch[1]}` : '';

  // Portfolio: first https URL that's not linkedin/github
  const urlMatches = [...fullText.matchAll(/https?:\/\/[^\s,)>\n]+/gi)].map((m) => m[0]);
  const portfolio =
    urlMatches.find(
      (u) => !u.toLowerCase().includes('linkedin') && !u.toLowerCase().includes('github')
    ) || '';

  // Name: first non-empty, non-contact line in headerLines
  const isContactLine = (l) =>
    /@/.test(l) ||
    /\d{5,}/.test(l) ||
    /linkedin|github|http|\.com/i.test(l) ||
    /^\+?[\d\s\-().]{7,}$/.test(l.trim());

  const nonEmpty = headerLines.map((l) => l.trim()).filter(Boolean);
  const fullName = nonEmpty.find((l) => l.length > 1 && !isContactLine(l)) || '';
  const headlineCandidate =
    nonEmpty.find((l) => l !== fullName && !isContactLine(l) && l.length > 3) || '';

  // Location: look for "City, ST" or "City, Country" pattern
  const locationMatch = fullText.match(
    /\b([A-Z][a-z]+([\s,]+(?:[A-Z]{2}|[A-Z][a-z]+)){1,2})\b/
  );
  const location = locationMatch?.[0]?.trim() || '';

  return {
    fullName,
    headline: headlineCandidate,
    email,
    phone,
    location,
    linkedin,
    github,
    portfolio,
  };
}

// ── Date parsing helpers ──────────────────────────────────────────────────────

const MONTH_NAMES = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun',
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
  'january', 'february', 'march', 'april', 'june', 'july', 'august',
  'september', 'october', 'november', 'december',
];

function parseMonth(str) {
  if (!str) return '';
  const lower = str.toLowerCase().replace('.', '');
  const idx = MONTH_NAMES.indexOf(lower);
  if (idx === -1) return '';
  return String((idx % 12) + 1).padStart(2, '0');
}

const DATE_RANGE_RE =
  /(?:(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|june|july|august|september|october|november|december)\.?\s+)?(\d{4})\s*(?:–|-|to)\s*(?:(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|february|march|april|june|july|august|september|october|november|december)\.?\s+)?(\d{4}|present|current|now)/gi;

function parseDateRange(line) {
  const m = DATE_RANGE_RE.exec(line);
  DATE_RANGE_RE.lastIndex = 0;
  if (!m) return null;
  const [, smRaw, syRaw, emRaw, eyRaw] = m;
  const current = /present|current|now/i.test(eyRaw);
  return {
    startMonth: parseMonth(smRaw),
    startYear: syRaw || '',
    endMonth: current ? '' : parseMonth(emRaw),
    endYear: current ? '' : eyRaw || '',
    current,
  };
}

// ── Bullet detection ──────────────────────────────────────────────────────────

const BULLET_RE = /^[\s]*[•\-*▸▪◆►→]\s+(.+)/;

function isBullet(line) {
  return BULLET_RE.test(line);
}

function extractBullet(line) {
  return (BULLET_RE.exec(line) || [])[1]?.trim() || '';
}

// ── Section parsers ───────────────────────────────────────────────────────────

function parseExperience(lines) {
  const section = createSection(SECTION_TYPES.EXPERIENCE, 'Work Experience');
  section.entries = [];

  const blocks = [];
  let current = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (current.length) {
        blocks.push(current);
        current = [];
      }
    } else {
      current.push(trimmed);
    }
  }
  if (current.length) blocks.push(current);

  for (const block of blocks) {
    if (!block.length) continue;
    const entry = createEntry(SECTION_TYPES.EXPERIENCE);
    const bullets = [];
    let dateFound = false;

    for (let i = 0; i < block.length; i++) {
      const line = block[i];
      const dateRange = parseDateRange(line);

      if (dateRange && !dateFound) {
        Object.assign(entry, dateRange);
        dateFound = true;
        if (i >= 1) entry.role = block[0];
        if (i >= 2) entry.company = block[1];
        else if (i === 1) entry.company = block[0];
      } else if (isBullet(line)) {
        bullets.push(extractBullet(line));
      }
    }

    if (!dateFound && block[0]) entry.company = block[0];
    if (!dateFound && block[1]) entry.role = block[1];

    entry.bullets = bullets;
    // Only add if entry has some content
    if (entry.company || entry.role || bullets.length) {
      section.entries.push(entry);
    }
  }

  if (!section.entries.length) section.entries = [createEntry(SECTION_TYPES.EXPERIENCE)];
  return section;
}

function parseEducation(lines) {
  const section = createSection(SECTION_TYPES.EDUCATION, 'Education');
  section.entries = [];

  const DEGREE_RE =
    /\b(b\.?s\.?|m\.?s\.?|b\.?a\.?|m\.?a\.?|ph\.?d\.?|bachelor|master|doctorate|associate|mba|meng|beng|b\.?sc|m\.?sc|b\.?tech|m\.?tech)\b/i;

  const blocks = [];
  let current = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (current.length) {
        blocks.push(current);
        current = [];
      }
    } else {
      current.push(trimmed);
    }
  }
  if (current.length) blocks.push(current);

  for (const block of blocks) {
    if (!block.length) continue;
    const entry = createEntry(SECTION_TYPES.EDUCATION);
    const allText = block.join(' ');

    const yearMatch = allText.match(/\b(19|20)\d{2}\b/);
    entry.graduationYear = yearMatch?.[0] || '';

    for (const line of block) {
      if (DEGREE_RE.test(line)) {
        entry.degree = line.trim();
      } else if (!entry.institution && !/^\d{4}$/.test(line.trim())) {
        entry.institution = line.trim();
      }
    }

    const gpaMatch = allText.match(/gpa[:\s]+([0-9.]+)/i);
    entry.gpa = gpaMatch?.[1] || '';

    if (entry.institution || entry.degree) {
      section.entries.push(entry);
    }
  }

  if (!section.entries.length) section.entries = [createEntry(SECTION_TYPES.EDUCATION)];
  return section;
}

function parseSkills(lines) {
  const section = createSection(SECTION_TYPES.SKILLS, 'Skills');
  section.groups = [];

  const categoryBlocks = [];
  const CATEGORY_RE = /^(.+?):\s*(.+)$/;
  const ungrouped = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const catMatch = CATEGORY_RE.exec(trimmed);
    if (catMatch && catMatch[2].split(/[,|]/).length >= 2) {
      const tags = catMatch[2].split(/[,|]/).map((t) => t.trim()).filter(Boolean);
      const group = createEntry(SECTION_TYPES.SKILLS);
      group.category = catMatch[1].trim();
      group.tags = tags;
      categoryBlocks.push(group);
    } else if (isBullet(trimmed)) {
      ungrouped.push(extractBullet(trimmed));
    } else {
      const tags = trimmed.split(/[,|•]/).map((t) => t.trim()).filter((t) => t.length > 0);
      ungrouped.push(...tags);
    }
  }

  if (categoryBlocks.length) {
    section.groups = categoryBlocks;
  } else if (ungrouped.length) {
    const group = createEntry(SECTION_TYPES.SKILLS);
    group.category = '';
    group.tags = [...new Set(ungrouped)].filter((t) => t.length > 0 && t.length < 60);
    section.groups = [group];
  } else {
    section.groups = [createEntry(SECTION_TYPES.SKILLS)];
  }

  return section;
}

function parseProjects(lines) {
  const section = createSection(SECTION_TYPES.PROJECTS, 'Projects');
  section.entries = [];

  const blocks = [];
  let current = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (current.length) {
        blocks.push(current);
        current = [];
      }
    } else {
      current.push(trimmed);
    }
  }
  if (current.length) blocks.push(current);

  for (const block of blocks) {
    if (!block.length) continue;
    const entry = createEntry(SECTION_TYPES.PROJECTS);
    entry.name = block[0];

    const allText = block.join(' ');

    const urlMatch = allText.match(/https?:\/\/[^\s,)>\n]+/);
    entry.url = urlMatch?.[0] || '';

    const techMatch =
      allText.match(/\(([^)]+)\)/) ||
      allText.match(/Tech(?:nologies|[ :]+)(.+)/i) ||
      allText.match(/\|([^|]+)$/);
    if (techMatch?.[1]) {
      entry.techStack = techMatch[1].split(/[,|]/).map((t) => t.trim()).filter(Boolean);
    }

    entry.bullets = block.filter(isBullet).map(extractBullet);

    if (entry.name) section.entries.push(entry);
  }

  if (!section.entries.length) section.entries = [createEntry(SECTION_TYPES.PROJECTS)];
  return section;
}

function parseSummary(lines) {
  const section = createSection(SECTION_TYPES.SUMMARY, 'Professional Summary');
  section.content = lines.filter((l) => l.trim()).join(' ').trim();
  return section;
}

function parseCertifications(lines) {
  const section = createSection(SECTION_TYPES.CERTIFICATIONS, 'Certifications');
  section.entries = [];

  const blocks = [];
  let current = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (current.length) {
        blocks.push(current);
        current = [];
      }
    } else {
      current.push(trimmed);
    }
  }
  if (current.length) blocks.push(current);

  for (const block of blocks) {
    if (!block.length) continue;
    const entry = createEntry(SECTION_TYPES.CERTIFICATIONS);
    entry.name = block[0] || '';
    entry.issuer = block[1] || '';

    const allText = block.join(' ');
    const dateMatch = allText.match(
      /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s*\d{4}|\d{4}/i
    );
    entry.date = dateMatch?.[0] || '';

    if (entry.name) section.entries.push(entry);
  }

  if (!section.entries.length) section.entries = [createEntry(SECTION_TYPES.CERTIFICATIONS)];
  return section;
}

// ── Main export ───────────────────────────────────────────────────────────────

export async function parsePDFtoCV(file) {
  const fullText = await extractText(file);
  const { headerLines, sections } = splitIntoSections(fullText);

  const personalInfo = extractPersonalInfo(headerLines, fullText);

  const parsedSections = [];

  for (const { type, lines } of sections) {
    switch (type) {
      case SECTION_TYPES.SUMMARY:
        parsedSections.push(parseSummary(lines));
        break;
      case SECTION_TYPES.EXPERIENCE:
        parsedSections.push(parseExperience(lines));
        break;
      case SECTION_TYPES.EDUCATION:
        parsedSections.push(parseEducation(lines));
        break;
      case SECTION_TYPES.SKILLS:
        parsedSections.push(parseSkills(lines));
        break;
      case SECTION_TYPES.PROJECTS:
        parsedSections.push(parseProjects(lines));
        break;
      case SECTION_TYPES.CERTIFICATIONS:
        parsedSections.push(parseCertifications(lines));
        break;
    }
  }

  // If no sections were detected, fall back to default empty sections
  // so the editor isn't left blank — the personal info still populates
  const finalSections =
    parsedSections.length > 0 ? parsedSections : createDefaultCV().sections;

  return { personalInfo, sections: finalSections };
}
