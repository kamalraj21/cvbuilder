import { useCVStore } from '../../../store/cvStore';
import { Textarea } from '../../ui/Textarea';

export function CustomSectionEditor({ section }) {
  const setSectionContent = useCVStore((s) => s.setSectionContent);

  return (
    <div className="p-3">
      <Textarea
        placeholder="Add any additional information…"
        value={section.content || ''}
        onChange={(e) => setSectionContent(section.id, e.target.value)}
        rows={5}
      />
    </div>
  );
}
