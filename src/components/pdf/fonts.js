import { Font } from '@react-pdf/renderer';

const CDN = 'https://cdn.jsdelivr.net/npm/@fontsource';

export function registerFonts() {
  Font.register({
    family: 'Inter',
    fonts: [
      {
        src: `${CDN}/inter/files/inter-latin-400-normal.woff2`,
        fontWeight: 400,
      },
      {
        src: `${CDN}/inter/files/inter-latin-600-normal.woff2`,
        fontWeight: 600,
      },
      {
        src: `${CDN}/inter/files/inter-latin-700-normal.woff2`,
        fontWeight: 700,
      },
    ],
  });

  Font.register({
    family: 'Lato',
    fonts: [
      {
        src: `${CDN}/lato/files/lato-latin-400-normal.woff2`,
        fontWeight: 400,
      },
      {
        src: `${CDN}/lato/files/lato-latin-700-normal.woff2`,
        fontWeight: 700,
      },
    ],
  });

  Font.register({
    family: 'LibreBaskerville',
    fonts: [
      {
        src: `${CDN}/libre-baskerville/files/libre-baskerville-latin-400-normal.woff2`,
        fontWeight: 400,
      },
      {
        src: `${CDN}/libre-baskerville/files/libre-baskerville-latin-700-normal.woff2`,
        fontWeight: 700,
      },
      {
        src: `${CDN}/libre-baskerville/files/libre-baskerville-latin-400-italic.woff2`,
        fontWeight: 400,
        fontStyle: 'italic',
      },
    ],
  });
}
