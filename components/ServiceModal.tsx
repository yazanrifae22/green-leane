import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Plane, Ship, Truck, DoorOpen, Warehouse, 
  PlaneTakeoff, ShoppingCart, Home, ArrowRight,
  CheckCircle, Clock, Globe, Shield, Package, Users
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import { ServiceType } from '../types';
import logo from '../src/assets/logo.jpg';

interface ServiceModalProps {
  service: ServiceType | null;
  onClose: () => void;
  onGetQuote: (service: ServiceType) => void;
}

// === SERVICE ICONS MAPPING ===
const serviceIcons: Record<ServiceType, any> = {
  [ServiceType.AirFreight]: Plane,
  [ServiceType.SeaFreight]: Ship,
  [ServiceType.LandFreight]: Truck,
  [ServiceType.DoorToDoor]: DoorOpen,
  [ServiceType.WarehouseStorage]: Warehouse,
  [ServiceType.AirCharter]: PlaneTakeoff,
  [ServiceType.Procurement]: ShoppingCart,
  [ServiceType.HomeMoving]: Home,
};

// === SERVICE COLORS MAPPING ===
const serviceColors: Record<ServiceType, string> = {
  [ServiceType.AirFreight]: "from-sky-400 to-blue-600",
  [ServiceType.SeaFreight]: "from-cyan-400 to-teal-600",
  [ServiceType.LandFreight]: "from-amber-400 to-orange-600",
  [ServiceType.DoorToDoor]: "from-violet-400 to-purple-600",
  [ServiceType.WarehouseStorage]: "from-slate-400 to-slate-600",
  [ServiceType.AirCharter]: "from-rose-400 to-pink-600",
  [ServiceType.Procurement]: "from-lime-400 to-green-600",
  [ServiceType.HomeMoving]: "from-emerald-400 to-brand-600",
};

// === TRANSLATION KEY MAPPING ===
const serviceTranslationKeys: Record<ServiceType, string> = {
  [ServiceType.AirFreight]: 'airFreight',
  [ServiceType.SeaFreight]: 'seaFreight',
  [ServiceType.LandFreight]: 'landFreight',
  [ServiceType.DoorToDoor]: 'doorToDoor',
  [ServiceType.WarehouseStorage]: 'warehouseStorage',
  [ServiceType.AirCharter]: 'airCharter',
  [ServiceType.Procurement]: 'procurement',
  [ServiceType.HomeMoving]: 'homeMoving',
};

