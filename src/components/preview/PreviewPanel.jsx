import { useCVStore } from '../../store/cvStore';
import { A4Frame } from './A4Frame';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';

const TEMPLATE_MAP = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
};

export function PreviewPanel() {
  const personalInfo = useCVStore((s) => s.personalInfo);
  const sections = useCVStore((s) => s.sections);
  const activeTemplate = useCVStore((s) => s.activeTemplate);
  const accentColor = useCVStore((s) => s.accentColor);

  const Template = TEMPLATE_MAP[activeTemplate] || ModernTemplate;

  return (
    <A4Frame>
      <Template personalInfo={personalInfo} sections={sections} accentColor={accentColor} />
    </A4Frame>
  );
}
