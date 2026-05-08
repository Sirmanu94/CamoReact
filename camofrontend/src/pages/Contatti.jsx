import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL = "https://localhost:7273/api/contact/invia";

export default function Contatti() {
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
    <div className="font-sans antialiased bg-white min-h-screen flex flex-col">
      <Header />

      {/* HEADER PAGINA - Stile CAMO Dark */}
      <section className="relative pt-40 pb-20 px-6 lg:px-12 bg-[#030508] text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#e67e22]/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-[#00b4d8]/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        >
          <h1 className="font-bold text-5xl md:text-6xl text-[#e67e22] mb-6">Contattaci</h1>
          <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Hai un progetto in mente o hai bisogno di una consulenza? Il nostro team è pronto a supportarti in ogni fase della realizzazione.
          </p>
        </motion.div>
      </section>

      {/* CONTENUTO PRINCIPALE */}
      <main className="flex-grow max-w-7xl mx-auto px-6 lg:px-12 py-20 w-full flex flex-col lg:flex-row gap-16">
        
        {/* LATO SINISTRO: Informazioni di Contatto */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#030508] mb-8">
              I nostri recapiti
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-[#f8f9fa] rounded-full flex items-center justify-center shrink-0 border border-gray-200 group-hover:border-[#e67e22] transition-colors">
                  <i className="fa-solid fa-map-location-dot text-2xl text-[#e67e22]"></i>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#030508] mb-1">Sede Operativa</h4>
                  <p className="text-gray-500 font-light">Via Campana 192<br/>80010 Quarto (NA)</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-[#f8f9fa] rounded-full flex items-center justify-center shrink-0 border border-gray-200 group-hover:border-[#e67e22] transition-colors">
                  <i className="fa-solid fa-phone-volume text-2xl text-[#e67e22]"></i>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#030508] mb-1">Chiamaci</h4>
                  <p className="text-gray-500 font-light leading-relaxed">
                    +39 347 1138404 <br/>
                    +39 081 8768096 <br/>
                    +39 329 3419019
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-[#f8f9fa] rounded-full flex items-center justify-center shrink-0 border border-gray-200 group-hover:border-[#e67e22] transition-colors">
                  <i className="fa-solid fa-envelope-open-text text-2xl text-[#e67e22]"></i>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-[#030508] mb-1">Scrivici</h4>
                  <p className="text-gray-500 font-light break-all">
                    camoingegneriaecostruzionisrl@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* LATO DESTRO: Form di Contatto */}
        <div className="w-full lg:w-7/12 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white p-8 md:p-10 rounded-[30px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 relative z-10"
          >
            <h3 className="text-2xl font-bold text-[#030508] mb-8">Inviaci un messaggio</h3>

            {status === 'success' ? (
              <div className="bg-green-50 border border-green-200 text-green-700 p-8 rounded-2xl text-center">
                <i className="fa-solid fa-circle-check text-5xl mb-4"></i>
                <h3 className="text-2xl font-bold mb-2">Messaggio inviato!</h3>
                <p>Grazie per averci contattato. Ti risponderemo il prima possibile.</p>
                <button onClick={() => setStatus('idle')} className="mt-6 text-[#e67e22] font-medium hover:underline">
                  Invia una nuova richiesta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex flex-col md:flex-row gap-5">
                  <input type="text" name="nome" value={formData.nome} onChange={handleChange} required placeholder="Nome *" 
                    className="w-full md:w-1/2 border-2 border-gray-100 rounded-xl px-5 py-4 focus:outline-none focus:border-[#e67e22] transition-colors text-black bg-[#f8f9fa]" />
                  <input type="text" name="cognome" value={formData.cognome} onChange={handleChange} required placeholder="Cognome *" 
                    className="w-full md:w-1/2 border-2 border-gray-100 rounded-xl px-5 py-4 focus:outline-none focus:border-[#e67e22] transition-colors text-black bg-[#f8f9fa]" />
                </div>
                
                <div className="flex flex-col md:flex-row gap-5">
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Mail *" 
                    className="w-full md:w-1/2 border-2 border-gray-100 rounded-xl px-5 py-4 focus:outline-none focus:border-[#e67e22] transition-colors text-black bg-[#f8f9fa]" />
                  <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Telefono" 
                    className="w-full md:w-1/2 border-2 border-gray-100 rounded-xl px-5 py-4 focus:outline-none focus:border-[#e67e22] transition-colors text-black bg-[#f8f9fa]" />
                </div>
                
                <textarea name="messaggio" value={formData.messaggio} onChange={handleChange} required placeholder="Scrivi qui il tuo messaggio... *" rows="5" 
                  className="w-full border-2 border-gray-100 rounded-[20px] px-5 py-4 focus:outline-none focus:border-[#e67e22] transition-colors resize-none text-black bg-[#f8f9fa]"></textarea>
                
                {status === 'error' && <p className="text-red-500 text-sm font-medium">Si è verificato un errore di connessione. Riprova.</p>}

                <div className="pt-4">
                  <button type="submit" disabled={status === 'loading'} className="w-full bg-[#e67e22] hover:bg-[#cf6d18] text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
                    {status === 'loading' ? (
                      <><i className="fa-solid fa-spinner fa-spin"></i> Invio in corso...</>
                    ) : (
                      <>Invia Messaggio <i className="fa-solid fa-paper-plane"></i></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Decorazione Grafica Sotto al Form */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#00b4d8] rounded-[30px] -z-0 opacity-20 hidden md:block"></div>
        </div>

      </main>

      <Footer />
    </div>
  );
}