// === BENEFIT ICONS MAPPING - per service ===
const getBenefitIcons = (serviceKey: string): any[] => {
  const iconMap: Record<string, any[]> = {
    airFreight: [Clock, Globe, Shield],
    seaFreight: [Package, Globe, Shield],
    landFreight: [Clock, Users, Globe],
    doorToDoor: [Shield, Clock, Package],
    warehouseStorage: [Shield, Package, Globe],
    airCharter: [Clock, Package, Globe],
    procurement: [Users, Shield, Globe],
    homeMoving: [Shield, Package, Users],
  };
  return iconMap[serviceKey] || [Clock, Globe, Shield];
};

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onGetQuote }) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  if (!service) return null;
  
  const serviceKey = serviceTranslationKeys[service];
  const Icon = serviceIcons[service];
  const color = serviceColors[service];
  const benefitIcons = getBenefitIcons(serviceKey);

  // Get translated content
  const tagline = t(`serviceModal.${serviceKey}.tagline`);
  const description = t(`serviceModal.${serviceKey}.description`);
  const features = t(`serviceModal.${serviceKey}.features`, { returnObjects: true }) as string[];
  const process = t(`serviceModal.${serviceKey}.process`, { returnObjects: true }) as string[];
  
  // Get benefits with icons
  const benefitKeys = Object.keys(t(`serviceModal.${serviceKey}.benefits`, { returnObjects: true }) as object);
  const benefits = benefitKeys.map((key, idx) => ({
    icon: benefitIcons[idx],
    title: t(`serviceModal.${serviceKey}.benefits.${key}.title`),
    desc: t(`serviceModal.${serviceKey}.benefits.${key}.desc`),
  }));

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
              className={`absolute top-4 ${isRTL ? 'left-4 md:left-6' : 'right-4 md:right-6'} md:top-6 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors`}
            >
              <X size={20} className="text-slate-600" />
            </button>

            {/* Scrollable Content */}
            <div className="h-full overflow-y-auto">
              {/* Hero Section */}
              <div className={`relative bg-gradient-to-br ${color} py-16 md:py-24 px-6 md:px-12 lg:px-20`}>
                {/* Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
                
                {/* Logo */}
                <div className={`relative z-10 flex items-center gap-3 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/30">
                    <img src={logo} alt="Green Lane" className="w-full h-full object-cover" />
                  </div>
                  <div className={`flex flex-col leading-none ${isRTL ? 'text-right' : ''}`}>
                    <span className="text-xl font-black text-white">{t('common.green')}</span>
                    <span className="text-xl font-black text-white/80">{t('common.lane')}</span>
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
                    className={`text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 ${isRTL ? 'text-right' : ''}`}
                  >
                    {t(`services.${serviceKey}.title`)}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={`text-xl md:text-2xl text-white/90 font-light ${isRTL ? 'text-right' : ''}`}
                  >
                    {tagline}
                  </motion.p>
                </div>

                {/* Placeholder Image */}
                <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} bottom-0 w-1/3 h-full hidden lg:block`}>
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-transparent" />
                  <div className={`absolute ${isRTL ? 'left-8' : 'right-8'} bottom-8 w-64 h-64 bg-white/10 rounded-3xl backdrop-blur-sm flex items-center justify-center border border-white/20`}>
                    <div className="text-center text-white/60">
                      <Icon size={64} className="mx-auto mb-2 opacity-50" />
                      <span className="text-sm">{t('serviceModal.serviceImage')}</span>
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
                    <h2 className={`text-2xl font-bold text-slate-900 mb-4 ${isRTL ? 'text-right' : ''}`}>
                      {t('serviceModal.aboutService')}
                    </h2>
                    <p className={`text-slate-600 text-lg leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                      {description}
                    </p>
                  </motion.div>

                  {/* Benefits Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                  >
                    {benefits.map((benefit, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                          <benefit.icon size={24} className="text-white" />
                        </div>
                        <h3 className={`font-bold text-slate-900 mb-1 ${isRTL ? 'text-right' : ''}`}>{benefit.title}</h3>
                        <p className={`text-slate-500 text-sm ${isRTL ? 'text-right' : ''}`}>{benefit.desc}</p>
                      </div>
                    ))}
                  </motion.div>

                  {/* Features & Process */}
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Features */}
                    <motion.div
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h2 className={`text-2xl font-bold text-slate-900 mb-6 ${isRTL ? 'text-right' : ''}`}>
                        {t('serviceModal.keyFeatures')}
                      </h2>
                      <ul className="space-y-4">
                        {features.map((feature, idx) => (
                          <li key={idx} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <CheckCircle size={20} className="text-brand-500 mt-0.5 flex-shrink-0" />
                            <span className={`text-slate-600 ${isRTL ? 'text-right' : ''}`}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Process */}
                    <motion.div
                      initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h2 className={`text-2xl font-bold text-slate-900 mb-6 ${isRTL ? 'text-right' : ''}`}>
                        {t('serviceModal.howItWorks')}
                      </h2>
                      <ol className="space-y-4">
                        {process.map((step, idx) => (
                          <li key={idx} className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} text-white text-sm font-bold flex items-center justify-center flex-shrink-0`}>
                              {idx + 1}
                            </span>
                            <span className={`text-slate-600 pt-1 ${isRTL ? 'text-right' : ''}`}>{step}</span>
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
                    className={`bg-gradient-to-br ${color} rounded-3xl p-8 md:p-12 text-center`}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                      {t('serviceModal.readyToStart')}
                    </h2>
                    <p className="text-white/80 mb-8 max-w-xl mx-auto">
                      {t('serviceModal.ctaDescription')}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        onGetQuote(service);
                        onClose();
                      }}
                      className={`inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      {t('serviceModal.getAQuote')} <ArrowRight size={20} className={isRTL ? 'rotate-180' : ''} />
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
