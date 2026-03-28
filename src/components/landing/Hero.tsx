import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { WaitlistForm } from "./WaitlistForm";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";

function AnimatedCount({ target }: { target: number }) {
  const [displayed, setDisplayed] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!inView || target === 0) {
      setDisplayed(target);
      return;
    }

    const duration = 1200;
    const start = performance.now();
    const startVal = 0;

    const step = (now: number) => {
      const elapsed = Math.min(now - start, duration);
      const progress = elapsed / duration;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(startVal + (target - startVal) * eased));

      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplayed(target);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, target]);

  return <strong ref={ref} className="text-secondary">{displayed}</strong>;
}

export function Hero() {
  const { data: countData } = useQuery({
    queryKey: ["waitlist-count"],
    queryFn: async () => {
      const res = await fetch("/api/waitlist/count");
      if (!res.ok) return { count: 0 };
      return res.json() as Promise<{ count: number }>;
    },
  });
  const count = countData?.count ?? 0;

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="blob-shape-1"></div>
      <div className="blob-shape-2"></div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-white/50 backdrop-blur-sm text-sm text-foreground-light font-medium shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          by Great Tastemaker
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="font-display font-extrabold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] tracking-tight text-secondary mb-6 max-w-3xl"
        >
          Bisnis Kamu Bagus.<br />
          Tapi Orang <span className="marker-highlight">Belum Tau.</span>
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 mb-10"
        >
          <p className="text-lg md:text-xl text-foreground-light max-w-[480px] leading-relaxed">
            Kita bantu bisnis kamu kelihatan di Google, punya website, dan dipercaya pelanggan baru.
          </p>
          
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <div className="inline-flex items-center gap-2 bg-background-warm text-secondary px-4 py-2 rounded-full font-bold shadow-sm cursor-help border border-primary/20 hover:border-primary/50 transition-colors">
                Mulai dari Rp999rb/bulan
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-xs">i</div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="center" className="p-4 bg-secondary text-white border-none rounded-xl shadow-xl max-w-[250px]">
              <ul className="space-y-2 text-sm font-medium">
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span> Website Profesional
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span> Google Business Profile
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span> Review Otomatis
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">✓</span> Tombol WhatsApp
                </li>
                <li className="pt-2 mt-2 border-t border-white/10 font-bold text-primary">
                  = Rp999rb/bulan (All-in)
                </li>
              </ul>
            </TooltipContent>
          </Tooltip>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="w-full"
        >
          <WaitlistForm id="waitlist-form-top" />
          
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-foreground-light font-medium">
            <div className="flex -space-x-2 mr-2">
              {[1,2,3].map((i) => (
                <div key={i} className="w-6 h-6 rounded-full bg-background-warm border border-white flex items-center justify-center text-[10px] text-secondary font-bold">
                  {['👨‍🍳','👩‍🔧','👨‍💼'][i-1]}
                </div>
              ))}
            </div>
            {count > 0 ? (
              <span>Udah <AnimatedCount target={count} /> pemilik usaha yang daftar!</span>
            ) : (
              <span>Jadi yang pertama tau saat kita launch!</span>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
