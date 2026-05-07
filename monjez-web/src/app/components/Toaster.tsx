import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { useApp } from '../AppContext'

const ICONS = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
}

const COLORS = {
  info: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
  success: 'text-mint-400 bg-mint-500/10 border-mint-500/30',
  warning: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  error: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
}

export default function Toaster() {
  const { state, dispatch } = useApp()

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 max-w-sm w-[calc(100vw-2.5rem)]">
      <AnimatePresence>
        {state.toasts.map((t) => {
          const Icon = ICONS[t.type]
          return (
            <motion.div
              key={t.id}
              initial={{ x: -50, opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -50, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`glass rounded-2xl p-4 border ${COLORS[t.type].split(' ').filter((c) => c.startsWith('border')).join(' ')} shadow-xl`}
            >
              <div className="flex items-start gap-3">
                <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${COLORS[t.type]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="text-sm font-bold text-white">{t.title}</div>
                  {t.description && (
                    <div className="text-xs text-white/60 mt-1 leading-relaxed">{t.description}</div>
                  )}
                </div>
                <button
                  onClick={() => dispatch({ type: 'remove_toast', payload: t.id })}
                  className="shrink-0 text-white/40 hover:text-white transition-colors"
                  aria-label="إغلاق"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
