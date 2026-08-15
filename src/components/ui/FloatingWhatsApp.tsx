import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/lib/content";

export function FloatingWhatsApp() {
  return (
    <a
      href={business.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-pink text-paper shadow-lg shadow-black/40 transition-transform hover:scale-105 hover:bg-pink-bright sm:right-7 sm:bottom-7"
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}
