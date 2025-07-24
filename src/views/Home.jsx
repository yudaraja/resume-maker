import React from 'react'
import Navbar from '../components/Navbar'
import HowToModal from '../components/HowToModal'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div id="home" className="flex h-auto min-h-screen w-full flex-col md:flex-row">
            <div className="relative flex w-full items-center justify-center bg-black py-10 md:hidden md:w-1/2 md:py-0">
                <div className="rounded-3xl bg-white/5 p-6 shadow-2xl backdrop-blur-md">
                    <img
                        src="./sample-picture.jpg"
                        alt="Contoh CV"
                        className="h-auto max-w-[300px] rounded-xl shadow-lg md:max-w-[350px]"
                    />
                </div>

                <div className="absolute -top-10 -left-10 h-32 w-32 rotate-12 rounded-full bg-blue-400/50 blur-3xl md:h-40 md:w-40" />
                <div className="absolute right-0 bottom-0 h-32 w-32 rounded-full bg-purple-500/30 blur-3xl md:h-40 md:w-40" />
            </div>
            {/* Kiri: Teks */}
            <div className="z-50 flex w-full flex-col justify-center bg-white px-6 py-12 md:w-1/2 md:px-[9%] md:py-0">
                <h1 className="mb-4 text-3xl leading-tight font-extrabold text-slate-800 md:text-5xl">
                    Buat CV Profesional <br /> Dengan Mudah
                </h1>
                <p className="mb-6 text-base text-slate-600 md:text-lg">
                    Buat dan sesuaikan CV kamu secara langsung dari browser. Cukup akses lewat
                    browser dan mulai isi datamu.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                    <Link
                        to="/create"
                        className="rounded-xl bg-black px-6 py-3 text-center text-white shadow-md transition duration-300 hover:bg-gray-700"
                    >
                        Buat CV Sekarang
                        <span className="ml-2">🚀</span>
                    </Link>
                    <HowToModal />
                </div>
            </div>

            {/* Kanan: Gambar */}
            <div className="relative hidden w-full items-center justify-center bg-black py-10 md:flex md:w-1/2 md:py-0">
                <div className="rounded-3xl bg-white/5 p-6 shadow-2xl backdrop-blur-md">
                    <img
                        src="./sample-picture.jpg"
                        alt="Contoh CV"
                        className="h-auto max-w-[300px] rounded-xl shadow-lg md:max-w-[350px]"
                    />
                </div>

                <div className="absolute -top-10 -left-10 h-32 w-32 rotate-12 rounded-full bg-blue-400/50 blur-3xl md:h-40 md:w-40" />
                <div className="absolute right-0 bottom-0 h-32 w-32 rounded-full bg-purple-500/30 blur-3xl md:h-40 md:w-40" />
            </div>
        </div>
    )
}

export default Home
