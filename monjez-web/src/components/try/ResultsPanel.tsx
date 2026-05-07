import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2, Video, Presentation, Image as ImageIcon, Mic, Brain,
  Download, FileText, RefreshCw, CheckCircle2, Sparkles, Eye,
} from 'lucide-react'
import { useApp } from '../../app/AppContext'
import { SAMPLE_ASSETS } from '../../app/mock/sampleProject'
import CodeOutput from './outputs/CodeOutput'
import VideoOutput from './outputs/VideoOutput'
import SlideOutput from './outputs/SlideOutput'
import PosterOutput from './outputs/PosterOutput'
import PodcastOutput from './outputs/PodcastOutput'
import ModelOutput from './outputs/ModelOutput'
import type { OutputType, PaperMeta } from '../../app/types'

const OUTPUT_META: Record<OutputType, { icon: typeof Code2; label: string; color: string; bgGlow: string; border: string }> = {
  code: { icon: Code2, label: 'الكود', color: 'from-blue-500 to-cyan-500', bgGlow: 'bg-blue-500/15', border: 'border-blue-500/40' },
  video: { icon: Video, label: 'الفيديو', color: 'from-purple-500 to-pink-500', bgGlow: 'bg-purple-500/15', border: 'border-purple-500/40' },
  slide: { icon: Presentation, label: 'الشرائح', color: 'from-amber-500 to-orange-500', bgGlow: 'bg-amber-500/15', border: 'border-amber-500/40' },
  poster: { icon: ImageIcon, label: 'البوستر', color: 'from-emerald-500 to-teal-500', bgGlow: 'bg-emerald-500/15', border: 'border-emerald-500/40' },
  podcast: { icon: Mic, label: 'البودكاست', color: 'from-rose-500 to-red-500', bgGlow: 'bg-rose-500/15', border: 'border-rose-500/40' },
  model: { icon: Brain, label: 'نموذج AI', color: 'from-violet-500 to-purple-500', bgGlow: 'bg-violet-500/15', border: 'border-violet-500/40' },
}

interface Props {
  paper: PaperMeta
  outputs: OutputType[]
  previewMode: boolean
  onReset: () => void
}

export default function ResultsPanel({ paper, outputs, previewMode, onReset }: Props) {
  const { toast } = useApp()
  const [active, setActive] = useState<OutputType>(outputs[0])

  function downloadOutput(type: OutputType) {
    const asset = SAMPLE_ASSETS[type]
    const link = document.createElement('a')
    link.href = asset.fileUrl
    link.download = asset.fileName
    link.click()
    toast({
      type: 'success',
      title: `بدأ تنزيل ${asset.label}`,
      description: asset.fileName,
    })
  }

  function downloadAll() {
    outputs.forEach((t, i) => setTimeout(() => downloadOutput(t), i * 400))
  }

  return (
    <div>
      {/* Success header */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-5 border-b border-white/[0.06]"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="shrink-0 w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                مكتمل
              </span>
              {previewMode && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                  <Eye className="w-2.5 h-2.5" />
                  معاينة
                </span>
              )}
              <span className="text-xs text-white/50">
                {outputs.length} مخرج · {paper.pages} صفحة
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white truncate mt-1">{paper.title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={downloadAll}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            تحميل الكل
          </button>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-mint-500/10 hover:bg-mint-500/20 border border-mint-500/30 text-mint-300 text-xs font-bold transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            ورقة جديدة
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 -mx-1 px-1">
        {outputs.map((id) => {
          const meta = OUTPUT_META[id]
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-sm font-medium ${
                isActive
                  ? `${meta.bgGlow} ${meta.border} text-white shadow-mint-glow`
                  : 'bg-white/[0.02] border-white/10 text-white/65 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${meta.color} flex items-center justify-center shadow-md ring-1 ring-white/10`}>
                <meta.icon className="w-3.5 h-3.5 text-white" />
              </div>
              {meta.label}
            </button>
          )
        })}
      </div>

      {/* Banner — download notice */}
      <div className="mb-5 p-3 rounded-xl bg-mint-500/[0.06] border border-mint-500/20 flex items-center gap-3">
        <Sparkles className="w-4 h-4 text-mint-400 shrink-0" />
        <p className="text-xs text-white/85 flex-1">
          🎉 جميع المخرجات جاهزة للتنزيل — كل تبويب فيه زر تحميل خاص به وكامل الجودة.
        </p>
      </div>

      {/* Active output */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {active === 'code' && <CodeOutput onDownload={() => downloadOutput('code')} />}
          {active === 'video' && <VideoOutput onDownload={() => downloadOutput('video')} />}
          {active === 'slide' && <SlideOutput onDownload={() => downloadOutput('slide')} />}
          {active === 'poster' && <PosterOutput onDownload={() => downloadOutput('poster')} />}
          {active === 'podcast' && <PodcastOutput onDownload={() => downloadOutput('podcast')} />}
          {active === 'model' && <ModelOutput onDownload={() => downloadOutput('model')} />}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-white/45">
        <div className="flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5" />
          <span>تم التوليد بواسطة وكلاء مُنجِز</span>
        </div>
        <a href="#projects" className="text-mint-400 hover:underline font-medium">عرض كل مشاريعي ←</a>
      </div>
    </div>
  )
}
