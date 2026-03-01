import { useState } from 'react';
import { FileDown, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';

let fontsRegistered = false;

async function loadPDFTemplate(template) {
  if (!fontsRegistered) {
    const { registerFonts } = await import('./fonts.js');
    registerFonts();
    fontsRegistered = true;
  }

  switch (template) {
    case 'classic': {
      const { ClassicPDFTemplate } = await import('./templates/ClassicPDFTemplate.jsx');
      return ClassicPDFTemplate;
    }
    case 'minimal': {
      const { MinimalPDFTemplate } = await import('./templates/MinimalPDFTemplate.jsx');
      return MinimalPDFTemplate;
    }
    default: {
      const { ModernPDFTemplate } = await import('./templates/ModernPDFTemplate.jsx');
      return ModernPDFTemplate;
    }
  }
}

export function PDFDownloadButton({ personalInfo, sections, template, accentColor }) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const [{ pdf }, PDFTemplate] = await Promise.all([
        import('@react-pdf/renderer'),
        loadPDFTemplate(template),
      ]);

      const { createElement } = await import('react');
      const blob = await pdf(
        createElement(PDFTemplate, { personalInfo, sections, accentColor })
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const name = personalInfo.fullName?.replace(/\s+/g, '_') || 'cv';
      a.href = url;
      a.download = `${name}_CV.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation failed:', err);
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
