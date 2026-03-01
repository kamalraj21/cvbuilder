import { useRef } from 'react';

export function BulletListEditor({ bullets = [], onChange, placeholder = 'Add bullet point…' }) {
  const listRef = useRef(null);

  function handleKeyDown(e, index) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const next = [...bullets];
      next.splice(index + 1, 0, '');
      onChange(next);
      setTimeout(() => {
        const inputs = listRef.current?.querySelectorAll('input');
        inputs?.[index + 1]?.focus();
      }, 0);
    } else if (e.key === 'Backspace' && bullets[index] === '' && bullets.length > 1) {
      e.preventDefault();
      const next = bullets.filter((_, i) => i !== index);
      onChange(next);
      setTimeout(() => {
        const inputs = listRef.current?.querySelectorAll('input');
        inputs?.[Math.max(0, index - 1)]?.focus();
      }, 0);
    }
  }

  function handleChange(e, index) {
    const next = [...bullets];
    next[index] = e.target.value;
    onChange(next);
  }

  function addBullet() {
    onChange([...bullets, '']);
    setTimeout(() => {
      const inputs = listRef.current?.querySelectorAll('input');
      inputs?.[inputs.length - 1]?.focus();
    }, 0);
  }

  return (
    <div ref={listRef} className="flex flex-col gap-1">
      {bullets.map((bullet, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-gray-400 text-sm select-none">•</span>
          <input
            type="text"
            value={bullet}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            placeholder={i === 0 ? placeholder : ''}
            className="flex-1 px-2 py-1 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      ))}
      {bullets.length === 0 && (
        <button
          type="button"
          onClick={addBullet}
          className="text-xs text-blue-600 hover:text-blue-700 text-left"
        >
          + Add bullet point
        </button>
      )}
      {bullets.length > 0 && (
        <button
          type="button"
          onClick={addBullet}
          className="text-xs text-gray-400 hover:text-gray-600 text-left mt-0.5"
        >
          + Add bullet
        </button>
      )}
    </div>
  );
}
