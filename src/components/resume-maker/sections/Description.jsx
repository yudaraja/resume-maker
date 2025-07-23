import React, { useEffect, useRef } from 'react'
import { updateLocalStorage } from '../../../utils/localStorageHelper'

const Description = ({ description, setCvData }) => {
    const isFirstLoad = useRef(true)

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false
            return
        }

        updateLocalStorage('description', description)
    }, [description])

    const handleChange = (field, value) => {
        const updated = { ...description, [field]: value }
        updateLocalStorage('description', updated)
        setCvData(prev => ({ ...prev, description: updated }))
    }

    return (
        <textarea
            className={`mt-4 w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:outline-none ${
                description?.description ? 'bg-gray-100' : 'bg-white'
            }`}
            value={description?.description || ''}
            onChange={e => handleChange('description', e.target.value)}
            rows="4"
            cols="50"
        ></textarea>
    )
}

export default Description
