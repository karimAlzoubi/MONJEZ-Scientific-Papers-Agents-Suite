import { motion } from 'framer-motion'
import { Eye, Sparkles, Code2, Video, Mic, Presentation, Image as ImageIcon, Brain, FileText } from 'lucide-react'
import NeuralBackground from './NeuralBackground'
import SponsorsBar from './SponsorsBar'

const outputs = [
  { icon: Code2,        label: 'كود',       desc: 'Python جاهز للتشغيل',     color: 'from-blue-400 to-cyan-400'      },
  { icon: Video,        label: 'فيديو',     desc: 'مشاهد متحركة شارحة',      color: 'from-purple-400 to-pink-400'    },
  { icon: Presentation, label: 'سلايد',     desc: 'PowerPoint احترافي',      color: 'from-amber-400 to-orange-400'   },
  { icon: ImageIcon,    label: 'بوستر',     desc: 'A1 جاهز للطباعة',         color: 'from-emerald-400 to-teal-400'   },
  { icon: Mic,          label: 'بودكاست',   desc: 'حوار صوتي طبيعي',         color: 'from-rose-400 to-red-400'       },
  { icon: Brain,        label: 'AI Models', desc: 'API مع بطاقة تقنية',      color: 'from-violet-400 to-fuchsia-400' },
]

function scrollToTry(preview = false) {
  const el = document.getElementById('try')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (preview) {
      // Wait for scroll to complete then trigger preview
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('monjez:open-preview'))
      }, 600)
    }
  }
}

