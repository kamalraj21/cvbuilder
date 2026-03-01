import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { FileDown, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { ModernPDFTemplate } from './templates/ModernPDFTemplate';
import { ClassicPDFTemplate } from './templates/ClassicPDFTemplate';
import { MinimalPDFTemplate } from './templates/MinimalPDFTemplate';

const PDF_TEMPLATE_MAP = {
  modern: ModernPDFTemplate,
  classic: ClassicPDFTemplate,
  minimal: MinimalPDFTemplate,
};

export function PDFDownloadButton({ personalInfo, sections, template, accentColor }) {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const PDFTemplate = PDF_TEMPLATE_MAP[template] || ModernPDFTemplate;
      const blob = await pdf(
        <PDFTemplate personalInfo={personalInfo} sections={sections} accentColor={accentColor} />
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
