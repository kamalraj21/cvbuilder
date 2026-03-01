import { Topbar } from './components/layout/Topbar';
import { AppShell } from './components/layout/AppShell';
import { ToastProvider } from './components/ui/Toast';
import { useAutoSave } from './hooks/useAutoSave';

function AppInner() {
  useAutoSave();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Topbar />
      <AppShell />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}
