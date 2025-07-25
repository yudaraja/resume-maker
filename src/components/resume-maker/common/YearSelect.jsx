import { t } from 'i18next'
import React from 'react'

const YearSelect = ({ value, onChange }) => {
    function generateYears(start = 2000, end = new Date().getFullYear()) {
        const years = []
        for (let y = end; y >= start; y--) {
            years.push(y)
        }
        return years
    }

    return (
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className={`w-full rounded border border-gray-300 p-2 text-sm ${value ? 'bg-gray-100' : ''}`}
        >
            <option value="">{t('select year')}</option>
            {generateYears(1980).map(year => (
                <option key={year} value={year}>
                    {year}
                </option>
            ))}
        </select>
    )
}

export default YearSelect
