import { useEffect, useRef, useState } from 'react'
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
    TouchSensor,
} from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { v4 as uuidv4 } from 'uuid'
import EducationItem from './EducationItem'
import { CirclePlusIcon } from 'lucide-react'
import { getFromLocalStorage, updateLocalStorage } from '../../utils/localStorageHelper'
import { t } from 'i18next'

export default function EducationList() {
    const [educationList, setEducationList] = useState([])
    const isFirstLoad = useRef(true)
    const [expandedId, setExpandedId] = useState(null)

    useEffect(() => {
        setEducationList(getFromLocalStorage()?.education || [])
    }, [])

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false
            return
        }

        updateLocalStorage('education', educationList)
    }, [educationList])

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    const sensors = useSensors(useSensor(isMobile ? TouchSensor : PointerSensor))

    const handleDragEnd = event => {
        const { active, over } = event
        if (active.id !== over.id) {
            const oldIndex = educationList.findIndex(item => item.id === active.id)
            const newIndex = educationList.findIndex(item => item.id === over.id)
            setEducationList(arrayMove(educationList, oldIndex, newIndex))
        }
    }

    const handleAdd = () => {
        setEducationList([
            ...educationList,
            {
                id: uuidv4(),
                school: '',
                degree: '',
                startYear: '',
                endYear: '',
                gpa: '',
            },
        ])
    }

    const handleChange = (id, newData) => {
        const updated = educationList.map(item => (item.id === id ? newData : item))
        setEducationList(updated)
    }

    const handleDelete = id => {
        const updated = educationList.filter(item => item.id !== id)
        setEducationList(updated)
    }

    return (
        <div className="mt-4 overflow-x-hidden overflow-y-hidden">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={educationList.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {educationList.map((item, index) => (
                        <EducationItem
                            key={item.id}
                            id={item.id}
                            index={index}
                            data={item}
                            expandedId={expandedId}
                            setExpandedId={setExpandedId}
                            onChange={newData => handleChange(item.id, newData)}
                            onDelete={() => handleDelete(item.id)}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            <button
                onClick={handleAdd}
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1 rounded bg-gray-300 px-4 py-4 text-sm transition-all duration-300 hover:bg-gray-400 md:text-base"
            >
                <CirclePlusIcon className="h-4" />
                <span className="leading-none">{t('add education')}</span>
            </button>
        </div>
    )
}
