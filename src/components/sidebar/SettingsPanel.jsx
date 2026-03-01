import { TemplatePicker } from './TemplatePicker';
import { AccentColorPicker } from './AccentColorPicker';
import { AtsScorePanel } from './AtsScorePanel';

export function SettingsPanel() {
  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-thin p-4 gap-6">
      <TemplatePicker />
      <div className="border-t border-gray-100" />
      <AccentColorPicker />
      <div className="border-t border-gray-100" />
      <AtsScorePanel />
    </div>
  );
}
