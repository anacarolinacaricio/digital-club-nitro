import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(80),
  email: z.string().trim().email("E-mail inválido").max(160),
  phone: z.string().trim().min(8, "WhatsApp inválido").max(20),
});

interface Props {
  open: boolean;
  credits: number;
  onClose: () => void;
}

export function LeadModal({ open, credits, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="glass-panel rounded-3xl p-6 sm:p-8 w-full max-w-md relative"
            style={{ boxShadow: "var(--shadow-card), var(--shadow-glow)" }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
              aria-label="Fechar"
            >
              ✕
            </button>

            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">🏆</div>
                  <h2 className="text-2xl sm:text-3xl font-bold glow-text text-primary mb-2">
                    PARABÉNS!
                  </h2>
                  <p className="text-foreground/90 text-sm sm:text-base">
                    Você ganhou <span className="text-primary font-bold">{credits} créditos virtuais</span>.
                    Converta agora em bônus reais e códigos VIP da plataforma.
                  </p>
                </div>

                <form onSubmit={submit} className="space-y-4">
                  <Field
                    label="Nome"
                    value={form.name}
                    onChange={(v) => setForm({ ...form, name: v })}
                    error={errors.name}
                    placeholder="Seu primeiro nome"
                  />
                  <Field
                    label="E-mail"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm({ ...form, email: v })}
                    error={errors.email}
                    placeholder="seu@email.com"
                  />
                  <Field
                    label="WhatsApp"
                    type="tel"
                    value={form.phone}
                    onChange={(v) => setForm({ ...form, phone: v })}
                    error={errors.phone}
                    placeholder="(11) 99999-9999"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-glow w-full py-4 rounded-2xl font-extrabold text-base tracking-wider uppercase hover:scale-[1.02] active:scale-[0.98] animate-pulse-glow disabled:opacity-60"
                  >
                    {loading ? "Processando..." : "Resgatar Meus Bônus Agora"}
                  </button>

                  <p className="text-[10px] text-center text-muted-foreground uppercase tracking-wider pt-1">
                    100% seguro · seus dados não são compartilhados
                  </p>
                </form>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-primary glow-text mb-3">
                  Tudo certo!
                </h3>
                <p className="text-foreground/90 leading-relaxed">
                  Verifique seu <span className="text-primary font-semibold">e-mail</span> e
                  <span className="text-primary font-semibold"> WhatsApp</span>!
                  Enviamos a lista secreta com os melhores códigos e bônus ativos do momento.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label, value, onChange, error, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void;
  error?: string; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[oklch(0.1_0.01_240)] border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition"
      />
      {error && <p className="text-destructive text-xs mt-1">{error}</p>}
    </div>
  );
}