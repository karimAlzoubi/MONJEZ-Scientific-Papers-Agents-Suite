import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Download, Volume2 } from 'lucide-react'
import { SAMPLE_ASSETS } from '../../../app/mock/sampleProject'

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

interface Props {
  onDownload: () => void
}

export default function VideoOutput({ onDownload }: Props) {
  const asset = SAMPLE_ASSETS.video
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [currentSec, setCurrentSec] = useState(0)
  const [duration, setDuration] = useState(0)
  const [hasVideo, setHasVideo] = useState(true)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onLoaded = () => setDuration(v.duration)
    const onError = () => setHasVideo(false)
    v.addEventListener('loadedmetadata', onLoaded)
    v.addEventListener('error', onError)
    return () => {
      v.removeEventListener('loadedmetadata', onLoaded)
      v.removeEventListener('error', onError)
    }
  }, [])

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) v.play().catch(() => setHasVideo(false))
    else v.pause()
  }

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
          تحميل MP4
        </button>
      </div>

      {/* Video player */}
      <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-purple-900/30 via-ink-900 to-pink-900/30 group">
        <video
          ref={videoRef}
          src={asset.fileUrl}
          className="w-full h-full object-contain bg-black"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onTimeUpdate={(e) => setCurrentSec((e.target as HTMLVideoElement).currentTime)}
          onEnded={() => setPlaying(false)}
          controls={false}
        />

        {/* Fallback placeholder when video missing */}
        {!hasVideo && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/55">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <Play className="w-7 h-7 text-white/40 mr-1" fill="currentColor" />
            </div>
            <p className="text-xs">ضع ملف الفيديو في public/sample/video.mp4</p>
          </div>
        )}

        {/* Play overlay */}
        {hasVideo && !playing && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/60 to-pink-900/60 hover:from-purple-900/40 hover:to-pink-900/40 transition-all"
            aria-label="تشغيل"
          >
            <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play className="w-9 h-9 text-purple-700 mr-1" fill="currentColor" />
            </div>
          </button>
        )}

        {/* Top badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur text-[10px] font-mono text-white/80">
          MONJEZ-VIDEO · 1080p
        </div>

        {/* Bottom controls */}
        {hasVideo && (
          <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/85 to-transparent">
            <div
              className="h-1.5 bg-white/15 rounded-full mb-2 overflow-hidden cursor-pointer"
              onClick={(e) => {
                const rect = (e.target as HTMLDivElement).getBoundingClientRect()
                const pct = 1 - (e.clientX - rect.left) / rect.width
                if (videoRef.current && duration) videoRef.current.currentTime = pct * duration
              }}
            >
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
                style={{ width: `${(currentSec / (duration || 1)) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
                >
                  {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <Volume2 className="w-3.5 h-3.5 text-white/70" />
              </div>
              <span className="text-[11px] font-mono text-white/85">
                {formatTime(currentSec)} / {formatTime(duration)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
