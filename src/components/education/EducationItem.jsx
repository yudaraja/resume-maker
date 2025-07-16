import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TrashIcon } from 'lucide-react'

export default function EducationItem({ id, index, data, onChange, onDelete }) {
    const [expanded, setExpanded] = useState(false)

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: data?.school ? 1 : 0.8,
    }

    const handleInputChange = (e, field) => {
        onChange({
            ...data,
            [field]: e.target.value,
        })
    }

    const handleDelete = () => {
        if (window.confirm('Apakah Anda yakin ingin menghapus pendidikan ini?')) {
            onDelete()
        }
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="mb-3 w-full rounded border border-gray-200 bg-white shadow-md"
        >
            <div
                className={`flex w-full items-center justify-between p-4 ${expanded ? 'border-b border-gray-200' : ''}`}
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                        {data?.school || `Pendidikan Baru #${index + 1}`}
                    </h3>
                    {data?.degree && <p className="mt-1 text-sm text-gray-600">{data?.degree}</p>}
                    {(data?.startYear || data?.endYear) && (
                        <p className="mt-1 text-xs text-gray-500">
                            {data?.startYear} - {data?.endYear}
                        </p>
                    )}
                </div>
                <button
                    {...attributes}
                    {...listeners}
                    className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={e => e.stopPropagation()}
                >
                    ☰
                </button>
            </div>

            {expanded && (
                <div className="space-y-4 p-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Nama Sekolah/Universitas
                        </label>
                        <input
                            value={data?.school}
                            onChange={e => handleInputChange(e, 'school')}
                            placeholder="Contoh: Universitas Indonesia"
                            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Gelar/Jurusan
                        </label>
                        <input
                            value={data?.degree}
                            onChange={e => handleInputChange(e, 'degree')}
                            placeholder="Contoh: Sarjana Komputer"
                            className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Tahun Mulai
                            </label>
                            <input
                                type="number"
                                value={data?.startYear}
                                onChange={e => handleInputChange(e, 'startYear')}
                                placeholder="Tahun"
                                className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Tahun Selesai
                            </label>
                            <input
                                type="number"
                                value={data?.endYear}
                                onChange={e => handleInputChange(e, 'endYear')}
                                placeholder="Tahun"
                                className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                        >
                            <TrashIcon className="h-4 w-4" />
                            Hapus
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
