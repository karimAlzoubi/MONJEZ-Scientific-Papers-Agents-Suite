import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Code2, Video, Presentation, Image as ImageIcon, Mic, Brain, Loader, Check, FileText } from 'lucide-react'
import type { OutputType, PaperMeta } from '../../app/types'

const OUTPUT_META: Record<OutputType, { icon: typeof Code2; label: string; color: string }> = {
  code: { icon: Code2, label: 'كود برمجي', color: 'from-blue-500 to-cyan-500' },
  video: { icon: Video, label: 'فيديو', color: 'from-purple-500 to-pink-500' },
  slide: { icon: Presentation, label: 'عرض تقديمي', color: 'from-amber-500 to-orange-500' },
  poster: { icon: ImageIcon, label: 'بوستر', color: 'from-emerald-500 to-teal-500' },
  podcast: { icon: Mic, label: 'بودكاست', color: 'from-rose-500 to-red-500' },
  model: { icon: Brain, label: 'نموذج AI', color: 'from-violet-500 to-purple-500' },
}

interface LogEntry {
  time: number
  agent: string
  icon: string
  color: string
  message: string
}

const MINT = 'text-mint-400'
const EMERALD = 'text-emerald-400'
const BLUE = 'text-cyan-400'

function buildScript(outputs: OutputType[], paper: PaperMeta): { entries: LogEntry[]; total: number; perOutput: Record<string, { start: number; end: number }> } {
  const entries: LogEntry[] = []
  entries.push({ time: 0.3, agent: 'Parser', icon: '📄', color: MINT, message: `قراءة ${paper.fileName ?? paper.title}.pdf...` })
  entries.push({ time: 1.1, agent: 'Parser', icon: '📄', color: MINT, message: `• اكتشاف اللغة: العربية + الإنجليزية` })
  entries.push({ time: 1.9, agent: 'Parser', icon: '📄', color: EMERALD, message: `✓ تم تحليل ${paper.pages} صفحة، 8 أشكال، 23 مرجعاً` })
  entries.push({ time: 2.6, agent: 'Planner', icon: '🧠', color: MINT, message: 'تخطيط مسار الحل...' })
  entries.push({ time: 3.4, agent: 'Planner', icon: '🧠', color: MINT, message: '• تحديد الخوارزمية الرئيسية: Transformer' })
  entries.push({ time: 4.0, agent: 'Planner', icon: '🧠', color: EMERALD, message: '✓ خط أنابيب جاهز · وكلاء متخصصون في الانتظار' })

  let cursor = 4.7
  const perOutput: Record<string, { start: number; end: number }> = {}

  for (const t of outputs) {
    const meta = OUTPUT_META[t]
    const start = cursor
    entries.push({ time: cursor, agent: meta.label, icon: '⚙️', color: BLUE, message: `بدء توليد ${meta.label}...` })
    cursor += 1.2
    entries.push({ time: cursor, agent: meta.label, icon: '⚙️', color: BLUE, message: `• تطبيق الأنماط الجمالية` })
    cursor += 1.4
    entries.push({ time: cursor, agent: meta.label, icon: '⚙️', color: EMERALD, message: `✓ ${meta.label} جاهز للتنزيل` })
    cursor += 0.7
    perOutput[t] = { start, end: cursor }
  }

  cursor += 0.3
  entries.push({ time: cursor, agent: 'Reflection', icon: '🪞', color: MINT, message: 'فحص الجودة على جميع المخرجات ✓' })
  cursor += 0.5
  entries.push({ time: cursor, agent: 'Done', icon: '🎉', color: EMERALD, message: `${outputs.length} مخرج جاهز للعرض` })

  return { entries, total: cursor + 0.6, perOutput }
}

interface Props {
  paper: PaperMeta
  outputs: OutputType[]
  onDone: () => void
}

