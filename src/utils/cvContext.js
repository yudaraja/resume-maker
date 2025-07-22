import { createContext, useContext, useState } from 'react'
import { getFromLocalStorage, updateLocalStorage } from './localStorageHelper'

const CvContext = createContext()

export const CvProvider = ({ children }) => {
    const [cvData, setCvData] = useState(() => getFromLocalStorage())

    const updateSection = (key, value) => {
        const updated = { ...cvData, [key]: value }
        setCvData(updated)
        updateLocalStorage(key, value)
    }

    return <CvContext.Provider value={{ cvData, updateSection }}>{children}</CvContext.Provider>
}

export const useCv = () => useContext(CvContext)
