import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../views/Home'
import Maker from '../views/Maker'
import NotFound from '../components/NotFound'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/resume-maker/" element={<Home />} />
            <Route path="/resume-maker/create" element={<Maker />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default AppRoutes
