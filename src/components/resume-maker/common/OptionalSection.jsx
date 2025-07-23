import { t } from 'i18next'
import React from 'react'

const OptionalSection = ({ title, onRemove, children }) => (
    <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4">
            <div className="text-xl font-semibold">{title}</div>
            <button
                onClick={onRemove}
                className="cursor-pointer text-sm text-red-500 hover:underline"
            >
                {t('remove section')}
            </button>
        </div>
        {children}
    </div>
)

export default OptionalSection
