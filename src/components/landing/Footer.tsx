import { Instagram, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <span className="font-display font-bold text-xl text-white">
            Keliatan <span className="text-primary">Aja Dulu</span>
          </span>
          <p className="text-white/50 text-sm mt-2">
            by Great Tastemaker &copy; {new Date().getFullYear()}
          </p>
        </div>
        
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-secondary transition-all">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary hover:text-secondary transition-all">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.64-5.5-.09-1.07.03-2.18.42-3.15.54-1.41 1.54-2.58 2.82-3.23 1.14-.61 2.45-.82 3.73-.7v4.06c-1.41-.01-2.82.47-3.76 1.56-.8.88-1.1 2.12-.86 3.29.21 1.14 1.01 2.12 2.05 2.58 1.11.51 2.45.54 3.59.08 1.05-.4 1.92-1.22 2.37-2.22.34-.74.45-1.56.45-2.36V.02h3.81Z" />
            </svg>
          </a>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-green-500 hover:text-white transition-all">
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
