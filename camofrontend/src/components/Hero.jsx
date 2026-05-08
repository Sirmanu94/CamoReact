import { motion } from 'framer-motion';

// Sostituisci questi con i 3 PNG separati che ti manderà il grafico
import edif1 from '../assets/schizzo1.png'; 
import edif2 from '../assets/schizzo2.png';
import edif3 from '../assets/schizzo3.png';
import miniatura from '../assets/miniatura.png';


export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#030508] overflow-hidden flex flex-col pt-24 pb-32">
      
      {/* Background Griglia Prospettica e Luci */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Griglia che sfuma verso l'alto */}
        <div className="absolute w-[200%] h-[100%] bottom-[-20%] left-[-50%] 
             bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] 
             bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] 
             [mask-image:linear-gradient(to_top,black,transparent_80%)]"></div>
        
        {/* Glow arancione a sinistra e azzurro a destra */}
        <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] bg-[#e67e22]/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] bg-[#00b4d8]/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between grow">
        
        {/* LATO SINISTRO: Testo */}
        <div className="w-full lg:w-5/12 text-center lg:text-left mt-10 lg:mt-0">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            <span className="text-[#e67e22]">Solidità</span> e <span className="text-[#e67e22]">innovazione</span><br/>
            per costruire il tuo futuro.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 mt-6 text-lg max-w-md mx-auto lg:mx-0 font-light"
          >
            La tradizione ci lega alle solide tecniche costruttive del passato, l'innovazione ci spinge a esplorare nuovi materiali e tecnologie.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 border border-[#e67e22] text-white rounded-full px-8 py-3 text-sm tracking-widest hover:bg-[#e67e22] transition-all flex items-center gap-3 mx-auto lg:mx-0"
          >
   <div className="w-4 h-6">
  <img src={miniatura} className='w-full h-full' />
</div>
            scopri di più
          </motion.button>
        </div>

        {/* LATO DESTRO: I 3 Edifici Animati */}
        <div className="w-full lg:w-7/12 h-[300px] sm:h-[400px] lg:h-[500px] relative flex items-center justify-center mt-12 lg:mt-0">
          {[edif1, edif2, edif3].map((img, i) => (
            <motion.img 
              key={i} src={img} alt={`Evoluzione Progetto ${i}`}
              className="absolute w-[40%] md:w-[35%] object-contain drop-shadow-2xl"
              style={{ left: `${i * 30}%`, zIndex: 10 - i }} // Sfalsati in orizzontale
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ 
                opacity: 1, y: [0, -10, 0], scale: 1 
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.5 + (i * 0.3) },
                y: { repeat: Infinity, duration: 4, delay: i * 0.5, ease: "easeInOut" } // Fluttuano indipendentemente
              }}
            />
          ))}
        </div>
      </div>

      {/* BANNER INFERIORE: I Nostri Valori */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-0 md:-bottom-10 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-30 bg-gradient-to-r from-[#0a1e3f] via-[#041124] to-black border border-white/10 rounded-[30px] p-8 md:p-12 flex flex-col md:flex-row items-center shadow-2xl"
      >
        <div className="flex gap-8 border-b md:border-b-0 md:border-r border-white/20 pb-6 md:pb-0 md:pr-10 w-full md:w-auto justify-center">
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-light text-[#00b4d8]">+20</h3>
            <p className="text-xs text-gray-400 uppercase mt-1">Anni di esperienza</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl md:text-5xl font-light text-[#00b4d8]">+20</h3>
            <p className="text-xs text-gray-400 uppercase mt-1">Anni di esperienza</p>
          </div>
        </div>
        <div className="mt-6 md:mt-0 md:pl-10 text-center md:text-left flex-1">
          <h4 className="text-[#e67e22] text-xl font-medium mb-2">I nostri valori</h4>
          <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed">
            Siamo convinti che il futuro dell'edilizia risieda nell'equilibrio tra tradizione e innovazione. Creiamo opere solide, durevoli, sostenibili.
          </p>
        </div>
      </motion.div>
    </section>
  );
}