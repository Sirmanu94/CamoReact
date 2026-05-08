import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Logo-navbar.png';

const API_LOGIN = "https://localhost:7273/api/auth/login";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(API_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        // Salva il token JWT e redireziona alla dashboard admin
        localStorage.setItem('camo_token', data.token);
        navigate('/admin/cantieri');
      } else {
        setError(data.message || "Credenziali non valide");
      }
    } catch (err) {
      setError("Errore di connessione al server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#030508] flex flex-col justify-center items-center p-6 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#e67e22]/20 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#00b4d8]/20 rounded-full blur-[150px] pointer-events-none"></div>

      <motion.div className="w-full max-w-md relative z-10" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="text-center mb-10">
          <Link to="/"><img src={logo} alt="CAMO Ingegneria" className="h-16 mx-auto mb-6" /></Link>
          <h2 className="text-3xl font-bold text-white mb-2">Area Riservata</h2>
          <p className="text-gray-400 font-light">Accedi per gestire i cantieri</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[30px] shadow-2xl">
          {error && <div className="mb-4 text-sm text-red-200 bg-red-500/20 p-3 rounded-lg border border-red-500/30 text-center">{error}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                <input type="email" name="email" required value={credentials.email} onChange={handleChange} className="w-full bg-[#030508]/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#e67e22] transition-colors" placeholder="admin@camo.it" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                <input type="password" name="password" required value={credentials.password} onChange={handleChange} className="w-full bg-[#030508]/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#e67e22] transition-colors" placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" className="w-full bg-[#e67e22] hover:bg-[#cf6d18] text-white font-bold py-3 rounded-xl transition-colors shadow-[0_0_15px_rgba(230,126,34,0.4)] mt-4">Accedi</button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}