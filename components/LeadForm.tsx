import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../contexts/LanguageContext';
import { ServiceType } from '../types';
import { Send, CheckCircle, Globe, Clock, Package } from 'lucide-react';
import logo from '../src/assets/logo.jpg';

interface LeadFormProps {
  selectedService: ServiceType | '';
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

// === SERVICE OPTIONS - Maps enum to translation keys ===
const serviceTranslationKeys: Record<ServiceType, string> = {
  [ServiceType.AirFreight]: 'services.airFreight.title',
  [ServiceType.SeaFreight]: 'services.seaFreight.title',
  [ServiceType.LandFreight]: 'services.landFreight.title',
  [ServiceType.DoorToDoor]: 'services.doorToDoor.title',
  [ServiceType.WarehouseStorage]: 'services.warehouseStorage.title',
  [ServiceType.AirCharter]: 'services.airCharter.title',
  [ServiceType.Procurement]: 'services.procurement.title',
  [ServiceType.HomeMoving]: 'services.homeMoving.title',
};

export const LeadForm: React.FC<LeadFormProps> = ({ selectedService }) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<FormData>();

  useEffect(() => {
    if (selectedService) {
      setValue('service', selectedService);
    }
  }, [selectedService, setValue]);

  const onSubmit = async (data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form Data:', data);
    reset();
  };

