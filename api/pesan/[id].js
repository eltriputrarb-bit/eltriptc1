import { connectDB, Pesan } from '../_db.js'

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Method tidak diizinkan' })
    }

    const auth = req.headers.authorization
    if (auth !== `Bearer ${process.env.ADMIN_PASSWORD}`) {
        return res.status(401).json({ message: 'Akses ditolak.' })
    }

    await connectDB()

    try {
        const { id } = req.query
        const dihapus = await Pesan.findByIdAndDelete(id)
        if (!dihapus) {
            return res.status(404).json({ message: 'Pesan tidak ditemukan.' })
        }
        return res.status(200).json({ message: 'Pesan berhasil dihapus.' })
    } catch (error) {
        return res.status(500).json({ message: 'Gagal menghapus pesan.' })
    }
}