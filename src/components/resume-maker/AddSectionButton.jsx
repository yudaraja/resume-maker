import React from 'react'

const AddSectionButton = ({ optionalSections, setOptionalSections, t }) => {
    return (
        <div className="mb-6 flex flex-wrap gap-2">
            {!optionalSections.experience && (
                <button
                    className="cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 hover:bg-black hover:text-white"
                    onClick={() => setOptionalSections(prev => ({ ...prev, experience: true }))}
                >
                    + {t('add experience')}
                </button>
            )}
            {!optionalSections.skills && (
                <button
                    className="cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 hover:bg-black hover:text-white"
                    onClick={() => setOptionalSections(prev => ({ ...prev, skills: true }))}
                >
                    + {t('add skills')}
                </button>
            )}
            {!optionalSections.organizations && (
                <button
                    className="cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 hover:bg-black hover:text-white"
                    onClick={() => setOptionalSections(prev => ({ ...prev, organizations: true }))}
                >
                    + {t('add organizations')}
                </button>
            )}
        </div>
    )
}

export default AddSectionButton
