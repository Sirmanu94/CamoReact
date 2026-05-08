import { useEffect } from 'react';
import logo from '../assets/Logo-navbar.png'; // Assicurati che il percorso dell'immagine sia corretto

export default function Footer() {
  
  // Hook per caricare lo script di Iubenda in modo nativo su React
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iubenda.com/iubenda.js";
    script.async = true;
    document.body.appendChild(script);

    // Pulizia dello script quando il componente viene smontato
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <footer className="bg-[#e9ecef] pt-20 pb-8 px-6 md:px-12 rounded-t-[50px] md:rounded-t-[80px] mt-20">
      
      {/* Contenitore a 4 colonne per Desktop, 1 o 2 su Mobile/Tablet */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-gray-300 pb-12">
        
        {/* ==============================
            Colonna 1: Logo e Descrizione 
            ============================== */}
        <div>
          <img src={logo} alt="Logo CAMO" className="w-48 mb-6" />
          <p className="text-gray-600 font-light text-sm leading-relaxed max-w-xs">
            Soluzioni edili complete e ristrutturazioni, garantite da professionalità e attenzione artigianale.
          </p>
        </div>

        {/* ==============================
            Colonna 2: Contatti 
            ============================== */}
        <div>
          <h4 className="text-[#030508] font-bold text-lg mb-6">Contatti</h4>
          <div className="space-y-5 text-gray-600 font-light text-sm">
            
            <div className="flex items-start gap-4">
              <i className="fas fa-map-marker-alt mt-1 text-[#e67e22] text-lg w-4 text-center"></i>
              <p>Via Campana 192<br/>80010 Quarto (Na)</p>
            </div>
            
            <div className="flex items-start gap-4">
              <i className="fas fa-phone-alt mt-1 text-[#e67e22] text-lg w-4 text-center"></i>
              <p className="leading-loose">
                +39 347 1138404 <br />
                +39 081 8768096 <br />
                +39 329 3419019
              </p>
            </div>

            <div className="flex items-start gap-4">
              <i className="fas fa-envelope mt-1 text-[#e67e22] text-lg w-4 text-center"></i>
              <p className="break-all">camoingegneriaecostruzionisrl@gmail.com</p>
            </div>
            
          </div>
        </div>

        {/* ==============================
            Colonna 3: Social 
            ============================== */}
        <div>
          <h4 className="text-[#030508] font-bold text-lg mb-6">Seguici</h4>
          <div className="space-y-4 text-gray-600 font-light text-sm flex flex-col">
            <a href="#" className="hover:text-[#e67e22] transition-colors flex items-center gap-4 w-max group">
              <i className="fab fa-facebook-f text-lg w-4 text-center group-hover:text-[#e67e22] transition-colors"></i>
              <span>Facebook</span>
            </a>
            <a href="#" className="hover:text-[#e67e22] transition-colors flex items-center gap-4 w-max group">
              <i className="fab fa-instagram text-lg w-4 text-center group-hover:text-[#e67e22] transition-colors"></i>
              <span>Instagram</span>
            </a>
            <a href="#" className="hover:text-[#e67e22] transition-colors flex items-center gap-4 w-max group">
              <i className="fab fa-linkedin-in text-lg w-4 text-center group-hover:text-[#e67e22] transition-colors"></i>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* ==============================
            Colonna 4: Link (Iubenda) 
            ============================== */}
        <div>
          <h4 className="text-[#030508] font-bold text-lg mb-6">Informazioni</h4>
          <div className="space-y-4 text-gray-600 font-light text-sm flex flex-col">
            <a 
              href="https://www.iubenda.com/privacy-policy/60573748" 
              className="iubenda-white no-brand iubenda-noiframe iubenda-embed hover:text-[#e67e22] transition-colors w-max" 
              title="Privacy Policy"
            >
              Privacy Policy
            </a>
            <a 
              href="https://www.iubenda.com/privacy-policy/60573748/cookie-policy" 
              className="iubenda-white no-brand iubenda-noiframe iubenda-embed hover:text-[#e67e22] transition-colors w-max" 
              title="Cookie Policy"
            >
              Cookie Policy
            </a>
          </div>
        </div>

      </div>

      {/* ==============================
          Bottom: Copyright & Credits 
          ============================== */}
      <div className="max-w-7xl mx-auto pt-8 text-center flex flex-col gap-2">
        <p className="text-gray-500 text-xs font-light">
          &copy; 2025 Camo - P.IVA 09157971210 - Tutti i diritti riservati
        </p>
        <p className="text-gray-400 text-[11px] tracking-wide mt-2">
          Developed By <span className="font-medium text-gray-500">081Lab</span>
        </p>
      </div>
      
    </footer>
  );
}