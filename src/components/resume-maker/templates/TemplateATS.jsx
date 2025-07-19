import { t } from 'i18next'
import React from 'react'

export const TemplateATS = ({ data }) => {
    return (
        <div
            id="template-ats"
            className="w-full overflow-auto"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
            <div className="a4-page shadow-lg" style={{ backgroundColor: '#ffffff' }}>
                {data.personalDetails.name && (
                    <div className="text-center text-3xl font-semibold">
                        {data.personalDetails.name || 'John Doe'}
                    </div>
                )}

                <div className="mt-2 text-center text-sm">
                    <div>
                        <a
                            href={data.personalDetails.email || 'loremipsum@gmail.com'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#2563eb] underline"
                        >
                            {data.personalDetails.email}
                        </a>{' '}
                        | {data.personalDetails.phone} |{' '}
                        <a
                            href={data.personalDetails.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#2563eb] underline"
                        >
                            {data.personalDetails.linkedin}
                        </a>{' '}
                        |{' '}
                        <a
                            href={data.personalDetails.portfolio}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#2563eb] underline"
                        >
                            {data.personalDetails.portfolio}
                        </a>{' '}
                        |{' '}
                        <a
                            href={data.personalDetails.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#2563eb] underline"
                        >
                            {data.personalDetails.github}
                        </a>
                    </div>
                </div>
                <div className="mt-1 text-center text-sm">
                    {data.personalDetails.address}, {data.personalDetails.city},{' '}
                    {data.personalDetails.postalCode}
                </div>
                <div className="mt-4 text-justify text-sm">{data.description.description}</div>
                <div>
                    <div>
                        <h2 className="mt-6 text-lg font-semibold">{t('education')}</h2>
                        <hr />
                        {data.education.map((edu, index) => (
                            <div key={index} className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm font-semibold">{edu.school}</h3>
                                    <p className="text-sm italic">{edu.degree}</p>
                                    {edu.gpa && (
                                        <p className="text-sm">
                                            {t('gpa')}: {edu.gpa}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    {edu.isPresent ? (
                                        <p className="text-sm font-semibold">
                                            {edu.startYear} - {t('present')}
                                        </p>
                                    ) : (
                                        <p className="text-sm font-semibold">
                                            {edu.startYear} - {edu.endYear}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TemplateATS
