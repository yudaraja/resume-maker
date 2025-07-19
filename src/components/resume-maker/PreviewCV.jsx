import TemplateATS from './templates/TemplateATS.jsx'

const templateComponents = {
    ats: TemplateATS,
}

export default function PreviewCV({ selectedTemplate, data }) {
    const Template = templateComponents[selectedTemplate] || TemplateATS
    return (
        <div className="bg-white p-4">
            <Template data={data} />
        </div>
    )
}
