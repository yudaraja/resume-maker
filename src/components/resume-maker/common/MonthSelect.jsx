import { useTranslation } from 'react-i18next'

const MonthSelect = ({ value, onChange }) => {
    const { t } = useTranslation()
    const months = t('months', { returnObjects: true })

    return (
        <select
            value={value}
            onChange={e => onChange(e.target.value)}
            className={`w-full rounded border border-gray-300 p-2 text-sm ${value ? 'bg-gray-100' : ''}`}
        >
            <option value="">{t('select month')}</option>
            {Object.entries(months).map(([val, label]) => (
                <option key={val} value={val}>
                    {label}
                </option>
            ))}
        </select>
    )
}

export default MonthSelect
