import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Plane, Ship, Truck, DoorOpen, Warehouse, 
  PlaneTakeoff, ShoppingCart, Home, ArrowUpRight, Sparkles
} from 'lucide-react';
import { ServiceType } from '../types';

interface ServicesProps {
  onSelectService: (service: ServiceType) => void;
}

const servicesList = [
  { icon: Plane, title: ServiceType.AirFreight, desc: "Rapid global air transport for time-sensitive cargo.", color: "from-sky-400 to-blue-600" },
  { icon: Ship, title: ServiceType.SeaFreight, desc: "Cost-effective ocean shipping for large volume goods.", color: "from-cyan-400 to-teal-600" },
  { icon: Truck, title: ServiceType.LandFreight, desc: "Regional trucking networks connecting borders seamlessly.", color: "from-amber-400 to-orange-600" },
  { icon: DoorOpen, title: ServiceType.DoorToDoor, desc: "Complete handling from pickup to final delivery address.", color: "from-violet-400 to-purple-600" },
  { icon: Warehouse, title: ServiceType.WarehouseStorage, desc: "Secure storage solutions for short or long-term needs.", color: "from-slate-400 to-slate-600" },
  { icon: PlaneTakeoff, title: ServiceType.AirCharter, desc: "Exclusive aircraft chartering for specialized cargo.", color: "from-rose-400 to-pink-600" },
  { icon: ShoppingCart, title: ServiceType.Procurement, desc: "Sourcing assistance and supply chain procurement management.", color: "from-lime-400 to-green-600" },
  { icon: Home, title: ServiceType.HomeMoving, desc: "Stress-free international and domestic relocation services.", color: "from-emerald-400 to-brand-600" },
];

// Floating particles component
const FloatingParticle = ({ delay, duration, size, left }: { delay: number; duration: number; size: number; left: string }) => (
  <motion.div
    className="absolute rounded-full bg-brand-500/20"
    style={{ width: size, height: size, left }}
    initial={{ y: "100vh", opacity: 0 }}
    animate={{ 
      y: "-100px", 
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section id="services" ref={containerRef} className="py-20 md:py-32 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
      
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <FloatingParticle 
            key={i} 
            delay={i * 2} 
            duration={15 + i * 2} 
            size={4 + i * 2} 
            left={`${10 + i * 12}%`} 
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold tracking-wider mb-6"
          >
            <Sparkles size={14} />
            OUR CAPABILITIES
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            World-Class Logistics{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-accent">
              At Your Service
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto"
          >
            From urgent air charters to massive sea freight operations, we cover every aspect of the supply chain with precision and care.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {servicesList.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 * idx,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              onClick={() => onSelectService(service.title)}
              className="group relative cursor-pointer"
            >
              {/* Card */}
              <div className="relative bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-brand-500/50 transition-all duration-500 overflow-hidden h-full min-h-[200px]">
                
                {/* Animated gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.color} opacity-20`} />
                </div>
                
                {/* Top accent line */}
                <motion.div 
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color}`}
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ originX: 0 }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon & Arrow */}
                  <div className="flex justify-between items-start mb-5">
                    <motion.div 
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} p-0.5 shadow-lg`}
                      whileHover={{ rotate: -6, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                        <service.icon size={24} className="text-white" strokeWidth={1.5} />
                      </div>
                    </motion.div>
                    
                    <motion.div
                      initial={{ x: 0, y: 0 }}
                      whileHover={{ x: 4, y: -4 }}
                      className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center group-hover:bg-brand-500 transition-colors duration-300"
                    >
                      <ArrowUpRight size={14} className="text-slate-400 group-hover:text-white transition-colors" />
                    </motion.div>
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-brand-400 transition-colors duration-300">
                    {service.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                    {service.desc}
                  </p>

                  {/* View Details text */}
                  <div className="mt-4 flex items-center gap-1 text-brand-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>View Details</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.color} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-slate-500 text-sm mb-4">
            Click on any service to learn more
          </p>
          <motion.button
            onClick={() => {
              const element = document.getElementById('quote');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 font-medium hover:bg-brand-500 hover:text-white hover:border-brand-500 transition-all duration-300"
          >
            Contact Us For Custom Solutions
            <ArrowUpRight size={16} />
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
};
