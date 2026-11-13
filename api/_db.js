import mongoose from 'mongoose'

let cached = global.mongoose
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {
    if (cached.conn) return cached.conn

    const cleanUri = (process.env.MONGODB_URI || '')
        .trim()
        .replace(/^["']|["']$/g, '')

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(cleanUri, { bufferCommands: false })
            .then((m) => m)
    }

    try {
        cached.conn = await cached.promise
    } catch (err) {
        cached.promise = null
        throw err
    }

    return cached.conn
}

const pesanSchema = new mongoose.Schema(
    {
        nama: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        pesan: { type: String, required: true, trim: true },
    },
    { timestamps: true }
)

export const Pesan =
    mongoose.models.Pesan || mongoose.model('Pesan', pesanSchema)