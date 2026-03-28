import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function ProblemSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const problems = [
    {
      emoji: "🔍",
      title: "Dicari, Gak Ketemu",
      desc: "Pelanggan search di Google, yang muncul malah kompetitor kamu.",
    },
    {
      emoji: "🤷",
      title: "Ada, Tapi Gak Jelas",
      desc: "Jam buka salah, nomor HP lama, foto menu dari tahun 2019.",
    },
    {
      emoji: "⭐",
      title: "Review-nya Sepi",
      desc: "Calon pelanggan liat bintangnya kosong, langsung auto skip.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section className="py-24 bg-background-warm" id="problem">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="max-w-2xl mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="font-display font-bold text-3xl md:text-4xl text-secondary mb-6"
          >
            Coba Google nama bisnis kamu.<br />
            <span className="text-primary">Muncul gak?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-foreground-light leading-relaxed"
          >
            Kalau jawabannya "enggak" atau "muncul tapi acak-acakan"... tenang aja, kamu gak sendirian. Banyak pemilik usaha yang ngalamin ini.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex overflow-x-auto pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 snap-x snap-mandatory hide-scrollbar"
        >
          {problems.map((problem, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="min-w-[280px] sm:min-w-0 bg-white rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 snap-center group"
            >
              <div className="text-5xl mb-6 bg-background-warm w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                {problem.emoji}
              </div>
              <h3 className="font-display font-bold text-xl text-secondary mb-3">
                {problem.title}
              </h3>
              <p className="text-foreground-light leading-relaxed">
                {problem.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
