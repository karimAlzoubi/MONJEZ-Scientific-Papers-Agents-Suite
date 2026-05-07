import { motion } from 'framer-motion'
import { Code2, Video, Image as ImageIcon, Mic, Presentation, Brain, Sparkles, ChevronLeft } from 'lucide-react'
import { useState } from 'react'

const solutions = [
  {
    id: 'code',
    icon: Code2,
    name: 'مُنجِز كود',
    en: 'MonjezCode',
    tag: 'Python · JS',
    color: 'from-blue-500 via-cyan-500 to-teal-500',
    bgGlow: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    short: 'تحويل الخوارزميات في الورقة إلى كود برمجي منظم وقابل للتشغيل بدون عشوائية.',
    bullets: [
      'استخراج الخوارزميات وتوليد كود (Python/JS)',
      'هيكلة منظمة: Planning → Analyzing → Coding',
      'كود مُتحقَّق منه وجاهز للإنتاج',
    ],
    preview: <CodePreview />,
  },
  {
    id: 'video',
    icon: Video,
    name: 'مُنجِز فيديو',
    en: 'MonjezVideo',
    tag: 'Code-Driven',
    color: 'from-purple-500 via-fuchsia-500 to-pink-500',
    bgGlow: 'bg-purple-500/20',
    border: 'border-purple-500/30',
    short: 'إخراج مرئي تفاعلي للبحث ببرمجة حركية لتجسيد أصعب المعادلات والمجسمات.',
    bullets: [
      'تحويل البحث إلى فيديو متكامل في دقائق',
      'برمجة حركية (Code-Driven) للمعادلات',
      'نظام Reflection Agent لضمان الجودة',
    ],
    preview: <VideoPreview />,
  },
  {
    id: 'slide',
    icon: Presentation,
    name: 'مُنجِز سلايد',
    en: 'MonjezSlide',
    tag: '4-Stage AI Pipeline',
    color: 'from-amber-500 via-orange-500 to-red-500',
    bgGlow: 'bg-amber-500/20',
    border: 'border-amber-500/30',
    short: 'تحويل المستندات إلى عروض تقديمية احترافية بألوان وثيمات قابلة للتخصيص.',
    bullets: [
      'RAG → Analysis → Planning → Creation',
      'ثيمات: Academic · Minimal · Corporate · Modern',
      'Style Engine بلغة طبيعية',
    ],
    preview: <SlidePreview />,
  },
  {
    id: 'poster',
    icon: ImageIcon,
    name: 'مُنجِز بوستر',
    en: 'MonjezPoster',
    tag: 'Print-Ready',
    color: 'from-emerald-500 via-teal-500 to-mint-500',
    bgGlow: 'bg-emerald-500/20',
    border: 'border-emerald-500/30',
    short: 'استخراج وتنسيق ملصقات علمية احترافية جاهزة للطباعة والمؤتمرات العالمية.',
    bullets: [
      'Parser → Planner → Painter-Commenter',
      'تخطيط ذكي مع Layout Generation',
      'إخراج PPTX جاهز للطباعة',
    ],
    preview: <PosterPreview />,
  },
  {
    id: 'podcast',
    icon: Mic,
    name: 'مُنجِز بودكاست',
    en: 'MonjezPodcast',
    tag: 'Multi-Voice TTS',
    color: 'from-rose-500 via-red-500 to-orange-500',
    bgGlow: 'bg-rose-500/20',
    border: 'border-rose-500/30',
    short: 'تحويل الورقة البحثية إلى حوار مسموع تفاعلي بين مضيف وضيف خبير.',
    bullets: [
      'Parser → Dialogue → TTS → Final Output',
      'دعم متعدد اللغات والأصوات',
      'MP3 + Transcript جاهز للنشر',
    ],
    preview: <PodcastPreview />,
  },
  {
    id: 'models',
    icon: Brain,
    name: 'نماذج AI جاهزة',
    en: 'AI Models',
    tag: 'Theory → Model',
    color: 'from-violet-500 via-purple-500 to-indigo-500',
    bgGlow: 'bg-violet-500/20',
    border: 'border-violet-500/30',
    short: 'تحويل النظريات في الورقة إلى نماذج ذكاء اصطناعي جاهزة للتطبيق والاختبار.',
    bullets: [
      'تحويل النظريات إلى نماذج AI قابلة للتطبيق',
      'تكامل سلس مع مكتبات الـ ML الشهيرة',
      'استدعاء عبر API بسيط',
    ],
    preview: <ModelsPreview />,
  },
]

