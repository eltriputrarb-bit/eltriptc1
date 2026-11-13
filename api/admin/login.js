export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method tidak diizinkan' })
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
    const { password } = body || {}
    const adminPass = (process.env.ADMIN_PASSWORD || '')
        .trim()
        .replace(/^["']|["']$/g, '')

    if (!adminPass) {
        return res.status(500).json({ message: 'ADMIN_PASSWORD belum diatur di Vercel.' })
    }

    if (password === adminPass) {
        return res.status(200).json({ token: adminPass })
    }

    return res.status(401).json({ message: 'Password admin salah!' })
}