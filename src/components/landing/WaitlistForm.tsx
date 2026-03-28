import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Loader2, ArrowRight, Share2, CheckCircle2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email("Email kamu kurang bener nih, coba cek lagi."),
});

type FormValues = z.infer<typeof formSchema>;

interface WaitlistFormProps {
  id: string;
  variant?: "light" | "dark";
}

export function WaitlistForm({ id, variant = "light" }: WaitlistFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "duplicate">("idle");
  
  const form = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema as any),
    defaultValues: { email: "" },
  });

  const joinMutation = useMutation({
    mutationFn: async (data: { email: string }) => {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw { status: res.status, data: body };
      }
      return res.json();
    },
    onSuccess: () => {
      setStatus("success");
      triggerConfetti();
    },
    onError: (error: { status?: number }) => {
      if (error.status === 409) {
        setStatus("duplicate");
        triggerConfetti();
      } else {
        form.setError("email", {
          type: "server",
          message: "Ups, ada yang ga beres. Coba lagi ya.",
        });
      }
    },
  });

  const triggerConfetti = () => {
    const end = Date.now() + 2 * 1000;
    const colors = ['#FBBF24', '#F97316', '#22C55E', '#1E293B'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const onSubmit = (data: FormValues) => {
    joinMutation.mutate(data);
  };

  const handleShareWA = () => {
    const text = encodeURIComponent("Eh, cek ini: keliatanajadulu.com — bisa bantu bisnis kamu keliatan di Google. Gue udah daftar!");
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const isDark = variant === "dark";

  return (
    <div className="w-full max-w-md mx-auto" id={id}>
      <AnimatePresence mode="wait">
        {status === "idle" ? (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <div className={`flex flex-col sm:flex-row gap-2 ${isDark ? 'sm:bg-white/10 sm:p-1.5 sm:rounded-full' : ''}`}>
              <div className="relative flex-grow">
                <Input
                  {...form.register("email")}
                  type="email"
                  placeholder="Alamat email kamu"
                  className={`w-full h-12 px-5 rounded-full outline-none transition-all duration-200 ${
                    isDark 
                      ? 'bg-white/10 sm:bg-transparent border-white/20 text-white placeholder:text-white/50 focus:border-primary focus:bg-white/15' 
                      : 'bg-white border-border/80 text-secondary focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-sm'
                  } ${form.formState.errors.email ? 'border-destructive focus:border-destructive focus:ring-destructive/10' : ''}`}
                  disabled={joinMutation.isPending}
                />
              </div>
              <Button
                type="submit"
                disabled={joinMutation.isPending}
                className={`h-12 px-6 rounded-full font-semibold transition-all duration-200 group ${
                  isDark
                    ? 'bg-primary hover:bg-primary-hover text-secondary w-full sm:w-auto'
                    : 'bg-primary hover:bg-primary-hover text-secondary shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto'
                }`}
              >
                {joinMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Lagi daftar...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Mau Keliatan!
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </div>
            {form.formState.errors.email && (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm text-left pl-4 ${isDark ? 'text-red-300' : 'text-destructive'}`}
              >
                {form.formState.errors.email.message}
              </motion.p>
            )}
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4 ${
              isDark ? 'bg-white/5 border border-white/10' : 'bg-white border border-border shadow-sm'
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isDark ? 'bg-primary/20 text-primary' : 'bg-green-100 text-green-600'}`}>
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`font-display font-bold text-xl mb-1 ${isDark ? 'text-white' : 'text-secondary'}`}>
                {status === "duplicate" ? "Email ini udah ada di list!" : "Mantap! Kamu udah di list."}
              </h3>
              <p className={isDark ? 'text-white/70' : 'text-foreground-light'}>
                {status === "duplicate" 
                  ? "Mantap, kamu cepet! Kita kabarin begitu siap launch." 
                  : "Kita kabarin begitu siap launch."}
              </p>
            </div>
            <Button 
              onClick={handleShareWA}
              variant="outline" 
              className={`rounded-full gap-2 mt-2 ${
                isDark ? 'border-white/20 text-white hover:bg-white/10' : 'border-border text-secondary hover:bg-gray-50'
              }`}
            >
              <Share2 className="w-4 h-4" />
              Share ke temen bisnis kamu
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