  return (
    <section id="quote" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-[500px] h-[500px] bg-brand-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob`} />
         <div className={`absolute bottom-0 ${isRTL ? 'right-0' : 'left-0'} w-[500px] h-[500px] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000`} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className={`flex flex-col lg:flex-row ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Left Content Panel */}
            <div className="lg:w-2/5 bg-slate-900 text-white p-10 md:p-16 relative overflow-hidden flex flex-col justify-between">
              <div className="relative z-10">
                {/* Logo */}
                <div className={`flex items-center gap-3 mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-brand-500/40">
                    <img 
                      src={logo} 
                      alt="Green Lane Logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`flex flex-col justify-center leading-none ${isRTL ? 'text-right' : ''}`}>
                    <span className="text-2xl font-black tracking-tight text-white">{t('common.green')}</span>
                    <span className="text-2xl font-black tracking-tight text-brand-400">{t('common.lane')}</span>
                  </div>
                </div>
                
                <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isRTL ? 'text-right' : ''}`}>
                  {t('leadForm.title')}
                </h2>
                <p className={`text-slate-300 mb-12 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                   {t('leadForm.description')}
                </p>
                
                {/* Features List */}
                <div className="space-y-8">
                  <div className={`flex items-center gap-4 group ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                      <Clock size={20} />
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <h4 className="font-bold">{t('leadForm.fastResponse')}</h4>
                      <p className="text-slate-400 text-sm">{t('leadForm.fastResponseDesc')}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-4 group ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                      <Globe size={20} />
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <h4 className="font-bold">{t('leadForm.globalNetwork')}</h4>
                      <p className="text-slate-400 text-sm">{t('leadForm.globalNetworkDesc')}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-4 group ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                      <Package size={20} />
                    </div>
                    <div className={isRTL ? 'text-right' : ''}>
                      <h4 className="font-bold">{t('leadForm.customSolutions')}</h4>
                      <p className="text-slate-400 text-sm">{t('leadForm.customSolutionsDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Abstract Map Graphic */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                   <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                </svg>
              </div>
              <div className={`absolute -bottom-10 ${isRTL ? '-left-10' : '-right-10'} w-64 h-64 bg-brand-600 rounded-full filter blur-3xl opacity-20`} />
            </div>

            {/* Right Form Panel */}
            <div className="lg:w-3/5 p-10 md:p-16 bg-white">
              {isSubmitSuccessful ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  {/* Success Logo */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 overflow-hidden rounded-full ring-4 ring-brand-500/30 shadow-xl shadow-brand-500/20">
                      <img 
                        src={logo} 
                        alt="Green Lane Logo" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className={`absolute -bottom-1 ${isRTL ? '-left-1' : '-right-1'} w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg`}>
                      <CheckCircle size={18} />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-2">{t('leadForm.successTitle')}</h3>
                  <p className="text-slate-500 max-w-md">
                    {t('leadForm.successMessage')}
                  </p>
                  <button 
                    onClick={() => reset()} 
                    className="mt-8 px-6 py-3 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/25"
                  >
                    {t('leadForm.sendAnother')}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase text-slate-500 tracking-wider ${isRTL ? 'mr-1 block text-right' : 'ml-1'}`}>
                        {t('leadForm.fullName')}
                      </label>
                      <input 
                        {...register("fullName", { required: t('leadForm.errors.nameRequired') })}
                        className={`w-full px-4 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all font-medium text-slate-700 ${isRTL ? 'text-right' : ''}`}
                        placeholder={t('leadForm.fullNamePlaceholder')}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                      {errors.fullName && <span className={`text-red-500 text-xs ${isRTL ? 'mr-1 block text-right' : 'ml-1'}`}>{errors.fullName.message}</span>}
                    </div>
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase text-slate-500 tracking-wider ${isRTL ? 'mr-1 block text-right' : 'ml-1'}`}>
                        {t('leadForm.emailAddress')}
                      </label>
                      <input 
                        {...register("email", { 
                          required: t('leadForm.errors.emailRequired'),
                          pattern: { value: /^\S+@\S+$/i, message: t('leadForm.errors.emailInvalid') }
                        })}
                        className={`w-full px-4 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all font-medium text-slate-700 ${isRTL ? 'text-right' : ''}`}
                        placeholder={t('leadForm.emailPlaceholder')}
                        dir="ltr"
                      />
                      {errors.email && <span className={`text-red-500 text-xs ${isRTL ? 'mr-1 block text-right' : 'ml-1'}`}>{errors.email.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase text-slate-500 tracking-wider ${isRTL ? 'mr-1 block text-right' : 'ml-1'}`}>
                        {t('leadForm.phoneNumber')}
                      </label>
                      <input 
                        {...register("phone", { required: t('leadForm.errors.phoneRequired') })}
                        className={`w-full px-4 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all font-medium text-slate-700 ${isRTL ? 'text-right' : ''}`}
                        placeholder={t('leadForm.phonePlaceholder')}
                        dir="ltr"
                      />
                      {errors.phone && <span className={`text-red-500 text-xs ${isRTL ? 'mr-1 block text-right' : 'ml-1'}`}>{errors.phone.message}</span>}
                    </div>
                    <div className="space-y-2">
                      <label className={`text-xs font-bold uppercase text-slate-500 tracking-wider ${isRTL ? 'mr-1 block text-right' : 'ml-1'}`}>
                        {t('leadForm.serviceOfInterest')}
                      </label>
                      <div className="relative">
                        <select 
                          {...register("service", { required: t('leadForm.errors.serviceRequired') })}
                          className={`w-full px-4 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all font-medium text-slate-700 appearance-none cursor-pointer ${isRTL ? 'text-right' : ''}`}
                          dir={isRTL ? 'rtl' : 'ltr'}
                        >
                          <option value="">{t('leadForm.selectService')}</option>
                          {Object.values(ServiceType).map((s) => (
                            <option key={s} value={s}>{t(serviceTranslationKeys[s])}</option>
                          ))}
                        </select>
                        <div className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                      {errors.service && <span className={`text-red-500 text-xs ${isRTL ? 'mr-1 block text-right' : 'ml-1'}`}>{errors.service.message}</span>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className={`text-xs font-bold uppercase text-slate-500 tracking-wider ${isRTL ? 'mr-1 block text-right' : 'ml-1'}`}>
                      {t('leadForm.cargoDetails')}
                    </label>
                    <textarea 
                      {...register("message", { required: t('leadForm.errors.messageRequired') })}
                      rows={3}
                      className={`w-full px-4 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all font-medium text-slate-700 resize-none ${isRTL ? 'text-right' : ''}`}
                      placeholder={t('leadForm.cargoPlaceholder')}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    {errors.message && <span className={`text-red-500 text-xs ${isRTL ? 'mr-1 block text-right' : 'ml-1'}`}>{errors.message.message}</span>}
                  </div>

                  <motion.button 
                    type="submit" 
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-brand-500/30 mt-4 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {isSubmitting ? (
                      <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{t('common.processing')}</span>
                      </div>
                    ) : (
                      <>
                        {t('leadForm.submitRequest')} <Send size={18} className={isRTL ? 'rotate-180' : ''} />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
