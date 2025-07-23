import { Page, Text, View, Document, StyleSheet, Link, Font } from '@react-pdf/renderer'
import { t } from 'i18next'
import React from 'react'

const styles = StyleSheet.create({
    page: {
        padding: 32,
        fontFamily: 'Times-Roman',
        fontSize: 11,
        lineHeight: 1.4,
    },

    name: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 18,
    },

    infoLine: {
        textAlign: 'center',
        marginTop: 1,
    },

    section: {
        marginTop: 14,
        textAlign: 'justify',
        marginBottom: 2,
    },

    heading: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },

    hr: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',
        marginBottom: 8,
    },

    italic: {
        fontStyle: 'italic',
    },

    educationItem: {
        marginTop: 4,
        marginBottom: 4,
    },

    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    headItem: {
        fontWeight: 'bold',
    },

    dateText: {
        fontWeight: 'bold',
        textAlign: 'right',
    },
    subHeading: {
        fontWeight: 'bold',
        marginBottom: 2,
        fontSize: 11,
    },
})

const TemplateATS = ({ data }) => {
    const { sectionOrder = [] } = data
    const renderSection = key => {
        switch (key) {
            case 'education':
                return (
                    Array.isArray(data?.education) &&
                    data.education.length > 0 && (
                        <View style={styles.section} key={key}>
                            <Text style={styles.heading}>{t('education')}</Text>
                            <View style={styles.hr} />
                            {data.education.map((edu, index) => (
                                <View key={edu?.id || index} style={styles.educationItem}>
                                    <View style={styles.rowBetween}>
                                        <Text style={styles.headItem}>{edu?.school || ''}</Text>
                                        <Text style={styles.dateText}>
                                            {edu?.startYear && (
                                                <>
                                                    {edu.startMonth
                                                        ? `${t(`months.${edu.startMonth}`)} ${edu.startYear}`
                                                        : edu.startYear}
                                                    {(edu?.endMonth ||
                                                        edu?.endYear ||
                                                        edu.isPresent) &&
                                                        ' - '}
                                                    {edu?.isPresent
                                                        ? t('present')
                                                        : edu?.endMonth
                                                          ? `${t(`months.${edu.endMonth}`)} ${edu.endYear}`
                                                          : edu?.endYear || ''}
                                                </>
                                            )}
                                        </Text>
                                    </View>
                                    {edu?.degree && <Text style={styles.italic}>{edu.degree}</Text>}
                                    {!edu?.isPresent && edu?.gpa && (
                                        <Text>
                                            {t('gpa')}: {edu.gpa}
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    )
                )
            case 'workExperience':
                return (
                    Array.isArray(data?.workExperience) &&
                    data.workExperience.length > 0 && (
                        <View style={styles.section} key={key}>
                            <Text style={styles.heading}>{t('work experience')}</Text>
                            <View style={styles.hr} />
                            {data.workExperience.map((work, index) => (
                                <View key={work?.id || index} style={styles.educationItem}>
                                    <View style={styles.rowBetween}>
                                        <Text style={styles.headItem}>{work?.position || ''}</Text>
                                        <Text style={styles.dateText}>
                                            {work?.startYear && (
                                                <>
                                                    {work.startMonth
                                                        ? `${t(`months.${work.startMonth}`)} ${work.startYear}`
                                                        : work.startYear}
                                                    {(work?.endMonth ||
                                                        work?.endYear ||
                                                        work.isPresent) &&
                                                        ' - '}
                                                    {work?.isPresent
                                                        ? t('present')
                                                        : work?.endMonth
                                                          ? `${t(`months.${work.endMonth}`)} ${work.endYear}`
                                                          : work?.endYear || ''}
                                                </>
                                            )}
                                        </Text>
                                    </View>
                                    {work?.company && (
                                        <Text style={styles.italic}>
                                            {work.company} - {work?.city}, {work?.country}
                                        </Text>
                                    )}
                                    {work?.jobDescription && (
                                        <Text style={{ marginTop: 4 }}>{work.jobDescription}</Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    )
                )
            case 'organizations':
                return (
                    Array.isArray(data?.organizations) &&
                    data.organizations.length > 0 && (
                        <View style={styles.section} key={key}>
                            <Text style={styles.heading}>{t('organization')}</Text>
                            <View style={styles.hr} />
                            {data.organizations.map((org, index) => (
                                <View key={org?.id || index} style={styles.educationItem}>
                                    <View style={styles.rowBetween}>
                                        <Text style={styles.headItem}>{org?.position || ''}</Text>
                                        <Text style={styles.dateText}>
                                            {org?.startYear && (
                                                <>
                                                    {org.startMonth
                                                        ? `${t(`months.${org.startMonth}`)} ${org.startYear}`
                                                        : org.startYear}
                                                    {(org?.endMonth ||
                                                        org?.endYear ||
                                                        org.isPresent) &&
                                                        ' - '}
                                                    {org?.isPresent
                                                        ? t('present')
                                                        : org?.endMonth
                                                          ? `${t(`months.${org.endMonth}`)} ${org.endYear}`
                                                          : org?.endYear || ''}
                                                </>
                                            )}
                                        </Text>
                                    </View>
                                    {org?.organization && (
                                        <Text style={styles.italic}>{org.organization}</Text>
                                    )}
                                    {org?.jobDescription && (
                                        <Text style={{ marginTop: 4 }}>{org.jobDescription}</Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    )
                )
            case 'skills': {
                const technicalSkills = Array.isArray(data?.skills?.technical)
                    ? data.skills.technical.map(skill => skill.name)
                    : []

                const nonTechnicalSkills = Array.isArray(data?.skills?.nonTechnical)
                    ? data.skills.nonTechnical.map(skill => skill.name)
                    : []

                const hasSkills = technicalSkills.length > 0 || nonTechnicalSkills.length > 0

                return (
                    hasSkills && (
                        <View style={styles.section} key={key}>
                            <Text style={styles.heading}>{t('skills')}</Text>
                            <View style={styles.hr} />

                            {technicalSkills.length > 0 && (
                                <View style={{ marginBottom: 6 }}>
                                    <Text style={styles.subHeading}>{t('technical skills')}:</Text>
                                    <Text>{technicalSkills.join(', ')}</Text>
                                </View>
                            )}

                            {nonTechnicalSkills.length > 0 && (
                                <View>
                                    <Text style={styles.subHeading}>
                                        {t('non-technical skills')}:
                                    </Text>
                                    <Text>{nonTechnicalSkills.join(', ')}</Text>
                                </View>
                            )}
                        </View>
                    )
                )
            }
            default:
                return null
        }
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {data?.personalDetails && (
                    <Text style={styles.name}>{data?.personalDetails?.name}</Text>
                )}

                <Text style={styles.infoLine}>
                    {[
                        data?.personalDetails?.email && (
                            <Link key="email" src={`mailto:${data.personalDetails.email}`}>
                                {data.personalDetails.email}
                            </Link>
                        ),
                        data?.personalDetails?.phone && (
                            <Text key="phone">{data.personalDetails.phone}</Text>
                        ),
                        data?.personalDetails?.linkedin && (
                            <Link key="linkedin" src={data.personalDetails.linkedin}>
                                {data.personalDetails.linkedin}
                            </Link>
                        ),
                        data?.personalDetails?.portfolio && (
                            <Link key="portfolio" src={data.personalDetails.portfolio}>
                                {data.personalDetails.portfolio}
                            </Link>
                        ),
                        data?.personalDetails?.github && (
                            <Link key="github" src={data.personalDetails.github}>
                                {data.personalDetails.github}
                            </Link>
                        ),
                    ]
                        .filter(Boolean)
                        .map((item, index, arr) => (
                            <React.Fragment key={index}>
                                {item}
                                {index < arr.length - 1 && ' | '}
                            </React.Fragment>
                        ))}
                </Text>

                <Text style={styles.infoLine}>
                    {data?.personalDetails?.address}, {data?.personalDetails?.city},{' '}
                    {data?.personalDetails?.postalCode}
                </Text>

                <View style={styles.section}>
                    {data?.description && <Text>{data?.description?.description}</Text>}
                </View>

                {sectionOrder.map(key => renderSection(key))}
            </Page>
        </Document>
    )
}

export default TemplateATS
