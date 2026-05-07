import { useEffect, useRef, useState } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, Download, FileText } from 'lucide-react'
import { SAMPLE_ASSETS, PODCAST_TRANSCRIPT, PODCAST_DURATION_SEC } from '../../../app/mock/sampleProject'
import { useApp } from '../../../app/AppContext'

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

interface Props {
  onDownload: () => void
}

export default function PodcastOutput({ onDownload }: Props) {
  const { toast } = useApp()
  const asset = SAMPLE_ASSETS.podcast
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [currentMs, setCurrentMs] = useState(0)
  const [hasAudio, setHasAudio] = useState(true)
  const [showTranscript, setShowTranscript] = useState(true)

  // Fake-playback fallback when no audio file is present
  useEffect(() => {
    if (!playing || hasAudio) return
    const start = performance.now() - currentMs
    let raf = 0
    const tick = (now: number) => {
      const ms = now - start
      const max = PODCAST_DURATION_SEC * 1000
      if (ms >= max) {
        setCurrentMs(max)
        setPlaying(false)
        return
      }
      setCurrentMs(ms)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, hasAudio])

  function togglePlay() {
    const a = audioRef.current
    if (a && hasAudio) {
      if (a.paused) a.play().catch(() => setHasAudio(false))
      else a.pause()
    } else {
      setPlaying((p) => !p)
    }
  }

  function seek(ms: number) {
    setCurrentMs(ms)
    if (audioRef.current && hasAudio) audioRef.current.currentTime = ms / 1000
  }

  function downloadTranscript() {
    const text = PODCAST_TRANSCRIPT.map(
      (l) => `[${formatTime(l.startMs / 1000)}] ${l.speaker === 'host' ? 'مضيف' : 'ضيف'}:\n${l.text}\n`
    ).join('\n')
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'monjez-podcast-transcript.txt'
    a.click()
    URL.revokeObjectURL(url)
    toast({ type: 'success', title: 'تم تحميل النص' })
  }

  const totalMs = PODCAST_DURATION_SEC * 1000
  const progress = (currentMs / totalMs) * 100
  const activeIdx = PODCAST_TRANSCRIPT.findIndex((l) => currentMs >= l.startMs && currentMs < l.endMs)

  return (
    <div>
      {/* Action bar */}
      <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-white">{asset.label}</h3>
          <p className="text-xs text-white/55 mt-0.5">{asset.description} · {formatTime(PODCAST_DURATION_SEC)}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/75 hover:text-white text-xs font-medium transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            {showTranscript ? 'إخفاء النص' : 'إظهار النص'}
          </button>
          <button
            onClick={downloadTranscript}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/75 hover:text-white text-xs font-medium transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            النص فقط
          </button>
          <button
            onClick={onDownload}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-br from-mint-400 to-mint-600 text-ink-950 text-xs font-bold hover:shadow-mint-glow transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            تحميل MP3
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={asset.fileUrl}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrentMs((e.target as HTMLAudioElement).currentTime * 1000)}
        onEnded={() => setPlaying(false)}
        onError={() => setHasAudio(false)}
      />

      <div className={`grid ${showTranscript ? 'lg:grid-cols-[1fr_1.2fr]' : 'grid-cols-1'} gap-4`}>
        {/* Player */}
        <div className="glass rounded-2xl p-5 self-start">
          {/* Album art */}
          <div className="aspect-square max-w-[280px] mx-auto rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-orange-500 mb-5 flex items-center justify-center relative overflow-hidden ring-1 ring-white/10 shadow-xl">
            <div className="absolute inset-0 grid-bg opacity-30" />
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Volume2 className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 text-[9px] font-mono text-white/70 backdrop-blur px-2 py-0.5 rounded-full bg-black/30">
              MONJEZ
            </div>
          </div>

          <h4 className="text-sm font-bold text-white text-center mb-1 line-clamp-2">حلقة عن Attention Is All You Need</h4>
          <p className="text-xs text-white/55 text-center mb-4">حوار مع مضيف وضيفة خبيرة</p>

          {/* Waveform */}
          <div className="flex items-center gap-px h-12 mb-2 overflow-hidden">
            {Array.from({ length: 56 }).map((_, i) => {
              const seedH = ((i * 13) % 7) + ((i * 7) % 5) + 3
              const passed = (i / 56) * 100 < progress
              return (
                <button
                  key={i}
                  onClick={() => seek((i / 56) * totalMs)}
                  className={`flex-1 rounded-full transition-colors ${passed ? 'bg-rose-400' : 'bg-white/15'}`}
                  style={{ height: `${seedH * 6}%` }}
                />
              )
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-white/55 mb-3">
            <span>{formatTime(currentMs / 1000)}</span>
            <span>{formatTime(PODCAST_DURATION_SEC)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => seek(Math.max(0, currentMs - 10000))}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
              aria-label="رجوع 10ث"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 hover:shadow-lg text-white flex items-center justify-center transition-all"
              aria-label={playing ? 'إيقاف' : 'تشغيل'}
            >
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 mr-0.5" />}
            </button>
            <button
              onClick={() => seek(Math.min(totalMs, currentMs + 10000))}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
              aria-label="تقديم 10ث"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {!hasAudio && (
            <p className="mt-3 text-center text-[10px] text-amber-300/70">
              ⚠ ضع الملف في public/sample/podcast.mp3 — يعمل الآن في وضع المحاكاة.
            </p>
          )}
        </div>

        {/* Transcript */}
        {showTranscript && (
          <div className="glass rounded-2xl p-4 max-h-[420px] overflow-y-auto">
            <div className="flex items-center justify-between mb-3 sticky top-0 bg-ink-900/95 backdrop-blur z-10 -mx-4 px-4 -mt-4 pt-4 pb-2 border-b border-white/5">
              <h4 className="text-xs font-bold text-white">النص الكامل</h4>
              <span className="text-[10px] text-white/40 font-mono">{PODCAST_TRANSCRIPT.length} سطر</span>
            </div>
            <ul className="space-y-2">
              {PODCAST_TRANSCRIPT.map((line, i) => {
                const isActive = i === activeIdx
                return (
                  <li
                    key={i}
                    className={`flex items-start gap-2.5 p-2.5 rounded-lg transition-colors cursor-pointer ${
                      isActive ? 'bg-rose-500/10 border border-rose-500/30' : 'hover:bg-white/[0.03]'
                    }`}
                    onClick={() => seek(line.startMs)}
                  >
                    <div
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        line.speaker === 'host'
                          ? 'bg-gradient-to-br from-rose-400 to-pink-500 text-white'
                          : 'bg-gradient-to-br from-orange-400 to-amber-500 text-white'
                      }`}
                    >
                      {line.speaker === 'host' ? 'م' : 'ض'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className={`text-[10px] font-bold ${line.speaker === 'host' ? 'text-rose-300' : 'text-orange-300'}`}>
                          {line.speaker === 'host' ? 'مضيف' : 'ضيف'}
                        </span>
                        <span className="text-[9px] text-white/35 font-mono">{formatTime(line.startMs / 1000)}</span>
                      </div>
                      <p className="text-[12px] text-white/85 leading-relaxed">{line.text}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
