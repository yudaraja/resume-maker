import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { t } from 'i18next'
import { TrashIcon } from 'lucide-react'
import { useState } from 'react'

export default function EducationItem({
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
                    <h3 className="font-medium">
                        {data?.school || `${t('new education')} #${index + 1}`}{' '}
                        <span className="text-gray-500">
                            {(data?.startYear || data?.endYear) && (
                                <span>
                                    {`(${data?.startYear || ''}${data?.startYear && data?.endYear ? ' - ' : ''}${data?.isPresent ? t('present') : data?.endYear || ''})`}
                                </span>
                            )}
                        </span>
                    </h3>
                    {data?.degree && <p className="mt-1 text-sm text-gray-500">{data?.degree}</p>}
                    {data?.gpa && (
                        <p className="mt-1 text-sm text-gray-500">
                            <span>
                                {t('gpa')}: {data?.gpa}
                            </span>
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
                        <label className="mb-1 block text-sm font-medium">{t('school name')}</label>
                        <input
                            value={data?.school}
                            onChange={e => handleInputChange(e, 'school')}
                            placeholder={t('school example')}
                            className={`w-full rounded border border-gray-300 p-2 text-sm ${
                                data?.school ? 'bg-gray-100' : 'bg-white'
                            }`}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">{t('degree')}</label>
                        <input
                            value={data?.degree}
                            onChange={e => handleInputChange(e, 'degree')}
                            placeholder={t('degree example')}
                            className={`w-full rounded border border-gray-300 p-2 text-sm ${
                                data?.degree ? 'bg-gray-100' : 'bg-white'
                            }`}
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">
                            {t('present')}{' '}
                            <span className="text-sm font-light text-gray-700">
                                ({t('currently studying')})
                            </span>
                        </label>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={data?.isPresent}
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
                                {t('start year')}
                            </label>
                            <input
                                type="number"
                                value={data?.startYear}
                                onChange={e => handleInputChange(e, 'startYear')}
                                placeholder={t('start year example')}
                                className={`w-full rounded border border-gray-300 p-2 text-sm ${
                                    data?.startYear ? 'bg-gray-100' : 'bg-white'
                                }`}
                            />
                        </div>
                        {!data?.isPresent && (
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    {t('end year')}
                                </label>
                                <input
                                    type="number"
                                    value={data?.endYear}
                                    onChange={e => handleInputChange(e, 'endYear')}
                                    placeholder={t('end year example')}
                                    className={`w-full rounded border border-gray-300 p-2 text-sm ${
                                        data?.endYear ? 'bg-gray-100' : 'bg-white'
                                    }`}
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium">{t('gpa')}</label>
                        <input
                            type="number"
                            value={data?.gpa}
                            onChange={e => handleInputChange(e, 'gpa')}
                            placeholder={t('gpa example')}
                            className={`w-full rounded border border-gray-300 p-2 text-sm ${
                                data?.gpa ? 'bg-gray-100' : 'bg-white'
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
