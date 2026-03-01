import { useCVStore } from '../../../store/cvStore';
import { Input } from '../../ui/Input';

export function PersonalInfoEditor() {
  const personalInfo = useCVStore((s) => s.personalInfo);
  const setPersonalInfo = useCVStore((s) => s.setPersonalInfo);

  const fields = [
    { key: 'fullName', label: 'Full Name', placeholder: 'Jane Smith', colSpan: 2 },
    { key: 'headline', label: 'Headline / Title', placeholder: 'Senior Software Engineer', colSpan: 2 },
    { key: 'email', label: 'Email', placeholder: 'jane@example.com', type: 'email' },
    { key: 'phone', label: 'Phone', placeholder: '+1 555 000 0000', type: 'tel' },
    { key: 'location', label: 'Location', placeholder: 'San Francisco, CA' },
    { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/jane' },
    { key: 'github', label: 'GitHub', placeholder: 'github.com/jane' },
    { key: 'portfolio', label: 'Portfolio', placeholder: 'janesmith.dev' },
  ];

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Personal Information</h3>
      <div className="grid grid-cols-2 gap-2">
        {fields.map(({ key, label, placeholder, type, colSpan }) => (
          <div key={key} className={colSpan === 2 ? 'col-span-2' : ''}>
            <Input
              label={label}
              type={type || 'text'}
              placeholder={placeholder}
              value={personalInfo[key] || ''}
              onChange={(e) => setPersonalInfo(key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
