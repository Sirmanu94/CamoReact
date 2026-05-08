import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/Logo-navbar.png';
import CantiereModal from '../components/CantieriModal'; // <-- Importa la Modale

const API_CANTIERI = "https://localhost:7273/api/cantieri";

export default function GestioneCantieri() {
  const [cantieri, setCantieri] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // STATI PER LA MODALE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCantiereId, setSelectedCantiereId] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem('camo_token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCantieri();
  }, []);

  const fetchCantieri = async () => {
    try {
      const res = await fetch(API_CANTIERI, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.status === 401) {
        localStorage.removeItem('camo_token');
        navigate('/login');
        return;
      }
      const data = await res.json();
      setCantieri(data);
    } catch (err) {
      console.error("Errore fetch cantieri", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('camo_token');
    navigate('/login');
  };

  const deleteCantiere = async (id) => {
    if (!window.confirm("Sicuro di voler eliminare questo cantiere?")) return;
    try {
      await fetch(`${API_CANTIERI}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchCantieri(); // Ricarica la lista
    } catch (err) {
      alert("Errore durante l'eliminazione");
    }
  };

  // Funzioni per aprire la modale
  const openModalForCreate = () => {
    setSelectedCantiereId(null);
    setIsModalOpen(true);
  };

  const openModalForEdit = (id) => {
    setSelectedCantiereId(id);
    setIsModalOpen(true);
  };


  return (
    <div className="min-h-screen bg-[#030508] font-sans text-white relative">
      
      {/* MONTAGGIO MODALE */}
      <CantiereModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        cantiereId={selectedCantiereId} 
        onSuccess={fetchCantieri} 
      />

      <header className="bg-white/5 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-4">
        <Link to="/">
  <img src={logo} alt="CAMO" className="h-8 cursor-pointer" />
</Link>
          <span className="text-gray-400 font-light border-l border-white/20 pl-4">Admin Dashboard</span>
        </div>
        <button onClick={handleLogout} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
          <i className="fa-solid fa-right-from-bracket"></i> Esci
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#e67e22] mb-2">Gestione Cantieri</h1>
            <p className="text-gray-400 font-light">Aggiungi, modifica o rimuovi i lavori dal portfolio.</p>
          </div>
          
          {/* BOTTONE CREA */}
          <button 
            onClick={openModalForCreate} 
            className="bg-[#e67e22] hover:bg-[#cf6d18] text-white px-6 py-3 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(230,126,34,0.3)] flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i> Nuovo Cantiere
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500"><i className="fa-solid fa-spinner fa-spin text-4xl"></i></div>
        ) : cantieri.length === 0 ? (
          <div className="text-center bg-white/5 border border-white/10 rounded-2xl p-12">
            <i className="fa-solid fa-building text-4xl text-gray-600 mb-4"></i>
            <p className="text-gray-400 text-lg">Nessun cantiere presente.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cantieri.map((cantiere) => (
              <motion.div key={cantiere.idCantiere} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group flex flex-col">
                
                <div className="h-48 bg-gray-800 relative overflow-hidden">
                  {cantiere.pathFotoCopertina ? (
                    <img src={`https://localhost:7273${cantiere.pathFotoCopertina}`} alt="Copertina" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600"><i className="fa-solid fa-image text-3xl"></i></div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">{cantiere.descrizioneBreve}</h3>
                  <p className="text-gray-400 text-sm font-light mb-6 line-clamp-3">{cantiere.descrizione}</p>
                  
                  <div className="mt-auto flex justify-end gap-3 border-t border-white/10 pt-4">
                    {/* BOTTONE MODIFICA */}
                    <button 
                      onClick={() => openModalForEdit(cantiere.idCantiere)} 
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#00b4d8] text-white flex items-center justify-center transition-colors" title="Modifica"
                    >
                      <i className="fa-solid fa-pen"></i>
                    </button>
                    
                    <button onClick={() => deleteCantiere(cantiere.idCantiere)} className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 text-white flex items-center justify-center transition-colors" title="Elimina">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}