import React from 'react'

const Navbar = () => {
    const scrollToSection = id => {
        const section = document.getElementById(id)
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <header className="flex items-center justify-between bg-sky-800 px-[10%] py-8 text-white">
            <div>CV Maker</div>
            <div>
                <nav className="hidden px-8 py-5 text-white md:flex">
                    {[{ id: 'home', label: 'Home' }].map(item => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className="relative text-base transition-all duration-300"
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    )
}

export default Navbar
