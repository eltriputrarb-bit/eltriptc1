function Header() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-[#071B2B] text-white px-5 md:px-10 py-3 flex flex-wrap items-center justify-between gap-3 shadow-md">
            <a href="/#profil" className="text-base md:text-lg font-bold tracking-tight">
                PTCINDONESIA
            </a>

            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-xs md:text-sm">
                <a href="/#profil" className="hover:text-[#FF5A22] transition">
                    Profil / Tentang saya
                </a>
                <a href="/#project" className="hover:text-[#FF5A22] transition">
                    Project
                </a>
                <a href="/#pendidikan" className="hover:text-[#FF5A22] transition">
                    Riwayat Pendidikan
                </a>
                <a
                    href="/#hubungi"
                    className="px-4 py-1.5 rounded-full border border-white/80 hover:bg-[#FF5A22] hover:border-[#FF5A22] hover:text-white transition font-medium"
                >
                    Hubungi saya
                </a>
            </div>
        </nav>
    )
}

export default Header