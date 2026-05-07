import { motion } from 'framer-motion'
import { Upload, MousePointerClick, Download, Sparkles } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: Upload,
    title: 'ارفع الورقة البحثية',
    desc: 'PDF أو رابط من arXiv أو ResearchGate أو أي مصدر آخر. حد الورقة 200 صفحة في الباقة المجانية.',
    code: '1. paper.pdf  ↑ uploaded',
  },
  {
    num: '02',
    icon: MousePointerClick,
    title: 'اختر المخرج المطلوب',
    desc: 'كود · فيديو · سلايد · بوستر · بودكاست · نموذج AI. يمكنك اختيار عدة مخرجات بنفس الوقت.',
    code: '2. output: [code, video, slide]',
  },
  {
    num: '03',
    icon: Download,
    title: 'احصل على النتيجة في دقائق',
    desc: 'وكلاء الذكاء الاصطناعي يعملون معاً ويُنتجون مخرجات احترافية جاهزة للتنزيل والاستخدام مباشرة.',
    code: '3. ✓ delivered in ~1m per output',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mint-500/[0.02] to-transparent pointer-events-none" />

      <div className="container-monjez relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="chip mb-5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            ٣ خطوات بسيطة
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="heading-lg text-balance"
          >
            <span className="text-white">من ضغطة زر... إلى </span>
            <span className="text-gradient-mint">نتيجة احترافية</span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-lg text-white/65"
          >
            بدون تعقيد تقني، بدون أسابيع من العمل اليدوي. فقط ٣ خطوات واضحة.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* Connecting line - desktop */}
          <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-px">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 1">
              <line
                x1="0" y1="0.5" x2="100" y2="0.5"
                stroke="url(#step-line)" strokeWidth="1" strokeDasharray="2 2"
              />
              <defs>
                <linearGradient id="step-line">
                  <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0" />
                  <stop offset="50%" stopColor="#2DD4BF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative group"
            >
              {/* Step number badge */}
              <div className="relative mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-mint-500/30 rounded-full blur-xl group-hover:bg-mint-500/50 transition" />
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-mint-500 to-mint-700 flex items-center justify-center shadow-mint-glow ring-4 ring-ink-950">
                    <s.icon className="w-12 h-12 text-ink-950" strokeWidth={2.2} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-ink-950 border-2 border-mint-500 flex items-center justify-center font-mono text-sm font-bold text-mint-300">
                    {s.num}
                  </div>
                </div>
              </div>

              {/* Card */}
              <div className="glass rounded-2xl p-6 text-center group-hover:border-mint-500/30 transition-all">
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed mb-4">{s.desc}</p>
                <div className="text-[11px] font-mono text-mint-400/80 bg-mint-500/5 border border-mint-500/15 rounded-lg px-3 py-2">
                  {s.code}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Demo block */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="absolute -inset-4 bg-mint-500/10 rounded-3xl blur-3xl pointer-events-none" />
          <div className="relative glass-mint rounded-3xl overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.03]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-xs font-mono text-white/40">monjez.app · workspace</span>
              <div className="flex items-center gap-1.5 text-[10px] text-mint-400">
                <span className="w-1.5 h-1.5 rounded-full bg-mint-400 animate-pulse" />
                Live demo
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_1.5fr]">
              {/* Left: agent log */}
              <div className="p-6 border-l border-white/5 bg-ink-950/40">
                <div className="text-xs text-mint-400 font-mono mb-4 flex items-center justify-between">
                  <span>AGENT_LOG</span>
                  <span className="text-white/30">1:20</span>
                </div>
                <div className="space-y-2.5 font-mono text-[11px]">
                  {[
                    { t: '0:02', m: 'Parser → extracting structure...', c: 'text-mint-400' },
                    { t: '0:12', m: '✓ 14 sections found', c: 'text-emerald-400' },
                    { t: '0:20', m: 'Planner → architecting solution', c: 'text-mint-400' },
                    { t: '0:33', m: '✓ Algorithm: Transformer', c: 'text-emerald-400' },
                    { t: '0:42', m: 'Code Agent → generating Python', c: 'text-mint-400' },
                    { t: '1:06', m: '✓ 247 LOC, no errors', c: 'text-emerald-400' },
                    { t: '1:18', m: 'Reflection → quality check ✓', c: 'text-mint-400' },
                    { t: '1:20', m: '🎉 production-ready output', c: 'text-mint-300' },
                  ].map((r, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: 20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-white/30 w-10 shrink-0">{r.t}</span>
                      <span className={r.c}>{r.m}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Right: outputs preview */}
              <div className="p-6">
                <div className="text-xs text-mint-400 font-mono mb-4 flex items-center justify-between">
                  <span>READY_OUTPUTS</span>
                  <span className="text-white/30">3 of 6</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { name: 'code', color: 'from-blue-500 to-cyan-500', size: '12.4 KB' },
                    { name: 'video', color: 'from-purple-500 to-pink-500', size: '8.2 MB' },
                    { name: 'slide', color: 'from-amber-500 to-orange-500', size: '2.1 MB' },
                    { name: 'poster', color: 'from-emerald-500 to-teal-500', size: '5.7 MB', queued: true },
                    { name: 'podcast', color: 'from-rose-500 to-red-500', size: '12.0 MB', queued: true },
                    { name: 'model', color: 'from-violet-500 to-purple-500', size: '...', queued: true },
                  ].map((o, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className={`relative aspect-square rounded-xl border ${o.queued ? 'border-white/10 bg-white/[0.02]' : 'border-mint-500/30 bg-white/[0.03]'} p-3 flex flex-col`}
                    >
                      <div className={`w-full h-12 rounded-lg bg-gradient-to-br ${o.color} ${o.queued ? 'opacity-30' : ''} mb-2`} />
                      <div className="text-[10px] font-mono text-white/70">{o.name}.zip</div>
                      <div className="text-[9px] text-white/40 mt-auto">{o.size}</div>
                      {!o.queued && (
                        <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center">
                          <span className="text-[10px] text-emerald-300">✓</span>
                        </div>
                      )}
                      {o.queued && (
                        <div className="absolute top-2 left-2 text-[9px] font-mono text-white/40">queued</div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
