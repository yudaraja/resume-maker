import React, { useEffect, useRef, useState } from 'react'
import { getFromLocalStorage, updateLocalStorage } from '../../utils/localStorageHelper'

const Description = () => {
    const [description, setDescription] = useState([])
    const isFirstLoad = useRef(true)

    useEffect(() => {
        setDescription(getFromLocalStorage()?.description || [])
    }, [])

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false
            return
        }

        updateLocalStorage('description', description)
    }, [description])

    return (
        <textarea
            className={`mt-4 w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:outline-none ${
                description?.description ? 'bg-gray-100' : 'bg-white'
            }`}
            value={description.description ? description.description : ''}
            onChange={e => setDescription({ ...description, description: e.target.value })}
            rows="4"
            cols="50"
        ></textarea>
    )
}

export default Description
