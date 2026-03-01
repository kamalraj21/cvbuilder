import { useRef, useEffect, useState } from 'react';

const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

export function A4Frame({ children }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      const newScale = Math.min((width - 32) / A4_WIDTH, 1);
      setScale(newScale > 0 ? newScale : 1);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex justify-center items-start py-4 px-4 min-h-full">
      <div
        style={{
          width: A4_WIDTH,
          minHeight: A4_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          marginBottom: `${(A4_HEIGHT * scale) - A4_HEIGHT}px`,
        }}
      >
        <div
          style={{ width: A4_WIDTH, minHeight: A4_HEIGHT }}
          className="bg-white shadow-xl"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
