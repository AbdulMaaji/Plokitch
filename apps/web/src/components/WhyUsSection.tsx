import { motion } from "framer-motion";
import { ShieldCheck, Zap, Heart, Star, Users, Award, Shield, Timer, Flame, Medal, Globe, Gift, CheckCircle2, Lock, MapPin } from "lucide-react";
import SectionDivider from "./SectionDivider";

const WhyUsSection = () => {
  return (
    // Background fades seamlessly into adjacent sections
    <section id="why-us" className="py-32 relative overflow-hidden bg-background">
      
      {/* Seamless Top & Bottom Fades */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
      
      {/* Deep section background underneath the fades */}
      <div className="absolute inset-y-24 inset-x-0 bg-[#0B0C10] -z-10 pointer-events-none" />
      <div className="absolute inset-y-24 inset-x-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.04] to-transparent pointer-events-none -z-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center">
          <SectionDivider label="Why Plokitch" />
          <h2 className="text-4xl md:text-5xl font-heading text-center mt-4 mb-4 text-white">
            Food Delivery That Actually{" "}
            <span className="italic text-gold">Cares</span>
          </h2>
          <p className="text-center text-zinc-400 font-body max-w-2xl mx-auto mb-16">
            We built Plokitch for Gombe — not imported from somewhere else and dropped here.
            Every feature is designed for how you eat and how our chefs cook.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto auto-rows-[240px] grid-flow-dense">
          
          {/* Card 1: Payment Protected (Large 2x2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-2 lg:row-span-2 group relative bg-[#13141A] border border-white/5 hover:border-white/10 rounded-3xl p-8 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            <div className="relative z-10 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-black border border-white/5 flex items-center justify-center mb-6">
                <ShieldCheck size={28} className="text-emerald-400" />
              </div>
              <h3 className="font-heading font-semibold text-2xl mb-3 text-white tracking-wide">Payment Protected</h3>
              <p className="text-base text-zinc-400 font-body leading-relaxed max-w-md">
                Your money stays secure until you confirm delivery. No surprises, no lost payments — ever. Every transaction is held safely in escrow.
              </p>
            </div>

            {/* Custom inner layout for Card 1 */}
            <div className="relative z-10 w-full flex-grow flex items-end justify-center pb-4">
              <div className="w-full max-w-sm bg-black/40 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 backdrop-blur-sm group-hover:-translate-y-2 transition-transform duration-500">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-500 text-sm">Escrow Status</span>
                  <span className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 px-2 py-1 rounded-full"><Lock size={14}/> Secured</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-full animate-pulse" />
                </div>
              </div>
            </div>
            
            <Shield className="absolute -bottom-16 -right-16 text-emerald-500/5 group-hover:scale-110 transition-transform duration-700" size={320} />
          </motion.div>

          {/* Card 2: Fast Delivery (Small 1x1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 lg:col-span-1 lg:row-span-1 group relative bg-[#13141A] border border-white/5 hover:border-white/10 rounded-3xl p-6 overflow-hidden flex flex-col"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center mb-4 z-10">
              <Zap size={24} className="text-amber-400" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2 text-white z-10">Fast Delivery</h3>
            <p className="text-sm text-zinc-400 font-body leading-relaxed z-10">
              Dedicated riders pick up your food. Hot meals delivered fast.
            </p>

            {/* Unique graphic */}
            <div className="absolute bottom-4 right-4 flex items-center justify-center w-16 h-16 rounded-full border border-amber-500/20 group-hover:border-amber-500/40 transition-colors">
               <div className="w-8 h-8 rounded-full bg-amber-500/20 animate-ping absolute" />
               <MapPin className="text-amber-500/40" size={24} />
            </div>
          </motion.div>

          {/* Card 3: Real Home Cooking (Vertical 1x2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 lg:col-span-1 lg:row-span-2 group relative bg-[#13141A] border border-white/5 hover:border-white/10 rounded-3xl p-6 overflow-hidden flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute right-0 top-0 w-32 h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.02))] pointer-events-none" />

            <div className="w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center mb-6 z-10">
              <Heart size={24} className="text-rose-400" />
            </div>
            <h3 className="font-heading font-semibold text-xl mb-3 text-white z-10">Real Home Cooking</h3>
            <p className="text-sm text-zinc-400 font-body leading-relaxed z-10">
              Every chef cooks with care. Not a restaurant chain — genuine handcrafted meals from family kitchens.
            </p>
            
            <div className="mt-8 flex-grow flex flex-col gap-3 justify-end z-10 pb-4 relative">
              <div className="bg-black/50 p-3 rounded-lg border border-white/5 flex items-center gap-3 transform group-hover:translate-x-2 transition-transform duration-300">
                 <div className="w-8 h-8 rounded-full border border-rose-500/30 overflow-hidden bg-rose-500/10" />
                 <div className="flex flex-col">
                    <span className="text-xs text-white">Mama's Kitchen</span>
                    <span className="text-[10px] text-zinc-500">Preparing order...</span>
                 </div>
              </div>
              <div className="bg-black/50 p-3 rounded-lg border border-white/5 flex items-center gap-3 transform translate-x-4 group-hover:translate-x-6 transition-transform duration-300 delay-75">
                 <div className="w-8 h-8 rounded-full border border-rose-500/30 overflow-hidden bg-rose-500/10" />
                 <div className="flex flex-col">
                    <span className="text-xs text-white">Chef Amina</span>
                    <span className="text-[10px] text-zinc-500">Cooking fresh...</span>
                 </div>
              </div>
              
              <Flame className="absolute -bottom-12 -right-8 text-rose-500/5 group-hover:scale-125 transition-transform duration-1000 origin-bottom" size={180} />
            </div>
          </motion.div>

          {/* Card 4: Quality-Verified Chefs (Horizontal 2x1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 lg:col-span-2 lg:row-span-1 group relative bg-[#13141A] border border-white/5 hover:border-white/10 rounded-3xl p-6 overflow-hidden flex flex-col sm:flex-row gap-6 items-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="flex-1 z-10 pl-2">
              <div className="w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center mb-4">
                <Star size={24} className="text-gold" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-2 text-white">Quality-Verified Chefs</h3>
              <p className="text-sm text-zinc-400 font-body leading-relaxed max-w-[280px]">
                Only the best home chefs make it onto Plokitch. Each one is strictly reviewed and rated.
              </p>
            </div>
            
            <div className="flex-1 grid grid-cols-2 gap-3 z-10 w-full sm:w-auto">
               <div className="bg-black/30 border border-white/5 p-3 rounded-xl flex flex-col items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="flex text-gold mb-1"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>
                  <span className="text-[10px] text-zinc-400">Strict Vetting</span>
               </div>
               <div className="bg-black/30 border border-white/5 p-3 rounded-xl flex flex-col items-center justify-center group-hover:bg-black/50 transition-colors">
                  <CheckCircle2 size={16} className="text-gold mb-1" />
                  <span className="text-[10px] text-zinc-400">Hygiene Checked</span>
               </div>
            </div>
            
            <Medal className="absolute -top-10 -right-10 text-gold/5 group-hover:-rotate-12 transition-transform duration-700" size={160} />
          </motion.div>

          {/* Card 5: Your Community (Small 1x1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-1 lg:col-span-1 lg:row-span-1 group relative bg-[#13141A] border border-white/5 hover:border-white/10 rounded-3xl p-6 overflow-hidden flex flex-col"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center mb-4 z-10">
              <Users size={24} className="text-blue-400" />
            </div>
            <h3 className="font-heading font-semibold text-lg mb-2 text-white z-10">Your Community</h3>
            <p className="text-sm text-zinc-400 font-body leading-relaxed z-10">
              Support local home chefs. Help a family-run kitchen grow.
            </p>
            
            <Globe className="absolute -bottom-8 -right-8 text-blue-500/10 group-hover:rotate-[30deg] transition-transform duration-1000" size={140} />
          </motion.div>

          {/* Card 6: Loyalty Rewards (Small 1x1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="md:col-span-1 lg:col-span-1 lg:row-span-1 group relative bg-[#13141A] border border-white/5 hover:border-white/10 rounded-3xl p-6 overflow-hidden flex flex-col"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="flex items-center justify-between z-10 mb-4">
               <div className="w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center">
                 <Award size={24} className="text-purple-400" />
               </div>
               <div className="bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-xs text-purple-300 font-semibold">250 pts</span>
               </div>
            </div>
            
            <h3 className="font-heading font-semibold text-lg mb-2 text-white z-10">Loyalty Rewards</h3>
            <p className="text-sm text-zinc-400 font-body leading-relaxed z-10">
              Every order earns points for discounts and free deliveries.
            </p>
            
            <Gift className="absolute -bottom-6 -right-6 text-purple-500/10 group-hover:scale-110 transition-transform duration-500" size={120} />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
