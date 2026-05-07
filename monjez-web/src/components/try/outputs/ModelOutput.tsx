import { useState } from 'react'
import { Brain, Zap, Sparkles, Loader, Lightbulb, Download } from 'lucide-react'
import { MODEL_INFO } from '../../../app/mock/sampleProject'
import { useApp } from '../../../app/AppContext'

interface Props {
  onDownload: () => void
}

export default function ModelOutput({ onDownload }: Props) {
  const { toast } = useApp()
  const [input, setInput] = useState(MODEL_INFO.examples[0]?.input ?? '')
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)

  function runInference() {
    if (!input.trim()) {
      toast({ type: 'warning', title: 'أدخل نصاً للتجربة' })
      return
    }
    setRunning(true)
    setOutput('')
    setTimeout(() => {
      const exact = MODEL_INFO.examples.find(
        (e) => e.input.trim().toLowerCase() === input.trim().toLowerCase()
      )
      const result =
        exact?.output ??
        MODEL_INFO.examples[Math.floor(Math.random() * MODEL_INFO.examples.length)].output +
          ' (نتيجة محسوبة من النموذج)'
      setOutput(result)
      setRunning(false)
    }, 1400 + Math.random() * 600)
  }

  return (
    <div>
      {/* Action bar */}
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-white">نموذج AI · {MODEL_INFO.name}</h3>
          <p className="text-xs text-white/55 mt-0.5">جرّبه في الـ Playground أو حمّل بطاقة المعلومات</p>
        </div>
        <button
          onClick={onDownload}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-br from-mint-400 to-mint-600 text-ink-950 text-xs font-bold hover:shadow-mint-glow transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          تحميل بطاقة النموذج
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-4">
        {/* Model card */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center shadow-md ring-1 ring-white/10">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-bold text-white">{MODEL_INFO.name}</h4>
              <div className="text-[10px] font-mono text-mint-400 mt-0.5 truncate">{MODEL_INFO.architecture}</div>
            </div>
            <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              READY
            </span>
          </div>

          <p className="text-sm text-white/75 leading-relaxed mb-4">{MODEL_INFO.description}</p>

          <div className="grid grid-cols-2 gap-2.5 mb-4">
            <div className="rounded-xl bg-white/[0.03] border border-white/5 p-2.5">
              <div className="text-[9px] text-white/45 uppercase tracking-wider mb-0.5">Parameters</div>
              <div className="text-sm font-bold text-white">{MODEL_INFO.params}</div>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/5 p-2.5">
              <div className="text-[9px] text-white/45 uppercase tracking-wider mb-0.5">Accuracy</div>
              <div className="text-xs font-bold text-mint-300 leading-tight">{MODEL_INFO.accuracy}</div>
            </div>
          </div>

          <div>
            <h5 className="text-[10px] font-bold text-white/65 uppercase tracking-wider mb-2">Hyperparameters</h5>
            <div className="space-y-1">
              {MODEL_INFO.hyperparameters.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2 px-2.5 py-1 rounded-md bg-white/[0.02] border border-white/5 text-[11px] font-mono"
                >
                  <span className="text-white/65">{h.key}</span>
                  <span className="text-white font-bold">{h.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Playground */}
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Playground</h4>
              <p className="text-[10px] text-white/45">جرّب النموذج بنفسك</p>
            </div>
          </div>

          <div className="mb-3">
            <div className="text-[10px] text-white/45 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Lightbulb className="w-3 h-3" />
              أمثلة سريعة
            </div>
            <div className="flex flex-wrap gap-1.5">
              {MODEL_INFO.examples.map((e, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInput(e.input)
                    setOutput('')
                  }}
                  className="text-[10.5px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-mint-500/10 hover:border-mint-500/30 text-white/70 hover:text-white transition-colors max-w-[180px] truncate"
                  title={e.input}
                >
                  {e.input.length > 28 ? e.input.slice(0, 28) + '...' : e.input}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="text-[10px] text-white/45 uppercase tracking-wider mb-1.5 block">Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={3}
              placeholder="أدخل نصاً..."
              className="w-full bg-ink-950 border border-white/10 rounded-xl p-2.5 text-sm text-white outline-none focus:border-violet-500/50 resize-y placeholder:text-white/30"
              dir="auto"
            />
          </div>

          <button
            onClick={runInference}
            disabled={running}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 text-white font-bold text-sm hover:shadow-lg transition-all disabled:opacity-50"
          >
            {running ? <Loader className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {running ? 'النموذج يستنتج...' : 'تشغيل النموذج'}
          </button>

          {(output || running) && (
            <div className="mt-3 p-3 rounded-xl bg-violet-500/[0.06] border border-violet-500/20">
              <div className="text-[10px] text-violet-300 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Output
              </div>
              {running ? (
                <div className="flex items-center gap-2 text-sm text-white/55">
                  <Loader className="w-4 h-4 animate-spin text-violet-400" />
                  <span>يحسب...</span>
                </div>
              ) : (
                <p className="text-sm text-white leading-relaxed" dir="auto">{output}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
