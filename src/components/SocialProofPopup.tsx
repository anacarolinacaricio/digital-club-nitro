import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NAMES = [
  "Marcos S.", "Carlos T.", "Lucas F.", "Rafael M.", "Bruno A.",
  "Diego P.", "Felipe R.", "André L.", "Gustavo H.", "Thiago C.",
  "Eduardo N.", "Pedro V.", "Vinícius O.", "Matheus D.", "Ricardo B.",
];

const REWARDS = [
  "R$ 150,00", "R$ 320,00", "R$ 89,00", "R$ 500,00", "R$ 245,00",
  "Lote VIP Especial", "Rodadas Cortesia", "Bônus Premium", "Código VIP Gold",
  "Pacote Exclusivo", "R$ 1.200,00", "Kit Boas-Vindas",
];

const VERBS = ["acabou de resgatar", "acabou de liberar", "garantiu", "acabou de ativar"];

function randomMsg() {
  const n = NAMES[Math.floor(Math.random() * NAMES.length)];
  const v = VERBS[Math.floor(Math.random() * VERBS.length)];
  const r = REWARDS[Math.floor(Math.random() * REWARDS.length)];
  return `${n} ${v}: ${r}`;
}

export function SocialProofPopup() {
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const show = () => {
      if (!mounted) return;
      setMsg(randomMsg());
      setTimeout(() => mounted && setMsg(null), 4000);
    };
    const initial = setTimeout(show, 2000);
    const interval = setInterval(show, 8500);
    return () => {
      mounted = false;
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] w-full max-w-sm px-4 pointer-events-none">
      <AnimatePresence>
        {msg && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ type: "spring", damping: 18, stiffness: 200 }}
            className="glass-panel rounded-2xl px-4 py-3 flex items-center gap-3 shadow-[0_10px_40px_oklch(0_0_0/0.5)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="text-sm text-foreground/95 truncate">{msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}