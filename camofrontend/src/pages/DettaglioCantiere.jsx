import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL = "https://localhost:7273/api/cantieri";

export default function DettaglioCantiere() {
  const { id } = useParams();
  const [cantiere, setCantiere] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDettaglio = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (res.ok) {
          const data = await res.json();
          setCantiere(data);
        }
      } catch (err) {
        console.error("Errore fetch dettaglio cantiere", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDettaglio();
    window.scrollTo(0, 0); // Riporta l'utente in cima alla pagina al caricamento
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <i className="fa-solid fa-spinner fa-spin text-5xl text-[#e67e22]"></i>
      </div>
    );
  }

  if (!cantiere) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center bg-[#030508] text-white pt-32">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Cantiere non trovato</h2>
            <Link to="/cantieri" className="text-[#e67e22] underline">Torna alla lista</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-sans antialiased bg-white min-h-screen flex flex-col">
      <Header />

      {/* HERO IMAGE: Copertina del cantiere a tutto schermo */}
      <section className="relative h-[60vh] md:h-[70vh] w-full bg-[#030508] overflow-hidden pt-24">
        {cantiere.pathFotoCopertina && (
          <img 
            src={`https://localhost:7273${cantiere.pathFotoCopertina}`} 
            alt={cantiere.descrizioneBreve}
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030508] via-transparent to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-10 max-w-7xl mx-auto right-0">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link to="/cantieri" className="text-gray-300 hover:text-white mb-6 inline-flex items-center gap-2 text-sm uppercase tracking-widest font-medium transition-colors">
              <i className="fa-solid fa-arrow-left"></i> Torna ai cantieri
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {cantiere.descrizioneBreve}
            </h1>
            <div className="w-24 h-1.5 bg-[#e67e22]"></div>
          </motion.div>
        </div>
      </section>

      {/* CONTENUTO PRINCIPALE */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
        
        {/* Descrizione */}
        <div className="max-w-4xl">
          <h3 className="text-2xl font-bold text-[#030508] mb-6">Il Progetto</h3>
          <p className="text-gray-600 font-light leading-relaxed text-lg whitespace-pre-line">
            {cantiere.descrizione}
          </p>
        </div>

        {/* GALLERIA FOTO (Visualizzata solo se ci sono foto) */}
        {cantiere.galleria && cantiere.galleria.length > 0 && (
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-[#030508] mb-10 flex items-center gap-4">
              Galleria Lavori <span className="h-px bg-gray-200 flex-grow"></span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cantiere.galleria.map((foto, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl overflow-hidden shadow-md h-64 cursor-pointer group"
                  // Potresti in futuro aggiungere una lightbox (es. react-image-lightbox) sull'onClick
                >
                  <img 
                    src={`https://localhost:7273${foto}`} 
                    alt={`Galleria ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}