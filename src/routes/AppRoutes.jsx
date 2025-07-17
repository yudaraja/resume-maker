import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../views/Home'
import Maker from '../views/Maker'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="resume-maker/test" element={<Home />} />
            <Route path="resume-maker/" element={<Maker />} />
        </Routes>
    )
}

export default AppRoutes