export default function Hero() {
  return (
    <section className="relative pt-28 lg:pt-32 pb-12 overflow-hidden">
      <NeuralBackground />

      {/* Soft glow orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-mint-500/20 rounded-full blur-3xl animate-aurora pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-[28rem] h-[28rem] bg-mint-700/15 rounded-full blur-3xl animate-aurora pointer-events-none" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-40 bg-mint-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-monjez relative z-10">
        <SponsorsBar variant="hero" />

        {/* Main heading */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ lineHeight: 1.25 }}
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold tracking-tight text-center text-balance"
        >
          <span className="text-white">نَبْثُ الحياة في </span>
          <span className="relative inline-block">
            <span className="text-gradient-mint">الأوراق البحثية</span>
            <svg className="absolute -bottom-1 left-0 w-full h-2 text-mint-500/60" viewBox="0 0 200 12" preserveAspectRatio="none">
              <path d="M2 8 Q 50 2, 100 6 T 198 6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          <br className="hidden sm:block" />
          <span className="text-white"> ونضع </span>
          <span className="relative inline-block">
            <span className="text-gradient-mint">الابتكار</span>
            <svg className="absolute -bottom-1 left-0 w-full h-2 text-mint-500/60" viewBox="0 0 200 12" preserveAspectRatio="none">
              <path d="M2 8 Q 50 2, 100 6 T 198 6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-white"> بين يديك</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-7 text-lg sm:text-xl text-white/70 text-center max-w-2xl mx-auto leading-relaxed text-balance"
        >
          ارفع ورقتك البحثية واحصل على <span className="text-mint-300 font-semibold">6 مخرجات عملية</span> في{' '}
          <span className="text-mint-300 font-semibold">دقائق قليلة</span>.
        </motion.p>

        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 text-sm sm:text-[15px] text-white/55"
        >
          {['كود', 'فيديو', 'بوستر', 'عرض', 'بودكاست', 'نموذج AI'].map((item, i) => (
            <span key={item} className="flex items-center gap-2.5">
              <span className="font-medium tracking-wide">{item}</span>
              {i < 5 && <span className="w-1 h-1 rounded-full bg-mint-400/60" />}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button onClick={() => scrollToTry(false)} className="btn-primary text-base">
            <Sparkles className="w-5 h-5" />
            جرّب مُنجِز مجاناً
          </button>
          <button onClick={() => scrollToTry(true)} className="btn-ghost text-base">
            <Eye className="w-5 h-5" />
            معاينة عينة جاهزة
          </button>
        </motion.div>

        {/* Visualization: Paper → 6 Outputs */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-20 lg:mt-24 relative"
        >
          {/* Section header */}
          <div className="text-center mb-12 sm:mb-14 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mint-500/10 border border-mint-500/30 backdrop-blur mb-5">
              <Sparkles className="w-3.5 h-3.5 text-mint-400" />
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-mint-300">كيف يحوّل مُنجِز ورقتك</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              ورقة واحدة
              <span className="inline-flex items-center mx-2 sm:mx-3 text-mint-400 text-2xl sm:text-3xl">←</span>
              <span className="text-gradient-mint">ستة مخرجات</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/60">
              يحلّل المنهجية، يستخرج النتائج، ويولّد كل المخرجات بالذكاء الاصطناعي.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Animated flow curves (desktop only) */}
            <FlowCurves />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-16 lg:items-stretch items-center">
              {/* Left outputs */}
              <div className="hidden lg:flex flex-col justify-evenly items-center">
                {outputs.slice(0, 3).map((o, i) => (
                  <OutputBubble key={i} {...o} delay={0.8 + i * 0.1} side="left" />
                ))}
              </div>

              {/* Center: Paper card */}
              <div className="flex items-center justify-center">
                <PaperCard />
              </div>

              {/* Right outputs */}
              <div className="hidden lg:flex flex-col justify-evenly items-center">
                {outputs.slice(3).map((o, i) => (
                  <OutputBubble key={i} {...o} delay={1.1 + i * 0.1} side="right" />
                ))}
              </div>
            </div>

            {/* Mobile outputs */}
            <div className="lg:hidden mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 justify-items-center">
              {outputs.map((o, i) => (
                <OutputBubble key={i} {...o} delay={0.8 + i * 0.05} side="bottom" />
              ))}
            </div>
          </div>

          {/* Process steps caption */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-3"
          >
            {[
              { n: '1', label: 'اكتشاف الموضوع' },
              { n: '2', label: 'تحليل المنهجية' },
              { n: '3', label: 'توليد المخرجات' },
            ].map((step, i, arr) => (
              <div key={step.n} className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-mint-500/15 border border-mint-500/40 flex items-center justify-center text-xs font-bold text-mint-300 shadow-[0_0_20px_rgba(45,212,191,0.15)]">
                    {step.n}
                  </span>
                  <span className="text-sm text-white/70 font-medium">{step.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <span className="hidden sm:block w-8 h-px bg-gradient-to-l from-transparent via-mint-500/40 to-transparent" />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

function FlowCurves() {
  /* Single origin point per side at center of paper edge (666, 200) and (334, 200).
     Three curves fan out from each origin to top/mid/bot outputs.

     Layout map (viewBox 0..1000 / 0..400):
     - Paper edges:      x=334 (left) | x=666 (right)
     - Box near-edges:   x=278 (left col, right edge) | x=722 (right col, left edge)
     - Output rows:      y=85 (top), y=200 (mid), y=315 (bot)
     - Curves end slightly INSIDE box area (x=735/265) so the arrowhead lands at
       the box edge and clearly indicates "data enters here". */
  const curves = [
    // Right side - all 3 emerge from (666, 200), fan out
    { id: 'flow-r-top', d: 'M 666 200 C 695 200, 705 90,  735 85',  delay: '0s'   },
    { id: 'flow-r-mid', d: 'M 666 200 L 760 200',                   delay: '0.35s'},
    { id: 'flow-r-bot', d: 'M 666 200 C 695 200, 705 310, 735 315', delay: '0.7s' },
    // Left side - mirrored, all from (334, 200)
    { id: 'flow-l-top', d: 'M 334 200 C 305 200, 295 90,  265 85',  delay: '0.15s'},
    { id: 'flow-l-mid', d: 'M 334 200 L 240 200',                   delay: '0.5s' },
    { id: 'flow-l-bot', d: 'M 334 200 C 305 200, 295 310, 265 315', delay: '0.85s'},
  ]

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0"
      viewBox="0 0 1000 400"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        {/* Bright at paper origin (start), fading toward output box (end).
            userSpaceOnUse so horizontal straight lines (zero bbox height) still render gradient correctly. */}
        <linearGradient id="flow-grad-r" x1="666" y1="200" x2="760" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="rgb(167, 243, 208)" stopOpacity="1"    />
          <stop offset="100%" stopColor="rgb(45, 212, 191)"  stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="flow-grad-l" x1="334" y1="200" x2="240" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="rgb(167, 243, 208)" stopOpacity="1"    />
          <stop offset="100%" stopColor="rgb(45, 212, 191)"  stopOpacity="0.45" />
        </linearGradient>
        {/* Subtle arrowhead at the box end */}
        <marker id="arrow-tip" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 Z" fill="rgb(45, 212, 191)" opacity="0.6" />
        </marker>
      </defs>

      {/* Curves — bright at paper origin, fading toward box */}
      {curves.map((c) => {
        const isRight = c.id.startsWith('flow-r')
        return (
          <path
            key={c.id}
            id={c.id}
            d={c.d}
            stroke={`url(#flow-grad-${isRight ? 'r' : 'l'})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            markerEnd="url(#arrow-tip)"
          />
        )
      })}

      {/* SINGLE prominent origin halo per side — clearly the START point on the paper */}
      <g>
        {/* Right side origin */}
        <circle cx="666" cy="200" r="20" fill="rgb(94, 234, 212)" opacity="0.15">
          <animate attributeName="r"       values="14;24;14" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.05;0.3" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="666" cy="200" r="11" fill="rgb(94, 234, 212)" opacity="0.35" />
        <circle cx="666" cy="200" r="6.5" fill="rgb(167, 243, 208)" opacity="0.95" />
        <circle cx="666" cy="200" r="3" fill="white" />

        {/* Left side origin */}
        <circle cx="334" cy="200" r="20" fill="rgb(94, 234, 212)" opacity="0.15">
          <animate attributeName="r"       values="14;24;14" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0.05;0.3" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="334" cy="200" r="11" fill="rgb(94, 234, 212)" opacity="0.35" />
        <circle cx="334" cy="200" r="6.5" fill="rgb(167, 243, 208)" opacity="0.95" />
        <circle cx="334" cy="200" r="3" fill="white" />
      </g>

      {/* Traveling pulses */}
      {curves.map((c) => (
        <circle key={`pulse-${c.id}`} r="4" fill="rgb(204, 251, 241)" opacity="0">
          <animateMotion dur="2.2s" repeatCount="indefinite" begin={c.delay}>
            <mpath href={`#${c.id}`} />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.15;0.85;1"
            dur="2.2s"
            repeatCount="indefinite"
            begin={c.delay}
          />
        </circle>
      ))}
    </svg>
  )
}

function PaperCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      {/* Glow */}
      <div className="absolute -inset-6 bg-mint-500/20 rounded-3xl blur-2xl animate-pulse-slow" />

      <div className="relative bg-gradient-to-br from-ink-800 to-ink-900 border border-mint-500/30 rounded-3xl p-7 shadow-mint-glow-lg">
        {/* "Input" label */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-ink-900 border border-mint-500/40 text-[10px] font-bold tracking-[0.2em] uppercase text-mint-300">
          الإدخال
        </div>

        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-mint-500/15 border border-mint-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5 text-mint-400" />
            </div>
            <div>
              <div className="text-xs text-mint-400 font-mono">paper.pdf</div>
              <div className="text-[10px] text-white/40">2.4 MB · 14 صفحة</div>
            </div>
          </div>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20" />
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-white/10 rounded-full w-full" />
          <div className="h-3 bg-white/10 rounded-full w-[85%]" />
          <div className="h-3 bg-white/10 rounded-full w-[70%]" />
          <div className="h-3 bg-mint-500/30 rounded-full w-[50%]" />
          <div className="h-3 bg-white/10 rounded-full w-[78%]" />
          <div className="h-3 bg-white/10 rounded-full w-[60%]" />
        </div>

        {/* AI processing indicator */}
        <div className="mt-5 pt-5 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-mint-500" />
            </span>
            <span className="text-mint-300 font-medium">يعالج بالذكاء الاصطناعي</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] text-white/50 font-mono bg-white/5 px-2 py-0.5 rounded-md">
            <Sparkles className="w-2.5 h-2.5 text-mint-400" />
            ~1د/مخرج
          </span>
        </div>
      </div>
    </div>
  )
}

function OutputBubble({
  icon: Icon,
  label,
  desc,
  color,
  delay,
  side,
}: {
  icon: typeof Code2
  label: string
  desc: string
  color: string
  delay: number
  side: 'left' | 'right' | 'bottom'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -30 : side === 'right' ? 30 : 0, y: side === 'bottom' ? 20 : 0 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative flex items-center justify-center gap-3 w-full max-w-[225px] px-3.5 py-2.5 rounded-xl bg-gradient-to-br from-mint-500/[0.08] to-white/[0.02] border border-mint-400/55 shadow-[0_0_28px_-4px_rgba(45,212,191,0.5),inset_0_1px_0_0_rgba(167,243,224,0.12)] backdrop-blur-md hover:border-mint-300/80 hover:from-mint-500/[0.12] hover:shadow-mint-glow transition-all card-hover"
    >
      <div className={`shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-md ring-1 ring-white/10`}>
        <Icon className="w-[18px] h-[18px] text-white" strokeWidth={2.2} />
      </div>
      <div className="text-center">
        <div className="text-sm font-bold text-white/95 leading-tight">{label}</div>
        <div className="text-[11px] text-white/45 mt-0.5 leading-tight">{desc}</div>
      </div>
    </motion.div>
  )
}
