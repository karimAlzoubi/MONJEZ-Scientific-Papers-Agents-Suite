import { motion } from 'framer-motion'
import { Award, Trophy, Linkedin, Github, Mail } from 'lucide-react'

const founders = [
  {
    name: 'محمد كريم الزعبي',
    en: 'Mohammad Karim Alzoubi',
    role: 'مهندس ذكاء اصطناعي',
    enRole: 'AI Engineer',
    initials: 'M K',
    color: 'from-mint-400 via-mint-500 to-mint-700',
  },
  {
    name: 'أسامة شققي',
    en: 'Osama Shoqaqi',
    role: 'مهندس برمجيات',
    enRole: 'Software Engineer',
    initials: 'O S',
    color: 'from-blue-400 via-cyan-500 to-teal-600',
  },
]

const achievements = [
  {
    place: 'المركز الأول',
    name: 'هاكاثون الصناعة',
    org: 'SIDF · KACST · KAUST · Ma\'aden',
    prize: '120,000',
    color: 'from-amber-400 to-orange-500',
  },
  {
    place: 'المركز الأول',
    name: 'هاكاثون فنتك المستقبل',
    org: 'Solutions by stc · KSU',
    prize: '60,000',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    place: 'Expert Mentor',
    name: 'هاكاثون أبشر طويق',
    org: 'Tuwaiq Academy · Elm · SDAIA',
    prize: 'World\'s Largest',
    color: 'from-purple-400 to-violet-500',
  },
]

const partners = [
  'Solutions by stc',
  'The Garage',
  'NTDP',
  'مسك',
  'SIDF',
  'هاكاثون الصناعة',
  'Code',
  'وزارة الاتصالات',
]

export default function Founders() {
  return (
    <section id="team" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="container-monjez relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="chip mb-5"
          >
            <Award className="w-3.5 h-3.5" />
            الفريق المؤسس
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="heading-lg text-balance"
          >
            <span className="text-white">فريق </span>
            <span className="text-gradient-mint">يحوّل الأفكار إلى منتجات</span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-lg text-white/65"
          >
            مهندسون متخصصون في البرمجيات والذكاء الاصطناعي. سجلّنا متحدث: مشاريع من الصفر إلى الإطلاق،
            مدعومة بجوائز وطنية ومحفظة تطبيقات منشورة.
          </motion.p>
        </div>

        {/* Founders */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-20">
          {founders.map((f, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative"
            >
              <div className={`absolute -inset-1 bg-gradient-to-br ${f.color} rounded-3xl opacity-15 blur-2xl group-hover:opacity-30 transition-opacity`} />
              <div className="relative glass rounded-3xl p-7 hover:border-mint-500/30 transition-all">
                <div className="flex items-start gap-5">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-xl ring-2 ring-white/10`}>
                      <span className="text-2xl font-bold text-white tracking-tight">{f.initials}</span>
                    </div>
                    <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-mint-400 border-2 border-ink-900 flex items-center justify-center">
                      <span className="text-[10px]">✓</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-white">{f.name}</h3>
                    <div className="text-xs font-mono text-mint-400 mt-0.5">{f.en}</div>
                    <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-mint-500/10 border border-mint-500/20 text-mint-300 text-xs font-semibold">
                      {f.role}
                    </div>

                    {/* Socials */}
                    <div className="mt-5 flex items-center gap-2">
                      <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-mint-500/10 hover:border-mint-500/40 hover:text-mint-300 text-white/60 flex items-center justify-center transition-all">
                        <Linkedin className="w-4 h-4" />
                      </a>
                      <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-mint-500/10 hover:border-mint-500/40 hover:text-mint-300 text-white/60 flex items-center justify-center transition-all">
                        <Github className="w-4 h-4" />
                      </a>
                      <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-mint-500/10 hover:border-mint-500/40 hover:text-mint-300 text-white/60 flex items-center justify-center transition-all">
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white">الإنجازات والجوائز</h3>
            <p className="text-sm text-white/50 mt-1">سجل حافل بالتفوق على الساحة الوطنية والدولية</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {achievements.map((a, i) => (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group glass rounded-2xl p-5 hover:border-mint-500/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${a.color} flex items-center justify-center shadow-lg`}>
                    <Trophy className="w-6 h-6 text-white" strokeWidth={2.2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-mint-400 mb-1">{a.place}</div>
                    <h4 className="text-base font-bold text-white">{a.name}</h4>
                    <p className="text-xs text-white/55 mt-1">{a.org}</p>
                    <div className="mt-2.5 flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white tabular-nums">{a.prize}</span>
                      <span className="text-xs text-white/50">
                        {a.prize.includes(',') ? 'ر.س' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partners marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="text-xs text-white/40 mb-5 tracking-[0.3em] uppercase">تستند خبرة فريقنا إلى</div>
          <div className="overflow-hidden mask-fade-edges">
            <div className="flex gap-8 animate-marquee whitespace-nowrap">
              {[...partners, ...partners, ...partners].map((p, i) => (
                <div key={i} className="shrink-0 px-6 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/65 text-sm font-medium">
                  {p}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
