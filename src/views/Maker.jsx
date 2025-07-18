import React from 'react'
import EducationList from '../components/education/EducationList'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'

const Maker = () => {
    const { t } = useTranslation()

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 px-[5%] py-20 md:px-[10%]">
                <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl">
                    <div className="pb-4 text-xl font-semibold">{t('education')} 🎓</div>
                    <EducationList />
                </div>
            </div>
        </>
    )
}

export default Maker
