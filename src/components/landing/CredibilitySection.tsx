import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function CredibilitySection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-20 bg-background-warm relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#FBBF24 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          className="inline-block px-4 py-1.5 rounded-full bg-white shadow-sm border border-border text-sm font-semibold text-foreground mb-8"
        >
          Dikembangkan oleh <span className="text-secondary">Great Tastemaker</span>
        </motion.div>

        <motion.blockquote 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.1 }}
          className="font-display font-bold text-2xl md:text-3xl text-secondary leading-snug mb-12 max-w-3xl mx-auto"
        >
          "Kita bukan agency mahal yang kasih proposal 20 halaman. Kita bikin bisnis kamu keliatan. <span className="text-primary">Titik.</span>"
        </motion.blockquote>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-8"
        >
          {['🏢 Untuk UMKM', '⚡ Setup Cepat', '💯 No Bullshit'].map((stat, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full font-medium text-secondary shadow-sm border border-white">
              {stat}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
