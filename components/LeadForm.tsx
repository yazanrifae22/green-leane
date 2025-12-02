import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
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

export const LeadForm: React.FC<LeadFormProps> = ({ selectedService }) => {
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
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Content Panel */}
            <div className="lg:w-2/5 bg-slate-900 text-white p-10 md:p-16 relative overflow-hidden flex flex-col justify-between">
              <div className="relative z-10">
                {/* Logo */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden rounded-full ring-2 ring-brand-500/40">
                    <img 
                      src={logo} 
                      alt="Green Lane Logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center leading-none">
                    <span className="text-2xl font-black tracking-tight text-white">Green</span>
                    <span className="text-2xl font-black tracking-tight text-brand-400">Lane</span>
                  </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Get Your Cargo Moving</h2>
                <p className="text-slate-300 mb-12 leading-relaxed">
                   Connect with our experts today. We analyze your route, cargo type, and timeline to provide the most efficient "Green Lane" solution.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold">Fast Response</h4>
                      <p className="text-slate-400 text-sm">Quotes within 2 business hours</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                      <Globe size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold">Global Network</h4>
                      <p className="text-slate-400 text-sm">Operations across US, UAE, & Syria</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                      <Package size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold">Custom Solutions</h4>
                      <p className="text-slate-400 text-sm">Tailored packaging & handling</p>
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
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-600 rounded-full filter blur-3xl opacity-20" />
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
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle size={18} />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 mb-2">Request Received!</h3>
                  <p className="text-slate-500 max-w-md">
                    Thank you for choosing Green Lane AE. One of our logistics specialists will contact you shortly at the email provided.
                  </p>
                  <button 
                    onClick={() => reset()} 
                    className="mt-8 px-6 py-3 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/25"
                  >
                    Send another request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-500 tracking-wider ml-1">Full Name</label>
                      <input 
                        {...register("fullName", { required: "Name is required" })}
                        className="w-full px-4 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
                        placeholder="Jane Smith"
                      />
                      {errors.fullName && <span className="text-red-500 text-xs ml-1">{errors.fullName.message}</span>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-500 tracking-wider ml-1">Email Address</label>
                      <input 
                        {...register("email", { 
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                        })}
                        className="w-full px-4 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
                        placeholder="jane@company.com"
                      />
                      {errors.email && <span className="text-red-500 text-xs ml-1">{errors.email.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-500 tracking-wider ml-1">Phone Number</label>
                      <input 
                        {...register("phone", { required: "Phone is required" })}
                        className="w-full px-4 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all font-medium text-slate-700"
                        placeholder="+971 ..."
                      />
                      {errors.phone && <span className="text-red-500 text-xs ml-1">{errors.phone.message}</span>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-500 tracking-wider ml-1">Service of Interest</label>
                      <div className="relative">
                        <select 
                          {...register("service", { required: "Please select a service" })}
                          className="w-full px-4 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all font-medium text-slate-700 appearance-none cursor-pointer"
                        >
                          <option value="">Select Service...</option>
                          {Object.values(ServiceType).map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                      {errors.service && <span className="text-red-500 text-xs ml-1">{errors.service.message}</span>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-500 tracking-wider ml-1">Cargo Details / Message</label>
                    <textarea 
                      {...register("message", { required: "Message is required" })}
                      rows={3}
                      className="w-full px-4 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all font-medium text-slate-700 resize-none"
                      placeholder="e.g. 2 Containers from Shanghai to Dubai, Electronics..."
                    />
                    {errors.message && <span className="text-red-500 text-xs ml-1">{errors.message.message}</span>}
                  </div>

                  <motion.button 
                    type="submit" 
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-brand-600 text-white font-bold py-4 rounded-xl hover:bg-brand-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-brand-500/30 mt-4"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        Submit Request <Send size={18} />
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