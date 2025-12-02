import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Truck, ShieldCheck, DollarSign, 
  Headphones, Facebook, Twitter, Linkedin, Instagram,
  ChevronUp
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import logo from '../src/assets/logo.jpg';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // === TIMELINE DATA - Translated ===
  const timeline = [
    { year: "1990s", text: t('footer.timeline.1990s') },
    { year: "2022", text: t('footer.timeline.2022') },
    { year: "2025", text: t('footer.timeline.2025') }
  ];

  // === VALUES DATA - Translated ===
  const values = [
    { icon: ShieldCheck, title: t('footer.values.reliability.title'), desc: t('footer.values.reliability.desc') },
    { icon: Truck, title: t('footer.values.service.title'), desc: t('footer.values.service.desc') },
    { icon: DollarSign, title: t('footer.values.prices.title'), desc: t('footer.values.prices.desc') },
    { icon: Headphones, title: t('footer.values.support.title'), desc: t('footer.values.support.desc') },
  ];

  // === BRANCHES DATA - Translated ===
  const branches = [
    { country: t('footer.branches.uae.country'), city: t('footer.branches.uae.city') },
    { country: t('footer.branches.syria.country'), city: t('footer.branches.syria.city') },
    { country: t('footer.branches.usa.country'), city: t('footer.branches.usa.city') },
  ];

  return (
    <footer id="footer" className="bg-slate-950 text-slate-300 pt-20 pb-10 relative overflow-hidden">
      {/* Decor Line */}
      <div className={`absolute top-0 left-0 w-full h-1 ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-brand-500 via-brand-400 to-brand-600`} />

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          
          {/* Column 1: Brand & Story (Span 5) */}
          <div className="lg:col-span-5 space-y-8">
            <div 
              className={`flex items-center gap-4 mb-2 group cursor-pointer ${isRTL ? 'flex-row-reverse' : ''}`} 
              onClick={scrollToTop}
            >
               <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-brand-500/30 group-hover:ring-brand-500/60 transition-all">
                  <img 
                    src={logo} 
                    alt="Green Lane Logo" 
                    className="w-full h-full object-cover"
                  />
               </div>
               <div className={`flex flex-col justify-center leading-none ${isRTL ? 'text-right' : ''}`}>
                 <span className="text-3xl font-black tracking-tight text-white">{t('common.green')}</span>
                 <span className="text-3xl font-black tracking-tight text-brand-500">{t('common.lane')}</span>
               </div>
            </div>
            
            <div className="space-y-4">
              <p className={`leading-relaxed text-slate-400 text-sm md:text-base ${isRTL ? 'text-right' : ''}`}>
                {t('footer.description')}
              </p>
            </div>

            <div className={`space-y-4 pt-4 border-t border-slate-800 ${isRTL ? 'border-r pr-6 mr-2 border-t-0' : ''}`}>
              <h4 className={`text-sm font-bold text-white uppercase tracking-wider ${isRTL ? 'text-right' : ''}`}>
                {t('footer.ourJourney')}
              </h4>
              <ul className={`space-y-6 ${isRTL ? 'border-r border-slate-800 mr-2 pr-6' : 'border-l border-slate-800 ml-2 pl-6'} relative`}>
                {timeline.map((item, i) => (
                  <li key={i} className="relative">
                    <span className={`absolute ${isRTL ? '-right-[30px]' : '-left-[30px]'} top-1 w-3 h-3 bg-slate-900 border-2 border-brand-500 rounded-full`}></span>
                    <div className={`flex flex-col ${isRTL ? 'text-right' : ''}`}>
                      <span className="text-brand-400 font-bold text-sm">{item.year}</span>
                      <span className="text-xs text-slate-500">{item.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 2: Values (Span 4) */}
          <div className="lg:col-span-4 space-y-8">
            <h3 className={`text-lg font-bold text-white ${isRTL ? 'text-right' : ''}`}>
              {t('footer.whyGreenLane')}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {values.map((val, idx) => (
                <div key={idx} className={`flex items-start gap-4 group ${isRTL ? 'flex-row-reverse' : ''}`}>
                   <div className="w-10 h-10 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-brand-500 group-hover:border-brand-500/30 transition-all">
                     <val.icon size={18} />
                   </div>
                   <div className={isRTL ? 'text-right' : ''}>
                     <h4 className="font-semibold text-slate-200 text-sm group-hover:text-white transition-colors">{val.title}</h4>
                     <p className="text-xs text-slate-500 leading-relaxed mt-1">{val.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Branches & Mission (Span 3) */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h3 className={`text-sm font-bold text-white uppercase tracking-wider mb-4 ${isRTL ? 'text-right' : ''}`}>
                {t('footer.globalHubs')}
              </h3>
              <div className="space-y-3">
                {branches.map((branch, idx) => (
                  <div key={idx} className={`flex items-center gap-3 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <MapPin size={14} className="text-brand-500" />
                    <span className="text-slate-300 font-medium">{branch.country}</span>
                    <span className="text-slate-600">/</span>
                    <span className="text-slate-500">{branch.city}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-2xl ${isRTL ? 'bg-gradient-to-bl' : 'bg-gradient-to-br'} from-brand-900/80 to-slate-900 border border-brand-900/50 relative overflow-hidden`}>
               <div className={`absolute ${isRTL ? '-left-4' : '-right-4'} -top-4 w-20 h-20 bg-brand-500/20 rounded-full blur-xl`}></div>
               <h4 className={`relative z-10 text-brand-400 font-bold text-xs uppercase tracking-wider mb-2 ${isRTL ? 'text-right' : ''}`}>
                 {t('footer.ourMission')}
               </h4>
               <p className={`relative z-10 text-sm italic text-slate-300 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                 {t('footer.missionQuote')}
               </p>
            </div>
          </div>
        </div>

        <div className={`border-t border-slate-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
          <p className="text-slate-600 text-sm">
            &copy; {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="text-slate-500 hover:text-white transition-colors">
                <Icon size={18} />
              </a>
            ))}
          </div>

          <button 
            onClick={scrollToTop} 
            className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all"
          >
            <ChevronUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};