export default function Solutions() {
  const [active, setActive] = useState(solutions[0].id)
  const activeItem = solutions.find((s) => s.id === active)!

  return (
    <section id="solutions" className="relative py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint-500/40 to-transparent" />
      <div className="container-monjez">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="chip mb-5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            ٦ مخرجات من ورقة واحدة
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="heading-lg text-balance"
          >
            <span className="text-white">من ورقة بحثية واحدة...</span>{' '}
            <span className="text-gradient-mint">إلى عالم من المخرجات</span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-lg text-white/65"
          >
            نظام متكامل من وكلاء ذكاء اصطناعي يعملون معاً لتحويل ورقتك إلى تطبيقات عملية جاهزة.
          </motion.p>
        </div>

        {/* Tabs + Preview */}
        <div className="grid lg:grid-cols-[1.05fr_1.4fr] gap-6 lg:gap-10 items-start">
          {/* Cards list */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {solutions.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ x: 30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                onClick={() => setActive(s.id)}
                className={`group relative text-right p-5 rounded-2xl border transition-all overflow-hidden ${
                  active === s.id
                    ? `glass ${s.border} shadow-mint-glow`
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                {active === s.id && (
                  <motion.div
                    layoutId="active-bg"
                    className={`absolute inset-0 ${s.bgGlow} opacity-30`}
                  />
                )}
                <div className="relative flex items-start gap-4">
                  <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg ring-1 ring-white/10`}>
                    <s.icon className="w-6 h-6 text-white" strokeWidth={2.2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-white">{s.name}</h3>
                      <span className="text-[10px] font-mono text-mint-400/80 px-2 py-0.5 rounded-full bg-mint-500/10 border border-mint-500/20">
                        {s.tag}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm text-white/60 line-clamp-2">{s.short}</p>
                  </div>
                  <ChevronLeft className={`shrink-0 w-5 h-5 text-mint-400 transition-transform ${active === s.id ? '-translate-x-1' : 'opacity-50'}`} />
                </div>
              </motion.button>
            ))}
          </div>

          {/* Preview pane */}
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative lg:sticky lg:top-28"
          >
            <div className={`absolute -inset-2 ${activeItem.bgGlow} rounded-3xl blur-3xl opacity-60`} />
            <div className={`relative glass rounded-3xl overflow-hidden ${activeItem.border}`}>
              {/* Header bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
                <span className="text-xs font-mono text-white/40">monjez.app/{activeItem.id}</span>
                <div className="w-12" />
              </div>

              {/* Content area */}
              <div className="p-6 lg:p-8">
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeItem.color} flex items-center justify-center shadow-xl ring-1 ring-white/10`}>
                    <activeItem.icon className="w-7 h-7 text-white" strokeWidth={2.2} />
                  </div>
                  <div>
                    <div className="text-xs text-mint-400 font-mono">{activeItem.en}</div>
                    <h3 className="text-2xl font-bold text-white">{activeItem.name}</h3>
                  </div>
                </div>

                <p className="text-white/75 leading-relaxed mb-5">{activeItem.short}</p>

                <ul className="space-y-2 mb-6">
                  {activeItem.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/80">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br ${activeItem.color} shrink-0`} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Visual preview */}
                <div className="rounded-xl overflow-hidden border border-white/10 bg-ink-950">
                  {activeItem.preview}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ====== Mini previews ====== */

function CodePreview() {
  return (
    <div className="p-5 font-mono text-[12px] leading-relaxed">
      <div className="flex items-center gap-2 text-white/40 text-xs mb-3 pb-2 border-b border-white/5">
        <Code2 className="w-3.5 h-3.5" />
        model.py
      </div>
      <div className="space-y-1">
        <div><span className="text-pink-400">class</span> <span className="text-amber-300">Transformer</span><span className="text-white/60">(nn.Module):</span></div>
        <div className="pr-4"><span className="text-pink-400">def</span> <span className="text-cyan-300">__init__</span><span className="text-white/60">(self, d_model, n_heads):</span></div>
        <div className="pr-8"><span className="text-white/60">super().__init__()</span></div>
        <div className="pr-8"><span className="text-white/60">self.attn = </span><span className="text-amber-300">MultiHeadAttention</span><span className="text-white/60">(d_model, n_heads)</span></div>
        <div className="pr-8"><span className="text-white/60">self.pos_enc = </span><span className="text-amber-300">PositionalEncoding</span><span className="text-white/60">(d_model)</span> <span className="text-emerald-400/70"># ✓ verified</span></div>
        <div className="pr-8"><span className="text-white/60">self.optim = optim.</span><span className="text-amber-300">Adam</span><span className="text-white/60">(lr=lr)</span> <span className="text-emerald-400/70"># ✓ verified</span></div>
      </div>
      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40">
        <span>Production-ready · Tested</span>
        <span className="text-mint-400">12.4s</span>
      </div>
    </div>
  )
}

function VideoPreview() {
  return (
    <div className="aspect-video relative bg-gradient-to-br from-purple-900/40 to-pink-900/40 flex items-center justify-center">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 225">
        <path d="M 50 180 Q 150 50 250 120 T 350 90" stroke="#c084fc" strokeWidth="2" fill="none" />
        <circle cx="50" cy="180" r="4" fill="#fff" />
        <circle cx="250" cy="120" r="4" fill="#fff" />
        <circle cx="350" cy="90" r="4" fill="#fff" />
      </svg>
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-2xl">
          <div className="w-0 h-0 border-y-[10px] border-y-transparent border-r-[14px] border-r-purple-600 mr-1" />
        </div>
        <span className="text-xs text-white/80 font-mono">scene_3 · Transformer Architecture</span>
      </div>
      <div className="absolute bottom-3 left-3 right-3 h-1 bg-white/15 rounded-full overflow-hidden">
        <div className="h-full w-2/5 bg-gradient-to-r from-purple-400 to-pink-400" />
      </div>
    </div>
  )
}

