import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="font-sans antialiased min-h-screen flex flex-col bg-[#030508]">
      <Header />

      <main className="flex-grow relative flex items-center justify-center overflow-hidden pt-32 pb-20 px-6">
        
        {/* Effetti di luce */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#e67e22] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

        <motion.div
          className="relative z-10 text-center flex flex-col items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.h1
            className="text-[8rem] md:text-[14rem] font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-[#e67e22]"
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            404
          </motion.h1>

          <h2 className="text-2xl md:text-4xl font-medium text-white mt-4 mb-6">
            Cantiere non trovato
          </h2>

          <p className="text-gray-400 text-base md:text-lg max-w-md mx-auto font-light mb-10 leading-relaxed">
            La pagina che stai cercando non esiste o è stata spostata in un altro settore del progetto.
          </p>

          <Link
            to="/"
            className="group relative flex items-center gap-4 bg-[#e67e22] text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#e67e22] transition-all shadow-lg"
          >
            <span>Torna alla Homepage</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}