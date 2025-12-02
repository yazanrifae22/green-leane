import { useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { LeadForm } from './components/LeadForm'
import { ServiceModal } from './components/ServiceModal'
import { Services } from './components/Services'
import { ServiceType } from './types'

function App() {
  const [selectedService, setSelectedService] = useState<ServiceType | ''>('')
  const [modalService, setModalService] = useState<ServiceType | null>(null)

  const handleServiceSelect = (service: ServiceType) => {
    // Open the service modal
    setModalService(service)
  }

  const handleGetQuote = (service: ServiceType) => {
    setSelectedService(service)
    // Scroll to quote form
    setTimeout(() => {
      const element = document.getElementById('quote')
      if (element) {
        const headerOffset = 100
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }, 100)
  }

  const handleCloseModal = () => {
    setModalService(null)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Header />
      <main>
        <Hero />
        <Services onSelectService={handleServiceSelect} />
        <LeadForm selectedService={selectedService} />
      </main>
      <Footer />

      {/* Service Detail Modal */}
      <ServiceModal service={modalService} onClose={handleCloseModal} onGetQuote={handleGetQuote} />
    </div>
  )
}

export default App
