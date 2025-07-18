export const STORAGE_KEY = 'resume-maker-data'

export const updateLocalStorage = (key, value) => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    stored[key] = value
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))
}

export const getFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
}
