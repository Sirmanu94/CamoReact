import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_CANTIERI = "https://localhost:7273/api/cantieri";

export default function Cantieri() {
  const [cantieri, setCantieri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCantieri = async () => {
      try {
        const res = await fetch(API_CANTIERI);
        if (res.ok) {
          const data = await res.json();
          setCantieri(data);
        }
      } catch (err) {
        console.error("Errore fetch cantieri", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCantieri();
  }, []);

  return (
    <div className="font-sans antialiased bg-[#f8f9fa] min-h-screen flex flex-col">
      <Header />

      {/* HEADER PAGINA - Stile CAMO Dark */}
      <section className="relative pt-40 pb-20 px-6 lg:px-12 bg-[#030508] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#e67e22]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#00b4d8]/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
          <h1 className="font-bold text-5xl md:text-6xl text-[#e67e22] mb-6">I Nostri Cantieri</h1>
          <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Scopri le opere realizzate dal nostro team. Dalla progettazione all'esecuzione, garantiamo risultati d'eccellenza.
          </p>
        </motion.div>
      </section>

      {/* GRIGLIA CANTIERI */}
      <main className="flex-grow max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full">
        {loading ? (
          <div className="flex justify-center py-20">
            <i className="fa-solid fa-spinner fa-spin text-4xl text-[#e67e22]"></i>
          </div>
        ) : cantieri.length === 0 ? (
          <div className="text-center py-20">
            <i className="fa-solid fa-person-digging text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-2xl text-gray-500 font-light">Nessun cantiere caricato al momento.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cantieri.map((cantiere, index) => (
              <motion.div 
                key={cantiere.idCantiere}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[30px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 group flex flex-col hover:-translate-y-2 transition-transform duration-300"
              >
                {/* Immagine Copertina */}
                <Link to={`/cantieri/${cantiere.idCantiere}`} className="h-64 relative overflow-hidden block">
                  {cantiere.pathFotoCopertina ? (
                    <img 
                      src={`https://localhost:7273${cantiere.pathFotoCopertina}`} 
                      alt={cantiere.descrizioneBreve} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      <i className="fa-solid fa-image text-4xl"></i>
                    </div>
                  )}
                  {/* Overlay Gradiente per rendere il testo leggibile se servisse */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                {/* Contenuto Testuale */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-[#030508] mb-3 line-clamp-2">
                    {cantiere.descrizioneBreve}
                  </h3>
                  <p className="text-gray-500 font-light text-sm mb-6 line-clamp-3">
                    {cantiere.descrizione}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <Link 
                      to={`/cantieri/${cantiere.idCantiere}`}
                      className="text-[#e67e22] font-medium flex items-center gap-2 hover:text-[#030508] transition-colors w-max"
                    >
                      Scopri di più <i className="fa-solid fa-arrow-right text-sm mt-0.5"></i>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}