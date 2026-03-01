export function Textarea({ label, showCount, maxCount, className = '', ...props }) {
  const len = props.value?.length ?? 0;
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <div className="flex justify-between items-center">
          <label className="text-xs font-medium text-gray-600">{label}</label>
          {showCount && (
            <span className={`text-xs ${maxCount && len > maxCount ? 'text-red-500' : 'text-gray-400'}`}>
              {len}{maxCount ? `/${maxCount}` : ''}
            </span>
          )}
        </div>
      )}
      <textarea
        className={`w-full px-2.5 py-1.5 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 resize-none ${className}`}
        rows={4}
        {...props}
      />
    </div>
  );
}
