import { useEffect, useRef, useState } from 'react'
import { getFromLocalStorage, updateLocalStorage } from '../../../../utils/localStorageHelper'
import {
    closestCenter,
    DndContext,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { v4 as uuidv4 } from 'uuid'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { t } from 'i18next'
import { CirclePlusIcon } from 'lucide-react'
import WorkExperienceItem from './WorkExperienceItem'

export default function WorkExperienceList({ setCvData }) {
    const [localWorkExperienceList, setLocalWorkExperienceList] = useState([])
    const isFirstLoad = useRef(true)
    const [expandedId, setExpandedId] = useState(null)

    useEffect(() => {
        setLocalWorkExperienceList(getFromLocalStorage()?.workExperience || [])
    }, [])

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false
            return
        }

        if (localWorkExperienceList.length > 0) {
            updateLocalStorage('workExperience', localWorkExperienceList)
        }
    }, [localWorkExperienceList])

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    const sensors = useSensors(useSensor(isMobile ? TouchSensor : PointerSensor))

    const handleDragEnd = event => {
        const { active, over } = event
        if (active.id !== over.id) {
            const oldIndex = localWorkExperienceList.findIndex(item => item.id === active.id)
            const newIndex = localWorkExperienceList.findIndex(item => item.id === over.id)
            const updated = arrayMove(localWorkExperienceList, oldIndex, newIndex)

            setLocalWorkExperienceList(updated)
            updateLocalStorage('workExperience', updated)
            setCvData(prev => ({ ...prev, workExperience: updated }))
        }
    }

    const handleAdd = () => {
        setLocalWorkExperienceList([
            ...localWorkExperienceList,
            {
                id: uuidv4(),
                company: '',
                position: '',
                city: '',
                country: '',
                startYear: '',
                endYear: '',
                startMonth: '',
                endMonth: '',
                isPresent: false,
                jobDescription: '',
            },
        ])
    }

    const handleChange = (id, newData) => {
        const updated = localWorkExperienceList.map(item =>
            item.id === id ? { ...item, ...newData } : item
        )
        setLocalWorkExperienceList(updated)

        updateLocalStorage('workExperience', updated)
        setCvData(prev => ({ ...prev, workExperience: updated }))
    }

    const handleDelete = id => {
        const updated = localWorkExperienceList.filter(item => item.id !== id)

        setLocalWorkExperienceList(updated)
        updateLocalStorage('workExperience', updated)
        setCvData(prev => ({ ...prev, workExperience: updated }))
    }

    return (
        <div className="mt-4 overflow-x-hidden overflow-y-hidden">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={localWorkExperienceList.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {localWorkExperienceList?.length > 0
                        ? localWorkExperienceList.map((item, index) => (
                              <WorkExperienceItem
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
                <span className="leading-none">{t('add experience')}</span>
            </button>
        </div>
    )
}
