import { useState, useRef, useEffect, DragEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload, Eye, FileText, Sparkles, X, Code2, Video, Presentation,
  Image as ImageIcon, Mic, Brain, Lock, Clock, Zap, ArrowRight, Info
} from 'lucide-react'
import { useApp } from '../app/AppContext'
import { SAMPLE_PAPER } from '../app/mock/sampleProject'
import ProcessingPanel from './try/ProcessingPanel'
import ResultsPanel from './try/ResultsPanel'
import type { OutputType, PaperMeta } from '../app/types'

const OUTPUTS: {
  id: OutputType
  icon: typeof Code2
  name: string
  desc: string
  color: string
  border: string
  bg: string
}[] = [
  { id: 'code',    icon: Code2,        name: 'كود برمجي',  desc: 'Python منظم وقابل للتشغيل',     color: 'from-blue-500 to-cyan-500',     border: 'border-blue-500/40',   bg: 'bg-blue-500/5' },
  { id: 'video',   icon: Video,        name: 'فيديو',       desc: 'مشاهد متحركة لشرح البحث',       color: 'from-purple-500 to-pink-500',   border: 'border-purple-500/40', bg: 'bg-purple-500/5' },
  { id: 'slide',   icon: Presentation, name: 'عرض تقديمي',  desc: 'PowerPoint بشرائح احترافية',    color: 'from-amber-500 to-orange-500',  border: 'border-amber-500/40',  bg: 'bg-amber-500/5' },
  { id: 'poster',  icon: ImageIcon,    name: 'بوستر علمي',  desc: 'A1 جاهز للطباعة',               color: 'from-emerald-500 to-teal-500',  border: 'border-emerald-500/40',bg: 'bg-emerald-500/5' },
  { id: 'podcast', icon: Mic,          name: 'بودكاست',     desc: 'حوار مسموع متعدد الأصوات',      color: 'from-rose-500 to-red-500',      border: 'border-rose-500/40',   bg: 'bg-rose-500/5' },
  { id: 'model',   icon: Brain,        name: 'نموذج AI',    desc: 'جاهز للاستدعاء + بطاقة',        color: 'from-violet-500 to-purple-500', border: 'border-violet-500/40', bg: 'bg-violet-500/5' },
]

const MAX_OUTPUTS = 2

type Step = 'select-paper' | 'select-outputs' | 'processing' | 'results'

