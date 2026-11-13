function Header() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-[#071B2B] text-white px-3.5 sm:px-6 md:px-10 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2 sm:gap-3 shadow-md">
            <a
                href="/#profil"
                className="text-sm sm:text-base md:text-lg font-bold tracking-tight"
            >
                PTCINDONESIA
            </a>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 md:gap-6 text-[11px] sm:text-xs md:text-sm">
                <a href="/#profil" className="hover:text-[#FF5A22] transition">
                    <span className="sm:hidden">Profil</span>
                    <span className="hidden sm:inline">Profil / Tentang saya</span>
                </a>
                <a href="/#project" className="hover:text-[#FF5A22] transition">
                    Project
                </a>
                <a href="/#pendidikan" className="hover:text-[#FF5A22] transition">
                    <span className="sm:hidden">Pendidikan</span>
                    <span className="hidden sm:inline">Riwayat Pendidikan</span>
                </a>
                <a
                    href="/#hubungi"
                    className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/80 hover:bg-[#FF5A22] hover:border-[#FF5A22] hover:text-white transition font-medium"
                >
                    Hubungi saya
                </a>
            </div>
        </nav>
    )
}

export default Header