import { useState } from 'react';
import { FileDown, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';
import { ClassicPDFTemplate } from './templates/ClassicPDFTemplate.jsx';
import { ModernPDFTemplate } from './templates/ModernPDFTemplate.jsx';
import { MinimalPDFTemplate } from './templates/MinimalPDFTemplate.jsx';

const TEMPLATES = {
  classic: ClassicPDFTemplate,
  modern: ModernPDFTemplate,
  minimal: MinimalPDFTemplate,
};

let fontsRegistered = false;

async function ensureFonts() {
  if (!fontsRegistered) {
    const { registerFonts } = await import('./fonts.js');
    registerFonts();
    fontsRegistered = true;
  }
}

export function PDFDownloadButton({ personalInfo, sections, template, accentColor }) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleDownload() {
    setLoading(true);
    try {
      await ensureFonts();
      const { pdf } = await import('@react-pdf/renderer');
      const { createElement } = await import('react');

      const PDFTemplate = TEMPLATES[template] ?? ModernPDFTemplate;
      const blob = await pdf(
        createElement(PDFTemplate, { personalInfo, sections, accentColor })
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const name = personalInfo.fullName?.replace(/\s+/g, '_') || 'cv';
      a.href = url;
      a.download = `${name}_CV.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 100);
      toast('PDF downloaded successfully');
    } catch (err) {
      fontsRegistered = false;
      console.error('PDF generation failed:', err);
      toast(err.message || 'PDF generation failed', 'error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="primary"
      size="sm"
      onClick={handleDownload}
      disabled={loading}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <FileDown size={14} />}
      Export PDF
    </Button>
  );
}
