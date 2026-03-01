import { EditorPanel } from '../editor/EditorPanel';
import { PreviewPanel } from '../preview/PreviewPanel';
import { SettingsPanel } from '../sidebar/SettingsPanel';

export function AppShell() {
  return (
    <div className="flex h-[calc(100vh-52px)] overflow-hidden">
      {/* Editor — fixed 420px */}
      <div className="w-[420px] min-w-[420px] flex flex-col border-r border-gray-200 bg-white overflow-hidden">
        <EditorPanel />
      </div>

      {/* Preview — flexible */}
      <div className="flex-1 bg-gray-100 overflow-auto">
        <PreviewPanel />
      </div>

      {/* Settings — fixed 220px */}
      <div className="w-[220px] min-w-[220px] flex flex-col border-l border-gray-200 bg-white overflow-hidden">
        <SettingsPanel />
      </div>
    </div>
  );
}
