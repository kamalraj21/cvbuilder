import { Plus, Trash2 } from 'lucide-react';
import { useCVStore } from '../../../store/cvStore';
import { createEntry, SECTION_TYPES } from '../../../constants/sectionTypes';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { getYearOptions } from '../../../utils/dateHelpers';

const years = getYearOptions(1960);

function EducationEntryEditor({ entry, sectionId }) {
  const updateEntry = useCVStore((s) => s.updateEntry);
  const removeEntry = useCVStore((s) => s.removeEntry);

  function update(field, value) {
    updateEntry(sectionId, entry.id, { [field]: value });
  }

  return (
    <div className="border border-gray-100 rounded-lg p-3 bg-gray-50 flex flex-col gap-2">
      <Input label="Institution" placeholder="MIT" value={entry.institution} onChange={(e) => update('institution', e.target.value)} />
      <div className="grid grid-cols-2 gap-2">
        <Input label="Degree" placeholder="B.S. / M.S. / Ph.D." value={entry.degree} onChange={(e) => update('degree', e.target.value)} />
        <Input label="Field of Study" placeholder="Computer Science" value={entry.fieldOfStudy} onChange={(e) => update('fieldOfStudy', e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">Graduation Year</label>
          <select
            value={entry.graduationYear}
            onChange={(e) => update('graduationYear', e.target.value)}
            className="w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Year</option>
            {years.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <Input label="GPA (optional)" placeholder="3.8 / 4.0" value={entry.gpa} onChange={(e) => update('gpa', e.target.value)} />
      </div>
      <div className="flex justify-end">
        <Button variant="danger" size="xs" onClick={() => removeEntry(sectionId, entry.id)}>
          <Trash2 size={12} /> Remove
        </Button>
      </div>
    </div>
  );
}

export function EducationEditor({ section }) {
  const addEntry = useCVStore((s) => s.addEntry);

  return (
    <div className="p-3 flex flex-col gap-3">
      {(section.entries || []).map((entry) => (
        <EducationEntryEditor key={entry.id} entry={entry} sectionId={section.id} />
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => addEntry(section.id, createEntry(SECTION_TYPES.EDUCATION))}
        className="w-full justify-center"
      >
        <Plus size={14} /> Add Education
      </Button>
    </div>
  );
}
