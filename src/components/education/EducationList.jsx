import { useEffect, useRef, useState } from 'react'
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { v4 as uuidv4 } from 'uuid'
import EducationItem from './EducationItem'
import { CirclePlusIcon } from 'lucide-react'

const STORAGE_KEY = 'cvData'

export default function EducationList() {
    const [educationList, setEducationList] = useState([])
    const isFirstLoad = useRef(true)

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            const parsed = JSON.parse(stored)
            if (parsed.education) {
                setEducationList(parsed.education)
            }
        }
    }, [])

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false
            return
        }

        const stored = localStorage.getItem(STORAGE_KEY)
        const parsed = stored ? JSON.parse(stored) : {}
        parsed.education = educationList
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
    }, [educationList])

    const sensors = useSensors(useSensor(PointerSensor))

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
            },
        ])
    }

    const handleChange = (index, newData) => {
        const updated = [...educationList]
        updated[index] = newData
        setEducationList(updated)
    }

    const handleDelete = index => {
        const updated = [...educationList]
        updated.splice(index, 1)
        setEducationList(updated)
    }

    return (
        <div>
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
                            onChange={newData => handleChange(index, newData)}
                            onDelete={() => handleDelete(index)}
                        />
                    ))}
                </SortableContext>
            </DndContext>

            <button
                onClick={handleAdd}
                className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1 rounded bg-gray-300 px-4 py-3 text-sm text-gray-800 transition-all duration-300 hover:bg-gray-400 md:text-base"
            >
                <CirclePlusIcon className="h-4" />
                Add Education
            </button>
        </div>
    )
}
