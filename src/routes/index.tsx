import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { SlotMachine } from "@/components/SlotMachine";
import { LeadModal } from "@/components/LeadModal";
import { SocialProofPopup } from "@/components/SocialProofPopup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Club VIP · Resgate Seus Bônus Exclusivos" },
      { name: "description", content: "Gire e ganhe créditos virtuais. Resgate bônus VIP e códigos exclusivos da plataforma premium." },
      { property: "og:title", content: "Club VIP · Resgate Seus Bônus Exclusivos" },
      { property: "og:description", content: "Gire, ganhe e resgate bônus VIP exclusivos." },
    ],
  }),
  component: Index,
});

function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [credits, setCredits] = useState(0);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30 bg-primary" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 bg-accent" />
      </div>

      <SocialProofPopup />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl btn-glow flex items-center justify-center font-black text-lg">V</div>
          <span className="font-bold tracking-[0.3em] text-sm uppercase">Club VIP</span>
        </div>
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground hidden sm:block">
          Acesso · Exclusivo · Premium
        </span>
      </header>

      <section className="relative z-10 px-6 sm:px-12 pt-8 pb-20 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-1.5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/90">
                Ao vivo · 2 rodadas grátis
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
              Sua entrada no
              <br />
              <span className="glow-text text-primary">Clube Premium</span>
              <br />
              começa agora.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Gire a roleta digital e desbloqueie créditos virtuais. Converta seu prêmio em
              <span className="text-foreground"> bônus reais </span> e
              <span className="text-foreground"> códigos VIP </span> da plataforma.
            </p>

            <div className="mt-8 flex flex-wrap gap-6 justify-center lg:justify-start text-xs uppercase tracking-wider text-muted-foreground">
              <div className="flex items-center gap-2"><span className="text-primary">●</span> Premiação garantida</div>
              <div className="flex items-center gap-2"><span className="text-primary">●</span> Acesso instantâneo</div>
              <div className="flex items-center gap-2"><span className="text-primary">●</span> 100% seguro</div>
            </div>
          </motion.div>

          {/* Right: Slot Machine */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SlotMachine
              onWin={(c) => {
                setCredits(c);
                setModalOpen(true);
              }}
            />
          </motion.div>
        </div>

        {/* Trust strip */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { v: "+18K", l: "Membros ativos" },
            { v: "R$ 2M+", l: "Em bônus liberados" },
            { v: "24/7", l: "Suporte premium" },
            { v: "4.9★", l: "Avaliação média" },
          ].map((s) => (
            <div key={s.l} className="glass-panel rounded-2xl py-5">
              <div className="text-2xl font-bold text-primary glow-text">{s.v}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 px-6 sm:px-12 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Club VIP · Acesso por convite · Todos os direitos reservados
      </footer>

      <LeadModal open={modalOpen} credits={credits} onClose={() => setModalOpen(false)} />
    </main>
  );
}
