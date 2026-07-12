"use client";

import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/config/site";

export function WhatsappButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 bottom-20 z-40 flex size-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated transition-transform hover:scale-110 active:scale-95 md:bottom-6"
    >
      <MessageCircle className="size-6.5 fill-white text-[#25D366]" strokeWidth={0} />
    </a>
  );
}
