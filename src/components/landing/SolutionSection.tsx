import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function SolutionSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const features = [
    {
      emoji: "🌐",
      title: "Website yang beneran ada",
      desc: "Landing page profesional. Info bisnis, produk, kontak, lokasi — semua rapi di satu tempat.",
    },
    {
      emoji: "📍",
      title: "Nongol di Google & Maps",
      desc: "Google Business Profile kamu kita setup dan optimize. Dicari orang, langsung muncul paling atas.",
    },
    {
      emoji: "⭐",
      title: "Review yang jalan terus",
      desc: "Sistem otomatis minta review dari pelanggan. Bintangnya nambah terus, trust-nya auto naik.",
    },
    {
      emoji: "💬",
      title: "WhatsApp langsung nyambung",
      desc: "Tombol WhatsApp di website dan Google. Pelanggan mau nanya? Satu klik langsung chat.",
    },
  ];

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="absolute right-0 top-1/4 w-1/3 h-1/2 bg-primary/5 blur-[100px] rounded-full -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            className="font-display font-bold text-3xl md:text-4xl text-secondary mb-4"
          >
            Keliatan aja dulu.<br />
            Sisanya nanti.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-foreground-light max-w-xl mx-auto"
          >
            Kita handle semua hal teknis yang ribet biar bisnis kamu "ada" dan gampang dicari di internet.
          </motion.p>
        </div>

        <div className="space-y-6 relative">
          {/* Connecting line */}
          <div className="absolute left-[27px] md:left-[35px] top-8 bottom-8 w-0.5 bg-border/80 hidden sm:block"></div>

          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              className="relative flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white p-6 rounded-2xl shadow-sm border border-border/50 hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="shrink-0 relative z-10">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-background-warm flex items-center justify-center text-2xl md:text-3xl shadow-inner border border-white group-hover:bg-primary/20 transition-colors" role="img" aria-label={feature.title}>
                  {feature.emoji}
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="font-display font-bold text-xl text-secondary mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-foreground-light leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center bg-primary/10 rounded-2xl p-8 border border-primary/20"
        >
          <p className="font-display font-bold text-2xl text-secondary mb-2">
            Semua mulai <span className="text-primary">Rp999rb/bulan</span>.
          </p>
          <p className="text-foreground-light text-lg">
            Setup? Pusing mikirin teks? <strong className="text-secondary font-semibold">Kita yang kerjain semuanya.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
