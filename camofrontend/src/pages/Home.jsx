import Header from '../components/Header';
import Hero from '../components/Hero';
import Team from '../components/Team';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="font-sans antialiased bg-[#030508] min-h-screen">
      <Header />
      <main>
        <Hero />
        <Team />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}