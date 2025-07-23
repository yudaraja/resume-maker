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
import { getFromLocalStorage, updateLocalStorage } from '../../../../utils/localStorageHelper'
import { t } from 'i18next'

export default function EducationList({ setCvData }) {
    const [localEducationList, setLocalEducationList] = useState([])
    const isFirstLoad = useRef(true)
    const [expandedId, setExpandedId] = useState(null)

    useEffect(() => {
        setLocalEducationList(getFromLocalStorage()?.education || [])
    }, [])

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false
            return
        }

        if (localEducationList.length > 0) {
            updateLocalStorage('education', localEducationList)
        }
    }, [localEducationList])

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    const sensors = useSensors(useSensor(isMobile ? TouchSensor : PointerSensor))

    const handleDragEnd = event => {
        const { active, over } = event
        if (active.id !== over.id) {
            const oldIndex = localEducationList.findIndex(item => item.id === active.id)
            const newIndex = localEducationList.findIndex(item => item.id === over.id)
            const updated = arrayMove(localEducationList, oldIndex, newIndex)

            setLocalEducationList(updated)
            updateLocalStorage('education', updated)
            setCvData(prev => ({ ...prev, education: updated }))
        }
    }

    const handleAdd = () => {
        setLocalEducationList([
            ...localEducationList,
            {
                id: uuidv4(),
                school: '',
                degree: '',
                startYear: '',
                endYear: '',
                startMonth: '',
                endMonth: '',
                gpa: '',
                isPresent: false,
            },
        ])
    }

    const handleChange = (id, newData) => {
        const updated = localEducationList.map(item =>
            item.id === id ? { ...item, ...newData } : item
        )
        setLocalEducationList(updated)

        updateLocalStorage('education', updated)
        setCvData(prev => ({ ...prev, education: updated }))
    }

    const handleDelete = id => {
        const updated = localEducationList.filter(item => item.id !== id)

        setLocalEducationList(updated)
        updateLocalStorage('education', updated)
        setCvData(prev => ({ ...prev, education: updated }))
    }

    return (
        <div className="mt-4 overflow-x-hidden overflow-y-hidden">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={localEducationList.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {localEducationList?.length > 0
                        ? localEducationList.map((item, index) => (
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
                          ))
                        : null}
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
