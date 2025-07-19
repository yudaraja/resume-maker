import React, { useEffect, useState } from 'react'
import EducationList from '../components/resume-maker/education/EducationList'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { DownloadIcon, SearchIcon } from 'lucide-react'
import { getFromLocalStorage } from '../utils/localStorageHelper'
import PersonalDetails from '../components/resume-maker/PersonalDetails'
import PreviewCV from '../components/resume-maker/PreviewCV'
import Description from '../components/resume-maker/Description'
import { PDFDownloadLink } from '@react-pdf/renderer'
import TemplateATSPDF from '../components/resume-maker/templates/TemplateATS_PDF'

const Maker = () => {
    const { t } = useTranslation()
    const [showPreview, setShowPreview] = useState(false)
    const [selectedTemplate] = useState('default')
    const cvData = getFromLocalStorage() || {}
    const [optionalSections, setOptionalSections] = useState({
        experience: false,
        skills: false,
        organizations: false,
    })

    useEffect(() => {
        if (showPreview) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [showPreview])

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
                        <div className="pb-4 text-xl font-semibold">{t('description')}</div>
                        <Description />
                    </div>
                    <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl">
                        <div className="pb-4 text-xl font-semibold">{t('education')}</div>
                        <EducationList />
                    </div>
                    {optionalSections.experience && (
                        <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl">
                            <div className="flex items-center justify-between pb-4">
                                <div className="text-xl font-semibold">{t('work experience')}</div>
                                <button
                                    onClick={() =>
                                        setOptionalSections(prev => ({
                                            ...prev,
                                            experience: false,
                                        }))
                                    }
                                    className="cursor-pointer text-sm text-red-500 hover:underline"
                                >
                                    {t('remove section')}
                                </button>
                            </div>
                            {/* Replace with actual component like <ExperienceList /> */}
                            <div className="text-gray-500 italic">
                                Experience section goes here...
                            </div>
                        </div>
                    )}

                    {optionalSections.skills && (
                        <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl">
                            <div className="flex items-center justify-between pb-4">
                                <div className="text-xl font-semibold">{t('skills')}</div>
                                <button
                                    onClick={() =>
                                        setOptionalSections(prev => ({
                                            ...prev,
                                            skills: false,
                                        }))
                                    }
                                    className="cursor-pointer text-sm text-red-500 hover:underline"
                                >
                                    {t('remove section')}
                                </button>
                            </div>
                            {/* Replace with actual component like <ExperienceList /> */}
                            <div className="text-gray-500 italic">Skills section goes here...</div>
                        </div>
                    )}

                    {optionalSections.organizations && (
                        <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl">
                            <div className="flex items-center justify-between pb-4">
                                <div className="text-xl font-semibold">{t('organizations')}</div>
                                <button
                                    onClick={() =>
                                        setOptionalSections(prev => ({
                                            ...prev,
                                            organizations: false,
                                        }))
                                    }
                                    className="cursor-pointer text-sm text-red-500 hover:underline"
                                >
                                    {t('remove section')}
                                </button>
                            </div>
                            {/* Replace with actual component like <ExperienceList /> */}
                            <div className="text-gray-500 italic">
                                Organizations section goes here...
                            </div>
                        </div>
                    )}

                    <div className="mb-6 flex flex-wrap gap-2">
                        {!optionalSections.experience && (
                            <button
                                className="cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 hover:bg-black hover:text-white"
                                onClick={() =>
                                    setOptionalSections(prev => ({ ...prev, experience: true }))
                                }
                            >
                                + {t('add experience')}
                            </button>
                        )}
                        {!optionalSections.skills && (
                            <button
                                className="cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 hover:bg-black hover:text-white"
                                onClick={() =>
                                    setOptionalSections(prev => ({ ...prev, skills: true }))
                                }
                            >
                                + {t('add skills')}
                            </button>
                        )}
                        {!optionalSections.organizations && (
                            <button
                                className="cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 hover:bg-black hover:text-white"
                                onClick={() =>
                                    setOptionalSections(prev => ({ ...prev, organizations: true }))
                                }
                            >
                                + {t('add organizations')}
                            </button>
                        )}
                    </div>
                    <div className="flex w-full max-w-4xl items-center justify-between gap-2 rounded-lg bg-white p-6 shadow-xl md:justify-end">
                        <button
                            onClick={() => setShowPreview(true)}
                            className="flex cursor-pointer items-center justify-center gap-1 rounded bg-black px-3 py-3 text-sm text-white transition-all duration-300"
                        >
                            <SearchIcon className="h-4" />
                            <span className="leading-none">Preview CV</span>
                        </button>
                        <PDFDownloadLink
                            document={<TemplateATSPDF data={cvData} />}
                            fileName="cv.pdf"
                            className="flex cursor-pointer items-center justify-center gap-1 rounded bg-blue-600 px-3 py-3 text-sm text-white transition-all duration-300 hover:bg-blue-800"
                        >
                            <DownloadIcon className="h-4" />
                            <span className="leading-none">Download</span>
                        </PDFDownloadLink>
                    </div>
                </div>
                {showPreview && (
                    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <div className="relative max-h-[90%] w-[80%] overflow-y-auto rounded bg-white p-4 shadow-lg">
                            <div className="top-0 z-10 flex justify-end bg-white">
                                <button
                                    className="text-gray-500 hover:text-black"
                                    onClick={() => setShowPreview(false)}
                                >
                                    ✕
                                </button>
                            </div>

                            <PreviewCV selectedTemplate={selectedTemplate} data={cvData} />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Maker
