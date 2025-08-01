import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { t } from 'i18next'
import { TrashIcon } from 'lucide-react'
import { useState } from 'react'
import MonthSelect from '../../common/MonthSelect'
import YearSelect from '../../common/YearSelect'

export default function OrganizationsItem({
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
                        {data?.position || `${t('new organization')} #${index + 1}`}{' '}
                        <span className="ml-1 text-gray-500">
                            {data?.startYear && (
                                <>
                                    (
                                    {data.startMonth
                                        ? `${t(`months.${data.startMonth}`)} ${data.startYear}`
                                        : data.startYear}
                                    {data?.endMonth || data?.endYear || data.isPresent ? ' - ' : ''}
                                    {data?.isPresent
                                        ? t('present')
                                        : data?.endMonth
                                          ? `${t(`months.${data.endMonth}`)} ${data.endYear}`
                                          : data?.endYear || ''}
                                    )
                                </>
                            )}
                        </span>
                    </h3>
                    {data?.organization && (
                        <p className="mt-1 text-sm text-gray-500">{data?.organization}</p>
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
                            {t('organization')}
                        </label>
                        <input
                            value={data?.organization || ''}
                            onChange={e => handleInputChange(e, 'organization')}
                            placeholder={t('organization example')}
                            className={`w-full rounded border border-gray-300 p-2 text-sm ${
                                data?.organization ? 'bg-gray-100' : 'bg-white'
                            }`}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">{t('position')}</label>
                        <input
                            value={data?.position || ''}
                            onChange={e => handleInputChange(e, 'position')}
                            placeholder={t('organization position example')}
                            className={`w-full rounded border border-gray-300 p-2 text-sm ${
                                data?.position ? 'bg-gray-100' : 'bg-white'
                            }`}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            {t('present')}{' '}
                            <span className="text-sm font-light text-gray-700">
                                ({t('currently working')})
                            </span>
                        </label>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={data?.isPresent || false}
                            onClick={() => handleInputChange(null, 'isPresent', !data?.isPresent)}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ${
                                data?.isPresent ? 'bg-black' : 'bg-gray-300'
                            }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                                    data?.isPresent ? 'translate-x-6' : 'translate-x-1'
                                }`}
                            />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                {t('start month')}
                            </label>
                            <MonthSelect
                                value={data?.startMonth || ''}
                                onChange={val => handleInputChange(null, 'startMonth', val)}
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                {t('start year')}
                            </label>
                            <YearSelect
                                value={data?.startYear}
                                onChange={val => handleInputChange(null, 'startYear', val)}
                            />
                        </div>
                        {!data?.isPresent && (
                            <>
                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        {t('end month')}
                                    </label>
                                    <MonthSelect
                                        value={data?.endMonth || ''}
                                        onChange={val => handleInputChange(null, 'endMonth', val)}
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium">
                                        {t('end year')}
                                    </label>
                                    <YearSelect
                                        value={data?.endYear}
                                        onChange={val => handleInputChange(null, 'endYear', val)}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            {t('job description')}
                        </label>
                        <textarea
                            value={data?.jobDescription || ''}
                            onChange={e => handleInputChange(e, 'jobDescription')}
                            placeholder={t('organization job description example')}
                            className={`w-full rounded border border-gray-300 p-2 text-sm ${
                                data?.jobDescription ? 'bg-gray-100' : 'bg-white'
                            }`}
                        />
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
