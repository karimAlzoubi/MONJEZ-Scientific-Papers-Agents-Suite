import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { Hourglass, FileSearch, Lock, AlertTriangle } from 'lucide-react'

function CountUp({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const startTime = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setCount(Math.floor(start + (end - start) * eased))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, end, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}

const problems = [
  {
    icon: Hourglass,
    color: 'from-coral-400 to-coral-600',
    title: 'تحويل البحث إلى تطبيق',
    desc: 'يستغرق من أيام إلى أسابيع من العمل اليدوي، مما يؤخر دورة حياة تطوير المنتج (SDLC).',
    stat: '×7',
    statLabel: 'إبطاء التطوير',
  },
  {
    icon: FileSearch,
    color: 'from-amber-400 to-orange-500',
    title: 'فجوة التنفيذ البرمجي',
    desc: '٨٠٪ من الأبحاث تظل نصوصاً تفتقر للتنفيذ، وتعطل تحويل الأفكار إلى منتجات.',
    stat: '80%',
    statLabel: 'بدون تنفيذ',
  },
  {
    icon: Lock,
    color: 'from-rose-400 to-pink-500',
    title: 'معرفة جامدة محبوسة',
    desc: 'الأبحاث تبقى حبيسة المنشورات، تُولد لتُدفن بدلاً من أن تتحول إلى قيمة حقيقية.',
    stat: '9s',
    statLabel: 'كل ورقة جديدة',
  },
]

export default function Problem() {
  return (
    <section id="problem" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="container-monjez relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-coral-500/10 border border-coral-500/30 text-coral-400 text-xs font-bold tracking-widest uppercase mb-5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            المشكلة
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="heading-lg text-balance"
          >
            <span className="text-white">الإنتاج العلمي ضخم...</span>{' '}
            <span className="text-gradient-mint">لكن تطبيقه ضعيف</span>
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-lg text-white/65 leading-relaxed"
          >
            رغم التقدم الكبير في إنتاج الأبحاث العلمية، لا تزال الفجوة بين المعرفة النظرية والتطبيق العملي
            موجودة. كل يوم تُنشر آلاف الأوراق التي قد تغير مستقبل التقنية، لكن الحقيقة الصادمة:
          </motion.p>
        </div>

        {/* Big stat cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {[
            { value: 3, suffix: 'M+', label: 'ورقة بحثية تنشر سنوياً', sub: 'حول العالم' },
            { value: 80, suffix: '%', label: 'من الأبحاث بدون كود', sub: 'تظل نصوصاً فقط' },
            { value: 9, suffix: 's', label: 'فاصل ورقة جديدة', sub: 'تولد لتدفن' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-mint-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              <div className="relative glass rounded-2xl p-7 h-full">
                <div className="font-display text-6xl lg:text-7xl font-bold text-gradient-mint leading-none">
                  <CountUp end={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-4 text-base text-white/85 font-semibold">{s.label}</div>
                <div className="mt-1 text-sm text-white/50">{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative group glass rounded-2xl p-6 hover:border-mint-500/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow-lg`}>
                  <p.icon className="w-6 h-6 text-white" strokeWidth={2.2} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom takeaway */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mt-12 max-w-3xl mx-auto text-center"
        >
          <p className="text-lg sm:text-xl text-coral-300/90 font-semibold leading-relaxed">
            هذه الفجوة لا تُهدر الموارد فحسب —{' '}
            <span className="text-coral-400">بل هي حاجز يمنع الأبحاث من التحول إلى قيمة حقيقية</span>.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
