import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'eltriadmin123'

app.use(cors())
app.use(express.json())

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Berhasil terhubung ke MongoDB Atlas'))
    .catch((err) => console.error('Gagal koneksi MongoDB:', err))

const pesanSchema = new mongoose.Schema(
    {
        nama: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        pesan: { type: String, required: true, trim: true },
    },
    { timestamps: true }
)

const Pesan = mongoose.model('Pesan', pesanSchema)

// Middleware cek otorisasi admin
const cekAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader !== `Bearer ${ADMIN_PASSWORD}`) {
        return res.status(401).json({ message: 'Akses ditolak. Silakan login ulang.' })
    }
    next()
}

// Route POST: Login Admin
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body
    if (password === ADMIN_PASSWORD) {
        return res.json({ token: ADMIN_PASSWORD })
    }
    return res.status(401).json({ message: 'Password admin salah!' })
})

// Route POST: Simpan pesan dari form Hubungi Saya (Publik)
app.post('/api/pesan', async (req, res) => {
    try {
        const { nama, email, pesan } = req.body
        if (!nama || !email || !pesan) {
            return res.status(400).json({ message: 'Semua kolom wajib diisi!' })
        }
        const pesanBaru = await Pesan.create({ nama, email, pesan })
        res.status(201).json({ message: 'Pesan berhasil tersimpan!', data: pesanBaru })
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' })
    }
})

// Route GET: Ambil semua pesan masuk (Khusus Admin)
app.get('/api/pesan', cekAdmin, async (req, res) => {
    try {
        const semuaPesan = await Pesan.find().sort({ createdAt: -1 })
        res.json(semuaPesan)
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil data pesan.' })
    }
})

// Route DELETE: Hapus pesan berdasarkan ID (Khusus Admin)
app.delete('/api/pesan/:id', cekAdmin, async (req, res) => {
    try {
        const dihapus = await Pesan.findByIdAndDelete(req.params.id)
        if (!dihapus) {
            return res.status(404).json({ message: 'Pesan tidak ditemukan.' })
        }
        res.json({ message: 'Pesan berhasil dihapus.' })
    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus pesan.' })
    }
})

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`)
})