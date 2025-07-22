import React from 'react'

const SectionWrapper = ({ title, children }) => (
    <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl">
        <div className="pb-4 text-xl font-semibold">{title}</div>
        {children}
    </div>
)

export default SectionWrapper
