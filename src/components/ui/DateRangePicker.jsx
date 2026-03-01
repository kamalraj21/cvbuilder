import { MONTHS, getYearOptions } from '../../utils/dateHelpers';
import { Checkbox } from './Checkbox';

const years = getYearOptions(1980);

function MonthYearSelect({ monthValue, yearValue, onMonthChange, onYearChange, prefix }) {
  return (
    <div className="flex gap-1.5">
      <select
        value={monthValue}
        onChange={(e) => onMonthChange(e.target.value)}
        className="flex-1 px-2 py-1.5 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Month</option>
        {MONTHS.map((m) => (
          <option key={m.value} value={m.value}>{m.label}</option>
        ))}
      </select>
      <select
        value={yearValue}
        onChange={(e) => onYearChange(e.target.value)}
        className="flex-1 px-2 py-1.5 text-sm border border-gray-200 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Year</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}

export function DateRangePicker({
  startMonth, startYear, endMonth, endYear, current,
  onStartMonthChange, onStartYearChange, onEndMonthChange, onEndYearChange, onCurrentChange,
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Start</label>
          <MonthYearSelect
            monthValue={startMonth}
            yearValue={startYear}
            onMonthChange={onStartMonthChange}
            onYearChange={onStartYearChange}
          />
        </div>
        {!current && (
          <div>
            <label className="text-xs text-gray-500 mb-1 block">End</label>
            <MonthYearSelect
              monthValue={endMonth}
              yearValue={endYear}
              onMonthChange={onEndMonthChange}
              onYearChange={onEndYearChange}
            />
          </div>
        )}
      </div>
      <Checkbox
        label="Currently here"
        checked={current}
        onChange={(e) => onCurrentChange(e.target.checked)}
      />
    </div>
  );
}
