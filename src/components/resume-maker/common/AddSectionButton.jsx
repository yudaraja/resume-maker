import React from 'react'

const AddSectionButton = ({ optionalSections, setOptionalSections, setSectionOrder, t }) => {
    const handleAddSection = key => {
        setOptionalSections(prev => ({ ...prev, [key]: true }))

        setSectionOrder(prev => {
            if (!prev.includes(key)) {
                return [...prev, key]
            }
            return prev
        })
    }

    return (
        <div className="mb-6 flex flex-wrap gap-2">
            {!optionalSections.workExperience && (
                <button
                    className="cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 hover:bg-black hover:text-white"
                    onClick={() => handleAddSection('workExperience')}
                >
                    + {t('add experience')}
                </button>
            )}
            {!optionalSections.skills && (
                <button
                    className="cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 hover:bg-black hover:text-white"
                    onClick={() => handleAddSection('skills')}
                >
                    + {t('add skills')}
                </button>
            )}
            {!optionalSections.organizations && (
                <button
                    className="cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 hover:bg-black hover:text-white"
                    onClick={() => handleAddSection('organizations')}
                >
                    + {t('add organizations')}
                </button>
            )}
            {!optionalSections.certifications && (
                <button
                    className="cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-200 hover:bg-black hover:text-white"
                    onClick={() => handleAddSection('certifications')}
                >
                    + {t('add certification')}
                </button>
            )}
        </div>
    )
}

export default AddSectionButton
