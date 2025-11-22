import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { LeadForm } from './components/LeadForm';
import { Footer } from './components/Footer';
import { ServiceType } from './types';

function App() {
  const [selectedService, setSelectedService] = useState<ServiceType | ''>('');

  const handleServiceSelect = (service: ServiceType) => {
    setSelectedService(service);
    const element = document.getElementById('quote');
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Header />
      <main>
        <Hero />
        <Services onSelectService={handleServiceSelect} />
        <LeadForm selectedService={selectedService} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
