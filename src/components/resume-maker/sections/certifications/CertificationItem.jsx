import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { t } from 'i18next'
import { TrashIcon } from 'lucide-react'
import { useState } from 'react'
import MonthSelect from '../../common/MonthSelect'
import YearSelect from '../../common/YearSelect'

export default function CertificationItem({
    id,
    index,
    data,
    onChange,
    onDelete,
    expandedId,
    setExpandedId,
}) {
    const expanded = expandedId === data?.id
    const [showConfirm, setShowConfirm] = useState(false)
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const handleInputChange = (e, field, value = null) => {
        onChange({
            ...data,
            [field]: value !== null ? value : e.target.value,
        })
    }

    const handleDelete = () => {
        onDelete()
        setShowConfirm(false)
    }

    const toggleExpanded = () => {
        if (expandedId === data?.id) {
            setExpandedId(null)
        } else {
            setExpandedId(data?.id)
        }
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="mb-3 w-full cursor-pointer rounded border border-gray-200 bg-white shadow-md"
        >
            <div
                className={`flex w-full items-center justify-between p-4 ${expanded ? 'border-b border-gray-200' : ''}`}
                onClick={() => toggleExpanded()}
            >
                <div className="flex-1">
                    <h3 className="flex flex-col font-medium md:flex-row">
                        {data?.name || `${t('new certification')} #${index + 1}`}{' '}
                        <span className="ml-1 text-gray-500">
                            {data?.year && (
                                <>
                                    (
                                    {data.month
                                        ? `${t(`months.${data.month}`)} ${data.year}`
                                        : data.year || ''}
                                    )
                                </>
                            )}
                        </span>
                    </h3>
                    {data?.issuer && (
                        <p className="mt-1 text-sm text-gray-500">
                            {data?.issuer} - {data?.credential}
                        </p>
                    )}
                </div>
                <button
                    {...attributes}
                    {...listeners}
                    className="p-1 text-gray-500 transition-all duration-300 hover:text-black focus:outline-none"
                    onClick={e => e.stopPropagation()}
                >
                    ☰
                </button>
            </div>

            {expanded && (
                <div className="space-y-4 p-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            {t('certification name')}
                        </label>
                        <input
                            value={data?.name}
                            onChange={e => handleInputChange(e, 'name')}
                            placeholder={t('certification name example')}
                            className={`w-full rounded border border-gray-300 p-2 text-sm ${
                                data?.name ? 'bg-gray-100' : 'bg-white'
                            }`}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">{t('issuer')}</label>
                        <input
                            value={data?.issuer}
                            onChange={e => handleInputChange(e, 'issuer')}
                            placeholder={t('issuer example')}
                            className={`w-full rounded border border-gray-300 p-2 text-sm ${
                                data?.issuer ? 'bg-gray-100' : 'bg-white'
                            }`}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">{t('credential')}</label>
                        <input
                            value={data?.credential}
                            onChange={e => handleInputChange(e, 'credential')}
                            placeholder={t('credential example')}
                            className={`w-full rounded border border-gray-300 p-2 text-sm ${
                                data?.credential ? 'bg-gray-100' : 'bg-white'
                            }`}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">{t('month')}</label>
                            <MonthSelect
                                value={data?.month}
                                onChange={val => handleInputChange(null, 'month', val)}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">{t('year')}</label>
                            <YearSelect
                                value={data?.year}
                                onChange={val => handleInputChange(null, 'year', val)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-red-50 px-4 py-3 align-middle text-sm font-medium text-red-600 transition-all duration-300 hover:bg-red-200"
                        >
                            <TrashIcon className="h-4 w-4" />
                            <span className="leading-none">{t('delete')}</span>
                        </button>
                    </div>

                    {showConfirm && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                            <div className="w-full max-w-sm rounded-lg bg-white px-4 py-6 shadow-md sm:px-6 md:px-8">
                                <p className="mb-6 text-sm font-medium">{t('delete education')}</p>
                                <div className="flex flex-wrap justify-end gap-2.5">
                                    <button
                                        onClick={() => setShowConfirm(false)}
                                        className="flex items-center justify-center gap-2 rounded-md bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 transition-all duration-300 hover:bg-gray-200"
                                    >
                                        {t('cancel')}
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="flex items-center justify-center gap-2 rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-all duration-300 hover:bg-red-200"
                                    >
                                        {t('delete')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
