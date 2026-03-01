export const MONTHS = [
  { value: '01', label: 'Jan' },
  { value: '02', label: 'Feb' },
  { value: '03', label: 'Mar' },
  { value: '04', label: 'Apr' },
  { value: '05', label: 'May' },
  { value: '06', label: 'Jun' },
  { value: '07', label: 'Jul' },
  { value: '08', label: 'Aug' },
  { value: '09', label: 'Sep' },
  { value: '10', label: 'Oct' },
  { value: '11', label: 'Nov' },
  { value: '12', label: 'Dec' },
];

export function getYearOptions(startYear = 1990) {
  const current = new Date().getFullYear();
  const years = [];
  for (let y = current + 1; y >= startYear; y--) {
    years.push(String(y));
  }
  return years;
}

export function formatDateRange(startMonth, startYear, endMonth, endYear, current) {
  const start = startMonth && startYear
    ? `${MONTHS.find((m) => m.value === startMonth)?.label ?? ''} ${startYear}`
    : startYear || '';
  const end = current ? 'Present' : (endMonth && endYear
    ? `${MONTHS.find((m) => m.value === endMonth)?.label ?? ''} ${endYear}`
    : endYear || '');
  if (!start && !end) return '';
  if (!end) return start;
  return `${start} – ${end}`;
}
