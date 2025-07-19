// TemplateATS_PDF.jsx
import { Page, Text, View, Document, StyleSheet, Link, Font } from '@react-pdf/renderer'
import { t } from 'i18next'

// Kamu bisa register font jika butuh:
// Font.register({ family: 'Times New Roman', src: 'https://example.com/times.ttf' })

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
    educationItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
        marginBottom: 3,
    },
    leftCol: {},
    rightCol: {
        textAlign: 'right',
        fontWeight: 'bold',
    },
    italic: {
        fontStyle: 'italic',
    },
})

const TemplateATSPDF = ({ data }) => {
    const { name, email, phone, linkedin, portfolio, github, address, city, postalCode } =
        data.personalDetails

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {name && <Text style={styles.name}>{name}</Text>}

                <Text style={styles.infoLine}>
                    {email && <Link src={`mailto:${email}`}>{email}</Link>} | {phone} |{' '}
                    {linkedin && <Link src={linkedin}>{linkedin}</Link>} |{' '}
                    {portfolio && <Link src={portfolio}>{portfolio}</Link>} |{' '}
                    {github && <Link src={github}>{github}</Link>}
                </Text>

                <Text style={styles.infoLine}>
                    {address}, {city}, {postalCode}
                </Text>

                <View style={styles.section}>
                    <Text>{data.description.description}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>{t('education')}</Text>
                    <View style={styles.hr} />
                    {data.education.map((edu, index) => (
                        <View key={index} style={styles.educationItem}>
                            <View style={styles.leftCol}>
                                <Text>{edu.school}</Text>
                                <Text style={styles.italic}>{edu.degree}</Text>
                                {edu.gpa && <Text>GPA: {edu.gpa}</Text>}
                            </View>
                            <View style={styles.rightCol}>
                                {edu.isPresent ? (
                                    <Text>
                                        {edu.startYear} - {t('present')}
                                    </Text>
                                ) : (
                                    <Text>
                                        {edu.startYear} - {edu.endYear}
                                    </Text>
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    )
}

export default TemplateATSPDF