export default function TryItNow() {
  const { state, dispatch, toast, quota } = useApp()
  const [step, setStep] = useState<Step>('select-paper')
  const [paper, setPaper] = useState<PaperMeta | null>(null)
  const [selected, setSelected] = useState<OutputType[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Listen for "open preview" from Hero CTA
  useEffect(() => {
    function onPreview() {
      setPaper({ ...SAMPLE_PAPER })
      setSelected(['code', 'slide'])
      setPreviewMode(true)
      setStep('select-outputs')
    }
    window.addEventListener('monjez:open-preview', onPreview)
    return () => window.removeEventListener('monjez:open-preview', onPreview)
  }, [])

  function reset() {
    setStep('select-paper')
    setPaper(null)
    setSelected([])
    setPreviewMode(false)
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function pickSample() {
    setPaper({ ...SAMPLE_PAPER })
    setSelected(['code', 'slide'])
    setPreviewMode(true)
    setStep('select-outputs')
  }

  function pickUpload(file: File) {
    if (file.type !== 'application/pdf') {
      toast({ type: 'warning', title: 'يرجى رفع ملف PDF فقط' })
      return
    }
    if (file.size > 50 * 1024 * 1024) {
      toast({ type: 'warning', title: 'الحد الأقصى 50MB' })
      return
    }
    setPaper({
      ...SAMPLE_PAPER,
      id: 'uploaded',
      title: file.name.replace(/\.pdf$/i, ''),
      authors: 'محتوى مرفوع من قِبلك',
      source: 'upload',
      fileName: file.name,
      fileSize: file.size,
    })
    setPreviewMode(false)
    setStep('select-outputs')
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    if (f) pickUpload(f)
  }

  function toggleOutput(id: OutputType) {
    if (selected.includes(id)) {
      setSelected(selected.filter((x) => x !== id))
      return
    }
    if (selected.length >= MAX_OUTPUTS) {
      toast({
        type: 'warning',
        title: `حد الباقة المجانية: ${MAX_OUTPUTS} مخرجات فقط`,
        description: 'لاختيار أكثر، ترقَّ إلى باقة Pro من قسم الباقات.',
      })
      return
    }
    setSelected([...selected, id])
  }

  function startGeneration() {
    if (!paper) return
    if (selected.length === 0) {
      toast({ type: 'warning', title: 'اختر مخرجاً واحداً على الأقل' })
      return
    }
    if (!previewMode && !quota.canGenerate) {
      toast({
        type: 'error',
        title: 'استنفدت حد الورقة الأسبوعي',
        description: `يمكنك رفع ورقة جديدة بعد ${quota.daysRemaining} يوم و ${quota.hoursRemaining} ساعة. أو استخدم وضع المعاينة.`,
      })
      return
    }
    if (!previewMode) {
      dispatch({ type: 'create_project', payload: { paper, outputs: selected } })
    }
    setStep('processing')
  }

  function onProcessingDone() {
    if (!previewMode && state.projects[0]) {
      dispatch({ type: 'finish_project', payload: { id: state.projects[0].id } })
    }
    setStep('results')
  }

  return (
    <section ref={sectionRef} id="try" className="relative py-12 lg:py-16 scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mint-500/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-mint-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-monjez relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="chip mb-5"
          >
            <Zap className="w-3.5 h-3.5" />
            تجربة مباشرة
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg text-balance"
          >
            <span className="text-white">جرّب </span>
            <span className="text-gradient-mint">مُنجِز</span>
            <span className="text-white"> بنفسك</span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-lg text-white/65 max-w-2xl mx-auto"
          >
            ارفع ورقة أو شاهد عينة جاهزة. اختر حتى مخرجين، ثم احصل على النتيجة جاهزة للتنزيل.
          </motion.p>
        </div>

        {/* Demo notice — site is in demo mode, agents paused */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative max-w-3xl mx-auto mb-10"
          role="status"
          aria-live="polite"
        >
          {/* Outer glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/25 via-mint-500/15 to-amber-500/25 rounded-2xl blur-xl pointer-events-none" />

          <div className="relative rounded-2xl bg-gradient-to-br from-amber-500/[0.09] via-white/[0.025] to-mint-500/[0.06] border border-amber-500/30 backdrop-blur-sm overflow-hidden shadow-2xl">
            {/* Top accent line */}
            <div className="h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

            <div className="p-4 sm:p-5">
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Animated icon badge */}
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-amber-400/40 rounded-xl blur-lg animate-pulse" />
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center shadow-lg ring-1 ring-amber-200/50">
                    <Info className="w-5 h-5 sm:w-6 sm:h-6 text-ink-950" strokeWidth={2.5} />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <h3 className="text-sm sm:text-base font-bold text-amber-100">
                      ملاحظة هامة — وضع تجريبي
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-200 text-[10px] font-bold tracking-wider uppercase">
                      <span className="relative flex w-1.5 h-1.5">
                        <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75" />
                        <span className="relative w-1.5 h-1.5 rounded-full bg-amber-400" />
                      </span>
                      Live Demo
                    </span>
                  </div>
                  <p className="text-[13px] sm:text-sm text-white/75 leading-relaxed">
                    الموقع يعمل حالياً كـ<span className="text-amber-200 font-semibold"> ديمو تفاعلي</span>، وقد
                    <span className="text-amber-200 font-semibold"> تم إيقاف الإيجنتات مؤقتاً</span> لتطويرها وتحسين أدائها.
                    جميع المخرجات التي تشاهدها هنا هي <span className="text-mint-300 font-semibold">مخرجات فعلية</span> تم توليدها مسبقاً من الإيجنتات نفسها.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="h-px bg-gradient-to-r from-transparent via-mint-400/40 to-transparent" />
          </div>
        </motion.div>

        {/* Wizard frame */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute -inset-2 bg-mint-500/15 rounded-[2rem] blur-3xl pointer-events-none" />

          <div className="relative glass-mint rounded-3xl overflow-hidden">
            {/* Step indicator + quota strip */}
            <StepStrip step={step} previewMode={previewMode} quota={quota} onReset={reset} />

            <div className="p-5 sm:p-7 lg:p-10">
              <AnimatePresence mode="wait">
                {step === 'select-paper' && (
                  <motion.div
                    key="paper"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <PaperSelectStep
                      dragOver={dragOver}
                      setDragOver={setDragOver}
                      onDrop={onDrop}
                      onUpload={pickUpload}
                      onSample={pickSample}
                      fileRef={fileRef}
                    />
                  </motion.div>
                )}

                {step === 'select-outputs' && paper && (
                  <motion.div
                    key="outputs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <OutputSelectStep
                      paper={paper}
                      selected={selected}
                      onToggle={toggleOutput}
                      onBack={reset}
                      onGenerate={startGeneration}
                      previewMode={previewMode}
                    />
                  </motion.div>
                )}

                {step === 'processing' && paper && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProcessingPanel paper={paper} outputs={selected} onDone={onProcessingDone} />
                  </motion.div>
                )}

                {step === 'results' && paper && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ResultsPanel paper={paper} outputs={selected} onReset={reset} previewMode={previewMode} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ==================== Sub-components ==================== */

function StepStrip({
  step,
  previewMode,
  quota,
  onReset,
}: {
  step: Step
  previewMode: boolean
  quota: ReturnType<typeof useApp>['quota']
  onReset: () => void
}) {
  const steps = [
    { id: 'select-paper', label: 'الورقة' },
    { id: 'select-outputs', label: 'المخرجات' },
    { id: 'processing', label: 'المعالجة' },
    { id: 'results', label: 'النتائج' },
  ] as const
  const activeIdx = steps.findIndex((s) => s.id === step)

  return (
    <div className="flex items-center justify-between gap-3 px-5 sm:px-7 py-3 bg-white/[0.02] border-b border-white/10">
      {/* Steps */}
      <div className="flex items-center gap-1 overflow-x-auto">
        {steps.map((s, i) => {
          const done = i < activeIdx
          const current = i === activeIdx
          return (
            <div key={s.id} className="flex items-center gap-1 shrink-0">
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
                  current ? 'bg-mint-500/15 border border-mint-500/40 text-mint-300' :
                  done ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300' :
                  'bg-white/[0.03] border border-white/10 text-white/45'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                    current ? 'bg-mint-400 text-ink-950' : done ? 'bg-emerald-500/30' : 'bg-white/10'
                  }`}
                >
                  {done ? '✓' : i + 1}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < steps.length - 1 && <span className="w-3 h-px bg-white/10" />}
            </div>
          )
        })}
      </div>

      {/* Right side: preview badge / quota / reset */}
      <div className="flex items-center gap-2 shrink-0">
        {previewMode && (
          <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
            <Eye className="w-3 h-3" />
            وضع المعاينة
          </div>
        )}
        {!previewMode && (
          <div className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
            quota.canGenerate
              ? 'bg-mint-500/10 border border-mint-500/20 text-mint-300'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
          }`}>
            {quota.canGenerate ? (
              <>
                <Sparkles className="w-3 h-3" />
                ورقة متاحة هذا الأسبوع
              </>
            ) : (
              <>
                <Lock className="w-3 h-3" />
                {quota.daysRemaining}ي {quota.hoursRemaining}س متبقّي
              </>
            )}
          </div>
        )}
        {(step === 'results' || step === 'processing') && (
          <button
            onClick={onReset}
            className="text-[11px] text-white/55 hover:text-white px-2 py-1 rounded-md hover:bg-white/5 transition-colors"
          >
            إعادة
          </button>
        )}
      </div>
    </div>
  )
}

function PaperSelectStep({
  dragOver,
  setDragOver,
  onDrop,
  onUpload,
  onSample,
  fileRef,
}: {
  dragOver: boolean
  setDragOver: (v: boolean) => void
  onDrop: (e: DragEvent<HTMLDivElement>) => void
  onUpload: (f: File) => void
  onSample: () => void
  fileRef: React.RefObject<HTMLInputElement>
}) {
  return (
    <div className="grid lg:grid-cols-[1.4fr_auto_1fr] gap-5 lg:gap-4 items-stretch">
      {/* Drop zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`relative rounded-2xl border-2 border-dashed p-10 lg:p-14 text-center transition-all ${
          dragOver ? 'border-mint-400 bg-mint-500/10 scale-[1.01]' : 'border-white/15 bg-white/[0.02] hover:border-mint-500/40 hover:bg-white/[0.04]'
        }`}
      >
        <div className={`w-16 h-16 rounded-2xl bg-mint-500/15 border border-mint-500/30 flex items-center justify-center mx-auto mb-5 transition-transform ${dragOver ? 'scale-110' : ''}`}>
          <Upload className="w-7 h-7 text-mint-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">اسحب ورقتك البحثية هنا</h3>
        <p className="text-sm text-white/55 mb-6 max-w-md mx-auto">
          أو اضغط لاختيارها من جهازك — PDF فقط حتى 50 ميجابايت
        </p>
        <button
          onClick={() => fileRef.current?.click()}
          className="btn-primary !px-5 !py-2.5 text-sm"
        >
          <Upload className="w-4 h-4" />
          اختر PDF من جهازك
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) onUpload(f)
          }}
        />

        <div className="mt-7 pt-7 border-t border-white/5 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2 text-[10px] sm:text-[11px] text-white/40">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-mint-400" />
            تشفير end-to-end
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-mint-400" />
            معالجة في ثوانٍ
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-mint-400" />
            بدون تسجيل
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-mint-400" />
            دعم العربية والإنجليزية
          </span>
        </div>
      </div>

      {/* OR — divider (vertical on desktop, horizontal on mobile) */}
      <div className="relative flex lg:flex-col items-center justify-center gap-2 py-2 lg:py-0 lg:px-1">
        {/* Mobile: horizontal line + chip */}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/15 to-transparent lg:hidden" />
        {/* Desktop: vertical line + chip */}
        <div className="hidden lg:block w-px flex-1 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
        <div className="relative shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-ink-900 border-2 border-mint-500/30 shadow-mint-glow">
          <span className="text-xs font-bold text-mint-300 tracking-widest">أو</span>
        </div>
        <div className="hidden lg:block w-px flex-1 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/15 to-transparent lg:hidden" />
      </div>

      {/* Preview sample */}
      <div className="h-full glass rounded-2xl p-6 flex flex-col">
        <div className="flex items-center gap-2 text-amber-300 mb-3">
          <Eye className="w-4 h-4" />
          <span className="text-xs font-bold tracking-wider uppercase">معاينة جاهزة</span>
        </div>

        <h3 className="text-lg font-bold text-white mb-2">شاهد قبل أن تجرّب</h3>
        <p className="text-sm text-white/60 mb-5 flex-1 leading-relaxed">
          استعرض النتائج الكاملة على ورقة عينة (Attention Is All You Need) دون رفع أي ملف ودون استهلاك حصّتك الأسبوعية.
        </p>

        {/* Sample paper card */}
        <div className="rounded-xl bg-white/[0.03] border border-white/10 p-4 mb-5">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-mint-400 font-mono uppercase tracking-wider">عينة</div>
              <h4 className="text-sm font-bold text-white truncate">{SAMPLE_PAPER.title}</h4>
              <p className="text-[11px] text-white/45 mt-0.5">
                {SAMPLE_PAPER.year} · {SAMPLE_PAPER.pages} صفحة
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onSample}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-200 hover:bg-amber-500/25 hover:text-amber-100 text-sm font-bold transition-all"
        >
          <Eye className="w-4 h-4" />
          معاينة العينة الجاهزة
        </button>
      </div>
    </div>
  )
}

function OutputSelectStep({
  paper,
  selected,
  onToggle,
  onBack,
  onGenerate,
  previewMode,
}: {
  paper: PaperMeta
  selected: OutputType[]
  onToggle: (id: OutputType) => void
  onBack: () => void
  onGenerate: () => void
  previewMode: boolean
}) {
  return (
    <div>
      {/* Paper header */}
      <div className="flex items-start justify-between gap-3 mb-6 pb-5 border-b border-white/[0.06]">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="shrink-0 w-11 h-11 rounded-xl bg-mint-500/15 border border-mint-500/30 flex items-center justify-center">
            <FileText className="w-5 h-5 text-mint-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`text-[10px] font-mono uppercase tracking-wider ${
                paper.source === 'sample' ? 'text-amber-300' : 'text-mint-400'
              }`}>
                {paper.source === 'sample' ? 'عينة جاهزة' : 'مرفوعة'}
              </span>
              <span className="text-white/20">·</span>
              <span className="text-[10px] text-white/45">{paper.pages} صفحة</span>
            </div>
            <h3 className="text-base font-bold text-white truncate">{paper.title}</h3>
            <p className="text-xs text-white/50 truncate mt-0.5">{paper.authors}</p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="shrink-0 inline-flex items-center gap-1 text-[11px] text-white/55 hover:text-white px-2 py-1.5 rounded-md hover:bg-white/5 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          تغيير
        </button>
      </div>

      {/* Output selection */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white">اختر المخرجات المطلوبة</h3>
          <span className={`text-xs font-bold tabular-nums ${
            selected.length === 0 ? 'text-white/45' :
            selected.length === MAX_OUTPUTS ? 'text-mint-300' : 'text-mint-400'
          }`}>
            {selected.length} / {MAX_OUTPUTS}
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {OUTPUTS.map((o, i) => {
            const isSelected = selected.includes(o.id)
            const disabled = !isSelected && selected.length >= MAX_OUTPUTS
            return (
              <motion.button
                key={o.id}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => onToggle(o.id)}
                disabled={disabled}
                className={`relative text-right p-4 rounded-2xl border transition-all ${
                  isSelected ? `${o.bg} ${o.border} shadow-mint-glow` :
                  disabled ? 'bg-white/[0.01] border-white/5 opacity-40 cursor-not-allowed' :
                  'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${o.color} flex items-center justify-center shadow-md ring-1 ring-white/10`}>
                    <o.icon className="w-5 h-5 text-white" strokeWidth={2.2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white">{o.name}</h4>
                    <p className="text-[11px] text-white/55 mt-0.5 line-clamp-2 leading-tight">{o.desc}</p>
                  </div>
                  <div className={`shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    isSelected ? 'bg-mint-400 border-mint-400' :
                    disabled ? 'border-white/10' : 'border-white/20'
                  }`}>
                    {isSelected && <span className="text-ink-950 text-[10px] font-bold">✓</span>}
                  </div>
                </div>

                {disabled && (
                  <div className="absolute top-2 left-2">
                    <Lock className="w-3 h-3 text-white/25" />
                  </div>
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Hint */}
        <div className="mt-4 flex items-center gap-2 text-[11px] text-white/45">
          <Lock className="w-3 h-3 shrink-0" />
          <span>الباقة المجانية: {MAX_OUTPUTS} مخرجات لكل ورقة، وورقة واحدة كل أسبوع. <a href="#pricing" className="text-mint-400 hover:underline">ترقَّ إلى باقة Pro</a> لإزالة الحدود.</span>
        </div>
      </div>

      {/* Generate */}
      <div className="flex items-center justify-between gap-3 pt-5 border-t border-white/[0.06]">
        <div className="text-xs text-white/55">
          {selected.length === 0 ? 'لم تختر مخرجاً بعد' : (
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-mint-400" />
                الزمن المتوقع: ~14 ثانية
              </span>
              <span className="flex items-center gap-1 text-[10px] text-amber-300/85 leading-tight">
                <Info className="w-2.5 h-2.5 shrink-0" />
                <span>ديمو مختصر · الوقت الفعلي ~+1 دقيقة لكل مخرج</span>
              </span>
            </div>
          )}
        </div>
        <button
          onClick={onGenerate}
          disabled={selected.length === 0}
          className={`btn-primary !px-5 ${selected.length === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
        >
          <Sparkles className="w-4 h-4" />
          {previewMode ? 'عرض النتائج' : 'توليد المخرجات'}
          <ArrowRight className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  )
}
