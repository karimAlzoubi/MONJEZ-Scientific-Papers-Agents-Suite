import { useState } from 'react'
import { Download, ZoomIn, ZoomOut, Image as ImageIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { SAMPLE_ASSETS } from '../../../app/mock/sampleProject'

interface Props {
  onDownload: () => void
}

export default function PosterOutput({ onDownload }: Props) {
  const asset = SAMPLE_ASSETS.poster
  const [zoom, setZoom] = useState(1)
  const [imgError, setImgError] = useState(false)

  return (
    <div>
      {/* Action bar */}
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-white">{asset.label}</h3>
          <p className="text-xs text-white/55 mt-0.5">{asset.description}</p>
        </div>
        <button
          onClick={onDownload}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-br from-mint-400 to-mint-600 text-ink-950 text-xs font-bold hover:shadow-mint-glow transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          تحميل البوستر
        </button>
      </div>

      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-ink-950">
        {/* Zoom controls */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 p-1 rounded-full bg-black/60 backdrop-blur">
          <button
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
            className="w-7 h-7 rounded-full hover:bg-white/15 text-white flex items-center justify-center transition-colors"
            aria-label="تصغير"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] text-white font-mono px-1 tabular-nums">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(2.5, z + 0.1))}
            className="w-7 h-7 rounded-full hover:bg-white/15 text-white flex items-center justify-center transition-colors"
            aria-label="تكبير"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-[10px] font-mono text-white/80">
          A1 · 300 DPI
        </div>

        {/* Poster image with scroll/zoom */}
        <div className="overflow-auto bg-checkered" style={{ maxHeight: '560px', minHeight: '420px' }}>
          {imgError ? (
            <div className="flex flex-col items-center justify-center h-[420px] gap-3 text-white/55">
              <ImageIcon className="w-12 h-12 text-white/25" />
              <p className="text-sm">ضع ملف البوستر في public/sample/poster.png</p>
            </div>
          ) : (
            <motion.img
              src={asset.fileUrl}
              alt="Poster"
              animate={{ scale: zoom }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="origin-top-right block max-w-full mx-auto"
              onError={() => setImgError(true)}
            />
          )}
        </div>
      </div>

      <div className="mt-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] text-white/55 text-center">
        💡 المعاينة بدقة الشاشة — البوستر الفعلي بحجم A1 (594×841 ملم) و 300 DPI جاهز للطباعة الاحترافية.
      </div>
    </div>
  )
}
