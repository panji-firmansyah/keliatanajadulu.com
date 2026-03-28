import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { WaitlistForm } from "./WaitlistForm";
import { Lock } from "lucide-react";

export function CTASection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-24 bg-secondary text-white relative overflow-hidden" id="cta">
      {/* Abstract dark decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" ref={ref}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          className="font-display font-bold text-3xl md:text-5xl mb-6"
        >
          Mau jadi yang <span className="text-primary">pertama</span> keliatan?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto"
        >
          Daftar sekarang. Gratis. Kita kabarin begitu ready buat ngebantu bisnis kamu.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2 }}
        >
          <WaitlistForm id="waitlist-form-bottom" variant="dark" />
          
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="flex items-center gap-2 text-sm text-white/50">
              <Lock className="w-4 h-4" /> Gak ada spam. Serius.
            </p>
            <p className="text-sm text-white/50">
              Lebih suka chat? <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">WhatsApp kita langsung</a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
