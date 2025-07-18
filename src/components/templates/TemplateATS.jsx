import { t } from 'i18next'
import React from 'react'

export const TemplateATS = ({ data }) => {
    return (
        <div
            className="w-full overflow-auto"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
        >
            <div className="a4-page bg-white shadow-lg">
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
                            className="text-blue-600 underline"
                        >
                            {data.personalDetails.email || 'Email'}
                        </a>{' '}
                        | {data.personalDetails.phone || '(123) 456-7890'} |{' '}
                        <a
                            href={
                                data.personalDetails.linkedin || 'https://linkedin.com/in/username'
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            {data.personalDetails.linkedin || 'LinkedIn'}
                        </a>{' '}
                        |{' '}
                        <a
                            href={
                                data.personalDetails.portfolio || 'https://portfolio.com/username'
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            {data.personalDetails.portfolio || 'Portfolio'}
                        </a>{' '}
                        |{' '}
                        <a
                            href={data.personalDetails.github || 'https://github.com/username'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            {data.personalDetails.github || 'GitHub'}
                        </a>
                    </div>
                </div>
                <div className="mt-1 text-center text-sm">
                    {data.personalDetails.address || '123 Main St, City, Country'},{' '}
                    {data.personalDetails.city || 'City'},{' '}
                    {data.personalDetails.postalCode || 'Postal Code'}
                </div>
                <div className="mt-4 text-justify text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste inventore in
                    voluptas nulla suscipit beatae officia necessitatibus? Mollitia, repellat fuga!
                    Ipsa expedita, tenetur eum officia architecto ullam nobis magnam iure itaque
                    soluta cupiditate saepe quia perferendis necessitatibus provident odio facere
                    placeat enim. Porro, eveniet? Tempore laborum perferendis deleniti culpa
                    aliquid!
                </div>
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
                                    <p className="text-sm font-semibold">
                                        {edu.startYear} - {edu.endYear}
                                    </p>
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
