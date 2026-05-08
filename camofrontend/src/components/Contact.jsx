import { useState } from 'react';
import { motion } from 'framer-motion';
import logocontatti from '../assets/logograndecontatti.png';
import imgContatti from '../assets/img-contatti.png';

const API_URL = "https://localhost:7273/api/contact/invia";

export default function Contact() {
  const [formData, setFormData] = useState({
    nome: '', cognome: '', email: '', telefono: '', messaggio: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Errore durante l\'invio');
      setStatus('success');
      setFormData({ nome: '', cognome: '', email: '', telefono: '', messaggio: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section className="bg-white relative overflow-hidden py-16 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
        
        {/* LATO SINISTRO: Immagine */}
        <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className="w-full lg:w-[38%] h-[500px] md:h-[650px] rounded-[40px] overflow-hidden shadow-2xl relative z-20">
          <img src={imgContatti} alt="Edificio CAMO" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </motion.div>

        {/* LATO DESTRO: Form */}
        <div className="w-full lg:w-[62%] relative flex flex-col justify-center mt-12 lg:mt-0 lg:pl-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative z-10 w-full max-w-md md:max-w-lg mx-auto lg:mx-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#e67e22] mb-8 lg:mb-10 tracking-tight">
              Richiedi info.
            </h2>

            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-2xl text-center">
                <i className="fa-solid fa-check-circle text-4xl mb-4"></i>
                <h3 className="text-xl font-bold mb-2">Messaggio inviato!</h3>
                <p>Ti risponderemo il prima possibile.</p>
                <button onClick={() => setStatus('idle')} className="mt-4 text-[#e67e22] underline">Invia un altro messaggio</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                  <input type="text" name="nome" value={formData.nome} onChange={handleChange} required placeholder="Nome *" className="w-1/2 border-2 border-gray-200 rounded-full px-6 py-4 focus:outline-none focus:border-[#e67e22] transition-colors text-black" />
                  <input type="text" name="cognome" value={formData.cognome} onChange={handleChange} required placeholder="Cognome *" className="w-1/2 border-2 border-gray-200 rounded-full px-6 py-4 focus:outline-none focus:border-[#e67e22] transition-colors text-black" />
                </div>
                <div className="flex gap-4">
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Mail *" className="w-1/2 border-2 border-gray-200 rounded-full px-6 py-4 focus:outline-none focus:border-[#e67e22] transition-colors text-black" />
                  <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Telefono" className="w-1/2 border-2 border-gray-200 rounded-full px-6 py-4 focus:outline-none focus:border-[#e67e22] transition-colors text-black" />
                </div>
                <textarea name="messaggio" value={formData.messaggio} onChange={handleChange} required placeholder="Messaggio *" rows="4" className="w-full border-2 border-gray-200 rounded-[25px] px-6 py-4 focus:outline-none focus:border-[#e67e22] transition-colors resize-none text-black"></textarea>
                
                {status === 'error' && <p className="text-red-500 text-sm">Errore di connessione. Riprova.</p>}

                <div className="flex justify-end pt-2">
                  <button type="submit" disabled={status === 'loading'} className="group flex items-center gap-4 text-black font-medium hover:text-[#e67e22] transition-colors disabled:opacity-50">
                    <span className="tracking-wide">{status === 'loading' ? 'Invio in corso...' : 'raccontaci il tuo progetto'}</span>
                    <div className="w-12 h-12 border border-black rounded-full flex items-center justify-center group-hover:border-[#e67e22] transition-colors">
                      <i className={`fa-solid ${status === 'loading' ? 'fa-spinner fa-spin' : 'fa-arrow-right'} group-hover:translate-x-1 transition-transform`}></i>
                    </div>
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* LOGO CAMO A DESTRA */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="absolute z-0 pointer-events-none w-[200px] md:w-[250px] lg:w-[320px] right-[-20px] md:right-0 lg:right-[-30px] bottom-[-60px] md:top-1/2 md:-translate-y-1/2 lg:translate-y-0 lg:top-[50px] opacity-80 lg:opacity-100">
            <img src={logocontatti} alt="Marchio CAMO" className="w-full h-auto object-contain" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}