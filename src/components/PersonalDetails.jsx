import { CirclePlusIcon } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { getFromLocalStorage, updateLocalStorage } from '../utils/localStorageHelper'
import { t } from 'i18next'

const PersonalDetails = () => {
    const [personalDetails, setPersonalDetails] = useState([])
    const [addDetails, setAddDetails] = useState(false)
    const isFirstLoad = useRef(true)

    useEffect(() => {
        if (personalDetails.github || personalDetails.linkedin) {
            setAddDetails(true)
        } else {
            setAddDetails(false)
        }
    }, [personalDetails.github, personalDetails.linkedin])

    useEffect(() => {
        setPersonalDetails(getFromLocalStorage()?.personalDetails || [])
    }, [])

    useEffect(() => {
        if (isFirstLoad.current) {
            isFirstLoad.current = false
            return
        }

        updateLocalStorage('personalDetails', personalDetails)
    }, [personalDetails])

    return (
        <div className="mt-4 space-y-4">
            <div>
                <label className="mb-1 block text-sm font-medium">{t('name')}</label>
                <input
                    value={personalDetails.name ? personalDetails.name : ''}
                    onChange={e => setPersonalDetails({ ...personalDetails, name: e.target.value })}
                    placeholder={t('name example')}
                    className={`w-full rounded border border-gray-300 p-2 text-sm ${
                        personalDetails.name ? 'bg-gray-100' : 'bg-white'
                    }`}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block text-sm font-medium">{t('email')}</label>
                    <input
                        type="email"
                        value={personalDetails.email ? personalDetails.email : ''}
                        onChange={e =>
                            setPersonalDetails({ ...personalDetails, email: e.target.value })
                        }
                        placeholder={t('email example')}
                        className={`w-full rounded border border-gray-300 p-2 text-sm ${
                            personalDetails.email ? 'bg-gray-100' : 'bg-white'
                        }`}
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">{t('phone')}</label>
                    <input
                        type="number"
                        value={personalDetails.phone ? personalDetails.phone : ''}
                        onChange={e =>
                            setPersonalDetails({ ...personalDetails, phone: e.target.value })
                        }
                        placeholder={t('phone example')}
                        className={`w-full rounded border border-gray-300 p-2 text-sm ${
                            personalDetails.phone ? 'bg-gray-100' : 'bg-white'
                        }`}
                    />
                </div>
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium">{t('address')}</label>
                <input
                    type="text"
                    value={personalDetails.address ? personalDetails.address : ''}
                    onChange={e =>
                        setPersonalDetails({ ...personalDetails, address: e.target.value })
                    }
                    placeholder={t('address example')}
                    className={`w-full rounded border border-gray-300 p-2 text-sm ${
                        personalDetails.address ? 'bg-gray-100' : 'bg-white'
                    }`}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block text-sm font-medium">{t('city')}</label>
                    <input
                        type="text"
                        value={personalDetails.city ? personalDetails.city : ''}
                        onChange={e =>
                            setPersonalDetails({ ...personalDetails, city: e.target.value })
                        }
                        placeholder={t('city example')}
                        className={`w-full rounded border border-gray-300 p-2 text-sm ${
                            personalDetails.city ? 'bg-gray-100' : 'bg-white'
                        }`}
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">{t('postal code')}</label>
                    <input
                        type="number"
                        value={personalDetails.postalCode ? personalDetails.postalCode : ''}
                        onChange={e =>
                            setPersonalDetails({ ...personalDetails, postalCode: e.target.value })
                        }
                        placeholder={t('postal code example')}
                        className={`w-full rounded border border-gray-300 p-2 text-sm ${
                            personalDetails.postalCode ? 'bg-gray-100' : 'bg-white'
                        }`}
                    />
                </div>
            </div>

            {addDetails && (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">{t('github')}</label>
                        <input
                            type="text"
                            value={personalDetails.github ? personalDetails.github : ''}
                            onChange={e =>
                                setPersonalDetails({
                                    ...personalDetails,
                                    github: e.target.value,
                                })
                            }
                            placeholder={t('github example')}
                            className={`w-full rounded border border-gray-300 p-2 text-sm ${
                                personalDetails.github ? 'bg-gray-100' : 'bg-white'
                            }`}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium">{t('linkedin')}</label>
                        <input
                            type="text"
                            value={personalDetails.linkedin ? personalDetails.linkedin : ''}
                            onChange={e =>
                                setPersonalDetails({
                                    ...personalDetails,
                                    linkedin: e.target.value,
                                })
                            }
                            placeholder={t('linkedin example')}
                            className={`w-full rounded border border-gray-300 p-2 text-sm ${
                                personalDetails.linkedin ? 'bg-gray-100' : 'bg-white'
                            }`}
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium">{t('Portfolio')}</label>
                        <input
                            type="text"
                            value={personalDetails.portfolio ? personalDetails.portfolio : ''}
                            onChange={e =>
                                setPersonalDetails({
                                    ...personalDetails,
                                    portfolio: e.target.value,
                                })
                            }
                            placeholder={t('portfolio example')}
                            className={`w-full rounded border border-gray-300 p-2 text-sm ${
                                personalDetails.portfolio ? 'bg-gray-100' : 'bg-white'
                            }`}
                        />
                    </div>
                </div>
            )}

            {!addDetails && (
                <button
                    onClick={() => setAddDetails(true)}
                    className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1 rounded bg-gray-300 px-4 py-4 text-sm transition-all duration-300 hover:bg-gray-400 md:text-base"
                >
                    <CirclePlusIcon className="h-4" />
                    <span className="leading-none">{t('add details')}</span>
                </button>
            )}
        </div>
    )
}

export default PersonalDetails
