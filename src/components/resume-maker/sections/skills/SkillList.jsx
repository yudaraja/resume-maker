import { useEffect, useRef, useState } from 'react'
import { getFromLocalStorage, updateLocalStorage } from '../../../../utils/localStorageHelper'
import { v4 as uuidv4 } from 'uuid'
import { t } from 'i18next'
import { CirclePlusIcon } from 'lucide-react'
import SkillItem from './skillItem'

export default function SkillList({ setCvData }) {
    const [localSkills, setLocalSkills] = useState(() => {
        const skillsFromStorage = getFromLocalStorage()?.skills
        return {
            technical: skillsFromStorage?.technical || [],
            nonTechnical: skillsFromStorage?.nonTechnical || [],
        }
    })

    const isFirstLoad = useRef(true)
    const [expandedId, setExpandedId] = useState(null)

    useEffect(() => {
        setLocalSkills(getFromLocalStorage()?.skills || { technical: [], nonTechnical: [] })
    }, [])

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false
            return
        }

        const hasSkills =
            (localSkills?.technical && localSkills.technical.length > 0) ||
            (localSkills?.nonTechnical && localSkills.nonTechnical.length > 0)

        if (hasSkills) {
            updateLocalStorage('skills', localSkills)
            setCvData(cv => ({ ...cv, skills: localSkills }))
        }
    }, [localSkills])

    const handleAdd = category => {
        const newSkill = {
            id: uuidv4(),
            name: '',
            category,
        }

        setLocalSkills(prev => ({
            ...prev,
            [category]: [...(prev[category] || []), newSkill],
        }))
    }

    const handleChange = (id, newData) => {
        setLocalSkills(prev => {
            const safePrev = {
                technical: prev?.technical || [],
                nonTechnical: prev?.nonTechnical || [],
            }

            const categoryKeys = ['technical', 'nonTechnical']
            let foundCategory = null

            for (const key of categoryKeys) {
                if (safePrev[key].some(item => item.id === id)) {
                    foundCategory = key
                    break
                }
            }

            if (!foundCategory) return safePrev

            const updatedCategory = safePrev[foundCategory].map(item =>
                item.id === id ? { ...item, ...newData } : item
            )

            return {
                ...safePrev,
                [foundCategory]: updatedCategory,
            }
        })
    }

    const handleDelete = (id, category) => {
        const updatedCategory = localSkills[category].filter(item => item.id !== id)

        const updatedSkills = {
            ...localSkills,
            [category]: updatedCategory,
        }

        setLocalSkills(updatedSkills)
        updateLocalStorage('skills', updatedSkills)
        setCvData(prev => ({ ...prev, skills: updatedSkills }))
    }

    return (
        <div className="mt-4 space-y-6">
            <div>
                <h2 className="text-md mb-2">{t('technical skills')}</h2>
                {localSkills?.technical?.map((item, index) => (
                    <SkillItem
                        key={item.id}
                        id={item.id}
                        index={index}
                        data={item}
                        expandedId={expandedId}
                        setExpandedId={setExpandedId}
                        onChange={newData => handleChange(item.id, newData)}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            <div>
                <h2 className="text-md mb-2">{t('non-technical skills')}</h2>
                {localSkills?.nonTechnical?.map((item, index) => (
                    <SkillItem
                        key={item.id}
                        id={item.id}
                        index={index}
                        data={item}
                        expandedId={expandedId}
                        setExpandedId={setExpandedId}
                        onChange={newData => handleChange(item.id, newData)}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            <div className="mt-4 flex flex-col-reverse items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
                <button
                    onClick={() => handleAdd('technical')}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-50 px-2 py-2 align-middle text-sm font-medium text-blue-600 transition-all duration-300 hover:bg-blue-200"
                >
                    <CirclePlusIcon className="h-4 w-4" />
                    {t('add technical skills')}
                </button>

                <button
                    onClick={() => handleAdd('nonTechnical')}
                    className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-50 px-2 py-2 align-middle text-sm font-medium text-blue-600 transition-all duration-300 hover:bg-blue-200"
                >
                    <CirclePlusIcon className="h-4 w-4" />
                    {t('add non-technical skills')}
                </button>
            </div>
        </div>
    )
}
