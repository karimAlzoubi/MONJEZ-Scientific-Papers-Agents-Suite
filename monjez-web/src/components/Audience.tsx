import { motion } from 'framer-motion'
import { GraduationCap, Rocket, Microscope, Code2, Users } from 'lucide-react'

const audiences = [
  {
    icon: GraduationCap,
    color: 'from-blue-500 via-cyan-500 to-teal-500',
    title: 'الطلاب والمبتكرون',
    subtitle: 'Students & Innovators',
    desc: 'كسر حاجز التعقيد التقني، وتمكينهم من فهم وتجربة نماذج الأبحاث عبر واجهات تفاعلية سهلة.',
    benefit: 'تعلّم بسرعة ×5',
  },
  {
    icon: Rocket,
    color: 'from-orange-500 via-amber-500 to-yellow-500',
    title: 'رواد الأعمال',
    subtitle: 'Entrepreneurs',
    desc: 'تسريع دورة الابتكار وتخفيض التكاليف عبر تحويل الأبحاث العلمية إلى نماذج أولية MVP بسرعة.',
    benefit: 'من فكرة إلى MVP',
  },
  {
    icon: Microscope,
    color: 'from-emerald-500 via-teal-500 to-cyan-500',
    title: 'الباحثون والأكاديميون',
    subtitle: 'Researchers',
    desc: 'مضاعفة أثر أبحاثهم بتحويلها لأدوات تفاعلية، وتوليد ملصقات وعروض احترافية بضغطة زر.',
    benefit: 'مضاعفة الأثر',
  },
  {
    icon: Code2,
    color: 'from-purple-500 via-violet-500 to-indigo-500',
    title: 'مهندسو الذكاء الاصطناعي',
    subtitle: 'AI Engineers',
    desc: 'اختصار أسابيع من قراءة الأبحاث لاستخراج الخوارزميات، وتوليد أكواد ونماذج جاهزة للاستخدام.',
    benefit: 'وفّر أسابيع',
  },
]

export default function Audience() {
  return (
    <section id="audience" className="relative py-12 lg:py-16 scroll-mt-20">
      <div className="container-monjez">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="chip mb-5"
          >
            <Users className="w-3.5 h-3.5" />
            مَن يستخدم مُنجِز؟
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="heading-lg text-balance"
          >
            <span className="text-white">صُمم لـ </span>
            <span className="text-gradient-mint">كل مَن يصنع المستقبل</span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-lg text-white/65"
          >
            مُنجِز ليس مجرد أداة — إنه شريك ابتكار للجميع.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {audiences.map((a, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-br ${a.color} rounded-3xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />
              <div className="relative h-full glass rounded-3xl p-6 flex flex-col group-hover:border-white/20 transition-all card-hover">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center shadow-lg ring-1 ring-white/10 mb-5`}>
                  <a.icon className="w-7 h-7 text-white" strokeWidth={2.2} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{a.title}</h3>
                  <p className="text-xs font-mono text-mint-400 mb-3">{a.subtitle}</p>
                  <p className="text-sm text-white/65 leading-relaxed">{a.desc}</p>
                </div>

                {/* Benefit chip */}
                <div className="mt-5 inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-full bg-mint-500/10 border border-mint-500/20 text-mint-300 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint-400" />
                  {a.benefit}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
