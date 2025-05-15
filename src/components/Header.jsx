import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";


export function Header() {

  const navigate = useNavigate()

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 shadow-lg bg-white/90 backdrop-blur-sm' : 'py-4 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex  justify-between items-center">

        <Logo size={5} />

        <nav className="hidden md:flex space-x-8 items-center">
          <a href="#" className="text-gray-700 hover:text-[#d84506] font-medium transition-colors duration-200">Home</a>
          <a href="#" className="text-gray-700 hover:text-[#d84506] font-medium transition-colors duration-200">Sobre</a>
          <a href="#" className="text-gray-700 hover:text-[#d84506] font-medium transition-colors duration-200">Contato</a>
          <button onClick={() => navigate("signin")} className="hover:bg-[#d84506] hover:text-white font-medium transition-colors duration-200 border bg-white drop-shadow-sm ease-in-out  border-[#f56122] text-[#f56122] px-10 rounded-md py-1">
            <div className='flex items-center justify-between'>
              <span>Sign In</span>
              <svg className="w-4 h-4 text-[#d845060] ml-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </button>
        </nav>

        <button className="md:hidden text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}