export default function ProcessingPanel({ paper, outputs, onDone }: Props) {
  const script = useMemo(() => buildScript(outputs, paper), [outputs, paper])
  const [elapsed, setElapsed] = useState(0)
  const doneRef = useRef(false)
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (doneRef.current) return
    const startMs = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const sec = (now - startMs) / 1000
      setElapsed(sec)
      if (sec < script.total + 0.3) {
        raf = requestAnimationFrame(tick)
      } else if (!doneRef.current) {
        doneRef.current = true
        setTimeout(onDone, 500)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [script, onDone])

  // Auto-scroll log to bottom on new entries
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  })

  const visibleEntries = script.entries.filter((e) => e.time <= elapsed)
  const overallPct = Math.min(100, (elapsed / script.total) * 100)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-mint-500/15 border border-mint-500/30 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-mint-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-mint-400" />
              </span>
              <span className="text-mint-300 font-bold">جاري المعالجة بواسطة الوكلاء</span>
            </div>
            <h3 className="text-sm font-bold text-white truncate mt-0.5">{paper.title}</h3>
          </div>
        </div>
        <div className="flex flex-col items-end gap-0.5 shrink-0">
          <div className="text-sm font-mono text-mint-400 tabular-nums">
            {elapsed.toFixed(1)}s / {script.total.toFixed(1)}s
          </div>
          <div className="text-[9px] text-amber-300/80 leading-none">
            ديمو · الفعلي ~+1د/مخرج
          </div>
        </div>
      </div>

      {/* Overall progress */}
      <div className="mb-6">
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-mint-400 via-mint-500 to-mint-600 shadow-mint-glow"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <div className="flex items-center justify-center mt-1.5">
          <span className="text-xs text-mint-400 font-mono font-bold tabular-nums">{overallPct.toFixed(0)}%</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
        {/* Live agent log */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-ink-950/40">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-rose-500/60" />
              <div className="w-2 h-2 rounded-full bg-amber-500/60" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
            </div>
            <span className="text-[10px] font-mono text-white/40">agents.log</span>
            <span className="text-[10px] text-mint-400 font-mono">{visibleEntries.length} events</span>
          </div>

          <div ref={logRef} className="p-4 font-mono text-[11.5px] leading-relaxed h-[340px] overflow-y-auto" dir="ltr">
            <div className="space-y-1.5">
              {visibleEntries.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-2.5"
                >
                  <span className="text-white/30 w-10 shrink-0 tabular-nums">{line.time.toFixed(1)}s</span>
                  <span className="shrink-0">{line.icon}</span>
                  <span className="text-white/45 w-20 shrink-0 truncate text-[10.5px]">{line.agent}</span>
                  <span className={`flex-1 ${line.color}`} dir="auto">{line.message}</span>
                </motion.div>
              ))}
              {elapsed < script.total && (
                <div className="flex items-center gap-2.5 pt-1">
                  <span className="text-white/30 w-10">·</span>
                  <Loader className="w-3 h-3 text-mint-400 animate-spin" />
                  <span className="text-white/40 italic">processing...</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Per-output progress */}
        <div className="space-y-2.5">
          {outputs.map((id) => {
            const meta = OUTPUT_META[id]
            const win = script.perOutput[id]
            const status: 'pending' | 'running' | 'done' =
              elapsed < win.start ? 'pending' :
              elapsed < win.end ? 'running' : 'done'
            const pct = status === 'done' ? 100 :
              status === 'pending' ? 0 :
              ((elapsed - win.start) / (win.end - win.start)) * 100

            return (
              <div
                key={id}
                className={`glass rounded-xl p-3 transition-all ${
                  status === 'running' ? 'border-mint-500/40' :
                  status === 'done' ? 'border-emerald-500/30' : ''
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className={`relative w-9 h-9 rounded-lg bg-gradient-to-br ${meta.color} flex items-center justify-center shadow-md ring-1 ring-white/10`}>
                    <meta.icon className="w-4 h-4 text-white" />
                    {status === 'running' && (
                      <span className="absolute inset-0 rounded-lg ring-2 ring-mint-400 animate-pulse" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white">{meta.label}</div>
                    <div className="text-[10px] text-white/45">
                      {status === 'pending' && 'في الانتظار'}
                      {status === 'running' && 'يولّد...'}
                      {status === 'done' && '✓ مكتمل'}
                    </div>
                  </div>
                  {status === 'pending' && <span className="w-4 h-4 rounded-full border border-white/15" />}
                  {status === 'running' && <Loader className="w-4 h-4 text-mint-400 animate-spin" />}
                  {status === 'done' && (
                    <div className="w-4 h-4 rounded-full bg-emerald-500/30 border border-emerald-400 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-emerald-300" strokeWidth={3} />
                    </div>
                  )}
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      status === 'done' ? 'bg-emerald-500' :
                      status === 'running' ? 'bg-mint-500' : 'bg-white/10'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
