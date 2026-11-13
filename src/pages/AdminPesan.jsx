import { useState, useEffect } from 'react'

function AdminPesan() {
    const [token, setToken] = useState(localStorage.getItem('admin_token') || '')
    const [password, setPassword] = useState('')
    const [errorLogin, setErrorLogin] = useState('')

    const [daftarPesan, setDaftarPesan] = useState([])
    const [loading, setLoading] = useState(false)
    const [hapusId, setHapusId] = useState(null)

    const ambilPesan = async (adminToken) => {
        setLoading(true)
        try {
            const response = await fetch('/api/pesan', {
                headers: {
                    Authorization: `Bearer ${adminToken}`,
                },
            })

            if (response.status === 401) {
                handleLogout()
                return
            }

            const data = await response.json()
            setDaftarPesan(data)
        } catch (error) {
            console.error('Gagal mengambil pesan:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            ambilPesan(token)
        }
    }, [token])

    const handleLogin = async (e) => {
        e.preventDefault()
        setErrorLogin('')

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })

            const result = await response.json()

            if (!response.ok) {
                setErrorLogin(result.message || 'Password salah')
                return
            }

            localStorage.setItem('admin_token', result.token)
            setToken(result.token)
            setPassword('')
        } catch (error) {
            setErrorLogin('Gagal terhubung ke server.')
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('admin_token')
        setToken('')
        setDaftarPesan([])
    }

    const handleHapus = async (id) => {
        const konfirmasi = window.confirm('Yakin ingin menghapus pesan ini?')
        if (!konfirmasi) return

        setHapusId(id)
        try {
            const response = await fetch(`/api/pesan/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (response.ok) {
                setDaftarPesan((prev) => prev.filter((item) => item._id !== id))
            }
        } catch (error) {
            alert('Gagal menghapus pesan.')
        } finally {
            setHapusId(null)
        }
    }

    const formatTanggal = (isoString) => {
        if (!isoString) return ''
        return new Date(isoString).toLocaleString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    // TAMPILAN LOGIN JIKA BELUM MASUK
    if (!token) {
        return (
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-sm bg-[#F3F6F4] text-[#071B2B] rounded-2xl p-6 sm:p-8 shadow-lg border border-[#071B2B]/15">
                    <h1 className="text-lg sm:text-xl font-bold text-center">
                        Login Admin Pesan
                    </h1>
                    <p className="text-xs text-[#071B2B]/75 text-center mt-1">
                        Masukkan password admin untuk melihat pesan masuk.
                    </p>

                    <form onSubmit={handleLogin} className="mt-6 space-y-4">
                        <div>
                            <label className="block text-xs font-semibold mb-1.5">
                                Password Admin
                            </label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Masukkan password..."
                                className="w-full px-4 py-2 rounded-full bg-white border border-[#071B2B]/30 text-xs sm:text-sm focus:outline-none focus:border-[#FF5A22]"
                            />
                        </div>

                        {errorLogin && (
                            <p className="text-xs text-red-600 font-medium text-center">
                                {errorLogin}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-2 px-5 rounded-full bg-[#071B2B] hover:bg-[#FF5A22] text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
                        >
                            Masuk
                        </button>
                    </form>
                </div>
            </main>
        )
    }

    // TAMPILAN DAFTAR PESAN MASUK
    return (
        <main className="flex-1 flex flex-col items-center px-4 sm:px-8 py-8">
            <section className="w-full max-w-5xl bg-[#F3F6F4] text-[#071B2B] rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg border border-[#071B2B]/15">
                {/* Header Dashboard */}
                <div className="border-b border-[#071B2B]/25 pb-4 mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h1 className="text-base sm:text-lg font-bold uppercase tracking-wide">
                            PESAN MASUK ({daftarPesan.length})
                        </h1>
                        <p className="text-xs text-[#071B2B]/70 mt-0.5">
                            Daftar pesan dari formulir Hubungi Saya
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <button
                            onClick={() => ambilPesan(token)}
                            className="px-4 py-1.5 rounded-full border border-[#071B2B] text-xs font-semibold hover:bg-[#071B2B] hover:text-white transition cursor-pointer"
                        >
                            Refresh
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-1.5 rounded-full bg-[#071B2B] hover:bg-[#FF5A22] text-white text-xs font-semibold transition cursor-pointer"
                        >
                            Keluar
                        </button>
                    </div>
                </div>

                {/* Konten Pesan */}
                {loading ? (
                    <p className="text-xs sm:text-sm text-center py-10 text-[#071B2B]/70">
                        Memuat pesan dari server...
                    </p>
                ) : daftarPesan.length === 0 ? (
                    <div className="text-center py-12 bg-white/60 rounded-2xl border border-[#071B2B]/20">
                        <p className="text-xs sm:text-sm font-medium text-[#071B2B]/70">
                            Belum ada pesan masuk.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {daftarPesan.map((item) => (
                            <article
                                key={item._id}
                                className="bg-white/90 border border-[#071B2B]/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 shadow-sm"
                            >
                                <div className="space-y-1.5 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2 className="text-sm sm:text-base font-bold text-[#071B2B]">
                                            {item.nama}
                                        </h2>
                                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#071B2B]/10 text-[#071B2B] font-medium">
                                            {item.email}
                                        </span>
                                        <span className="text-[11px] text-[#071B2B]/60">
                                            • {formatTanggal(item.createdAt)}
                                        </span>
                                    </div>

                                    <p className="text-xs sm:text-sm text-[#071B2B]/85 leading-relaxed pt-1 whitespace-pre-line">
                                        {item.pesan}
                                    </p>
                                </div>

                                {/* Tombol Hapus */}
                                <div className="shrink-0 self-end sm:self-center">
                                    <button
                                        onClick={() => handleHapus(item._id)}
                                        disabled={hapusId === item._id}
                                        className="px-4 py-1.5 rounded-full border border-red-600 text-red-600 hover:bg-red-600 hover:text-white disabled:opacity-50 text-xs font-semibold transition cursor-pointer"
                                    >
                                        {hapusId === item._id ? 'Menghapus...' : 'Hapus'}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}

export default AdminPesan