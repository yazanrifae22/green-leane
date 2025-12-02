import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Menu, X, Globe } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import logo from '../src/assets/logo.jpg';

// === LOGO COMPONENT - Unchanged except for RTL text handling ===
const Logo = ({ isDark = false }: { isDark?: boolean }) => {
  const { t } = useTranslation();
  
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-full">
        <img 
          src={logo} 
          alt="Green Lane Logo" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center leading-none">
        <span className={`text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-brand-800'}`}>
          {t('common.green')}
        </span>
        <span className={`text-2xl font-black tracking-tight ${isDark ? 'text-brand-400' : 'text-brand-600'}`}>
          {t('common.lane')}
        </span>
      </div>
    </div>
  );
};

// === LANGUAGE SWITCHER COMPONENT - New component for toggling languages ===
const LanguageSwitcher = ({ isScrolled }: { isScrolled: boolean }) => {
  const { language, toggleLanguage, isRTL } = useLanguage();
  
  return (
    <motion.button
      onClick={toggleLanguage}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold transition-all ${
        isScrolled 
          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' 
          : 'bg-white/10 text-white hover:bg-white/20'
      }`}
      title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
    >
      <Globe size={16} />
      <span>{language === 'en' ? 'عربي' : 'EN'}</span>
    </motion.button>
  );
};

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Scroll Spy to determine active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -30% 0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'services', 'quote', 'footer'];
    
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // === NAVIGATION LINKS - Updated with i18n ===
  const navLinks = [
    { label: t('nav.home'), id: '#home', sectionId: 'home' },
    { label: t('nav.services'), id: '#services', sectionId: 'services' },
    { label: t('nav.about'), id: '#footer', sectionId: 'footer' },
  ];

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div 
          className={`
            w-full max-w-6xl rounded-full transition-all duration-500 ease-in-out flex items-center justify-between px-8 py-3
            ${isScrolled ? 'glass-pill shadow-2xl bg-white/95 text-slate-900' : 'bg-transparent text-white'}
          `}
          layout
        >
          {/* Logo */}
          <div onClick={() => scrollToSection('#home')}>
            <Logo isDark={!isScrolled} />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
              
              let activeClass = "";
              
              if (isActive) {
                if (isScrolled) {
                  activeClass = "bg-brand-500 text-white shadow-md shadow-brand-500/20";
                } else {
                  activeClass = "bg-white/20 backdrop-blur-md text-white";
                }
              } else {
                if (isScrolled) {
                  activeClass = "hover:bg-slate-100 text-slate-600";
                } else {
                  activeClass = "hover:bg-white/10 text-white/80 hover:text-white";
                }
              }

              return (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.id)}
                  className={`
                    relative px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 group overflow-hidden
                    ${activeClass}
                  `}
                >
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
            
            {/* === LANGUAGE SWITCHER - Added for i18n === */}
            <LanguageSwitcher isScrolled={isScrolled} />
            
            <motion.button
              onClick={() => scrollToSection('#quote')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg transition-colors ${
                isRTL ? 'mr-4' : 'ml-4'
              } ${
                activeSection === 'quote' && !isScrolled 
                ? 'bg-white text-brand-600' 
                : 'bg-brand-500 text-white hover:bg-brand-600 shadow-brand-500/20'
              }`}
            >
              {t('common.getQuote')} 
              <ArrowUpRight size={16} className={isRTL ? 'rotate-[270deg]' : ''} />
            </motion.button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden p-2 rounded-full ${isScrolled ? 'bg-slate-100 text-slate-900' : 'bg-white/10 text-white'} backdrop-blur-md`}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </motion.div>
      </motion.header>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center text-center"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`absolute top-8 ${isRTL ? 'left-8' : 'right-8'} p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors`}
            >
              <X size={32} />
            </button>

            {/* Logo in Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`absolute top-8 ${isRTL ? 'right-8' : 'left-8'} flex items-center gap-3`}
            >
              <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-brand-500/50">
                <img 
                  src={logo} 
                  alt="Green Lane Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center leading-none">
                <span className="text-xl font-black tracking-tight text-white">{t('common.green')}</span>
                <span className="text-xl font-black tracking-tight text-brand-400">{t('common.lane')}</span>
              </div>
            </motion.div>

            {/* === MOBILE LANGUAGE SWITCHER === */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-24 left-1/2 -translate-x-1/2"
            >
              <LanguageSwitcher isScrolled={false} />
            </motion.div>

            <motion.nav className="flex flex-col gap-8">
              {navLinks.concat({ label: t('common.requestQuote'), id: '#quote', sectionId: 'quote' }).map((link, idx) => (
                <motion.button
                  key={link.label}
                  onClick={() => scrollToSection(link.id)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={`text-4xl md:text-5xl font-bold transition-colors ${activeSection === link.sectionId ? 'text-brand-500' : 'text-white hover:text-brand-500'}`}
                >
                  {link.label}
                </motion.button>
              ))}
            </motion.nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 text-slate-500 text-sm"
            >
              {t('common.locations')}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
