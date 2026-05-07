import { motion } from 'framer-motion'

const sponsors = [
  { name: 'PSAU',    src: '/sponsors/psau.svg',         filter: 'brightness(0) invert(1)',        offsetY: 0,  height: 'h-16 sm:h-20' },
  { name: 'Beyond',  src: '/sponsors/beyond.svg',       filter: 'brightness(0) invert(1)',        offsetY: 16, height: 'h-20 sm:h-24' },
  { name: 'AI Club', src: '/sponsors/ai-club-logo.png', filter: 'brightness(0) invert(1)',        offsetY: -8, height: 'h-20 sm:h-24' },
]

type Variant = 'hero' | 'navbar'

export default function SponsorsBar({ variant = 'hero' }: { variant?: Variant }) {
  if (variant === 'navbar') {
    return (
      <div className="flex items-center gap-3 xl:gap-4">
        {sponsors.map((s) => (
          <img
            key={s.name}
            src={s.src}
            alt={s.name}
            className="h-6 xl:h-7 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
            style={{ filter: s.filter, transform: `translateY(${s.offsetY * 0.25}px)` }}
          />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center gap-3 -mt-4 mb-8 sm:mb-10"
    >
      <div className="flex items-center gap-3 text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-mint-400/80">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-mint-400/40" />
        بدعم من شركاء النجاح
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-mint-400/40" />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-12 sm:gap-x-16 gap-y-5">
        {sponsors.map((s, i) => (
          <div key={s.name} className="flex items-center gap-x-12 sm:gap-x-16">
            <div style={{ transform: `translateY(${s.offsetY}px)` }}>
              <motion.img
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                src={s.src}
                alt={s.name}
                className={`${s.height} w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300`}
                style={{ filter: s.filter }}
              />
            </div>
            {i < sponsors.length - 1 && (
              <span className="hidden sm:block w-px h-12 bg-white/15 translate-y-3" aria-hidden />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
