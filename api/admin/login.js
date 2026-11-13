export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method tidak diizinkan' })
    }

    const { password } = req.body || {}
    const adminPass = process.env.ADMIN_PASSWORD

    if (!adminPass) {
        return res.status(500).json({ message: 'ADMIN_PASSWORD belum diatur di server.' })
    }

    if (password === adminPass) {
        return res.status(200).json({ token: adminPass })
    }

    return res.status(401).json({ message: 'Password admin salah!' })
}