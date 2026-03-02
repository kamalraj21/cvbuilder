import { useRef, useState } from 'react';
import { FileUp, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';
import { useCVStore } from '../../store/cvStore';
import { parsePDFtoCV } from '../../utils/pdfParser';

export function ImportPDFButton() {
  const fileRef = useRef();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const loadCVFromData = useCVStore((s) => s.loadCVFromData);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const data = await parsePDFtoCV(file);
      loadCVFromData(data);
      toast('CV imported from PDF');
    } catch (err) {
      toast(err.message || 'Failed to parse PDF', 'error');
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => fileRef.current?.click()}
        disabled={loading}
        title="Upload PDF CV"
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : <FileUp size={14} />}
        Upload PDF
      </Button>
      <input
        ref={fileRef}
        type="file"
        accept=".pdf"
        onChange={handleFile}
        className="hidden"
      />
    </>
  );
}
