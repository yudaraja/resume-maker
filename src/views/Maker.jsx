import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getFromLocalStorage, updateLocalStorage } from '../utils/localStorageHelper'
import LanguageSwitcher from '../components/resume-maker/common/LanguageSwitcher'
import SectionWrapper from '../components/resume-maker/common/SectionWrapper'
import OptionalSection from '../components/resume-maker/common/OptionalSection'
import AddSectionButton from '../components/resume-maker/common/AddSectionButton'
import TemplateATS from '../components/resume-maker/templates/TemplateATS'
import PersonalDetails from '../components/resume-maker/sections/PersonalDetails'
import Description from '../components/resume-maker/sections/Description'
import EducationList from '../components/resume-maker/sections/education/EducationList'
import WorkExperienceList from '../components/resume-maker/sections/work-experience/WorkExperienceList'
import OrganizationsList from '../components/resume-maker/sections/organizations/OrganizationsList'
import SkillList from '../components/resume-maker/sections/skills/SkillList'
import HintTooltip from '../components/HintTooltip'
import { PDFDownloadLink } from '@react-pdf/renderer'
import {
    ArrowDown,
    ArrowLeft,
    BadgeQuestionMark,
    CircleArrowDown,
    CircleArrowUp,
    CircleQuestionMark,
    DownloadIcon,
    Section,
} from 'lucide-react'
import Footer from '../components/Footer'
import HowToModal from '../components/HowToModal'
import { Link } from 'react-router-dom'

const Maker = () => {
    const { t } = useTranslation()
    const [cvData, setCvData] = useState(() => {
        const data = getFromLocalStorage()
        return {
            ...data,
            sectionOrder: data?.sectionOrder?.length ? data.sectionOrder : ['education'],
        }
    })

    const [sectionOrder, setSectionOrder] = useState(cvData.sectionOrder)

    const [optionalSections, setOptionalSections] = useState({
        experience: false,
        skills: false,
        organizations: false,
    })

    const moveSection = (key, direction) => {
        setSectionOrder(prev => {
            const index = prev.indexOf(key)
            const newIndex = direction === 'up' ? index - 1 : index + 1

            if (newIndex < 0 || newIndex >= prev.length) return prev

            const newOrder = [...prev]
            const [movedItem] = newOrder.splice(index, 1)
            newOrder.splice(newIndex, 0, movedItem)

            return newOrder
        })
    }

    const renderSection = (key, index) => {
        const isFirst = index === 0
        const isLast = index === sectionOrder.length - 1

        const moveButtons = (
            <div className="mb-2 flex gap-3">
                <button
                    onClick={() => moveSection(key, 'up')}
                    disabled={isFirst}
                    title={isFirst ? 'Already first section' : 'Move section up'}
                >
                    <CircleArrowUp className={isFirst ? 'text-gray-300' : ''} />
                </button>
                <button
                    onClick={() => moveSection(key, 'down')}
                    disabled={isLast}
                    title={isLast ? 'Already last section' : 'Move section down'}
                >
                    <CircleArrowDown className={isLast ? 'text-gray-300' : ''} />
                </button>
            </div>
        )

        switch (key) {
            case 'education':
                return (
                    <SectionWrapper title={t('education')} key={key}>
                        {moveButtons}
                        <EducationList education={cvData.education} setCvData={setCvData} />
                    </SectionWrapper>
                )
            case 'workExperience':
                return (
                    optionalSections.workExperience && (
                        <OptionalSection
                            title={t('work experience')}
                            onRemove={() => handleRemoveSection('workExperience')}
                            key={key}
                        >
                            {moveButtons}
                            <WorkExperienceList
                                workExperience={cvData.workExperience}
                                setCvData={setCvData}
                            />
                        </OptionalSection>
                    )
                )
            case 'organizations':
                return (
                    optionalSections.organizations && (
                        <OptionalSection
                            title={t('organizations')}
                            onRemove={() => handleRemoveSection('organizations')}
                            key={key}
                        >
                            {moveButtons}
                            <OrganizationsList
                                organizations={cvData.organizations}
                                setCvData={setCvData}
                            />
                        </OptionalSection>
                    )
                )
            case 'skills':
                return (
                    optionalSections.skills && (
                        <OptionalSection
                            title={t('skills')}
                            onRemove={() => handleRemoveSection('skills')}
                            key={key}
                        >
                            {moveButtons}
                            <SkillList skillList={cvData.skills} setCvData={setCvData} />
                        </OptionalSection>
                    )
                )
            default:
                return null
        }
    }

    useEffect(() => {
        updateLocalStorage('sectionOrder', sectionOrder)
    }, [sectionOrder])

    useEffect(() => {
        setCvData(prev => {
            const updated = { ...prev, sectionOrder }
            updateLocalStorage('cvData', updated)
            return updated
        })
    }, [sectionOrder])

    useEffect(() => {
        setOptionalSections(prev => ({
            ...prev,
            workExperience: cvData?.sectionOrder?.includes('workExperience'),
            skills: cvData?.sectionOrder?.includes('skills'),
            organizations: cvData?.sectionOrder?.includes('organizations'),
        }))
    }, [cvData])

    const handleRemoveSection = key => {
        const confirmDelete = window.confirm(t('confirm remove section'))

        if (!confirmDelete) return

        setOptionalSections(prev => ({ ...prev, [key]: false }))

        setCvData(prev => {
            const updated = { ...prev, [key]: [] }
            updateLocalStorage(key, [])
            return updated
        })

        setSectionOrder(prev => prev.filter(item => item !== key))
    }

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 px-[5%] py-20 md:px-[10%]">
                <div className="flex w-full max-w-screen-md flex-col items-center gap-6">
                    <div className="flex w-full flex-row items-center justify-between gap-4">
                        <div className="flex w-auto">
                            <Link
                                to="/resume-maker/"
                                className="flex items-center justify-center rounded-xl bg-black px-4 py-3 text-sm text-white shadow-md transition duration-300 hover:bg-gray-700"
                            >
                                <ArrowLeft className="h-5 w-5" />
                                <span className="ml-2 hidden md:inline">Kembali ke Beranda</span>
                            </Link>
                        </div>

                        <div className="flex w-auto justify-end self-end">
                            <HowToModal variant="text" />
                        </div>
                    </div>

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

                    <SectionWrapper
                        title={
                            <div className="flex items-center gap-2">
                                {t('description')}
                                <HintTooltip title="Tulis ringkasan singkat tentang dirimu: pengalaman, keahlian utama, atau tujuan karier. Hindari kata klise, dan fokus pada pencapaian atau nilai tambah yang kamu tawarkan." />
                            </div>
                        }
                    >
                        <Description description={cvData.description} setCvData={setCvData} />
                    </SectionWrapper>

                    {sectionOrder.map((key, index) => renderSection(key, index))}

                    <AddSectionButton
                        optionalSections={optionalSections}
                        setOptionalSections={setOptionalSections}
                        sectionOrder={sectionOrder}
                        setSectionOrder={setSectionOrder}
                        t={t}
                    />

                    <div className="flex w-full max-w-4xl justify-end rounded-lg bg-white p-6 shadow-xl">
                        <PDFDownloadLink
                            document={<TemplateATS data={cvData} />}
                            key={Date.now()}
                            fileName={`CV_${cvData?.personalDetails?.name || 'TanpaNama'}_${new Date().toISOString().split('T')[0]}.pdf`}
                            className="flex items-center justify-center gap-1 rounded bg-blue-600 px-3 py-3 text-sm text-white transition-all duration-300 hover:bg-blue-800"
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
