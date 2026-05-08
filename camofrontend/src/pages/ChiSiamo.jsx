import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

import imgChiSiamo from '../assets/schizzo3.png'; 

export default function ChiSiamo() {
  const teamCompleto = [
    { id: 1, nome: "Anna Monaco", ruolo: "Titolare", categoria: "Direzione" },
    { id: 2, nome: "Luigi Carrozza", ruolo: "Responsabile Tecnico / Ing.", categoria: "Direzione" },
    { id: 3, nome: "Giuseppe Zagaria", ruolo: "Responsabile Cantiere", categoria: "Staff" },
    { id: 4, nome: "Carlo Flagiello", ruolo: "Geometra Contabile", categoria: "Staff" },
    { id: 5, nome: "Rossana", ruolo: "Collaboratrice / Resp. Ammin.", categoria: "Staff" },
    { id: 6, nome: "Amed", ruolo: "Operaio", categoria: "Operativo" },
    { id: 7, nome: "Antonio", ruolo: "Operaio", categoria: "Operativo" },
    { id: 8, nome: "Mario", ruolo: "Operaio", categoria: "Operativo" },
    { id: 9, nome: "Salvatore", ruolo: "Operaio", categoria: "Operativo" },
    { id: 10, nome: "Cipriano", ruolo: "Operaio", categoria: "Operativo" },
  ];

  return (
    <div className="font-sans antialiased bg-white min-h-screen flex flex-col">
      <Header />

      {/* HEADER PAGINA */}
      <section className="relative pt-40 pb-20 px-6 lg:px-12 bg-[#030508] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#e67e22]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
          <h1 className="font-bold text-5xl md:text-6xl text-[#e67e22] mb-6">Chi Siamo</h1>
          <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Un team di professionisti uniti dalla passione per l'ingegneria e l'architettura. Costruiamo il futuro con basi solide.
          </p>
        </motion.div>
      </section>

      {/* SEZIONE TESTO E IMMAGINE */}
      <section className="py-20 md:py-32 relative z-40">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="w-full md:w-[60%] z-20">
            <motion.h2 className="text-3xl md:text-4xl lg:text-5xl leading-snug font-light text-[#030508]">
              <span className="text-[#e67e22] font-bold">CAMO</span> è una società di <br className="hidden lg:block"/>
              <span className="font-semibold italic">ingegneria e costruzioni specializzata nella progettazione ed esecuzione di lavori pubblici e privati.</span>
            </motion.h2>
            <motion.p className="mt-8 text-gray-500 font-light text-lg md:text-xl leading-relaxed">
              Sul campo, abbiamo maturato una profonda competenza nella progettazione architettonica, strutturale, infrastrutturale e impiantistica. Il nostro team di professionisti è in grado di affrontare con successo le sfide tecniche e gestionali, offrendo soluzioni tradizionali e innovative.
            </motion.p>
          </div>

          <div className="w-full md:w-[40%] relative flex justify-center">
            <motion.img 
              src={imgChiSiamo} 
              className="w-full max-w-[500px] h-auto drop-shadow-2xl z-10 rounded-[30px] object-cover"
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#e67e22] rounded-[20px] -z-10 hidden md:block"></div>
          </div>
        </div>
      </section>

      {/* SEZIONE TEAM COMPLETO (Grid) */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#030508] mb-4">Il Nostro Capitale Umano</h2>
            <div className="w-20 h-1 bg-[#e67e22] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamCompleto.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-[25px] shadow-md border-t-4 border-[#e67e22] hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-[#030508] rounded-2xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform">
                  <i className="fa-solid fa-user-tie"></i>
                </div>
                <h4 className="text-xl font-bold text-[#030508] mb-1">{member.nome}</h4>
                <p className="text-[#e67e22] font-medium text-sm uppercase tracking-wide">{member.ruolo}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}