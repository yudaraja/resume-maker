import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TrashIcon } from 'lucide-react'
import { t } from 'i18next'

export default function SkillItem({ id, data: skill, onChange, onDelete }) {
    const { setNodeRef, transform, transition } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const handleInputChange = (e, field, value = null) => {
        onChange({
            ...skill,
            [field]: value !== null ? value : e.target.value,
        })
    }

    const handleDelete = () => {
        const confirmDelete = window.confirm(t('confirm remove skill'))

        if (!confirmDelete) return

        onDelete(id, skill.category)
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="mb-4 rounded border border-gray-300 bg-white p-3 shadow-sm"
        >
            <div className="flex flex-row gap-2 md:items-center md:justify-between">
                <input
                    type="text"
                    placeholder={t('skills')}
                    value={skill?.name || ''}
                    onChange={e => handleInputChange(e, 'name')}
                    className="w-full rounded border border-gray-300 px-2 py-1 text-sm md:text-base"
                />

                <div className="flex gap-2">
                    <button
                        onClick={handleDelete}
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-red-50 px-2 py-2 align-middle text-sm font-medium text-red-600 transition-all duration-300 hover:bg-red-200"
                        title="Delete skill"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
