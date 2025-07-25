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
import CertificationItem from './CertificationItem'

export default function CertificationList({ setCvData }) {
    const [localCertificationList, setLocalCertificationList] = useState([])
    const isFirstLoad = useRef(true)
    const [expandedId, setExpandedId] = useState(null)

    useEffect(() => {
        setLocalCertificationList(getFromLocalStorage()?.certifications || [])
    }, [])

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false
            return
        }

        if (localCertificationList.length > 0) {
            updateLocalStorage('certifications', localCertificationList)
        }
    }, [localCertificationList])

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    const sensors = useSensors(useSensor(isMobile ? TouchSensor : PointerSensor))

    const handleDragEnd = event => {
        const { active, over } = event
        if (active.id !== over.id) {
            const oldIndex = localCertificationList.findIndex(item => item.id === active.id)
            const newIndex = localCertificationList.findIndex(item => item.id === over.id)
            const updated = arrayMove(localCertificationList, oldIndex, newIndex)

            setLocalCertificationList(updated)
            updateLocalStorage('certifications', updated)
            setCvData(prev => ({ ...prev, certifications: updated }))
        }
    }

    const handleAdd = () => {
        setLocalCertificationList([
            ...localCertificationList,
            {
                id: uuidv4(),
                name: '',
                issuer: '',
                credential: '',
                month: '',
                year: '',
            },
        ])
    }

    const handleChange = (id, newData) => {
        const updated = localCertificationList.map(item =>
            item.id === id ? { ...item, ...newData } : item
        )
        setLocalCertificationList(updated)

        updateLocalStorage('certifications', updated)
        setCvData(prev => ({ ...prev, certifications: updated }))
    }

    const handleDelete = id => {
        const updated = localCertificationList.filter(item => item.id !== id)

        setLocalCertificationList(updated)
        updateLocalStorage('certifications', updated)
        setCvData(prev => ({ ...prev, certifications: updated }))
    }

    return (
        <div className="mt-4 overflow-x-hidden overflow-y-hidden">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={localCertificationList.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {localCertificationList?.length > 0
                        ? localCertificationList.map((item, index) => (
                              <CertificationItem
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
                <span className="leading-none">{t('add certification')}</span>
            </button>
        </div>
    )
}
