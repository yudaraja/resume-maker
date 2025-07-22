export const STORAGE_KEY = 'resume-maker-data'

const defaultData = {
    personalDetails: {
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        github: '',
        linkedin: '',
        portfolio: '',
    },
}

export const updateLocalStorage = (key, value) => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    stored[key] = value
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
}

export const getFromLocalStorage = () => {
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
        return {
            ...defaultData,
            ...stored,
            personalDetails: {
                ...defaultData.personalDetails,
                ...(stored.personalDetails || {}),
            },
        }
    } catch {
        return defaultData
    }
}
