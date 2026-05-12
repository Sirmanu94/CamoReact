import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const API_URL = "https://admin.camocostruzioni.it/api/cantieri";

export default function CantiereModal({ isOpen, onClose, cantiereId, onSuccess }) {
  const token = localStorage.getItem('camo_token');

  // Stati del form
  const [formData, setFormData] = useState({ descrizioneBreve: '', descrizione: '' });
  const [copertinaAttuale, setCopertinaAttuale] = useState(null);
  
  // File da inviare
  const [fotoCopertina, setFotoCopertina] = useState(null);
  const [galleriaFoto, setGalleriaFoto] = useState([]);
  
  const [status, setStatus] = useState('idle'); // idle, loading_data, saving, error

  // Se la modale si apre e c'è un ID, carica i dati per la modifica
  useEffect(() => {
    if (isOpen && cantiereId) {
      fetchCantiereData(cantiereId);
    } else {
      // Reset se è un nuovo inserimento
      setFormData({ descrizioneBreve: '', descrizione: '' });
      setCopertinaAttuale(null);
      setFotoCopertina(null);
      setGalleriaFoto([]);
      setStatus('idle');
    }
  }, [isOpen, cantiereId]);

  const fetchCantiereData = async (id) => {
    setStatus('loading_data');
    try {
      const res = await fetch(`${API_URL}/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        const data = await res.json();
        setFormData({ descrizioneBreve: data.descrizioneBreve || '', descrizione: data.descrizione || '' });
        setCopertinaAttuale(data.pathFotoCopertina);
        setStatus('idle');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('saving');

    const dataToSend = new FormData();
    dataToSend.append('DescrizioneBreve', formData.descrizioneBreve);
    dataToSend.append('Descrizione', formData.descrizione);
    
    // Se è MODIFICA il DTO aspetta "NuovaFotoCopertina", se è CREA aspetta "FotoCopertina"
    if (fotoCopertina) {
      dataToSend.append(cantiereId ? 'NuovaFotoCopertina' : 'FotoCopertina', fotoCopertina);
    }
    
    if (galleriaFoto.length > 0) {
      for (let i = 0; i < galleriaFoto.length; i++) {
        dataToSend.append(cantiereId ? 'NuoveFotoGalleria' : 'GalleriaFoto', galleriaFoto[i]);
      }
    }

    const url = cantiereId ? `${API_URL}/${cantiereId}` : API_URL;
    const method = cantiereId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: dataToSend
      });

      if (res.ok) {
        onSuccess(); // Chiama la funzione per aggiornare la lista nella pagina principale
        onClose();   // Chiude la modale
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#0a0f16] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
        >
          {/* Header Modale */}
          <div className="flex justify-between items-center p-6 border-b border-white/10 sticky top-0 bg-[#0a0f16] z-10">
            <h2 className="text-2xl font-bold text-[#e67e22]">
              {cantiereId ? 'Modifica Cantiere' : 'Nuovo Cantiere'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <i className="fa-solid fa-xmark text-2xl"></i>
            </button>
          </div>

          {/* Body Modale */}
          <div className="p-6">
            {status === 'loading_data' ? (
              <div className="text-center py-10"><i className="fa-solid fa-spinner fa-spin text-3xl text-[#e67e22]"></i></div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Titolo / Descrizione Breve</label>
                  <input type="text" required value={formData.descrizioneBreve} onChange={e => setFormData({...formData, descrizioneBreve: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e67e22]" />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Descrizione Completa</label>
                  <textarea rows="4" value={formData.descrizione} onChange={e => setFormData({...formData, descrizione: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#e67e22] resize-none"></textarea>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <label className="block text-gray-300 mb-2 text-sm font-medium">Foto di Copertina</label>
                  {cantiereId && copertinaAttuale && (
                    <div className="mb-3">
                      <img src={`https://admin.camocostruzioni.it/${copertinaAttuale}`} alt="Copertina" className="h-20 rounded object-cover border border-white/20" />
                      <p className="text-xs text-gray-500 mt-1">Seleziona un file qui sotto per sovrascriverla.</p>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={(e) => setFotoCopertina(e.target.files[0])}
                    className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#e67e22] file:text-white hover:file:bg-[#cf6d18] transition-colors" />
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <label className="block text-gray-300 mb-2 text-sm font-medium">{cantiereId ? 'Aggiungi foto alla Galleria' : 'Galleria Foto'}</label>
                  <input type="file" accept="image/*" multiple onChange={(e) => setGalleriaFoto(e.target.files)}
                    className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#00b4d8] file:text-white hover:file:bg-[#0096b4] transition-colors" />
                </div>

                {status === 'error' && <p className="text-red-500 text-sm">Errore di salvataggio.</p>}

                <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
                  <button type="button" onClick={onClose} className="px-6 py-2 rounded-xl text-gray-400 hover:text-white transition-colors">
                    Annulla
                  </button>
                  <button type="submit" disabled={status === 'saving'} className="bg-[#e67e22] hover:bg-[#cf6d18] text-white px-8 py-2 rounded-xl font-medium transition-all flex items-center gap-2 disabled:opacity-50">
                    {status === 'saving' ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-save"></i>}
                    Salva
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}