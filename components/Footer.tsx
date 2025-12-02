import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Truck, ShieldCheck, DollarSign, 
  Headphones, Facebook, Twitter, Linkedin, Instagram,
  ChevronUp
} from 'lucide-react';
import logo from '../src/assets/logo.jpg';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-slate-950 text-slate-300 pt-20 pb-10 relative overflow-hidden">
      {/* Decor Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-brand-400 to-brand-600" />

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          
          {/* Column 1: Brand & Story (Span 5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-4 mb-2 group cursor-pointer" onClick={scrollToTop}>
               <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-brand-500/30 group-hover:ring-brand-500/60 transition-all">
                  <img 
                    src={logo} 
                    alt="Green Lane Logo" 
                    className="w-full h-full object-cover"
                  />
               </div>
               <div className="flex flex-col justify-center leading-none">
                 <span className="text-3xl font-black tracking-tight text-white">Green</span>
                 <span className="text-3xl font-black tracking-tight text-brand-500">Lane</span>
               </div>
            </div>
            
            <div className="space-y-4">
              <p className="leading-relaxed text-slate-400 text-sm md:text-base">
                International shipping made simple. We provide full handling of goods and customs paperwork with a promise of fast, clear, and dependable end-to-end service.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Our Journey</h4>
              <ul className="space-y-6 border-l border-slate-800 ml-2 pl-6 relative">
                {[
                  { year: "1990s", text: "Roots in Syria building logistics expertise." },
                  { year: "2022", text: "HQ established in USA. Expanded to Dubai hub." },
                  { year: "2025", text: "Expanded operations supporting global commerce." }
                ].map((item, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[30px] top-1 w-3 h-3 bg-slate-900 border-2 border-brand-500 rounded-full"></span>
                    <div className="flex flex-col">
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
            <h3 className="text-lg font-bold text-white">Why Green Lane?</h3>
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: ShieldCheck, title: "Institutional Reliability", desc: "Decades of experience & efficiency." },
                { icon: Truck, title: "Complete Service", desc: "True door-to-door handling." },
                { icon: DollarSign, title: "Fair Prices", desc: "Competitive pricing, no surprises." },
                { icon: Headphones, title: "Dedicated Support", desc: "Responsive help at every step." },
              ].map((val, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                   <div className="w-10 h-10 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-brand-500 group-hover:border-brand-500/30 transition-all">
                     <val.icon size={18} />
                   </div>
                   <div>
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
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Global Hubs</h3>
              <div className="space-y-3">
                {[
                  { country: "UAE", city: "Dubai" },
                  { country: "Syria", city: "Damascus" },
                  { country: "USA", city: "California" },
                ].map((branch, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <MapPin size={14} className="text-brand-500" />
                    <span className="text-slate-300 font-medium">{branch.country}</span>
                    <span className="text-slate-600">/</span>
                    <span className="text-slate-500">{branch.city}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-900/80 to-slate-900 border border-brand-900/50 relative overflow-hidden">
               <div className="absolute -right-4 -top-4 w-20 h-20 bg-brand-500/20 rounded-full blur-xl"></div>
               <h4 className="relative z-10 text-brand-400 font-bold text-xs uppercase tracking-wider mb-2">Our Mission</h4>
               <p className="relative z-10 text-sm italic text-slate-300 leading-relaxed">
                 "To be the fastest, most reliable, fully compliant global shipping partner."
               </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-sm">&copy; {new Date().getFullYear()} Green Lane Fast Cargo. All rights reserved.</p>
          
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