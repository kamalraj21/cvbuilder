import { Plus, Trash2 } from 'lucide-react';
import { useCVStore } from '../../../store/cvStore';
import { createEntry, SECTION_TYPES } from '../../../constants/sectionTypes';
import { Input } from '../../ui/Input';
import { TagInput } from '../../ui/TagInput';
import { BulletListEditor } from '../../ui/BulletListEditor';
import { Button } from '../../ui/Button';

function ProjectEntryEditor({ entry, sectionId }) {
  const updateEntry = useCVStore((s) => s.updateEntry);
  const removeEntry = useCVStore((s) => s.removeEntry);

  function update(field, value) {
    updateEntry(sectionId, entry.id, { [field]: value });
  }

  return (
    <div className="border border-gray-100 rounded-lg p-3 bg-gray-50 flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        <Input label="Project Name" placeholder="My Awesome App" value={entry.name} onChange={(e) => update('name', e.target.value)} />
        <Input label="URL (optional)" placeholder="github.com/jane/app" value={entry.url} onChange={(e) => update('url', e.target.value)} />
      </div>
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Tech Stack</label>
        <TagInput
          tags={entry.techStack}
          onChange={(tags) => update('techStack', tags)}
          placeholder="React, Python, AWS…"
        />
      </div>
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Description</label>
        <BulletListEditor
          bullets={entry.bullets}
          onChange={(bullets) => update('bullets', bullets)}
          placeholder="What did you build or achieve?"
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

export function ProjectsEditor({ section }) {
  const addEntry = useCVStore((s) => s.addEntry);

  return (
    <div className="p-3 flex flex-col gap-3">
      {(section.entries || []).map((entry) => (
        <ProjectEntryEditor key={entry.id} entry={entry} sectionId={section.id} />
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => addEntry(section.id, createEntry(SECTION_TYPES.PROJECTS))}
        className="w-full justify-center"
      >
        <Plus size={14} /> Add Project
      </Button>
    </div>
  );
}
