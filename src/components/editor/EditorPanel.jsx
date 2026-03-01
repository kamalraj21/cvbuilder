import { PersonalInfoEditor } from './sections/PersonalInfoEditor';
import { SectionList } from './SectionList';
import { AddSectionMenu } from './AddSectionMenu';

export function EditorPanel() {
  return (
    <div className="flex flex-col h-full">
      {/* Personal Info — fixed at top */}
      <div className="border-b border-gray-200 shrink-0">
        <PersonalInfoEditor />
      </div>

      {/* Scrollable sections */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-3 flex flex-col gap-2">
        <SectionList />
      </div>

      {/* Add section button — pinned at bottom */}
      <div className="p-3 border-t border-gray-200 shrink-0">
        <AddSectionMenu />
      </div>
    </div>
  );
}
