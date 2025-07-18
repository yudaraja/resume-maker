import React from 'react'
import { Link } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import LanguageSwitcher from './components/LanguageSwitcher'

const App = () => {
    return (
        <>
            <div className="fixed top-0 right-0 mb-6 w-full max-w-4xl p-8 text-right">
                <LanguageSwitcher />
            </div>
            <AppRoutes />
        </>
    )
}

export default App
