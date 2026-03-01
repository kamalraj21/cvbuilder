import { useCVStore } from '../../../store/cvStore';
import { Textarea } from '../../ui/Textarea';

export function SummaryEditor({ section }) {
  const setSectionContent = useCVStore((s) => s.setSectionContent);

  return (
    <div className="p-3">
      <Textarea
        label="Summary"
        placeholder="Write a compelling 2-3 sentence professional summary highlighting your key skills, years of experience, and career goals…"
        value={section.content || ''}
        onChange={(e) => setSectionContent(section.id, e.target.value)}
        showCount
        maxCount={500}
        rows={5}
      />
    </div>
  );
}
