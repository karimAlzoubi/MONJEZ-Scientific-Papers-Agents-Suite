import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, LogIn } from 'lucide-react'
import Logo, { Wordmark } from './Logo'
import SponsorsBar from './SponsorsBar'
import { useApp } from '../app/AppContext'

const links = [
  { href: '#try', label: 'جرّب الآن' },
  { href: '#projects', label: 'مشاريعي' },
  { href: '#comparison', label: 'المقارنة' },
  { href: '#pricing', label: 'الباقات' },
  { href: '#faq', label: 'أسئلة شائعة' },
  { href: '#audience', label: 'لمن؟' },
]

const mobileSponsors = [
  { name: 'PSAU',    src: '/sponsors/psau.svg',         filter: 'brightness(0) invert(1)', offsetY: 0 },
  { name: 'Beyond',  src: '/sponsors/beyond.svg',       filter: 'brightness(0) invert(1)', offsetY: 3 },
  { name: 'AI Club', src: '/sponsors/ai-club-logo.png', filter: 'brightness(0) invert(1)', offsetY: 0 },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useApp()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink-950/80 backdrop-blur-xl border-b border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container-monjez flex items-center justify-between gap-3 lg:gap-4">
        <a href="#" className="flex items-center gap-2.5 group shrink-0" aria-label="مُنجِز · Monjez">
          <Logo className="w-12 h-12 transition-transform group-hover:scale-110" />
          <Wordmark className="h-9 transition-transform group-hover:scale-[1.04]" />
        </a>

        {/* Mobile-only: compact horizontal sponsor strip that reveals on scroll */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              key="navbar-sponsors-mobile"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="md:hidden flex items-center gap-2.5 shrink-0"
              aria-label="بدعم من شركاء النجاح"
            >
              {mobileSponsors.map((s, i) => (
                <div key={s.name} className="flex items-center gap-2.5">
                  <img
                    src={s.src}
                    alt={s.name}
                    title={s.name}
                    className="h-6 w-auto opacity-90 object-contain"
                    style={{ filter: s.filter, transform: `translateY(${s.offsetY}px)` }}
                  />
                  {i < mobileSponsors.length - 1 && (
                    <span className="w-px h-4 bg-white/15" aria-hidden />
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop+ sponsors strip — only at xl+ to avoid crowding nav at lg */}
        <AnimatePresence>
          {scrolled && (
            <motion.div
              key="navbar-sponsors"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="hidden xl:flex items-center gap-2.5 pl-2.5 pr-2.5 mx-1 border-l border-r border-white/10 shrink-0"
            >
              <span className="text-[9px] font-bold tracking-[0.18em] uppercase text-mint-400/70 whitespace-nowrap">
                بدعم من
              </span>
              <SponsorsBar variant="navbar" />
            </motion.div>
          )}
        </AnimatePresence>

        <nav className="hidden lg:flex items-center gap-0.5 shrink-0">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-3 py-2 text-sm text-white/75 hover:text-white transition-colors group whitespace-nowrap"
            >
              {l.label}
              <span className="absolute bottom-0 right-1/2 translate-x-1/2 h-px w-0 bg-mint-400 transition-all duration-300 group-hover:w-8" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 lg:gap-3 shrink-0">
          <button
            onClick={() => toast({ type: 'info', title: 'تسجيل الدخول قريباً', description: 'سيتاح عند إطلاق النسخة الكاملة لحفظ مشاريعك عبر أجهزتك.' })}
            className="inline-flex items-center gap-1.5 text-sm text-white/75 hover:text-white transition-colors px-3 py-2 whitespace-nowrap"
          >
            <LogIn className="w-3.5 h-3.5" />
            تسجيل الدخول
          </button>
          <a href="#try" className="btn-primary !px-4 !py-2.5 text-sm whitespace-nowrap">
            <Sparkles className="w-4 h-4" />
            جرّب الآن
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2 rounded-lg hover:bg-white/5 shrink-0"
          aria-label="القائمة"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-ink-900/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <div className="container-monjez py-6 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a href="#try" onClick={() => setOpen(false)} className="btn-primary mt-3 justify-center">
                <Sparkles className="w-4 h-4" />
                جرّب الآن مجاناً
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
