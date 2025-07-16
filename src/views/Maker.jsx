import React from 'react'
import EducationList from '../components/education/EducationItem'

const Maker = () => {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-[10%] py-20">
            <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-xl">
                <EducationList />
            </div>
        </div>
    )
}

export default Maker
