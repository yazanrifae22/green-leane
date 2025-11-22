import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plane, Ship, Truck, DoorOpen, Warehouse, 
  PlaneTakeoff, ShoppingCart, ShieldAlert, 
  LocateFixed, Home, ArrowUpRight 
} from 'lucide-react';
import { ServiceType } from '../types';

interface ServicesProps {
  onSelectService: (service: ServiceType) => void;
}

const servicesList = [
  { icon: Plane, title: ServiceType.AirFreight, desc: "Rapid global air transport for time-sensitive cargo." },
  { icon: Ship, title: ServiceType.SeaFreight, desc: "Cost-effective ocean shipping for large volume goods." },
  { icon: Truck, title: ServiceType.LandFreight, desc: "Regional trucking networks connecting borders seamlessly." },
  { icon: DoorOpen, title: ServiceType.DoorToDoor, desc: "Complete handling from pickup to final delivery address." },
  { icon: Warehouse, title: ServiceType.WarehouseStorage, desc: "Secure storage solutions for short or long-term needs." },
  { icon: PlaneTakeoff, title: ServiceType.AirCharter, desc: "Exclusive aircraft chartering for specialized cargo." },
  { icon: ShoppingCart, title: ServiceType.Procurement, desc: "Sourcing assistance and supply chain procurement management." },
  { icon: ShieldAlert, title: ServiceType.DangerousGoods, desc: "Certified handling of hazardous materials and sensitive goods." },
  { icon: LocateFixed, title: ServiceType.ShipmentTracking, desc: "Real-time visibility on your shipment's global journey." },
  { icon: Home, title: ServiceType.HomeMoving, desc: "Stress-free international and domestic relocation services." },
];

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="services" className="py-24 bg-slate-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
             <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-brand-600 font-bold tracking-widest uppercase text-xs mb-2 block"
            >
              Our Capabilities
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight"
            >
              World-Class Logistics <br/>
              <span className="text-slate-400">At Your Service</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-md text-sm md:text-base"
          >
            From urgent air charters to massive sea freight operations, we cover every aspect of the supply chain with precision.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5"
        >
          {servicesList.map((service, idx) => (
            <motion.div
              key={service.title}
              variants={item}
              onClick={() => onSelectService(service.title)}
              className="group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-brand-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                   <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 group-hover:-rotate-6 shadow-inner">
                     <service.icon size={24} strokeWidth={1.5} />
                   </div>
                   <ArrowUpRight size={16} className="text-gray-300 group-hover:text-brand-500 transition-colors" />
                </div>
                
                <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-brand-600 transition-colors pr-2">
                  {service.title}
                </h4>
                
                <p className="text-slate-500 text-xs leading-relaxed group-hover:text-slate-600 transition-colors">
                  {service.desc}
                </p>
              </div>

              {/* Subtle hover background effect */}
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-brand-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};