import { Plus, Trash2 } from 'lucide-react';
import { useCVStore } from '../../../store/cvStore';
import { createEntry, SECTION_TYPES } from '../../../constants/sectionTypes';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';

function CertificationEntryEditor({ entry, sectionId }) {
  const updateEntry = useCVStore((s) => s.updateEntry);
  const removeEntry = useCVStore((s) => s.removeEntry);

  function update(field, value) {
    updateEntry(sectionId, entry.id, { [field]: value });
  }

  return (
    <div className="border border-gray-100 rounded-lg p-3 bg-gray-50 flex flex-col gap-2">
      <Input label="Certification Name" placeholder="AWS Solutions Architect" value={entry.name} onChange={(e) => update('name', e.target.value)} />
      <div className="grid grid-cols-2 gap-2">
        <Input label="Issuing Organization" placeholder="Amazon Web Services" value={entry.issuer} onChange={(e) => update('issuer', e.target.value)} />
        <Input label="Date" placeholder="Jan 2024" value={entry.date} onChange={(e) => update('date', e.target.value)} />
      </div>
      <div className="flex justify-end">
        <Button variant="danger" size="xs" onClick={() => removeEntry(sectionId, entry.id)}>
          <Trash2 size={12} /> Remove
        </Button>
      </div>
    </div>
  );
}

export function CertificationsEditor({ section }) {
  const addEntry = useCVStore((s) => s.addEntry);

  return (
    <div className="p-3 flex flex-col gap-3">
      {(section.entries || []).map((entry) => (
        <CertificationEntryEditor key={entry.id} entry={entry} sectionId={section.id} />
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => addEntry(section.id, createEntry(SECTION_TYPES.CERTIFICATIONS))}
        className="w-full justify-center"
      >
        <Plus size={14} /> Add Certification
      </Button>
    </div>
  );
}
