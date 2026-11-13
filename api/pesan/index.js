import { connectDB, Pesan } from '../_db.js'

export default async function handler(req, res) {
    await connectDB()

    // Kirim pesan baru (Publik)
    if (req.method === 'POST') {
        try {
            const { nama, email, pesan } = req.body || {}
            if (!nama || !email || !pesan) {
                return res.status(400).json({ message: 'Semua kolom wajib diisi!' })
            }

            const pesanBaru = await Pesan.create({ nama, email, pesan })
            return res.status(201).json({
                message: 'Pesan berhasil terkirim!',
                data: pesanBaru,
            })
        } catch (error) {
            return res.status(500).json({ message: 'Gagal menyimpan pesan.' })
        }
    }

    // Ambil daftar pesan (Khusus Admin)
    if (req.method === 'GET') {
        const auth = req.headers.authorization
        if (auth !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
            return res.status(401).json({ message: 'Akses ditolak.' })
        }

        try {
            const semuaPesan = await Pesan.find().sort({ createdAt: -1 })
            return res.status(200).json(semuaPesan)
        } catch (error) {
            return res.status(500).json({ message: 'Gagal mengambil pesan.' })
        }
    }

    return res.status(405).json({ message: 'Method tidak diizinkan' })
}