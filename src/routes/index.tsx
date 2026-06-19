import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Álbum Digital · Colecione os Craques do Hexa · Copa 2026" },
      {
        name: "description",
        content:
          "A paixão continua, o sonho aumenta. Descubra as figurinhas mais raras e exclusivas da Seleção Brasileira na Copa 2026.",
      },
      { property: "og:title", content: "Álbum Digital · Craques do Hexa · Copa 2026" },
      {
        property: "og:description",
        content: "Colecione figurinhas digitais raras da Seleção Brasileira na Copa 2026.",
      },
    ],
  }),
  component: Index,
});

const REDIRECT_URL = "https://raspamilhao.lat";
const goRedirect = () => window.open(REDIRECT_URL, "_blank", "noopener,noreferrer");

type Sticker = {
  name: string;
  number: string;
  position: string;
  rarity: "LENDÁRIO" | "ÉPICO" | "RARO";
  stats: { label: string; value: string }[];
  emblem: string;
  bg: string;
  visual: string;
};

const stickers: Sticker[] = [
  {
    name: "NEYMAR JR",
    number: "10",
    position: "Atacante",
    rarity: "LENDÁRIO",
    stats: [
      { label: "VEL", value: "94" },
      { label: "DRI", value: "97" },
      { label: "FIN", value: "92" },
      { label: "PAS", value: "90" },
    ],
    emblem: "★",
    visual: "⚽",
    bg: "radial-gradient(circle at 30% 20%, oklch(0.55 0.18 90 / 0.45), transparent 60%), linear-gradient(180deg, oklch(0.18 0.02 80), oklch(0.09 0.01 60))",
  },
  {
    name: "VINICIUS JR",
    number: "07",
    position: "Ponta Esquerda",
    rarity: "ÉPICO",
    stats: [
      { label: "VEL", value: "96" },
      { label: "DRI", value: "95" },
      { label: "FIN", value: "88" },
      { label: "PAS", value: "85" },
    ],
    emblem: "◆",
    visual: "⚡",
    bg: "radial-gradient(circle at 70% 20%, oklch(0.65 0.2 145 / 0.4), transparent 60%), linear-gradient(180deg, oklch(0.18 0.02 80), oklch(0.09 0.01 60))",
  },
  {
    name: "SELEÇÃO BRASILEIRA",
    number: "CBF",
    position: "5x Campeã do Mundo",
    rarity: "LENDÁRIO",
    stats: [
      { label: "1958", value: "★" },
      { label: "1962", value: "★" },
      { label: "1970", value: "★" },
      { label: "94/02", value: "★★" },
    ],
    emblem: "✪",
    visual: "🛡",
    bg: "radial-gradient(circle at 50% 30%, oklch(0.65 0.2 145 / 0.5), transparent 65%), linear-gradient(180deg, oklch(0.16 0.02 80), oklch(0.08 0.01 60))",
  },
];

