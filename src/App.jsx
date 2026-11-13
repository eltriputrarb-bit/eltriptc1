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

        <footer className="w-full bg-[#071B2B] text-white/85 px-3.5 sm:px-6 md:px-10 py-3 sm:py-4 mt-3 sm:mt-4 border-t border-white/10">
          <div className="max-w-5xl mx-auto text-[11px] sm:text-xs flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-3 text-center sm:text-left">
            <span>© 2017-2026 Eltri Putra Rombebua. All Rights Reserved.</span>
            <a
              href="/admin"
              className="text-white/55 hover:text-[#FF5A22] transition"
            >
              Admin
            </a>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App