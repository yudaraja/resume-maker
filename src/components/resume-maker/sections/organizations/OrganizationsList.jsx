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
import OrganizationsItem from './OrganizationsItem'

export default function OrganizationsList({ setCvData }) {
    const [localOrganizationsList, setLocalOrganizationsList] = useState([])
    const isFirstLoad = useRef(true)
    const [expandedId, setExpandedId] = useState(null)

    useEffect(() => {
        setLocalOrganizationsList(getFromLocalStorage()?.organizations || [])
    }, [])

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false
            return
        }

        if (localOrganizationsList.length > 0) {
            updateLocalStorage('organizations', localOrganizationsList)
        }
    }, [localOrganizationsList])

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    const sensors = useSensors(useSensor(isMobile ? TouchSensor : PointerSensor))

    const handleDragEnd = event => {
        const { active, over } = event
        if (active.id !== over.id) {
            const oldIndex = localOrganizationsList.findIndex(item => item.id === active.id)
            const newIndex = localOrganizationsList.findIndex(item => item.id === over.id)
            const updated = arrayMove(localOrganizationsList, oldIndex, newIndex)

            setLocalOrganizationsList(updated)
            updateLocalStorage('organizations', updated)
            setCvData(prev => ({ ...prev, organizations: updated }))
        }
    }

    const handleAdd = () => {
        setLocalOrganizationsList([
            ...localOrganizationsList,
            {
                id: uuidv4(),
                organization: '',
                position: '',
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
        const updated = localOrganizationsList.map(item =>
            item.id === id ? { ...item, ...newData } : item
        )
        setLocalOrganizationsList(updated)

        updateLocalStorage('organizations', updated)
        setCvData(prev => ({ ...prev, organizations: updated }))
    }

    const handleDelete = id => {
        const updated = localOrganizationsList.filter(item => item.id !== id)

        setLocalOrganizationsList(updated)
        updateLocalStorage('organizations', updated)
        setCvData(prev => ({ ...prev, organizations: updated }))
    }

    return (
        <div className="mt-4 overflow-x-hidden overflow-y-hidden">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={localOrganizationsList.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {localOrganizationsList?.length > 0
                        ? localOrganizationsList.map((item, index) => (
                              <OrganizationsItem
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
                <span className="leading-none">{t('add organization')}</span>
            </button>
        </div>
    )
}
