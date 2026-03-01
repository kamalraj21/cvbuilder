import { Plus, Trash2 } from 'lucide-react';
import { useCVStore } from '../../../store/cvStore';
import { createEntry, SECTION_TYPES } from '../../../constants/sectionTypes';
import { Input } from '../../ui/Input';
import { TagInput } from '../../ui/TagInput';
import { Button } from '../../ui/Button';

function SkillCategoryEditor({ group, sectionId }) {
  const updateSkillGroup = useCVStore((s) => s.updateSkillGroup);
  const removeSkillGroup = useCVStore((s) => s.removeSkillGroup);

  return (
    <div className="border border-gray-100 rounded-lg p-3 bg-gray-50 flex flex-col gap-2">
      <div className="flex gap-2 items-start">
        <div className="flex-1">
          <Input
            label="Category"
            placeholder="e.g. Languages, Frameworks, Tools"
            value={group.category}
            onChange={(e) => updateSkillGroup(sectionId, group.id, { category: e.target.value })}
          />
        </div>
        <button
          type="button"
          onClick={() => removeSkillGroup(sectionId, group.id)}
          className="mt-5 text-red-400 hover:text-red-600"
        >
          <Trash2 size={14} />
        </button>
      </div>
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Skills (Enter or comma to add)</label>
        <TagInput
          tags={group.tags}
          onChange={(tags) => updateSkillGroup(sectionId, group.id, { tags })}
          placeholder="React, TypeScript, Node.js…"
        />
      </div>
    </div>
  );
}

export function SkillsEditor({ section }) {
  const addSkillGroup = useCVStore((s) => s.addSkillGroup);

  return (
    <div className="p-3 flex flex-col gap-3">
      {(section.groups || []).map((group) => (
        <SkillCategoryEditor key={group.id} group={group} sectionId={section.id} />
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => addSkillGroup(section.id, createEntry(SECTION_TYPES.SKILLS))}
        className="w-full justify-center"
      >
        <Plus size={14} /> Add Category
      </Button>
    </div>
  );
}
