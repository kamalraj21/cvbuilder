import { useAtsScore } from '../../hooks/useAtsScore';
import { CheckCircle, XCircle } from 'lucide-react';

export function AtsScorePanel() {
  const { score, checks } = useAtsScore();

  const color =
    score >= 80 ? '#16a34a' : score >= 50 ? '#d97706' : '#dc2626';

  const circumference = 2 * Math.PI * 28;
  const progress = (score / 100) * circumference;

  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">ATS Score</h3>

      {/* Score dial */}
      <div className="flex flex-col items-center mb-4">
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="28" fill="none" stroke="#e5e7eb" strokeWidth="6" />
          <circle
            cx="36" cy="36" r="28" fill="none"
            stroke={color} strokeWidth="6"
            strokeDasharray={`${progress} ${circumference}`}
            strokeLinecap="round"
            transform="rotate(-90 36 36)"
            style={{ transition: 'stroke-dasharray 0.5s ease' }}
          />
          <text x="36" y="41" textAnchor="middle" fontSize="14" fontWeight="bold" fill={color}>
            {score}
          </text>
        </svg>
        <div className="text-xs mt-1" style={{ color }}>
          {score >= 80 ? 'Excellent' : score >= 50 ? 'Good' : 'Needs Work'}
        </div>
      </div>

      {/* Checklist */}
      <div className="flex flex-col gap-1.5">
        {checks.map((check) => (
          <div key={check.id} className="flex items-start gap-1.5">
            {check.passed
              ? <CheckCircle size={13} className="text-green-500 mt-0.5 shrink-0" />
              : <XCircle size={13} className="text-red-400 mt-0.5 shrink-0" />
            }
            <span className={`text-xs leading-snug ${check.passed ? 'text-gray-600' : 'text-gray-500'}`}>
              {check.label}
              <span className="ml-1 text-gray-300 text-[10px]">+{check.points}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
