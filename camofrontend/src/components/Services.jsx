import { motion } from 'framer-motion';
import ristrutturazioni from '../assets/Ristrutturazioni.png';
import bonus from '../assets/Bonus.png';
import cantieri from '../assets/Cantieri.png';
import sfondoServizi from '../assets/Sfondo-servizi.png';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Services() {
  const servizi = [
    { id: 1, titolo: "Ristrutturazioni", img: ristrutturazioni, redirectEnambled: false },
    { id: 2, titolo: "Bonus 110%", img: bonus, redirectEnambled: false  },
    { id: 3, titolo: "Sviluppo Cantieri", img: cantieri,redirectEnambled: true,  redirect: "/cantieri" }
  ];
const navigate = useNavigate();
  return (
    <section id="services"
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${sfondoServizi})` }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Titolo Sezione */}
        <motion.h2 
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-[#00b4d8] mb-12"
        >
          Come ti <br/> supportiamo?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {servizi.map((s, index) => (
            <motion.div 
              key={s.id}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}
              className="bg-[#050a11] p-6 rounded-[35px] border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col group relative overflow-hidden min-h-[300px]"
            >
              {/* Glow Arancione CSS nell'angolo in basso a sinistra */}
              <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-[#e67e22] opacity-60 blur-[60px] rounded-full pointer-events-none z-0 transition-opacity duration-500 group-hover:opacity-80"></div>

              {/* PARTE SUPERIORE: Immagine e Testo affiancati */}
              <div className="flex gap-4 relative z-10">
                {/* Immagine con Scanlines bianche */}
                <div className="w-[110px] h-[110px] md:w-[130px] md:h-[130px] shrink-0 rounded-[25px] overflow-hidden relative border border-white/10">
                  <img src={s.img} alt={s.titolo} className="w-full h-full object-cover" />
                  {/* Overlay righe orizzontali CSS */}
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_2px,rgba(255,255,255,0.35)_2px,rgba(255,255,255,0.35)_3px)] pointer-events-none mix-blend-overlay"></div>
                </div>
                
                {/* Testo piccolo descrittivo */}
                <p className="text-gray-400 text-[10px] md:text-xs font-light leading-snug">
                  Un servizio completo e personalizzato per trasformare ogni spazio abitativo o commerciale in un ambiente funzionale, moderno e sicuro. Dalla progettazione iniziale alla realizzazione finale garantiamo tempi e costi certi, per lavori a regola d'arte.
                </p>
              </div>

              {/* PARTE INFERIORE: Titolo e Freccia */}
              <div className="mt-auto flex justify-between items-end relative z-10 pt-8" onClick={()=> {if(s.redirectEnambled && s.redirect){navigate(s.redirect)}}}>
                <h3 className="text-white font-bold text-xl md:text-2xl">{s.titolo}</h3>
                <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white group-hover:border-white transition-colors cursor-pointer">
                  <i className="fa-solid fa-arrow-right text-xs"></i>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}