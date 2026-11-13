import { connectDB, Pesan } from '../_db.js'

export default async function handler(req, res) {
    try {
        if (!process.env.MONGODB_URI) {
            return res.status(500).json({ message: 'MONGODB_URI belum diatur di Vercel.' })
        }

        await connectDB()

        // Kirim pesan baru (Publik)
        if (req.method === 'POST') {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
            const { nama, email, pesan } = body || {}

            if (!nama || !email || !pesan) {
                return res.status(400).json({ message: 'Semua kolom wajib diisi!' })
            }

            const pesanBaru = await Pesan.create({ nama, email, pesan })
            return res.status(201).json({
                message: 'Pesan berhasil terkirim!',
                data: pesanBaru,
            })
        }

        // Ambil daftar pesan (Khusus Admin)
        if (req.method === 'GET') {
            const auth = req.headers.authorization
            if (auth !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
                return res.status(401).json({ message: 'Akses ditolak.' })
            }

            const semuaPesan = await Pesan.find().sort({ createdAt: -1 })
            return res.status(200).json(semuaPesan)
        }

        return res.status(405).json({ message: 'Method tidak diizinkan' })
    } catch (error) {
        console.error('API Pesan Error:', error)
        return res.status(500).json({
            message: error.message || 'Terjadi kesalahan koneksi database.',
        })
    }
}