import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChiSiamo from './pages/ChiSiamo';
import Login from './pages/Login';
import GestioneCantieri from './pages/GestioneCantieri'; // IMPORTANTE
import NotFound from './pages/NotFound';
import CreaCantiere from './pages/CreaCantiere';
import Cantieri from './pages/Cantieri';
import DettaglioCantiere from './pages/DettaglioCantiere';
import Contatti from './pages/Contatti';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chi-siamo" element={<ChiSiamo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cantieri" element={<Cantieri />} />
                <Route path="/contatti" element={<Contatti />} />

        <Route path="/cantieri/:id" element={<DettaglioCantiere />} />

        {/* Rotta Protetta Area Admin */}

        <Route path="*" element={<NotFound />} />
        <Route path="/admin/cantieri" element={<GestioneCantieri />} /> {/* AGGIUNGI QUESTO */}
      </Routes>
    </Router>
  );
}

export default App;