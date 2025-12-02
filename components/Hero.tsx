import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Plane, Ship, Truck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';

// Import hero images
import hero1 from '../src/assets/hero/hero_1.png';
import hero2 from '../src/assets/hero/hero_2.png';
import hero3 from '../src/assets/hero/hero_3.png';
import hero4 from '../src/assets/hero/hero_4.png';

// === HERO SLIDES DATA - Uses i18n keys ===
const heroImages = [hero1, hero2, hero3, hero4];

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // === HERO SLIDES - Dynamically translated ===
  const heroSlides = [
    {
      image: heroImages[0],
      title: t('hero.slides.slide1.title'),
      highlight: t('hero.slides.slide1.highlight'),
      subtitle: t('hero.slides.slide1.subtitle'),
      description: t('hero.slides.slide1.description'),
    },
    {
      image: heroImages[1],
      title: t('hero.slides.slide2.title'),
      highlight: t('hero.slides.slide2.highlight'),
      subtitle: t('hero.slides.slide2.subtitle'),
      description: t('hero.slides.slide2.description'),
    },
    {
      image: heroImages[2],
      title: t('hero.slides.slide3.title'),
      highlight: t('hero.slides.slide3.highlight'),
      subtitle: t('hero.slides.slide3.subtitle'),
      description: t('hero.slides.slide3.description'),
    },
    {
      image: heroImages[3],
      title: t('hero.slides.slide4.title'),
      highlight: t('hero.slides.slide4.highlight'),
      subtitle: t('hero.slides.slide4.subtitle'),
      description: t('hero.slides.slide4.description'),
    },
  ];

  // === SERVICE ICONS DATA - Translated ===
  const serviceIcons = [
    { icon: Plane, label: t('services.airFreight.title'), delay: 0 },
    { icon: Ship, label: t('services.seaFreight.title'), delay: 0.1 },
    { icon: Truck, label: t('services.landFreight.title'), delay: 0.2 },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const scrollToQuote = () => {
    const element = document.getElementById('quote');
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${heroSlides[currentSlide].image})`,
              }}
            >
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 1.08 }}
                transition={{ duration: 8, ease: "linear" }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url(${heroSlides[currentSlide].image})`,
                }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Overlay Gradients - RTL aware */}
        <div className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-slate-950/90 via-slate-950/60 to-transparent`} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-12 pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="max-w-2xl">
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-400 text-xs font-bold tracking-wider mb-6 md:mb-8 backdrop-blur-sm"
              >
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
                {t('hero.badge')}
              </motion.div>

              {/* Animated Title */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-6 md:mb-8">
                    {heroSlides[currentSlide].title} <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-500 to-brand-accent">
                      {heroSlides[currentSlide].highlight}
                    </span> <br/>
                    <span className="text-white/90">{heroSlides[currentSlide].subtitle}</span>
                  </h1>
                  
                  <p className="text-slate-300 text-base sm:text-lg md:text-xl mb-8 md:mb-10 max-w-lg leading-relaxed font-light">
                    {heroSlides[currentSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <motion.button
                  onClick={scrollToQuote}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-brand-500 text-white rounded-full font-bold text-base sm:text-lg overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(0,166,81,0.6)] w-full sm:w-auto justify-center flex"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t('hero.startShipping')} 
                    <ArrowRight size={20} className={`group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`}/>
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </motion.button>

                <motion.button
                  onClick={scrollToServices}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white/5 border border-white/20 text-white rounded-full font-medium text-base sm:text-lg hover:bg-white/10 transition-colors backdrop-blur-sm w-full sm:w-auto justify-center flex"
                >
                  {t('hero.exploreServices')}
                </motion.button>
              </motion.div>
              
              {/* Stats Strip */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 md:mt-16 flex flex-wrap items-center gap-6 sm:gap-8 md:gap-12 border-t border-white/10 pt-8"
              >
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white">30+</h4>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">{t('hero.yearsExp')}</p>
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white">{t('hero.global')}</h4>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">{t('hero.coverage')}</p>
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white">24/7</h4>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">{t('hero.support')}</p>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Service Icons (Desktop Only) */}
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`hidden lg:flex flex-col ${isRTL ? 'items-start' : 'items-end'} justify-center gap-6`}
            >
              {serviceIcons.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + item.delay }}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-brand-500/30 transition-all cursor-pointer group ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all">
                    <item.icon size={24} />
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <p className="text-white font-bold">{item.label}</p>
                    <p className="text-slate-400 text-sm">{t('hero.expressDelivery')}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide Controls */}
      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            
            {/* Progress Indicators */}
            <div className="flex items-center gap-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="group relative"
                >
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === currentSlide 
                      ? 'w-12 bg-brand-500' 
                      : 'w-6 bg-white/30 hover:bg-white/50'
                  }`}>
                    {index === currentSlide && isAutoPlaying && (
                      <motion.div
                        className="absolute inset-0 bg-brand-400 rounded-full origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 6, ease: "linear" }}
                        key={`progress-${currentSlide}`}
                        style={{ originX: isRTL ? 1 : 0 }}
                      />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={isRTL ? nextSlide : prevSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-brand-500 hover:border-brand-500 transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={isRTL ? prevSlide : nextSlide}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-brand-500 hover:border-brand-500 transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};
