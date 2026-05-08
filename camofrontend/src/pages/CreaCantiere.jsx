import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo-navbar.png';

const API_URL = "https://localhost:7273/api/cantieri"; // URL del backend

export default function CreaCantiere() {
  const navigate = useNavigate();
  const token = localStorage.getItem('camo_token');

  // Stato per i testi
  const [formData, setFormData] = useState({
    descrizioneBreve: '',
    descrizione: ''
  });

  // Stato per i file
  const [copertina, setCopertina] = useState(null);
  const [galleria, setGalleria] = useState([]);
  
  const [status, setStatus] = useState('idle');

  // Se non c'è il token, rimanda al login
  if (!token) {
    navigate('/login');
    return null;
  }

  const handleTextChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Essendo un invio con file (immagini), NON usiamo JSON ma FormData!
    const dataToSend = new FormData();
    dataToSend.append('DescrizioneBreve', formData.descrizioneBreve);
    dataToSend.append('Descrizione', formData.descrizione);
    
    if (copertina) {
      dataToSend.append('FotoCopertina', copertina);
    }
    
    if (galleria.length > 0) {
      for (let i = 0; i < galleria.length; i++) {
        dataToSend.append('GalleriaFoto', galleria[i]);
      }
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // NON mettere 'Content-Type': 'application/json', ci pensa il browser con FormData
        },
        body: dataToSend
      });

      if (res.ok) {
        setStatus('success');
        setTimeout(() => navigate('/admin/cantieri'), 1500); // Torna alla lista dopo 1.5 secondi
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#030508] font-sans text-white">
      {/* NAVBAR ADMIN SIMPLIFICATA */}
      <header className="bg-white/5 backdrop-blur-md border-b border-white/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <img src={logo} alt="CAMO" className="h-8" />
          <span className="text-gray-400 font-light border-l border-white/20 pl-4">Nuovo Cantiere</span>
        </div>
        <button onClick={() => navigate('/admin/cantieri')} className="text-gray-400 hover:text-white transition-colors">
          <i className="fa-solid fa-xmark text-xl"></i> Annulla
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-[#e67e22] mb-8">Aggiungi nuovo cantiere</h1>

        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 rounded-2xl space-y-6">
          
          {/* Testi */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Titolo / Descrizione Breve</label>
            <input 
              type="text" name="descrizioneBreve" required value={formData.descrizioneBreve} onChange={handleTextChange}
              className="w-full bg-[#030508]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e67e22]" 
              placeholder="Es. Ristrutturazione Villa Napoli" 
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2 font-medium">Descrizione Completa</label>
            <textarea 
              name="descrizione" rows="5" value={formData.descrizione} onChange={handleTextChange}
              className="w-full bg-[#030508]/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e67e22] resize-none" 
              placeholder="Dettagli del lavoro eseguito..." 
            ></textarea>
          </div>

          <hr className="border-white/10 my-6" />

          {/* Immagini */}
          <div>
            <label className="block text-gray-300 mb-2 font-medium">Foto di Copertina (1 immagine)</label>
            <input 
              type="file" accept="image/*" 
              onChange={(e) => setCopertina(e.target.files[0])}
              className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#e67e22] file:text-white hover:file:bg-[#cf6d18] transition-colors"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2 font-medium mt-6">Galleria Foto (più immagini)</label>
            <input 
              type="file" accept="image/*" multiple 
              onChange={(e) => setGalleria(e.target.files)}
              className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#00b4d8] file:text-white hover:file:bg-[#0096b4] transition-colors"
            />
          </div>

          {status === 'error' && <p className="text-red-500 mt-4">Errore durante il salvataggio. Riprova.</p>}
          {status === 'success' && <p className="text-green-500 mt-4">Cantiere salvato con successo! Ritorno alla lista...</p>}

          <div className="pt-6 flex justify-end">
            <button 
              type="submit" disabled={status === 'loading'}
              className="bg-[#e67e22] hover:bg-[#cf6d18] text-white px-8 py-3 rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {status === 'loading' ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-save"></i>}
              {status === 'loading' ? 'Salvataggio...' : 'Salva Cantiere'}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}