function SlidePreview() {
  return (
    <div className="p-4 grid grid-cols-3 gap-2.5">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`aspect-video rounded-md border ${i === 1 ? 'border-amber-500/60 ring-2 ring-amber-500/30' : 'border-white/10'} bg-gradient-to-br from-ink-800 to-ink-900 p-2 relative`}
        >
          <div className="h-1 w-1/2 bg-amber-500/60 rounded-full mb-1" />
          <div className="h-0.5 w-3/4 bg-white/20 rounded-full mb-0.5" />
          <div className="h-0.5 w-2/3 bg-white/15 rounded-full mb-0.5" />
          <div className="h-0.5 w-1/2 bg-white/15 rounded-full" />
          {i === 1 && (
            <div className="absolute inset-0 flex items-center justify-center text-[8px] text-amber-400 font-bold">
              ▶ Active
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function PosterPreview() {
  return (
    <div className="aspect-[3/4] p-4 bg-gradient-to-br from-emerald-900/30 to-teal-900/30 relative">
      <div className="h-full bg-white/[0.02] border border-emerald-500/20 rounded-md p-3 flex flex-col gap-2">
        <div className="h-2 bg-emerald-400/60 rounded-full w-1/2 mx-auto" />
        <div className="h-1 bg-white/30 rounded-full w-3/4 mx-auto" />
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="aspect-square rounded bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-emerald-400/60" />
          </div>
          <div className="space-y-1.5 py-1">
            <div className="h-1 bg-white/20 rounded-full w-full" />
            <div className="h-1 bg-white/15 rounded-full w-5/6" />
            <div className="h-1 bg-white/15 rounded-full w-4/5" />
            <div className="h-1 bg-white/15 rounded-full w-3/5" />
          </div>
        </div>
        <div className="h-1 bg-white/15 rounded-full w-full mt-1" />
        <div className="h-1 bg-white/15 rounded-full w-5/6" />
        <div className="grid grid-cols-3 gap-1 mt-auto">
          <div className="h-6 bg-emerald-500/15 rounded" />
          <div className="h-6 bg-emerald-500/15 rounded" />
          <div className="h-6 bg-emerald-500/15 rounded" />
        </div>
      </div>
    </div>
  )
}

function PodcastPreview() {
  return (
    <div className="p-5 space-y-3">
      <div className="flex items-center gap-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-xs font-bold">H</div>
        <div className="flex-1">
          <div className="text-xs font-semibold text-rose-300">Host</div>
          <div className="text-xs text-white/70">سؤالي الأول: ما هي الفكرة الأساسية...</div>
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-xs font-bold">G</div>
        <div className="flex-1">
          <div className="text-xs font-semibold text-orange-300">Guest</div>
          <div className="text-xs text-white/70">في هذه الورقة، طوّرنا منهجية جديدة...</div>
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03]">
        <div className="flex items-center gap-0.5 h-6 flex-1">
          {[3, 6, 4, 8, 5, 9, 4, 7, 3, 6, 5, 8, 4, 7, 5, 9, 6, 4, 8, 5].map((h, i) => (
            <div key={i} className="flex-1 bg-rose-400/60 rounded-full" style={{ height: `${h * 8}%` }} />
          ))}
        </div>
        <span className="text-[10px] text-white/50 font-mono">02:34 / 18:42</span>
      </div>
    </div>
  )
}

function ModelsPreview() {
  return (
    <div className="p-5 space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/60 font-mono">paper_model.pkl</span>
        <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 text-[10px] font-bold">READY</span>
      </div>
      <div className="space-y-2.5">
        {[
          { l: 'Input Layer', n: '512', c: 'from-violet-400 to-purple-500' },
          { l: 'Hidden × 6', n: '2048', c: 'from-purple-400 to-fuchsia-500' },
          { l: 'Attention Heads', n: '8', c: 'from-fuchsia-400 to-pink-500' },
          { l: 'Output', n: '10', c: 'from-pink-400 to-rose-500' },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-28 text-xs text-white/60">{row.l}</span>
            <div className="flex-1 h-7 rounded-md bg-white/5 relative overflow-hidden">
              <div className={`h-full bg-gradient-to-r ${row.c} opacity-70`} style={{ width: `${50 + i * 12}%` }} />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-white">{row.n}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-white/40 flex justify-between">
        <span>accuracy: 94.2%</span>
        <span className="text-mint-400">model.fit(data) ✓</span>
      </div>
    </div>
  )
}
