const NotFound = () => {
    return (
        <div className="flex h-screen flex-col items-center justify-center space-y-12">
            <div className="text-2xl font-light">404 | Not Found</div>
            <div>
                <a href="/resume-maker/" className="rounded-lg bg-black px-4 py-2 text-white">
                    Kembali ke Beranda
                </a>
            </div>
        </div>
    )
}

export default NotFound
