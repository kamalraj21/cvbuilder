import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2 } from 'lucide-react';
import { useCVStore } from '../../../store/cvStore';
import { createEntry, SECTION_TYPES } from '../../../constants/sectionTypes';
import { Input } from '../../ui/Input';
import { BulletListEditor } from '../../ui/BulletListEditor';
import { DateRangePicker } from '../../ui/DateRangePicker';
import { Button } from '../../ui/Button';

function ExperienceEntryEditor({ entry, sectionId }) {
  const updateEntry = useCVStore((s) => s.updateEntry);
  const removeEntry = useCVStore((s) => s.removeEntry);

  function update(field, value) {
    updateEntry(sectionId, entry.id, { [field]: value });
  }

  return (
    <div className="border border-gray-100 rounded-lg p-3 bg-gray-50 flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        <Input label="Company" placeholder="Acme Corp" value={entry.company} onChange={(e) => update('company', e.target.value)} />
        <Input label="Role / Title" placeholder="Software Engineer" value={entry.role} onChange={(e) => update('role', e.target.value)} />
        <div className="col-span-2">
          <Input label="Location" placeholder="San Francisco, CA (or Remote)" value={entry.location} onChange={(e) => update('location', e.target.value)} />
        </div>
      </div>

      <DateRangePicker
        startMonth={entry.startMonth}
        startYear={entry.startYear}
        endMonth={entry.endMonth}
        endYear={entry.endYear}
        current={entry.current}
        onStartMonthChange={(v) => update('startMonth', v)}
        onStartYearChange={(v) => update('startYear', v)}
        onEndMonthChange={(v) => update('endMonth', v)}
        onEndYearChange={(v) => update('endYear', v)}
        onCurrentChange={(v) => update('current', v)}
      />

      <div>
        <label className="text-xs text-gray-500 mb-1 block">Bullet Points</label>
        <BulletListEditor
          bullets={entry.bullets}
          onChange={(bullets) => update('bullets', bullets)}
          placeholder="Describe an accomplishment or responsibility…"
        />
      </div>

      <div className="flex justify-end">
        <Button variant="danger" size="xs" onClick={() => removeEntry(sectionId, entry.id)}>
          <Trash2 size={12} /> Remove
        </Button>
      </div>
    </div>
  );
}

export function ExperienceEditor({ section }) {
  const addEntry = useCVStore((s) => s.addEntry);

  return (
    <div className="p-3 flex flex-col gap-3">
      {(section.entries || []).map((entry) => (
        <ExperienceEntryEditor key={entry.id} entry={entry} sectionId={section.id} />
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => addEntry(section.id, createEntry(SECTION_TYPES.EXPERIENCE))}
        className="w-full justify-center"
      >
        <Plus size={14} /> Add Position
      </Button>
    </div>
  );
}
