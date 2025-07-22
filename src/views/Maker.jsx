import React, { useEffect, useState } from 'react'
import EducationList from '../components/resume-maker/education/EducationList'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { DownloadIcon, SearchIcon } from 'lucide-react'
import { getFromLocalStorage, updateLocalStorage } from '../utils/localStorageHelper'
import PersonalDetails from '../components/resume-maker/PersonalDetails'
import PreviewCV from '../components/resume-maker/PreviewCV'
import Description from '../components/resume-maker/Description'
import { PDFDownloadLink } from '@react-pdf/renderer'
import TemplateATSPDF from '../components/resume-maker/templates/TemplateATS_PDF'
import SectionWrapper from '../components/resume-maker/SectionWrapper'
import AddSectionButton from '../components/resume-maker/AddSectionButton'
import OptionalSection from '../components/resume-maker/OptionalSection'
import WorkExperienceList from '../components/resume-maker/work-experience/workExperienceList'

const Maker = () => {
    const { t } = useTranslation()
    const [cvData, setCvData] = useState(getFromLocalStorage())

    const [optionalSections, setOptionalSections] = useState({
        experience: false,
        skills: false,
        organizations: false,
    })

    useEffect(() => {
        setOptionalSections(prev => ({
            ...prev,
            experience: cvData?.workExperience?.length > 0,
            skills: cvData?.skills?.length > 0,
            organizations: cvData?.organizations?.length > 0,
        }))
    }, [cvData])

    const handleRemoveSection = key => {
        console.log('Removing section:', key)

        setOptionalSections(prev => ({ ...prev, [key]: false }))
        setCvData(prev => {
            const updated = { ...prev, [key]: [] }
            updateLocalStorage(key, [])
            return updated
        })
    }

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
                        <PersonalDetails
                            personalDetails={cvData.personalDetails}
                            setCvData={setCvData}
                        />
                    </div>

                    <SectionWrapper title={t('description')}>
                        <Description description={cvData.description} setCvData={setCvData} />
                    </SectionWrapper>

                    <SectionWrapper title={t('education')}>
                        <EducationList education={cvData.education} setCvData={setCvData} />
                    </SectionWrapper>

                    {optionalSections.experience && (
                        <OptionalSection
                            title={t('work experience')}
                            onRemove={() => handleRemoveSection('workExperience')}
                        >
                            <WorkExperienceList
                                workExperience={cvData.workExperience}
                                setCvData={setCvData}
                            />
                        </OptionalSection>
                    )}

                    {optionalSections.organizations && (
                        <OptionalSection
                            title={t('organizations')}
                            onRemove={() => handleRemoveSection('organizations')}
                        >
                            <div className="text-gray-500 italic">
                                Organization section goes here...
                            </div>
                        </OptionalSection>
                    )}

                    {optionalSections.skills && (
                        <OptionalSection
                            title={t('skills')}
                            onRemove={() => handleRemoveSection('skills')}
                        >
                            <div className="text-gray-500 italic">Skills section goes here...</div>
                        </OptionalSection>
                    )}

                    <AddSectionButton
                        optionalSections={optionalSections}
                        setOptionalSections={setOptionalSections}
                        t={t}
                    />

                    <div className="flex w-full max-w-4xl items-center justify-between gap-2 rounded-lg bg-white p-6 shadow-xl md:justify-end">
                        <PDFDownloadLink
                            document={<TemplateATSPDF data={cvData} />}
                            key={Date.now()}
                            fileName="cv.pdf"
                            className="flex cursor-pointer items-center justify-center gap-1 rounded bg-blue-600 px-3 py-3 text-sm text-white transition-all duration-300 hover:bg-blue-800"
                        >
                            <DownloadIcon className="h-4" />
                            <span className="leading-none">Download</span>
                        </PDFDownloadLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Maker