function StickerCard({ s, idx }: { s: Sticker; idx: number }) {
  return (
    <motion.button
      onClick={goRedirect}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      whileHover={{ y: -8 }}
      className="group card-gold holo-shine holo-sweep relative rounded-2xl p-1 text-left cursor-pointer"
      aria-label={`Figurinha ${s.name}`}
    >
      <div
        className="relative rounded-xl p-5 overflow-hidden min-h-[420px] flex flex-col"
        style={{ background: s.bg }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black tracking-[0.25em] px-2.5 py-1 rounded-full text-gold-gradient border border-primary/40 bg-black/40">
            {s.rarity}
          </span>
          <span className="text-2xl text-primary glow-text">{s.emblem}</span>
        </div>

        <div className="flex items-end justify-between">
          <div
            className="text-7xl font-black leading-none text-gold-gradient animate-shimmer"
            style={{ backgroundImage: "var(--gradient-gold)" }}
          >
            {s.number}
          </div>
          <div className="w-14 h-14 rounded-full border-2 border-primary/60 flex items-center justify-center text-xs font-bold text-primary bg-black/50">
            BRA
          </div>
        </div>

        <div className="my-4 h-32 rounded-lg border border-primary/20 bg-gradient-to-b from-accent/10 to-transparent flex items-center justify-center">
          <div className="text-6xl opacity-60">{s.visual}</div>
        </div>

        <div className="mt-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {s.position}
          </div>
          <h3 className="text-xl font-black tracking-wide text-gold-gradient mt-1">
            {s.name}
          </h3>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {s.stats.map((st) => (
              <div
                key={st.label}
                className="text-center rounded-md bg-black/40 border border-primary/20 py-1.5"
              >
                <div className="text-sm font-black text-primary">{st.value}</div>
                <div className="text-[9px] tracking-widest text-muted-foreground">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[520px] h-[520px] rounded-full blur-[140px] opacity-30 bg-primary" />
        <div className="absolute bottom-0 right-1/4 w-[440px] h-[440px] rounded-full blur-[140px] opacity-20 bg-accent" />
        <div
          className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(oklch(0.92 0.18 95 / 0.6) 1px, transparent 1px)",
            backgroundSize: "3px 3px",
          }}
        />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl btn-glow flex items-center justify-center font-black text-lg">
            ★
          </div>
          <span className="font-bold tracking-[0.3em] text-sm uppercase">
            Álbum Hexa 2026
          </span>
        </div>
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground hidden sm:block">
          Edição · Limitada · Coleção
        </span>
      </header>

      <section className="relative z-10 px-6 sm:px-12 pt-6 pb-12 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-1.5 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/90">
              Coleção Oficial · Copa 2026
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight">
            <span
              className="block text-gold-gradient animate-shimmer glow-text"
              style={{ backgroundImage: "var(--gradient-gold)" }}
            >
              ÁLBUM DIGITAL
            </span>
            <span className="block text-foreground/95 mt-3 text-2xl sm:text-3xl lg:text-4xl">
              Colecione os{" "}
              <span
                className="text-gold-gradient font-black"
                style={{ backgroundImage: "var(--gradient-gold)" }}
              >
                Craques do Hexa
              </span>
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-foreground/80 max-w-2xl mx-auto">
            A paixão continua, o sonho aumenta. Descubra as figurinhas mais{" "}
            <span className="text-primary font-semibold">raras e exclusivas</span> da
            Seleção Brasileira na Copa 2026.
          </p>
        </motion.div>
      </section>

      <section className="relative z-10 px-6 sm:px-12 pb-20 max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {stickers.map((s, i) => (
            <StickerCard key={s.name} s={s} idx={i} />
          ))}
        </div>
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mt-8">
          Toque em qualquer figurinha para revelar a coleção completa
        </p>
      </section>

      <section className="relative z-10 px-6 sm:px-12 pb-24 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden"
        >
          <div className="text-[10px] uppercase tracking-[0.4em] text-primary mb-3">
            Experiência Interativa
          </div>
          <h2
            className="text-3xl sm:text-4xl font-black text-gold-gradient"
            style={{ backgroundImage: "var(--gradient-gold)" }}
          >
            Abra um Pacotinho Teste
          </h2>
          <p className="mt-3 text-foreground/75 max-w-md mx-auto">
            Sinta a emoção de revelar craques lendários. Seu primeiro pacote da Copa
            2026 está esperando.
          </p>

          <motion.button
            onClick={goRedirect}
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.97 }}
            className="relative mx-auto mt-8 block group"
            aria-label="Abrir pacote premium"
          >
            <div className="absolute -inset-6 rounded-3xl bg-primary/30 blur-2xl animate-pulse-glow" />
            <div
              className="relative w-48 h-64 sm:w-56 sm:h-72 rounded-2xl border-2 border-primary/70 flex flex-col items-center justify-center overflow-hidden mx-auto"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.2 145) 0%, oklch(0.18 0.02 80) 50%, oklch(0.82 0.16 85) 100%)",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              <div className="absolute inset-0 holo-shine holo-sweep" />
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent 0 8px, oklch(1 0 0 / 0.1) 8px 9px)",
                }}
              />
              <div className="relative text-center px-4">
                <div className="text-[9px] tracking-[0.4em] text-black/80 font-black">
                  COPA · 2026
                </div>
                <div className="text-5xl font-black mt-2 text-black drop-shadow">★</div>
                <div className="mt-2 text-lg font-black tracking-wider text-black">
                  BRASIL
                </div>
                <div className="text-[10px] tracking-[0.3em] text-black/70 mt-1">
                  PACOTE PREMIUM
                </div>
                <div className="mt-4 inline-block px-3 py-1 rounded-full bg-black/70 text-primary text-[10px] font-bold tracking-widest">
                  5 FIGURINHAS
                </div>
              </div>
            </div>
          </motion.button>

          <motion.button
            onClick={goRedirect}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="btn-glow animate-pulse-glow mt-10 inline-flex items-center justify-center px-8 sm:px-12 py-5 rounded-2xl font-black text-sm sm:text-lg tracking-wider uppercase w-full sm:w-auto"
          >
            ⚡ Abrir Meu Pacote Premium Agora
          </motion.button>

          <div className="mt-6 flex flex-wrap gap-4 justify-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <span>● Acesso Imediato</span>
            <span className="text-primary">● Edição Limitada</span>
            <span>● 100% Digital</span>
          </div>
        </motion.div>
      </section>

      <footer className="relative z-10 px-6 sm:px-12 py-8 text-center text-xs text-muted-foreground border-t border-primary/10">
        © {new Date().getFullYear()} Álbum Hexa 2026 · Coleção digital de figurinhas ·
        Brasil
      </footer>
    </main>
  );
}