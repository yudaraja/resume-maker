import { CircleQuestionMark } from 'lucide-react'
import { useState } from 'react'

export default function HowToModal({ variant = 'button' }) {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => setIsOpen(true)
    const closeModal = () => setIsOpen(false)

    return (
        <>
            {variant === 'button' ? (
                <button
                    onClick={openModal}
                    className="cursor-pointer rounded-xl border border-black px-6 py-3 text-center text-black shadow-md transition duration-300 hover:bg-black hover:text-white"
                >
                    Petunjuk Penggunaan
                </button>
            ) : (
                <div className="flex w-full flex-col self-end md:w-auto">
                    <button
                        onClick={openModal}
                        className="flex cursor-pointer items-center gap-2 px-1 text-sm text-black hover:underline"
                    >
                        <CircleQuestionMark className="h-4 w-4" />
                        <span>Petunjuk Penggunaan</span>
                    </button>
                </div>
            )}

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-800">
                                Petunjuk Penggunaan
                            </h2>
                            <button
                                onClick={closeModal}
                                className="cursor-pointer text-gray-500 hover:text-black"
                            >
                                ✕
                            </button>
                        </div>

                        <ol className="list-decimal space-y-2 pl-4 text-sm text-slate-700">
                            <li>
                                Silakan pilih bahasa CV terlebih dahulu untuk menyesuaikan bahasa
                                isi CV kamu.
                            </li>
                            <li>
                                Isi semua bagian CV sesuai dengan bahasa yang dipilih, termasuk data
                                diri, pengalaman, dan keahlian.
                            </li>
                            <li>
                                Saat ini, template yang tersedia hanya mendukung format
                                ATS-friendly.
                            </li>
                            <li>
                                Data yang kamu masukkan akan disimpan secara lokal di browser (local
                                storage).
                            </li>
                            <li>
                                Karena tidak tersimpan di cloud, data tidak bisa diakses dari
                                perangkat lain.
                            </li>
                            <li>
                                Saat ini belum tersedia validasi otomatis untuk data yang diinput.
                                Pastikan kamu mengecek kembali semua data sebelum dan sesudah
                                mengunduh CV.
                            </li>
                            <li>
                                Setelah selesai, klik tombol "Download" untuk menyimpan CV ke
                                perangkatmu.
                            </li>
                        </ol>
                    </div>
                </div>
            )}
        </>
    )
}
