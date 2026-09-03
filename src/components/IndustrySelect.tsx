import type { ChangeEvent } from 'react'
import type { Industry } from '../types'

const options: Array<{ value: Industry; label: string }> = [
  { value: 'general', label: 'General' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'retail', label: 'Retail' },
  { value: 'data-centers', label: 'Data Centers' },
]

export function IndustrySelect({
  industry,
  onChange,
}: {
  industry: Industry
  onChange: (industry: Industry) => void
}) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Industry)
  }

  return (
    <label className="industry-select">
      <span>Industry</span>
      <select value={industry} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
