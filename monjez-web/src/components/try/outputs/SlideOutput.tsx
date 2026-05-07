import { useState } from 'react'
import { Download, ExternalLink, FileText, Maximize2, Minimize2 } from 'lucide-react'
import { SAMPLE_ASSETS } from '../../../app/mock/sampleProject'

interface Props {
  onDownload: () => void
}

export default function SlideOutput({ onDownload }: Props) {
  const asset = SAMPLE_ASSETS.slide
  const [fullscreen, setFullscreen] = useState(false)

  return (
    <div>
      {/* Action bar */}
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-white">{asset.label}</h3>
          <p className="text-xs text-white/55 mt-0.5">{asset.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/75 hover:text-white text-xs font-medium transition-colors"
          >
            {fullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            {fullscreen ? 'تصغير' : 'ملء الشاشة'}
          </button>
          <a
            href={asset.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/75 hover:text-white text-xs font-medium transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            فتح في تبويب
          </a>
          <button
            onClick={onDownload}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-br from-mint-400 to-mint-600 text-ink-950 text-xs font-bold hover:shadow-mint-glow transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            تحميل العرض
          </button>
        </div>
      </div>

      {/* PDF viewer */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white">
        {/* Top bar */}
        <div className="absolute top-0 inset-x-0 flex items-center justify-between gap-3 px-4 py-2 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-rose-500/80" />
            <div className="w-2 h-2 rounded-full bg-amber-500/80" />
            <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[10px] font-mono text-white/85 backdrop-blur-sm bg-black/40 px-2 py-0.5 rounded">
            {asset.fileName}
          </span>
          <div className="w-10" />
        </div>

        <iframe
          src={`${asset.fileUrl}#view=FitH&toolbar=1&navpanes=0`}
          className={`w-full border-0 bg-white block ${fullscreen ? 'h-[80vh]' : 'h-[560px]'}`}
          title="Slides PDF"
        />
      </div>

      <div className="mt-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2.5 text-[11px] text-white/55">
        <FileText className="w-3.5 h-3.5 text-mint-400 shrink-0" />
        <span className="flex-1">عرض تقديمي كامل بصيغة PDF — استخدم أزرار المتصفح للتنقل بين الشرائح أو حمّله للعرض في PowerPoint.</span>
      </div>
    </div>
  )
}
