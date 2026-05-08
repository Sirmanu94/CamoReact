import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo-Navbar.png'; // Inserisci il logo CAMO

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6">
      <div className="z-50 w-32 md:w-48">
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="CAMO Ingegneria" className="w-full h-auto" />
        </Link>
      </div>
      
      {/* Desktop Menu */}
      <nav className="hidden md:flex bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-8 py-2">
        <ul className="flex items-center gap-8 m-0 p-0 list-none text-gray-300 text-sm font-light tracking-wider">
          <li><Link to="/" className="text-[#00b4d8] hover:text-[#e67e22] transition-colors border-b border-[#00b4d8]">home</Link></li>
          <li><Link to="/chi-siamo" className="hover:text-[#00b4d8] transition-colors">chi siamo</Link></li>
          <li><Link to="/Cantieri" className="hover:text-[#00b4d8] transition-colors">cantieri</Link></li>
          <li><Link to="/contatti" className="hover:text-[#00b4d8] transition-colors">contatti</Link></li>
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-3xl">
          <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Nav */}
      <nav className={`fixed inset-0 bg-[#030508]/95 backdrop-blur-xl z-40 transform transition-transform duration-300 flex flex-col justify-center items-center ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <ul className="flex flex-col items-center gap-8 text-white text-2xl font-light">
          <li><Link to="/" onClick={() => setIsOpen(false)} className="text-[#e67e22]">Home</Link></li>
          <li><Link to="/chi-siamo" onClick={() => setIsOpen(false)}>Chi siamo</Link></li>
          <li><Link to="/cantieri" onClick={() => setIsOpen(false)}>Cantieri</Link></li>
          <li><Link to="/contatti" onClick={() => setIsOpen(false)}>Contatti</Link></li>
        </ul>
      </nav>
    </header>
  );
}