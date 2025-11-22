import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Plane, Ship, Package, ArrowRight, Globe } from 'lucide-react';

export const Hero: React.FC = () => {
  // Mouse Position Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);

  // Smooth springs for parallax
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);
  
  // Parallax movement for floating elements
  const moveX = useSpring(useTransform(x, [-0.5, 0.5], [-30, 30]), springConfig);
  const moveY = useSpring(useTransform(y, [-0.5, 0.5], [-30, 30]), springConfig);
  const moveXReverse = useSpring(useTransform(x, [-0.5, 0.5], [30, -30]), springConfig);
  const moveYReverse = useSpring(useTransform(y, [-0.5, 0.5], [30, -30]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    }
  };

  const scrollToQuote = () => {
    const element = document.getElementById('quote');
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-slate-950 overflow-hidden flex items-center justify-center pt-20 perspective-1000"
    >
      {/* Dynamic Spotlight Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
        
        {/* Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid-sm opacity-[0.15]" />
        
        {/* Mouse Follower Gradient - using standard CSS for performance */}
        <CursorSpotlight mouseX={x} mouseY={y} />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          {/* Badge - Fixed visibility color */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
            NEXT-GEN LOGISTICS
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold text-white leading-[0.9] tracking-tight mb-8">
            The Fast <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-accent">
              Green Lane
            </span> <br/>
            To Trade.
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-lg leading-relaxed font-light">
            Navigate the complexities of global commerce with a partner that prioritizes speed, transparency, and institutional reliability.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <motion.button
              onClick={scrollToQuote}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-brand-500 text-slate-950 rounded-full font-bold text-lg overflow-hidden transition-all hover:shadow-[0_0_40px_-10px_rgba(0,166,81,0.6)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Shipping <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
            </motion.button>

            <motion.button
               onClick={() => {
                  const el = document.getElementById('services');
                  el?.scrollIntoView({behavior: 'smooth'});
               }}
               whileHover={{ scale: 1.05 }}
               className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-colors"
            >
              Explore Services
            </motion.button>
          </div>
          
          {/* Stats Strip */}
          <div className="mt-16 flex items-center gap-12 border-t border-white/5 pt-8">
             <div>
                <h4 className="text-2xl font-bold text-white">30+</h4>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Years Exp</p>
             </div>
             <div>
                <h4 className="text-2xl font-bold text-white">Global</h4>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Coverage</p>
             </div>
             <div>
                <h4 className="text-2xl font-bold text-white">24/7</h4>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Support</p>
             </div>
          </div>
        </motion.div>

        {/* Right Interaction Area - 3D Parallax Composition */}
        <motion.div 
          style={{ rotateX, rotateY, perspective: 1000 }}
          className="relative h-[500px] w-full hidden lg:block"
        >
           {/* Background decorative circle */}
           <motion.div 
             style={{ x: moveX, y: moveY }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-3xl"
           />

           {/* Floating Elements */}
           <FloatingCard 
              delay={0}
              x={moveXReverse} y={moveYReverse} 
              className="top-10 right-10 z-20 bg-slate-800/80 border-brand-500/30"
              icon={Plane} label="Air Freight" value="Express"
           />
           
           <FloatingCard 
              delay={0.2}
              x={moveX} y={moveY} 
              className="bottom-20 left-10 z-30 bg-slate-800/80 border-blue-500/30"
              icon={Ship} label="Ocean Freight" value="Global"
           />

           <FloatingCard 
              delay={0.4}
              x={moveXReverse} y={moveY} 
              className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 scale-125 bg-slate-900 border-white/10 shadow-2xl"
              icon={Globe} label="Network" value="Connected"
              isCenter
           />

           {/* Connecting Lines */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
             <motion.path
               d="M100 400 Q 300 250 500 100"
               fill="none"
               stroke="url(#gradient)"
               strokeWidth="2"
               strokeDasharray="6 6"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 2, ease: "easeInOut" }}
             />
             <defs>
               <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#00A651" stopOpacity="0" />
                 <stop offset="50%" stopColor="#00A651" stopOpacity="1" />
                 <stop offset="100%" stopColor="#00A651" stopOpacity="0" />
               </linearGradient>
             </defs>
           </svg>
        </motion.div>
      </div>
    </section>
  );
};

// Helper Components
const CursorSpotlight = ({ mouseX, mouseY }: { mouseX: any, mouseY: any }) => {
  // We need to map the -0.5 to 0.5 range back to 0-100% for CSS gradients roughly
  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]: number[]) => {
      const px = (x + 0.5) * 100;
      const py = (y + 0.5) * 100;
      return `radial-gradient(600px circle at ${px}% ${py}%, rgba(0, 166, 81, 0.15), transparent 40%)`;
    }
  );

  return <motion.div style={{ background }} className="absolute inset-0 z-0 transition-opacity duration-300" />;
};

const FloatingCard = ({ className, icon: Icon, label, value, x, y, delay, isCenter }: any) => (
  <motion.div
    style={{ x, y }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: isCenter ? 1.25 : 1 }}
    transition={{ delay, duration: 0.8, type: "spring" }}
    className={`absolute p-5 rounded-2xl border backdrop-blur-md shadow-xl flex items-center gap-4 ${className}`}
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isCenter ? 'bg-brand-500 text-white' : 'bg-white/10 text-brand-400'}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{label}</p>
      <p className="text-white font-bold text-lg">{value}</p>
    </div>
  </motion.div>
);