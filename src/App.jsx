import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import AdminPesan from './pages/AdminPesan'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#FF5A22] flex flex-col font-sans">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPesan />} />
        </Routes>

        <footer className="w-full bg-[#071B2B] text-white/85 px-5 md:px-10 py-4 mt-4 border-t border-white/10">
          <div className="max-w-5xl mx-auto text-xs flex items-center justify-between">
            <span>© 2017-2026 Eltri Putra Rombebua. All Rights Reserved.</span>
            <a
              href="/admin"
              className="text-white/50 hover:text-[#FF5A22] transition"
            >
              MAKE IT
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App