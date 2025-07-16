import { useEffect, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SaveIcon, TrashIcon } from 'lucide-react'

const STORAGE_KEY = 'education_list'

export default function EducationItem({ id, index, data, onChange, onDelete }) {
    const [expanded, setExpanded] = useState(false)
    const [educations, setEducations] = useState([])

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const handleInputChange = (field, value) => {
        onChange({ ...data, [field]: value })
    }

    const handleAdd = () => {
        setEducations([...educations, { school: 'Sekolah Baru', degree: 'S1', year: '2025' }])
    }

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            setEducations(JSON.parse(saved))
        }
    }, [])

    // Simpan ke localStorage setiap kali data berubah
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(educations))
    }, [educations])

    return (
        <div ref={setNodeRef} style={style} className="mb-3 w-full rounded bg-white shadow">
            <div className="flex w-full items-center justify-between bg-gray-100 p-3">
                <div className="flex-1 cursor-pointer" onClick={() => setExpanded(!expanded)}>
                    <span className="font-semibold">
                        {data?.school || `Pendidikan #${index + 1}`}
                    </span>
                </div>
                <div {...attributes} {...listeners} className="cursor-move px-2">
                    ☰
                </div>
            </div>

            {!expanded && (
                <div className="space-y-4 p-4">
                    <input
                        value={data?.school}
                        onChange={e => handleInputChange('school', e.target.value)}
                        placeholder="Nama Sekolah"
                        className="w-full rounded border-2 border-gray-300 p-2 transition-all duration-300"
                    />
                    <input
                        value={data?.degree}
                        onChange={e => handleInputChange('degree', e.target.value)}
                        placeholder="Gelar / Jurusan"
                        className="w-full rounded border-2 border-gray-300 p-2 transition-all duration-300"
                    />
                    <div className="flex gap-2">
                        <input
                            value={data?.startYear}
                            onChange={e => handleInputChange('startYear', e.target.value)}
                            placeholder="Tahun Masuk"
                            className="w-full rounded border-2 border-gray-300 p-2 transition-all duration-300"
                        />
                        <input
                            value={data?.endYear}
                            onChange={e => handleInputChange('endYear', e.target.value)}
                            placeholder="Tahun Lulus"
                            className="w-full rounded border-2 border-gray-300 p-2 transition-all duration-300"
                        />
                    </div>
                    <button
                        onClick={handleAdd}
                        className="flex cursor-pointer flex-row gap-x-1 rounded-xl border border-green-500 bg-white px-4 py-3 text-sm font-semibold text-green-500 transition-all duration-300 hover:bg-green-500 hover:text-white"
                    >
                        <SaveIcon className="inline-flex h-5 w-5" /> Simpan
                    </button>
                    <button
                        onClick={onDelete}
                        className="flex cursor-pointer flex-row gap-x-1 rounded-xl border border-red-500 bg-white px-4 py-3 text-sm font-semibold text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
                    >
                        <TrashIcon className="inline-flex h-5 w-5" /> Hapus Pendidikan
                    </button>
                </div>
            )}
        </div>
    )
}
