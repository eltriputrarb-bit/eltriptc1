import { useState } from 'react'
import schoolLogo from '../assets/school.jpg'
import fotoProfil from '../assets/foto.jpg'
import ss1 from '../assets/ss1.jpg'
import ss2 from '../assets/ssP.jpg'
import ss3 from '../assets/ss3.jpg'
import ss4 from '../assets/ss4.jpg'
import ss5 from '../assets/github.jpg'
import ss6 from '../assets/lk21.jpg'
import ss7 from '../assets/ss7.jpg'
import ss8 from '../assets/ss8.jpg'
import ss9 from '../assets/ss9.jpg'

function Home() {
    const [halamanAktif, setHalamanAktif] = useState(1)
    const [formData, setFormData] = useState({ nama: '', email: '', pesan: '' })
    const [loading, setLoading] = useState(false)
    const [statusPesan, setStatusPesan] = useState({ tipe: '', teks: '' })

    const dataProject = {
        1: [
            {
                nama: 'Website Portofolio',
                deskripsi:
                    'Website portofolio pribadi yang menampilkan profil singkat, perjalanan belajar, galeri foto, serta kumpulan karya web yang pernah dibuat.',
                screenshot: ss1,
                link: 'https://portofolio-xcode.vercel.app/',
            },
            {
                nama: 'Website PTC Indonesia 2',
                deskripsi:
                    'Website informasi lembaga kursus komputer PTC Indonesia yang memuat daftar program pelatihan, jadwal belajar, dan informasi pendaftaran.',
                screenshot: ss2,
                link: 'https://ptcindonesia2.vercel.app',
            },
            {
                nama: 'Website Film',
                deskripsi:
                    'Website katalog film yang menyajikan informasi data film seperti sinopsis, tahun rilis, kategori genre, rating, serta tautan trailer resmi.',
                screenshot: ss3,
                link: 'https://h2iman.vercel.app',
            },
            {
                nama: 'Website Tokoku Online',
                deskripsi:
                    'Website toko online (e-commerce) yang dilengkapi tampilan katalog produk, halaman detail barang, informasi harga, dan fitur keranjang belanja.',
                screenshot: ss4,
                link: 'https://tokoku-alpha.vercel.app',
            },
        ],
        2: [
            {
                nama: 'Profil & Repository GitHub',
                deskripsi:
                    'Akun GitHub tempat menyimpan berbagai kode sumber proyek web (React, Vite, Node.js) serta catatan latihan pemrograman.',
                screenshot: ss5,
                link: 'https://github.com/eltriputrarb-bit',
            },
            {
                nama: 'Website LK21 Film',
                deskripsi:
                    'Website daftar tontonan dan katalog film yang berisi pengelompokan genre, info rilis terbaru, serta halaman detail setiap film.',
                screenshot: ss6,
                link: 'https://tv12.lk21official.cc/',
            },
            {
                nama: 'Website Eltriputrarb',
                deskripsi:
                    'Website personal yang berisi profil pengembang, tautan proyek aktif, dan eksperimen desain antarmuka web responsif.',
                screenshot: ss7,
                link: 'https://eltriputrarb.vercel.app/',
            },
            {
                nama: 'Website Eltriputra 2',
                deskripsi:
                    'Website latihan pengembangan front-end modern dengan fokus pada tata letak komponen yang bersih dan ringan di perangkat mobile',
                screenshot: ss8,
                link: 'https://eltriputra4.vercel.app/',
            },
        ],
        3: [
            {
                nama: 'Website Sudut',
                deskripsi:
                    'Website profil dan pusat informasi pelatihan dengan navigasi ringkas untuk calon peserta kursus.',
                screenshot: ss9,
                link: 'https://ptcindonesia.vercel.app/',
            },
        ],
    }

    const riwayatPendidikan = [
        {
            nama: 'SMK',
            tahun: '2023 - 2026',
            status: 'Lulus / belum',
            logo: '',
        },
        {
            nama: 'SLB / SMP Katolik Rajawali',
            tahun: '2020 - 2023',
            status: 'Lulus / belum',
            logo: schoolLogo,
        },
        {
            nama: 'SLB / SD Katolik Rajawali',
            tahun: '2014 - 2020',
            status: 'Lulus / Belum',
            logo: schoolLogo,
        },
    ]

    const totalHalaman = [1, 2, 3]
    const daftarTampil = dataProject[halamanAktif] || []

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setStatusPesan({ tipe: '', teks: '' })

        try {
            const response = await fetch('/api/pesan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || 'Gagal mengirim pesan')
            }

            setStatusPesan({
                tipe: 'sukses',
                teks: 'Terima kasih! Pesan kamu berhasil dikirim.',
            })
            setFormData({ nama: '', email: '', pesan: '' })
        } catch (error) {
            setStatusPesan({
                tipe: 'error',
                teks: error.message || 'Gagal mengirim pesan. Silakan coba lagi nanti.',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="flex-1 flex flex-col items-center px-3 sm:px-6 md:px-8 py-5 sm:py-8 space-y-6 sm:space-y-9">
            {/* 1. HERO SECTION / PROFIL */}
            <section
                id="profil"
                className="scroll-mt-16 w-full max-w-5xl bg-[#F3F6F4] text-[#071B2B] rounded-2xl p-4 sm:p-8 md:p-10 shadow-lg border border-[#071B2B]/15 flex flex-col md:flex-row items-center gap-5 sm:gap-8 md:gap-11"
            >
                <div className="shrink-0">
                    <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-2 border-[#071B2B]/60 bg-white/60 overflow-hidden shadow-inner">
                        <img
                            src={fotoProfil}
                            alt="Foto Profil Eltri Putra Rombebua"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                </div>

                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                    <p className="text-[11px] sm:text-xs md:text-sm font-medium text-[#071B2B]/75">
                        Halo, Perkenalkan saya
                    </p>
                    <h1 className="text-lg sm:text-2xl md:text-3xl font-bold mt-0.5 text-[#071B2B]">
                        Eltri Putra Rombebua
                    </h1>
                    <p className="text-[11px] sm:text-xs md:text-sm font-medium text-[#071B2B]/75 mt-0.5">
                        Front-End &amp; Full-Stack Web Developer
                    </p>

                    <p className="mt-3 sm:mt-4 text-[11px] sm:text-xs md:text-sm text-[#071B2B]/85 leading-relaxed max-w-lg">
                        Halo, saya Eltri Putra Rombebua. Saya lulusan sekolah menengah yang
                        saat ini mendalami pemrograman web Hobi saya adalah
                        coding, fotografi, dan membangun website interaktif menggunakan React,
                        Node.js, dan MongoDB, dengan cita-cita menjadi Full-Stack Web
                        Developer profesional.
                    </p>

                    <div className="mt-4 sm:mt-6 w-full max-w-[175px] sm:max-w-[210px]">
                        <a
                            href="#project"
                            className="w-full bg-[#F3F6F4] hover:bg-[#071B2B] text-[#071B2B] hover:text-white border border-[#071B2B] rounded-full py-1.5 sm:py-2 px-4 sm:px-5 flex items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-semibold transition duration-200 shadow-sm"
                        >
                            <span>Lihat Project</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4v16m0 0l-5-5m5 5l5-5"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* 2. SECTION PROJECT SAYA */}
            <section
                id="project"
                className="scroll-mt-16 w-full max-w-5xl bg-[#F3F6F4] text-[#071B2B] rounded-2xl p-4 sm:p-7 md:p-9 shadow-lg border border-[#071B2B]/15"
            >
                <div className="border-b border-[#071B2B]/25 pb-2.5 sm:pb-3 mb-4 sm:mb-6">
                    <h2 className="text-sm sm:text-base md:text-lg font-bold uppercase tracking-wide text-[#071B2B]">
                        PROJECT SAYA
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {daftarTampil.map((item, index) => (
                        <article
                            key={index}
                            className="bg-[#F3F6F4] border border-[#071B2B]/35 rounded-xl sm:rounded-2xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition"
                        >
                            <div>
                                <div className="w-full h-32 sm:h-40 md:h-44 border-b border-[#071B2B]/25 bg-white/60 flex items-center justify-center overflow-hidden">
                                    {item.screenshot ? (
                                        <img
                                            src={item.screenshot}
                                            alt={item.nama}
                                            className="w-full h-full object-cover object-top"
                                        />
                                    ) : (
                                        <span className="text-[11px] sm:text-xs font-medium text-[#071B2B]/65">
                                            Screenshot website kamu
                                        </span>
                                    )}
                                </div>

                                <div className="p-3.5 sm:p-5 pb-2.5 sm:pb-3">
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#071B2B]">
                                        {item.nama}
                                    </h3>
                                    <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-xs md:text-sm text-[#071B2B]/80 leading-relaxed">
                                        {item.deskripsi}
                                    </p>
                                </div>
                            </div>

                            <div className="px-3.5 sm:px-5 pb-4 sm:pb-5 pt-1.5 flex justify-center">
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-full max-w-[150px] sm:max-w-[180px] text-center py-1.5 sm:py-2 px-3 sm:px-4 rounded-full bg-[#F3F6F4] hover:bg-[#071B2B] text-[#071B2B] hover:text-white border border-[#071B2B]/60 hover:border-[#071B2B] font-medium text-[11px] sm:text-xs transition duration-200"
                                >
                                    Lihat Website
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Pagination (← 1 2 3 →) */}
                <div className="mt-5 sm:mt-7 flex items-center justify-center gap-2 sm:gap-3 text-[#071B2B]">
                    <button
                        onClick={() => setHalamanAktif((prev) => Math.max(1, prev - 1))}
                        disabled={halamanAktif === 1}
                        aria-label="Halaman sebelumnya"
                        className="p-1 sm:p-1.5 rounded-full hover:bg-[#071B2B]/10 disabled:opacity-35 transition cursor-pointer disabled:cursor-not-allowed"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 12H5m0 0l6-6m-6 6l6 6"
                            />
                        </svg>
                    </button>

                    {totalHalaman.map((nomor) => (
                        <button
                            key={nomor}
                            onClick={() => setHalamanAktif(nomor)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border font-semibold text-[11px] sm:text-xs flex items-center justify-center transition cursor-pointer ${halamanAktif === nomor
                                ? 'bg-[#071B2B] text-white border-[#071B2B]'
                                : 'bg-[#F3F6F4] text-[#071B2B] border-[#071B2B]/45 hover:border-[#071B2B]'
                                }`}
                        >
                            {nomor}
                        </button>
                    ))}

                    <button
                        onClick={() =>
                            setHalamanAktif((prev) => Math.min(totalHalaman.length, prev + 1))
                        }
                        disabled={halamanAktif === totalHalaman.length}
                        aria-label="Halaman berikutnya"
                        className="p-1 sm:p-1.5 rounded-full hover:bg-[#071B2B]/10 disabled:opacity-35 transition cursor-pointer disabled:cursor-not-allowed"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.8}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 12h14m0 0l-6-6m6 6l-6 6"
                            />
                        </svg>
                    </button>
                </div>
            </section>

            {/* 3. SECTION RIWAYAT PENDIDIKAN / KURSUS */}
            <section
                id="pendidikan"
                className="scroll-mt-16 w-full max-w-5xl bg-[#F3F6F4] text-[#071B2B] rounded-2xl p-4 sm:p-7 md:p-9 shadow-lg border border-[#071B2B]/15"
            >
                <div className="border-b border-[#071B2B]/25 pb-2.5 sm:pb-3 mb-4 sm:mb-6">
                    <h2 className="text-sm sm:text-base md:text-lg font-bold text-[#071B2B]">
                        Riwayat Pendidikan / Kursus
                    </h2>
                </div>

                {/* Container Timeline */}
                <div className="relative pl-10 sm:pl-14 md:pl-16 space-y-3.5 sm:space-y-5">
                    {/* Garis Vertikal Timeline */}
                    <div
                        aria-hidden="true"
                        className="absolute left-3.5 sm:left-4 md:left-5 top-3 bottom-3 w-[2px] bg-[#071B2B]/45"
                    />

                    {riwayatPendidikan.map((item, index) => (
                        <div key={index} className="relative flex items-center">
                            {/* Lingkaran Penanda + Logo Sekolah */}
                            <div className="absolute -left-10 sm:-left-14 md:-left-16 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-white border-2 border-[#071B2B]/60 overflow-hidden flex items-center justify-center shadow-sm">
                                {item.logo ? (
                                    <img
                                        src={item.logo}
                                        alt={`Logo ${item.nama}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF5A22]" />
                                )}
                            </div>

                            {/* Kartu Memanjang */}
                            <article className="w-full bg-[#F3F6F4] border border-[#071B2B]/35 rounded-xl sm:rounded-2xl px-3.5 sm:px-6 md:px-7 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 shadow-sm hover:border-[#071B2B] transition">
                                <div>
                                    <h3 className="text-xs sm:text-sm md:text-base font-semibold text-[#071B2B]">
                                        {item.nama}
                                    </h3>
                                    <p className="text-[11px] sm:text-xs md:text-sm text-[#071B2B]/75 mt-0.5">
                                        {item.tahun}
                                    </p>
                                </div>

                                <div className="sm:text-right shrink-0">
                                    <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-[#071B2B]">
                                        {item.status}
                                    </span>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. SECTION HUBUNGI SAYA */}
            <section
                id="hubungi"
                className="scroll-mt-16 w-full max-w-5xl bg-[#F3F6F4] text-[#071B2B] rounded-2xl p-4 sm:p-7 md:p-9 shadow-lg border border-[#071B2B]/15"
            >
                <div className="border-b border-[#071B2B]/25 pb-2.5 sm:pb-3 mb-4 sm:mb-6">
                    <h2 className="text-sm sm:text-base md:text-lg font-bold text-[#071B2B]">
                        Hubungi Saya
                    </h2>
                </div>

                {/* Kartu Email & Alamat */}
                <div className="space-y-2.5 sm:space-y-3">
                    <div className="w-full bg-white/80 border border-[#071B2B]/30 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center gap-3 shadow-sm">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#071B2B] text-[#FF5A22] font-bold flex items-center justify-center shrink-0 text-[11px] sm:text-xs">
                            @
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] sm:text-xs font-bold text-[#071B2B]">Email</p>
                            <p className="text-[11px] sm:text-xs md:text-sm text-[#071B2B]/80 truncate">
                                eltriputrarb@gmail.com
                            </p>
                        </div>
                    </div>

                    <div className="w-full bg-white/80 border border-[#071B2B]/30 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center gap-3 shadow-sm">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#071B2B] text-[#FF5A22] flex items-center justify-center shrink-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <p className="text-[11px] sm:text-xs font-bold text-[#071B2B]">
                                Alamat / lokasi
                            </p>
                            <p className="text-[11px] sm:text-xs md:text-sm text-[#071B2B]/80 truncate">
                                Kota Makassar, Indonesia
                            </p>
                        </div>
                    </div>
                </div>

                {/* Media Sosial & Tautan */}
                <div className="mt-5 sm:mt-6">
                    <p className="text-[11px] sm:text-xs md:text-sm font-semibold text-[#071B2B] mb-2">
                        Media Sosial &amp; Tautan :
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
                        {/* 1. Instagram */}
                        <a
                            href="https://www.instagram.com/ptcindonesia.info/"
                            target="_blank"
                            rel="noreferrer"
                            className="group bg-white/90 hover:bg-[#071B2B] text-[#071B2B] hover:text-white border border-[#071B2B]/30 hover:border-[#071B2B] rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2.5 sm:gap-3.5 transition duration-200 shadow-sm"
                        >
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#071B2B] group-hover:bg-[#FF5A22] text-white flex items-center justify-center shrink-0 transition">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                </svg>
                            </div>
                            <div className="text-left min-w-0">
                                <p className="text-[10px] sm:text-[11px] font-medium opacity-70">
                                    Instagram
                                </p>
                                <p className="text-[11px] sm:text-xs md:text-sm font-bold truncate">
                                    @ptcindonesia.info
                                </p>
                            </div>
                        </a>

                        {/* 2. Facebook */}
                        <a
                            href="https://www.facebook.com/share/1FfmijoyqH/"
                            target="_blank"
                            rel="noreferrer"
                            className="group bg-white/90 hover:bg-[#071B2B] text-[#071B2B] hover:text-white border border-[#071B2B]/30 hover:border-[#071B2B] rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2.5 sm:gap-3.5 transition duration-200 shadow-sm"
                        >
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#071B2B] group-hover:bg-[#FF5A22] text-white flex items-center justify-center shrink-0 transition">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </div>
                            <div className="text-left min-w-0">
                                <p className="text-[10px] sm:text-[11px] font-medium opacity-70">
                                    Facebook
                                </p>
                                <p className="text-[11px] sm:text-xs md:text-sm font-bold truncate">
                                    PTC Indonesia
                                </p>
                            </div>
                        </a>

                        {/* 3. GitHub / Tautan Web */}
                        <a
                            href="https://github.com/eltriputrarb-bit"
                            target="_blank"
                            rel="noreferrer"
                            className="group bg-white/90 hover:bg-[#071B2B] text-[#071B2B] hover:text-white border border-[#071B2B]/30 hover:border-[#071B2B] rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2.5 sm:gap-3.5 transition duration-200 shadow-sm"
                        >
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#071B2B] group-hover:bg-[#FF5A22] text-white flex items-center justify-center shrink-0 transition">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                    <path d="M9 18c-4.51 2-5-2-7-2" />
                                </svg>
                            </div>
                            <div className="text-left min-w-0">
                                <p className="text-[10px] sm:text-[11px] font-medium opacity-70">
                                    GitHub
                                </p>
                                <p className="text-[11px] sm:text-xs md:text-sm font-bold truncate">
                                    @eltriputrarb-bit
                                </p>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Form Kirim Pesan */}
                <form
                    onSubmit={handleSubmit}
                    className="mt-5 sm:mt-6 bg-[#F3F6F4] border border-[#071B2B]/35 rounded-xl sm:rounded-2xl p-3.5 sm:p-6 md:p-7 space-y-3 sm:space-y-4 shadow-sm"
                >
                    <div>
                        <label className="block text-[11px] sm:text-xs font-semibold text-[#071B2B] mb-1">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.nama}
                            onChange={(e) =>
                                setFormData({ ...formData, nama: e.target.value })
                            }
                            placeholder="Masukkan Nama Anda"
                            className="w-full px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-[#071B2B]/30 text-[11px] sm:text-xs md:text-sm text-[#071B2B] placeholder:text-[#071B2B]/45 focus:outline-none focus:border-[#FF5A22] transition"
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] sm:text-xs font-semibold text-[#071B2B] mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder="Masukkan Email Anda"
                            className="w-full px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-[#071B2B]/30 text-[11px] sm:text-xs md:text-sm text-[#071B2B] placeholder:text-[#071B2B]/45 focus:outline-none focus:border-[#FF5A22] transition"
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] sm:text-xs font-semibold text-[#071B2B] mb-1">
                            Pesan
                        </label>
                        <textarea
                            rows="3"
                            required
                            value={formData.pesan}
                            onChange={(e) =>
                                setFormData({ ...formData, pesan: e.target.value })
                            }
                            placeholder="Masukkan Pesan"
                            className="w-full px-3.5 sm:px-4 py-2 rounded-xl bg-white border border-[#071B2B]/30 text-[11px] sm:text-xs md:text-sm text-[#071B2B] placeholder:text-[#071B2B]/45 focus:outline-none focus:border-[#FF5A22] transition"
                        />
                    </div>

                    <div className="pt-0.5">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto min-w-[140px] sm:min-w-[160px] py-1.5 sm:py-2 px-5 sm:px-6 rounded-full bg-[#071B2B] hover:bg-[#FF5A22] disabled:opacity-50 text-white font-semibold text-[11px] sm:text-xs md:text-sm transition duration-200 shadow-sm cursor-pointer"
                        >
                            {loading ? 'Mengirim...' : 'Kirim Pesan'}
                        </button>
                    </div>

                    {statusPesan.teks && (
                        <div
                            className={`p-2.5 sm:p-3 rounded-xl text-[11px] sm:text-xs font-medium text-white ${statusPesan.tipe === 'sukses' ? 'bg-[#071B2B]' : 'bg-red-600'
                                }`}
                        >
                            {statusPesan.teks}
                        </div>
                    )}
                </form>
            </section>
        </main>
    )
}

export default Home