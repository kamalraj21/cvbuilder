import { useState, useRef } from 'react';
import { FileText, Download, Upload, RotateCcw, Save, FolderOpen, Trash2 } from 'lucide-react';
import { useCVStore } from '../../store/cvStore';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';
import { exportJSON, importJSON } from '../../utils/jsonExport';
import { loadSlot, deleteSlot, getSlotMeta } from '../../utils/storage';
import { PDFDownloadButton } from '../pdf/PDFDownloadButton';
import { ImportPDFButton } from '../editor/ImportPDFButton';

export function Topbar() {
  const personalInfo = useCVStore((s) => s.personalInfo);
  const sections = useCVStore((s) => s.sections);
  const activeSlot = useCVStore((s) => s.activeSlot);
  const activeTemplate = useCVStore((s) => s.activeTemplate);
  const accentColor = useCVStore((s) => s.accentColor);
  const setActiveSlot = useCVStore((s) => s.setActiveSlot);
  const loadCVFromData = useCVStore((s) => s.loadCVFromData);
  const resetCV = useCVStore((s) => s.resetCV);
  const toast = useToast();
  const importRef = useRef();
  const [slotMeta] = useState(() => getSlotMeta());

  function handleSlotChange(slot) {
    setActiveSlot(slot);
    const data = loadSlot(slot);
    if (data) loadCVFromData(data);
  }

  function handleDeleteSlot(slot) {
    deleteSlot(slot);
    if (slot === activeSlot) resetCV();
    toast('Slot cleared');
  }

  async function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importJSON(file);
      loadCVFromData(data);
      toast('CV imported successfully');
    } catch (err) {
      toast(err.message, 'error');
    }
    e.target.value = '';
  }

  function handleReset() {
    if (confirm('Reset current CV? This cannot be undone.')) {
      resetCV();
      toast('CV reset');
    }
  }

  return (
    <header className="h-[52px] bg-white border-b border-gray-200 flex items-center px-4 gap-3 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 text-blue-600 font-semibold text-base mr-2">
        <FileText size={18} />
        <span>CV Builder</span>
      </div>

      {/* Slot Picker */}
      <div className="flex items-center gap-1 border border-gray-200 rounded p-0.5">
        {[0, 1, 2].map((slot) => (
          <button
            key={slot}
            onClick={() => handleSlotChange(slot)}
            className={`px-2.5 py-1 text-xs rounded transition-colors ${
              activeSlot === slot
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Slot {slot + 1}
          </button>
        ))}
      </div>

      <div className="flex-1" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <ImportPDFButton />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => importRef.current?.click()}
          title="Import JSON"
        >
          <Upload size={14} />
          Import
        </Button>
        <input
          ref={importRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => exportJSON(personalInfo, sections)}
          title="Export JSON"
        >
          <Download size={14} />
          JSON
        </Button>

        <PDFDownloadButton
          personalInfo={personalInfo}
          sections={sections}
          template={activeTemplate}
          accentColor={accentColor}
        />

        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          title="Reset CV"
          className="text-red-500 hover:bg-red-50"
        >
          <RotateCcw size={14} />
        </Button>
      </div>
    </header>
  );
}
