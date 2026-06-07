import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const SYMBOLS = ["💎", "7️⃣", "⭐", "🍀", "💰", "🔔"];
const WIN_SYMBOL = "💰";

interface Props {
  onWin: (credits: number) => void;
}

export function SlotMachine({ onWin }: Props) {
  const [reels, setReels] = useState<string[]>(["💎", "7️⃣", "⭐"]);
  const [spinning, setSpinning] = useState(false);
  const [playsLeft, setPlaysLeft] = useState(2);
  const [message, setMessage] = useState<string | null>(null);
  const playCountRef = useRef(0);

  const fireConfetti = () => {
    const end = Date.now() + 1500;
    const colors = ["#00ff9d", "#00e5ff", "#ffd700"];
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const spin = () => {
    if (spinning || playsLeft <= 0) return;
    setSpinning(true);
    setMessage(null);
    playCountRef.current += 1;
    const isWin = playCountRef.current === 2;

    // Animate random symbols
    const interval = setInterval(() => {
      setReels([
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ]);
    }, 80);

    setTimeout(() => {
      clearInterval(interval);
      if (isWin) {
        setReels([WIN_SYMBOL, WIN_SYMBOL, WIN_SYMBOL]);
        setSpinning(false);
        setPlaysLeft(0);
        setMessage("BIG WIN!");
        fireConfetti();
        setTimeout(() => onWin(250), 1400);
      } else {
        // Near miss
        setReels([WIN_SYMBOL, WIN_SYMBOL, "⭐"]);
        setSpinning(false);
        setPlaysLeft((p) => p - 1);
        setMessage("Quase! Tente novamente.");
      }
    }, 1800);
  };

  useEffect(() => {
    // Auto-spin not needed; user clicks
  }, []);

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 w-full max-w-xl mx-auto shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Lucky Spin</span>
        <span className="text-xs uppercase tracking-[0.2em] text-primary">
          {playsLeft} {playsLeft === 1 ? "rodada" : "rodadas"} restantes
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
        {reels.map((s, i) => (
          <motion.div
            key={i}
            animate={spinning ? { y: [0, -8, 0] } : { scale: message === "BIG WIN!" ? [1, 1.15, 1] : 1 }}
            transition={spinning ? { duration: 0.15, repeat: Infinity } : { duration: 0.5, repeat: message === "BIG WIN!" ? 3 : 0 }}
            className="aspect-square rounded-2xl bg-[oklch(0.1_0.01_240)] border border-primary/20 flex items-center justify-center text-5xl sm:text-7xl shadow-inner"
            style={{
              boxShadow: message === "BIG WIN!"
                ? "inset 0 0 30px oklch(0.85 0.24 150 / 0.6), 0 0 30px oklch(0.85 0.24 150 / 0.5)"
                : "inset 0 0 20px oklch(0 0 0 / 0.8)",
            }}
          >
            {s}
          </motion.div>
        ))}
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-center mb-4 text-lg font-bold ${message === "BIG WIN!" ? "text-primary glow-text" : "text-muted-foreground"}`}
        >
          {message}
        </motion.div>
      )}

      <button
        onClick={spin}
        disabled={spinning || playsLeft <= 0}
        className="btn-glow w-full py-4 rounded-2xl font-bold text-lg tracking-wider uppercase disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] animate-pulse-glow"
      >
        {spinning ? "Girando..." : playsLeft > 0 ? "Girar Agora" : "Sem rodadas"}
      </button>
    </div>
  );
}