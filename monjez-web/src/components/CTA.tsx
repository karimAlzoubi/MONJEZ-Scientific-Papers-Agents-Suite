import { motion } from 'framer-motion'
import { Sparkles, ArrowLeft, Github, Globe } from 'lucide-react'

export default function CTA() {
  return (
    <section id="cta" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="container-monjez relative z-10">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Glow background */}
          <div className="absolute inset-0 bg-gradient-to-br from-mint-500/30 via-mint-700/20 to-transparent rounded-[2.5rem] blur-3xl" />

          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-mint-500 via-mint-600 to-mint-800 p-1 shadow-mint-glow-lg">
            {/* Inner card */}
            <div className="relative rounded-[2.4rem] bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 px-8 py-14 sm:px-14 sm:py-20 overflow-hidden">
              {/* Decorative grid */}
              <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

              {/* Decorative blobs */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-mint-500/30 rounded-full blur-3xl pointer-events-none animate-aurora" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-mint-700/30 rounded-full blur-3xl pointer-events-none animate-aurora" style={{ animationDelay: '5s' }} />

              <div className="relative text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', duration: 0.7, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mint-500/20 border border-mint-400/40 text-mint-300 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md"
                >
                  <Sparkles className="w-4 h-4" />
                  جاهزون 80% — والباقي خلال الهاكاثون
                </motion.div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-balance">
                  <span className="text-white">حوّل أوراقك البحثية إلى </span>
                  <span className="text-gradient-mint">منتجات حقيقية</span>
                  <br />
                  <span className="text-white">ابدأ مع </span>
                  <span className="text-gradient-mint">مُنجِز</span>
                  <span className="text-white"> اليوم</span>
                </h2>

                <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                  ٥ مخرجات مجانية شهرياً. بدون بطاقة ائتمانية. ابدأ خلال ٣٠ ثانية.
                </p>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <a href="#/app/new" className="btn-primary text-base">
                    <Sparkles className="w-5 h-5" />
                    ابدأ الآن مجاناً
                    <ArrowLeft className="w-4 h-4" />
                  </a>
                  <a
                    href="https://github.com/karimAlzoubi/MONJEZ-Scientific-Papers-Agents-Suite"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost text-base"
                  >
                    <Github className="w-5 h-5" />
                    استكشف الكود مفتوح المصدر
                  </a>
                </div>

                {/* Trust */}
                <div className="mt-10 pt-10 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                  {[
                    { v: '٦', l: 'مخرجات' },
                    { v: '~1m', l: 'لكل مخرج' },
                    { v: '99.9%', l: 'وقت تشغيل' },
                    { v: 'AR/EN', l: 'لغات مدعومة' },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="text-2xl font-bold text-gradient-mint">{s.v}</div>
                      <div className="text-xs text-white/50 mt-1">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* External link */}
          <div className="mt-8 text-center">
            <a
              href="https://agenticthon.com/#home"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-mint-300 transition-colors"
            >
              <Globe className="w-4 h-4" />
              تعرّف على هاكاثون Agenticthon
              <ArrowLeft className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
