import React, { useState } from 'react'
import EducationList from '../components/education/EducationList'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import PersonalDetails from '../components/PersonalDetails'
import { SearchIcon } from 'lucide-react'
import { getFromLocalStorage } from '../utils/localStorageHelper'
import PreviewCV from '../components/PreviewCV'

const Maker = () => {
    const { t } = useTranslation()
    const [showPreview, setShowPreview] = useState(false)
    const [selectedTemplate] = useState('default')
    const cvData = getFromLocalStorage() || {}

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 px-[5%] py-20 md:px-[10%]">
                <div className="flex w-full flex-col items-center gap-6">
                    <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl">
                        <div className="flex justify-between">
                            <div className="pb-4 text-xl font-semibold">
                                {t('personal details')}
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-sm font-light">{t('cv language')}</span>
                                <LanguageSwitcher />
                            </div>
                        </div>
                        <PersonalDetails />
                    </div>
                    <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl">
                        <div className="pb-4 text-xl font-semibold">{t('education')}</div>
                        <EducationList />
                    </div>
                    <div className="flex w-full max-w-4xl items-center justify-end rounded-lg bg-white p-6 shadow-xl">
                        <button
                            onClick={() => setShowPreview(true)}
                            className="flex cursor-pointer items-center justify-center gap-1 rounded bg-black px-3 py-3 text-sm text-white transition-all duration-300"
                        >
                            <SearchIcon className="h-4" />
                            <span className="leading-none">Preview CV</span>
                        </button>
                    </div>
                </div>
                {showPreview && (
                    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="relative max-h-[90%] w-[80%] overflow-y-auto rounded bg-white p-6 shadow-lg">
                            <button
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPreview(false)}
                            >
                                ✕
                            </button>

                            <PreviewCV selectedTemplate={selectedTemplate} data={cvData} />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Maker
