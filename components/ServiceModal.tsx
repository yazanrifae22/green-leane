import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Plane, Ship, Truck, DoorOpen, Warehouse, 
  PlaneTakeoff, ShoppingCart, Home, ArrowRight,
  CheckCircle, Clock, Globe, Shield, Package, Users
} from 'lucide-react';
import { ServiceType } from '../types';
import logo from '../src/assets/logo.jpg';

interface ServiceModalProps {
  service: ServiceType | null;
  onClose: () => void;
  onGetQuote: (service: ServiceType) => void;
}

// Service details data
const serviceDetails: Record<ServiceType, {
  icon: any;
  color: string;
  tagline: string;
  description: string;
  features: string[];
  benefits: { icon: any; title: string; desc: string }[];
  process: string[];
}> = {
  [ServiceType.AirFreight]: {
    icon: Plane,
    color: "from-sky-400 to-blue-600",
    tagline: "Speed Meets Reliability",
    description: "Our air freight services provide the fastest way to move your cargo across the globe. With partnerships with major airlines and access to chartered flights, we ensure your time-sensitive shipments reach their destination on schedule. Whether it's urgent spare parts, perishable goods, or high-value items, our air freight solutions are tailored to meet your specific needs.",
    features: [
      "Express and economy air freight options",
      "Door-to-airport and airport-to-airport services",
      "Temperature-controlled cargo handling",
      "Real-time flight tracking and updates",
      "Customs clearance and documentation",
      "Consolidated and direct flight options"
    ],
    benefits: [
      { icon: Clock, title: "Fastest Transit", desc: "Delivery within 1-5 days globally" },
      { icon: Globe, title: "Global Network", desc: "Access to 500+ destinations worldwide" },
      { icon: Shield, title: "Secure Handling", desc: "24/7 monitored cargo facilities" }
    ],
    process: [
      "Request a quote with cargo details",
      "Receive customized routing options",
      "Confirm booking and prepare cargo",
      "Pickup and airport handling",
      "Real-time tracking during transit",
      "Customs clearance and final delivery"
    ]
  },
  [ServiceType.SeaFreight]: {
    icon: Ship,
    color: "from-cyan-400 to-teal-600",
    tagline: "Cost-Effective Global Shipping",
    description: "Sea freight remains the backbone of international trade, offering the most economical solution for large-volume shipments. Our ocean freight services connect you to every major port worldwide with flexible container options including FCL (Full Container Load) and LCL (Less than Container Load) to optimize your shipping costs.",
    features: [
      "FCL and LCL container options",
      "Refrigerated (reefer) container services",
      "Break-bulk and project cargo handling",
      "Multi-modal transportation solutions",
      "Port-to-port and door-to-door options",
      "Cargo insurance and documentation"
    ],
    benefits: [
      { icon: Package, title: "High Volume", desc: "Handle containers of any size" },
      { icon: Globe, title: "All Major Ports", desc: "Connected to 200+ global ports" },
      { icon: Shield, title: "Cargo Protection", desc: "Full marine insurance available" }
    ],
    process: [
      "Submit cargo specifications",
      "Receive container and routing options",
      "Book vessel space and schedule",
      "Cargo pickup and container stuffing",
      "Ocean transit with live tracking",
      "Port handling and final delivery"
    ]
  },
  [ServiceType.LandFreight]: {
    icon: Truck,
    color: "from-amber-400 to-orange-600",
    tagline: "Seamless Cross-Border Transport",
    description: "Our land freight services provide reliable road transportation solutions across borders and continents. With a vast network of trusted carriers and modern fleet management, we ensure your cargo moves efficiently whether it's a single pallet or full truckload shipment across the Middle East, Europe, or beyond.",
    features: [
      "Full Truckload (FTL) services",
      "Less than Truckload (LTL) options",
      "Cross-border documentation handling",
      "GPS-tracked fleet monitoring",
      "Express and scheduled deliveries",
      "Flatbed and specialized vehicle options"
    ],
    benefits: [
      { icon: Clock, title: "Flexible Scheduling", desc: "Daily departures available" },
      { icon: Users, title: "Trusted Network", desc: "Vetted carrier partnerships" },
      { icon: Globe, title: "Regional Coverage", desc: "GCC, Middle East, and Europe" }
    ],
    process: [
      "Provide pickup and delivery locations",
      "Receive route and pricing options",
      "Schedule pickup date and time",
      "Load cargo and begin transit",
      "Cross-border clearance handling",
      "Final delivery confirmation"
    ]
  },
  [ServiceType.DoorToDoor]: {
    icon: DoorOpen,
    color: "from-violet-400 to-purple-600",
    tagline: "Complete End-to-End Solution",
    description: "Experience hassle-free shipping with our comprehensive door-to-door service. We handle everything from pickup at your location to final delivery at the destination address. This all-inclusive service eliminates the complexity of coordinating multiple logistics providers and ensures seamless handling of your cargo.",
    features: [
      "Single point of contact throughout",
      "All transport modes coordinated",
      "Complete customs handling",
      "Packaging and crating services",
      "Insurance coverage included",
      "Delivery confirmation and POD"
    ],
    benefits: [
      { icon: Shield, title: "Zero Hassle", desc: "We manage the entire process" },
      { icon: Clock, title: "Time Saving", desc: "No coordination needed from you" },
      { icon: Package, title: "Full Visibility", desc: "Track from origin to destination" }
    ],
    process: [
      "Share origin and destination details",
      "Receive all-inclusive quotation",
      "Schedule pickup at your premises",
      "We handle packing if needed",
      "Multi-modal transport coordination",
      "Delivery to final destination"
    ]
  },
  [ServiceType.WarehouseStorage]: {
    icon: Warehouse,
    color: "from-slate-400 to-slate-600",
    tagline: "Secure Storage Solutions",
    description: "Our strategically located warehouses provide safe and efficient storage solutions for your goods. Whether you need short-term storage during transit or long-term inventory management, our facilities are equipped with modern security systems, climate control options, and professional handling to protect your valuable cargo.",
    features: [
      "Short and long-term storage options",
      "Climate-controlled facilities",
      "Inventory management systems",
      "Pick and pack services",
      "Cross-docking capabilities",
      "24/7 security and surveillance"
    ],
    benefits: [
      { icon: Shield, title: "Maximum Security", desc: "CCTV and access control" },
      { icon: Package, title: "Inventory Control", desc: "Real-time stock visibility" },
      { icon: Globe, title: "Strategic Locations", desc: "Dubai, Syria, USA facilities" }
    ],
    process: [
      "Specify storage requirements",
      "Facility tour and assessment",
      "Agree on terms and pricing",
      "Cargo receipt and inspection",
      "Organized storage allocation",
      "Retrieval on your schedule"
    ]
  },
  [ServiceType.AirCharter]: {
    icon: PlaneTakeoff,
    color: "from-rose-400 to-pink-600",
    tagline: "Exclusive Aircraft Solutions",
    description: "When standard air freight isn't enough, our air charter services provide dedicated aircraft for your exclusive use. Ideal for oversized cargo, urgent shipments, or destinations with limited commercial service, we arrange everything from cargo planes to specialized aircraft to meet your unique requirements.",
    features: [
      "Dedicated aircraft booking",
      "Oversized cargo capability",
      "Remote destination access",
      "24/7 charter arrangements",
      "On-board courier options",
      "Livestock and special cargo handling"
    ],
    benefits: [
      { icon: Clock, title: "Your Schedule", desc: "Fly when you need to" },
      { icon: Package, title: "Any Size Cargo", desc: "No weight or size limits" },
      { icon: Globe, title: "Anywhere", desc: "Reach any airport worldwide" }
    ],
    process: [
      "Describe cargo and urgency",
      "Receive aircraft options",
      "Confirm charter booking",
      "Cargo preparation and loading",
      "Direct flight to destination",
      "Immediate unloading and handover"
    ]
  },
  [ServiceType.Procurement]: {
    icon: ShoppingCart,
    color: "from-lime-400 to-green-600",
    tagline: "Source With Confidence",
    description: "Beyond logistics, we offer procurement services to help you source products and materials from global markets. Our team assists with supplier identification, quality verification, negotiation, and purchase coordination, ensuring you get the best value while we handle the complexity of international sourcing.",
    features: [
      "Supplier identification and vetting",
      "Quality inspection services",
      "Price negotiation support",
      "Purchase order management",
      "Factory audits available",
      "Consolidation and shipping coordination"
    ],
    benefits: [
      { icon: Users, title: "Trusted Suppliers", desc: "Pre-vetted vendor network" },
      { icon: Shield, title: "Quality Assured", desc: "Inspection before shipping" },
      { icon: Globe, title: "Global Sourcing", desc: "Access markets worldwide" }
    ],
    process: [
      "Share product requirements",
      "Receive supplier options",
      "Sample evaluation if needed",
      "Negotiate and place orders",
      "Quality inspection at source",
      "Consolidation and shipping"
    ]
  },
  [ServiceType.HomeMoving]: {
    icon: Home,
    color: "from-emerald-400 to-brand-600",
    tagline: "Stress-Free Relocation",
    description: "Moving your home internationally can be overwhelming. Our professional home moving services take the stress out of relocation with comprehensive packing, careful handling, and efficient delivery of your household belongings. From a single room to an entire villa, we ensure your possessions arrive safely at your new home.",
    features: [
      "Professional packing services",
      "Furniture disassembly and reassembly",
      "Custom crating for fragile items",
      "Vehicle shipping available",
      "Pet relocation assistance",
      "Unpacking and setup at destination"
    ],
    benefits: [
      { icon: Shield, title: "Careful Handling", desc: "Trained moving specialists" },
      { icon: Package, title: "Full Protection", desc: "Comprehensive insurance" },
      { icon: Users, title: "Personal Touch", desc: "Dedicated move coordinator" }
    ],
    process: [
      "Home survey and assessment",
      "Detailed moving plan created",
      "Professional packing begins",
      "Loading and transport",
      "Customs clearance handled",
      "Delivery, unpacking, and setup"
    ]
  }
};

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onGetQuote }) => {
  if (!service) return null;
  
  const details = serviceDetails[service];
  const Icon = details.icon;

  return (
    <AnimatePresence>
      {service && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
            >
              <X size={20} className="text-slate-600" />
            </button>

            {/* Scrollable Content */}
            <div className="h-full overflow-y-auto">
              {/* Hero Section */}
              <div className={`relative bg-gradient-to-br ${details.color} py-16 md:py-24 px-6 md:px-12 lg:px-20`}>
                {/* Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
                
                {/* Logo */}
                <div className="relative z-10 flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/30">
                    <img src={logo} alt="Green Lane" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-xl font-black text-white">Green</span>
                    <span className="text-xl font-black text-white/80">Lane</span>
                  </div>
                </div>

                <div className="relative z-10 max-w-4xl">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6"
                  >
                    <Icon size={40} className="text-white" />
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
                  >
                    {service}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-white/90 font-light"
                  >
                    {details.tagline}
                  </motion.p>
                </div>

                {/* Placeholder Image */}
                <div className="absolute right-0 bottom-0 w-1/3 h-full hidden lg:block">
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-transparent" />
                  <div className="absolute right-8 bottom-8 w-64 h-64 bg-white/10 rounded-3xl backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <div className="text-center text-white/60">
                      <Icon size={64} className="mx-auto mb-2 opacity-50" />
                      <span className="text-sm">Service Image</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="px-6 md:px-12 lg:px-20 py-12 md:py-16">
                <div className="max-w-5xl mx-auto">
                  
                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                  >
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">About This Service</h2>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      {details.description}
                    </p>
                  </motion.div>

                  {/* Benefits Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                  >
                    {details.benefits.map((benefit, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${details.color} flex items-center justify-center mb-4`}>
                          <benefit.icon size={24} className="text-white" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-1">{benefit.title}</h3>
                        <p className="text-slate-500 text-sm">{benefit.desc}</p>
                      </div>
                    ))}
                  </motion.div>

                  {/* Features & Process */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
                    {/* Features */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Features</h2>
                      <ul className="space-y-4">
                        {details.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle size={20} className="text-brand-500 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Process */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">How It Works</h2>
                      <ol className="space-y-4">
                        {details.process.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-4">
                            <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${details.color} text-white text-sm font-bold flex items-center justify-center flex-shrink-0`}>
                              {idx + 1}
                            </span>
                            <span className="text-slate-600 pt-1">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </motion.div>
                  </div>

                  {/* CTA Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className={`bg-gradient-to-br ${details.color} rounded-3xl p-8 md:p-12 text-center`}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      Ready to Get Started?
                    </h2>
                    <p className="text-white/80 mb-8 max-w-xl mx-auto">
                      Contact our team today for a customized quote tailored to your specific needs.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        onGetQuote(service);
                        onClose();
                      }}
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow"
                    >
                      Get a Quote <ArrowRight size={20} />
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

