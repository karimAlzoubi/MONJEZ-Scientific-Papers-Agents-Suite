import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check, Sparkles, Zap, Building2, Star, GraduationCap, Calendar, ChevronDown, Wallet,
  Terminal, Code2, KeyRound, Send, ArrowRight, CheckCircle2, Webhook,
} from 'lucide-react'
import { useApp } from '../app/AppContext'

type Cycle = 'monthly' | 'yearly'

const plans = [
  {
    id: 'free',
    name: 'Freemium',
    arabic: 'المجانية',
    icon: Sparkles,
    description: 'للتجربة والاستكشاف',
    color: 'from-slate-500 to-slate-700',
    accent: 'text-white',
    monthly: 0,
    yearly: 0,
    note: 'مجاناً للأبد',
    cta: 'ابدأ مجاناً',
    features: [
      'ورقة واحدة كل أسبوع',
      'مخرجين لكل ورقة',
      'حد أقصى 20 صفحة للورقة',
      'علامة مائية على المخرجات',
      'دعم المجتمع',
    ],
  },
  {
    id: 'payg',
    name: 'Pay as you go',
    arabic: 'حسب الاستخدام',
    icon: Wallet,
    description: 'للاستخدام المرن دون التزام',
    color: 'from-amber-400 via-orange-500 to-rose-500',
    accent: 'text-amber-300',
    monthly: 5,
    yearly: 5,
    payAsYouGo: true,
    note: 'بدون اشتراك شهري',
    cta: 'اشحن رصيدك',
    features: [
      'ادفع لكل مخرج فقط',
      'بدون التزام شهري',
      'رصيد لا ينتهي صلاحيته',
      'جميع المخرجات الستة',
      'حد 100 صفحة للورقة',
      'بدون علامة مائية',
      'دعم البريد الإلكتروني',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    arabic: 'الاحترافية',
    icon: Zap,
    description: 'للباحثين والمطورين',
    color: 'from-mint-400 via-mint-500 to-mint-700',
    accent: 'text-mint-300',
    monthly: 79,
    yearly: 64,
    note: 'وفّر 19٪ سنوياً',
    cta: 'ابدأ التجربة المجانية',
    popular: true,
    features: [
      '100 مخرج شهرياً',
      'الـ 6 مخرجات بدون قيود',
      'حد 200 صفحة للورقة',
      'بدون علامة مائية',
      'أولوية المعالجة',
      'سرعة معالجة ×3',
      'دعم البريد الإلكتروني',
      'تصدير بصيغ متعددة',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    arabic: 'المؤسسية',
    icon: Building2,
    description: 'للجامعات والشركات',
    color: 'from-purple-500 via-violet-500 to-indigo-600',
    accent: 'text-violet-300',
    monthly: -1,
    yearly: -1,
    note: 'مخصص لاحتياجاتك',
    cta: 'تواصل معنا',
    features: [
      'مخرجات غير محدودة',
      'API كامل للتكامل',
      'SSO وإدارة الفرق',
      'Self-hosting متاح',
      'SLA مضمون 99.9٪',
      'مدير حساب مخصص',
      'تدريب فني للفريق',
      'تخصيص النماذج',
    ],
  },
]

export default function Pricing() {
  const [cycle, setCycle] = useState<Cycle>('yearly')

  return (
    <section id="pricing" className="relative py-12 lg:py-16 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mint-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-monjez relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="chip mb-5"
          >
            <Star className="w-3.5 h-3.5" />
            باقات مرنة لكل احتياج
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="heading-lg text-balance"
          >
            <span className="text-white">اختر الباقة </span>
            <span className="text-gradient-mint">المناسبة لك</span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-lg text-white/65"
          >
            ابدأ مجاناً، طوّر مع نموك. بدون التزامات طويلة الأمد، ألغِ في أي وقت.
          </motion.p>

          {/* Toggle */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 inline-flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur"
          >
            {(['monthly', 'yearly'] as Cycle[]).map((c) => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  cycle === c ? 'text-ink-950' : 'text-white/70 hover:text-white'
                }`}
              >
                {cycle === c && (
                  <motion.span
                    layoutId="cycle-bg"
                    className="absolute inset-0 bg-mint-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative">{c === 'monthly' ? 'شهري' : 'سنوي'}</span>
                {c === 'yearly' && cycle !== 'yearly' && (
                  <span className="relative mr-1.5 text-[10px] font-bold text-mint-400">−19٪</span>
                )}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative ${p.popular ? 'lg:-my-2' : ''}`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-mint-400 to-mint-600 text-ink-950 text-[11px] font-bold tracking-wide shadow-mint-glow whitespace-nowrap">
                    الأكثر شعبية ⭐
                  </div>
                </div>
              )}

              <div
                className={`relative h-full rounded-3xl p-6 transition-all ${
                  p.popular
                    ? 'glass-mint border-mint-500/40 shadow-mint-glow'
                    : 'glass border-white/10 hover:border-white/20'
                }`}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center shadow-lg ring-1 ring-white/10`}>
                    <p.icon className="w-6 h-6 text-white" strokeWidth={2.2} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">{p.name}</h3>
                      <span className="text-xs text-white/40">·</span>
                      <span className={`text-sm font-medium ${p.accent}`}>{p.arabic}</span>
                    </div>
                    <p className="text-xs text-white/50 mt-0.5">{p.description}</p>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {p.monthly === -1 ? (
                    <div>
                      <div className="text-4xl font-bold text-white">حسب الطلب</div>
                      <div className="text-xs text-white/50 mt-1">{p.note}</div>
                    </div>
                  ) : p.payAsYouGo ? (
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-5xl font-bold text-white tabular-nums">{p.monthly}</span>
                        <span className="text-sm text-white/50">ر.س / مخرج</span>
                      </div>
                      <div className="text-xs text-amber-300 mt-1">{p.note}</div>
                    </div>
                  ) : p.monthly === 0 ? (
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-5xl font-bold text-white">0</span>
                        <span className="text-sm text-white/50">ر.س</span>
                      </div>
                      <div className="text-xs text-white/50 mt-1">{p.note}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-5xl font-bold text-white tabular-nums">
                          {cycle === 'yearly' ? p.yearly : p.monthly}
                        </span>
                        <span className="text-sm text-white/50">ر.س / شهر</span>
                      </div>
                      <div className="text-xs text-mint-400 mt-1">
                        {cycle === 'yearly' ? `يفوتر سنوياً (${p.yearly * 12} ر.س)` : 'يفوتر شهرياً'}
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <a
                  href={p.id === 'enterprise' ? 'mailto:hello@monjez.app' : '#/app/new'}
                  className={`w-full ${
                    p.popular ? 'btn-primary' : 'btn-ghost'
                  } justify-center text-sm`}
                >
                  {p.cta}
                </a>

                {/* Divider */}
                <div className="my-6 h-px bg-white/10" />

                {/* Features */}
                <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-3 gap-y-2.5">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[13px]">
                      <div className={`shrink-0 mt-0.5 w-4 h-4 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                        <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.5} />
                      </div>
                      <span className="text-white/80 leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Discounts banner */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 grid md:grid-cols-2 gap-4 max-w-4xl mx-auto"
        >
          <div className="glass rounded-2xl p-5 flex items-center gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">خصم 50٪ للأكاديميين</div>
              <div className="text-xs text-white/55 mt-0.5">يُفعَّل تلقائياً عند التسجيل بإيميل جامعي (.edu / .edu.sa)</div>
            </div>
          </div>
          <div className="glass rounded-2xl p-5 flex items-center gap-4">
            <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-md">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white">احجز عرضاً للمؤسسات</div>
              <div className="text-xs text-white/55 mt-0.5">ديمو مجاني للجامعات والشركات السعودية</div>
            </div>
            <a
              href="mailto:hello@monjez.app"
              className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-mint-500/10 hover:bg-mint-500/20 border border-mint-500/30 text-mint-300 text-xs font-bold transition-colors"
            >
              تواصل
            </a>
          </div>
        </motion.div>

        {/* API Access — horizontal request panel */}
        <ApiAccess />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center text-sm text-white/50"
        >
          جميع الباقات تتضمن: تشفير end-to-end · امتثال GDPR · نسخ احتياطية يومية
        </motion.div>

        {/* FAQ */}
        <FAQ />
      </div>
    </section>
  )
}

const faqs = [
  {
    q: 'هل الورقة البحثية تظل ملكي بعد الرفع؟',
    a: 'نعم بالكامل. نحن نلتزم بحقوق الملكية الفكرية ولا نستخدم أوراقك لتدريب نماذجنا. يمكنك حذفها من خوادمنا في أي وقت.',
  },
  {
    q: 'كم يستغرق توليد المخرجات فعلياً؟',
    a: 'المتوسط 5-7 دقائق لتوليد كافة المخرجات الستة من ورقة واحدة (تقريباً دقيقة لكل مخرج). الكود وحده يحتاج دقيقة تقريباً، والفيديو 1-2 دقيقة حسب التعقيد.',
  },
  {
    q: 'ما اللغات المدعومة؟',
    a: 'العربية والإنجليزية حالياً. سنضيف الفرنسية والإسبانية قريباً. الكود البرمجي يولّد بـ Python أو JavaScript حسب اختيارك.',
  },
  {
    q: 'هل يمكنني إلغاء الاشتراك في أي وقت؟',
    a: 'نعم، بدون أي رسوم إلغاء أو التزامات. ستبقى تستفيد من الباقة حتى نهاية الشهر المدفوع.',
  },
  {
    q: 'هل تدعم الأبحاث متعددة الصفحات الكبيرة؟',
    a: 'باقة Free حتى 20 صفحة، Pro حتى 200 صفحة، Enterprise بدون حد. الأوراق بتنسيق PDF فقط حالياً.',
  },
  {
    q: 'كيف يمكن للجامعات السعودية الحصول على عرض خاص؟',
    a: 'نقدم خصومات وميزات مخصصة للمؤسسات الأكاديمية السعودية. تواصل معنا عبر hello@monjez.app لترتيب اجتماع.',
  },
]

function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <motion.div
      id="faq"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="mt-12 max-w-3xl mx-auto scroll-mt-20"
    >
      <div className="text-center mb-8">
        <div className="chip mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          أسئلة شائعة
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white">إجابات على ما قد يدور في ذهنك</h3>
      </div>

      <div className="space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="glass rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full px-5 py-4 flex items-center justify-between gap-3 text-right hover:bg-white/[0.02] transition-colors"
            >
              <span className="text-sm sm:text-base font-bold text-white">{f.q}</span>
              <ChevronDown
                className={`w-5 h-5 text-mint-400 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 text-sm text-white/70 leading-relaxed border-t border-white/5 pt-4">
                    {f.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ==================== API Access ==================== */

function ApiAccess() {
  const { toast } = useApp()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [org, setOrg] = useState('')
  const [useCase, setUseCase] = useState('')
  const [volume, setVolume] = useState<'low' | 'mid' | 'high'>('mid')
  const [submitted, setSubmitted] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !useCase.trim()) {
      toast({ type: 'warning', title: 'فضلاً اكمل الحقول المطلوبة' })
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast({ type: 'warning', title: 'البريد الإلكتروني غير صالح' })
      return
    }
    setSubmitted(true)
    toast({
      type: 'success',
      title: 'تم استلام طلبك بنجاح',
      description: 'سنرد عليك خلال يوم عمل بمفتاح اختبار وتفاصيل التسعير.',
    })
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="mt-14 max-w-5xl mx-auto"
    >
      {/* Section heading */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-[11px] font-bold uppercase tracking-wider mb-3">
          <Terminal className="w-3 h-3" />
          API للمطوّرين
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          <span className="text-white">تحتاج وصول </span>
          <span className="text-gradient-mint">برمجي</span>
          <span className="text-white">؟</span>
        </h3>
        <p className="text-sm text-white/60 leading-relaxed">
          ادمج قدرات مُنجِز في منتجك عبر REST API و Webhooks · مفتاح اختبار خلال 24 ساعة
        </p>
      </div>

      <div className="relative">
        {/* Outer glow — subtle */}
        <div className="absolute -inset-2 bg-gradient-to-r from-violet-500/10 via-mint-500/8 to-blue-500/10 rounded-2xl blur-2xl pointer-events-none" />

        <div className="relative glass rounded-2xl overflow-hidden border border-white/10">
          {/* Top gradient accent */}
          <div className="h-px bg-gradient-to-r from-violet-500/70 via-mint-400/70 to-blue-500/70" />

          <div className="grid lg:grid-cols-[1fr_1.05fr]">
            {/* ============ Left: Branding + features + code preview ============ */}
            <div className="relative p-5 lg:p-6 border-b lg:border-b-0 lg:border-l border-white/[0.06] overflow-hidden">
              {/* Soft violet blob */}
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h4 className="text-sm font-bold text-white/85 flex items-center gap-2">
                    <span className="text-gradient-mint">مُنجِز API</span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-mint-500/10 border border-mint-500/30 text-mint-300 text-[9px] font-bold uppercase tracking-wider">
                      Beta
                    </span>
                  </h4>
                </div>

                {/* Feature chips — inline */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <FeatureChip icon={Code2} label="REST + JSON" />
                  <FeatureChip icon={Webhook} label="Webhooks" />
                  <FeatureChip icon={KeyRound} label="API Keys" />
                  <FeatureChip icon={Zap} label="Rate limits مرنة" />
                </div>

                {/* Realistic code preview */}
                <div className="rounded-lg bg-ink-950/70 border border-white/[0.08] overflow-hidden font-mono text-[10.5px] leading-[1.55]">
                  <div className="flex items-center gap-1 px-2.5 py-1.5 bg-white/[0.02] border-b border-white/5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/70" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                    <span className="ml-auto text-[9px] uppercase tracking-wider text-white/35">terminal — bash</span>
                  </div>
                  <div className="px-2.5 py-2 overflow-x-auto" dir="ltr">
                    <div className="whitespace-nowrap">
                      <span className="text-mint-400">$</span>
                      <span className="text-white/85"> curl</span>
                      <span className="text-white/55"> -X </span>
                      <span className="text-violet-300">POST</span>
                      <span className="text-white/85"> https://api.monjez.app</span>
                      <span className="text-mint-300">/v1/papers</span>
                      <span className="text-white/30"> \</span>
                    </div>
                    <div className="whitespace-nowrap">
                      <span className="text-white/55">    -H </span>
                      <span className="text-amber-300">"Authorization: Bearer sk_live_a1b2c3…"</span>
                      <span className="text-white/30"> \</span>
                    </div>
                    <div className="whitespace-nowrap">
                      <span className="text-white/55">    -d </span>
                      <span className="text-white/40">{"'{"}</span>
                      <span className="text-mint-200">"pdf_url"</span>
                      <span className="text-white/55">: </span>
                      <span className="text-amber-300">"…1706.03762"</span>
                      <span className="text-white/55">, </span>
                      <span className="text-mint-200">"outputs"</span>
                      <span className="text-white/55">: [</span>
                      <span className="text-amber-300">"code"</span>
                      <span className="text-white/55">]</span>
                      <span className="text-white/40">{"}'"}</span>
                    </div>
                    <div className="whitespace-nowrap mt-1.5 pt-1.5 border-t border-white/5">
                      <span className="text-emerald-400">← 202</span>
                      <span className="text-white/55"> </span>
                      <span className="text-mint-200">"job_id"</span>
                      <span className="text-white/55">: </span>
                      <span className="text-amber-300">"job_8f2a4d"</span>
                    </div>
                  </div>
                </div>

                {/* Quick stats — fills bottom space */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <Stat label="متوسط الاستجابة" value="<200ms" />
                  <Stat label="Uptime SLA" value="99.9%" />
                  <Stat label="SDKs رسمية" value="Python · JS" />
                </div>

                {/* Coming-soon note */}
                <div className="mt-3 flex items-center gap-2 text-[11px] text-white/45 leading-relaxed">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-mint-400 animate-pulse" />
                  <span>
                    قريباً: <span className="text-white/65">Streaming responses</span> · <span className="text-white/65">Batch API</span> · <span className="text-white/65">Custom models</span>
                  </span>
                </div>
              </div>
            </div>

            {/* ============ Right: Request form ============ */}
            <div className="relative p-5 lg:p-6 bg-gradient-to-br from-mint-500/[0.03] via-transparent to-violet-500/[0.03]">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="h-full min-h-[260px] flex flex-col items-center justify-center text-center"
                  >
                    <div className="relative mb-3">
                      <div className="absolute inset-0 bg-mint-400/25 rounded-full blur-lg animate-pulse" />
                      <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-mint-400 to-mint-600 flex items-center justify-center shadow-mint-glow ring-1 ring-mint-300/40">
                        <CheckCircle2 className="w-6 h-6 text-ink-950" strokeWidth={2.5} />
                      </div>
                    </div>
                    <h4 className="text-base font-bold text-white mb-1.5">تم استلام طلبك ✦</h4>
                    <p className="text-xs text-white/60 leading-relaxed max-w-xs">
                      سنرد على <span className="text-mint-300 font-semibold" dir="ltr">{email}</span> خلال يوم عمل.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false)
                        setName(''); setEmail(''); setOrg(''); setUseCase('')
                      }}
                      className="mt-4 text-[11px] text-white/55 hover:text-white px-2.5 py-1 rounded-md hover:bg-white/5 transition-colors"
                    >
                      إرسال طلب آخر
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                  >
                    <h4 className="text-sm font-bold text-white mb-0.5">اطلب وصول API</h4>
                    <p className="text-[11px] text-white/45 mb-3">سنرد خلال يوم عمل بمفتاح اختبار وتفاصيل التسعير.</p>

                    <div className="grid sm:grid-cols-2 gap-2 mb-2">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="الاسم *"
                        className={inputClass}
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com *"
                        dir="ltr"
                        className={inputClass}
                      />
                    </div>

                    <input
                      type="text"
                      value={org}
                      onChange={(e) => setOrg(e.target.value)}
                      placeholder="الجهة (اختياري)"
                      className={`${inputClass} mb-2`}
                    />

                    {/* Volume — inline tiny segmented */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] text-white/45 shrink-0 font-medium">الحجم:</span>
                      <div className="flex-1 grid grid-cols-3 gap-1 p-0.5 rounded-md bg-white/[0.03] border border-white/10">
                        {([
                          { id: 'low', label: '<100' },
                          { id: 'mid', label: '100-1K' },
                          { id: 'high', label: '1K+' },
                        ] as const).map((v) => (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setVolume(v.id)}
                            className={`px-1.5 py-1 rounded text-[10px] font-bold transition-all ${
                              volume === v.id
                                ? 'bg-mint-500/20 text-mint-200'
                                : 'text-white/50 hover:text-white/80'
                            }`}
                          >
                            {v.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <textarea
                      value={useCase}
                      onChange={(e) => setUseCase(e.target.value)}
                      rows={2}
                      placeholder="حالة الاستخدام: كيف تنوي استخدام API؟ *"
                      className={`${inputClass} resize-none leading-relaxed mb-3`}
                    />

                    <button
                      type="submit"
                      className="btn-primary w-full justify-center !py-2 text-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      أرسل طلب الوصول
                      <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const inputClass =
  'w-full px-2.5 py-2 rounded-md bg-white/[0.03] border border-white/10 text-white text-[13px] placeholder:text-white/35 focus:outline-none focus:border-mint-500/50 focus:bg-white/[0.05] transition-colors'

function FeatureChip({ icon: Icon, label }: { icon: typeof Code2; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/[0.03] border border-white/10 text-[11px] font-medium text-white/75">
      <Icon className="w-3 h-3 text-mint-300" strokeWidth={2.4} />
      {label}
    </span>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/[0.025] border border-white/[0.08] px-2.5 py-2">
      <div className="text-[10px] text-white/45 leading-tight mb-0.5">{label}</div>
      <div className="text-[12px] font-bold text-mint-300 leading-tight tabular-nums">{value}</div>
    </div>
  )
}
