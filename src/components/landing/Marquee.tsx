import { Star, Globe, MapPin, MessageCircle, Sparkles, Search } from "lucide-react";

export function Marquee() {
  const items = [
    { text: "Google Business Setup", icon: Sparkles },
    { text: "Website Profesional", icon: Globe },
    { text: "Review Otomatis", icon: Star },
    { text: "Google Maps", icon: MapPin },
    { text: "WhatsApp Integration", icon: MessageCircle },
    { text: "SEO Lokal", icon: Search },
  ];

  // Double the array to ensure smooth infinite scrolling
  const marqueeItems = [...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden bg-secondary py-4 relative flex items-center shadow-inner">
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-secondary to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-secondary to-transparent z-10"></div>
      
      <div className="flex whitespace-nowrap animate-[marquee_30s_linear_infinite] group hover:[animation-play-state:paused]">
        {marqueeItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center mx-6 gap-3 text-primary">
              <Icon className="w-5 h-5 fill-primary/20" />
              <span className="font-display font-bold text-lg tracking-wide">{item.text}</span>
              <span className="text-white/20 mx-6 text-xl">·</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
