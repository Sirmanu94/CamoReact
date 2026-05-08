import { motion } from 'framer-motion';
// Importa Swiper React components e gli stili necessari
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import imgTeam from '../assets/Img-team.png';
import { Link } from 'react-router-dom';

export default function Team() {
  // Lista reale dei dipendenti CAMO
  const teamMembers = [
    { id: 1, nome: "Anna Monaco", ruolo: "Titolare" },
    { id: 2, nome: "Luigi Carrozza", ruolo: "Responsabile Tecnico / Ing." },
    { id: 3, nome: "Giuseppe Zagaria", ruolo: "Responsabile Cantiere" },
    { id: 4, nome: "Carlo Flagiello", ruolo: "Geometra Contabile" },
    { id: 5, nome: "Rossana", ruolo: "Collaboratrice / Resp. Ammin." },
    { id: 6, nome: "Amed", ruolo: "Operaio" },
    { id: 7, nome: "Antonio", ruolo: "Operaio" },
    { id: 8, nome: "Mario", ruolo: "Operaio" },
    { id: 9, nome: "Salvatore", ruolo: "Operaio" },
    { id: 10, nome: "Cipriano", ruolo: "Operaio" },
  ];

  return (
    <section className="bg-white py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">

        {/* ==========================================
            PRIMA RIGA: Testi a SX, Immagine a DX
            ========================================== */}
        <div className="flex flex-col lg:flex-row justify-between items-start relative z-0">

          {/* LATO SINISTRO: Testo "IL TEAM" */}
          <div className="w-full lg:w-1/2 pr-0 lg:pr-10 mb-10 lg:mb-0">
            <motion.h2
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[#e67e22] text-xl md:text-2xl font-bold uppercase tracking-wider mb-4"
            >
              IL TEAM
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="text-gray-500 font-light leading-relaxed text-base md:text-lg max-w-lg"
            >
              Il successo dei nostri progetti è garantito dalla professionalità del team <span className="font-bold text-[#e67e22]">CAMO</span>.
              Aggiornamento costante sulle nuove tecnologie e normative ci permette di offrire
              soluzioni efficienti e innovative, mantenendo sempre alti standard di sicurezza e qualità.
            </motion.p>
          </div>

          {/* LATO DESTRO: "Scopri il team" + Immagine */}
          <div className="w-full lg:w-1/2 flex flex-col items-start lg:items-end">
            
            {/* Titolo Superiore */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex items-center gap-4 mb-6 z-20"
            >
              <Link to='/chi-siamo' className="text-2xl md:text-3xl font-bold text-black">Scopri il team</Link>
              <div className="w-8 h-8 md:w-10 md:h-10 border border-gray-400 rounded-full flex items-center justify-center text-black">
                <Link to='/chi-siamo'><i className="fa-solid fa-arrow-right text-sm"></i></Link>
              </div>
            </motion.div>

            {/* Immagine futuristica posizionata SOTTO "Scopri il team" */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="w-full max-w-[450px] lg:mr-[-30px] z-10"
            >
              <img src={imgTeam} alt="Tecnologia CAMO" className="w-full h-auto object-contain drop-shadow-2xl" />
            </motion.div>
          </div>

        </div>

   {/* ==========================================
            SECONDA RIGA: Carosello Swiper
            ========================================== */}
        {/* Sostituito w-full con lg:w-[65%] per limitare la larghezza su desktop */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="relative z-10 w-full lg:w-[60%] mt-8 lg:mt-[-180px] xl:mt-300px"
        >
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              // Dato che il contenitore ora è più piccolo, mostriamo 2.5 card invece di 3.5 per non schiacciarle
              1024: { slidesPerView: 2.5, spaceBetween: 30 }, 
            }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            className="w-full py-6 cursor-grab active:cursor-grabbing"
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                {/* Stile Card Celesti/Vetro come da Immagine */}
                <div className="bg-gradient-to-br from-[#d4f1f9]/90 to-[#e8f8fc]/90 backdrop-blur-md border border-white rounded-[25px] p-6 shadow-[0_15px_30px_rgba(0,0,0,0.1)] flex flex-col h-[200px] hover:-translate-y-2 transition-transform duration-300">
                  
                  {/* Icona Omino Nera */}
                  <div className="text-black text-3xl mb-auto">
                    <i className="fa-solid fa-user"></i>
                  </div>
                  
                  {/* Testi Anagrafica */}
                  <div>
                    <h4 className="text-lg font-bold text-[#e67e22] leading-tight mb-1 truncate">{member.nome}</h4>
                    <p className="text-black font-medium text-sm truncate">{member.ruolo}</p>
                  </div>
                  
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      </div>
    </section>
  );
}