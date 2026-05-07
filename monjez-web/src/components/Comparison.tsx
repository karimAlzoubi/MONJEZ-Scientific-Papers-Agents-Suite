import { motion } from 'framer-motion'
import { Check, X, Trophy, Minus } from 'lucide-react'

type Status = 'yes' | 'no' | 'partial'

interface Row {
  feature: string
  monjez: { status: Status; label: string }
  generative: { status: Status; label: string }
  coding: { status: Status; label: string }
  academic: { status: Status; label: string }
  design: { status: Status; label: string }
}

const rows: Row[] = [
  {
    feature: 'تحليل وفهم الأبحاث',
    monjez: { status: 'yes', label: 'استخراج ذكي' },
    generative: { status: 'partial', label: 'قدرة عالية' },
    coding: { status: 'partial', label: 'يحتاج توجيه' },
    academic: { status: 'yes', label: 'مخصص وممتاز' },
    design: { status: 'no', label: 'غير مدعوم' },
  },
  {
    feature: 'كود من ورقة بحثية',
    monjez: { status: 'yes', label: 'خطوات بسيطة' },
    generative: { status: 'partial', label: 'يتطلب توجيه' },
    coding: { status: 'partial', label: 'إشراف مستخدم' },
    academic: { status: 'no', label: 'تحليل بدون تحويل' },
    design: { status: 'no', label: 'غير مخصص' },
  },
  {
    feature: 'فيديو علمي تفاعلي',
    monjez: { status: 'yes', label: 'توليد دقيق بالكود' },
    generative: { status: 'partial', label: 'توليد نصوص فقط' },
    coding: { status: 'no', label: 'غير مدعوم' },
    academic: { status: 'no', label: 'غير مخصص' },
    design: { status: 'partial', label: 'قوالب عامة فقط' },
  },
  {
    feature: 'بودكاست تفاعلي',
    monjez: { status: 'yes', label: 'تحكم كامل بالسكربت' },
    generative: { status: 'partial', label: 'نص فقط' },
    coding: { status: 'no', label: 'غير مدعوم' },
    academic: { status: 'partial', label: 'صوتي بدون تحكم' },
    design: { status: 'no', label: 'غير مدعوم' },
  },
  {
    feature: 'بوستر علمي احترافي',
    monjez: { status: 'yes', label: 'توليد آلي متكامل' },
    generative: { status: 'partial', label: 'مخرجات غير منظمة' },
    coding: { status: 'no', label: 'غير مخصص' },
    academic: { status: 'no', label: 'غير مخصص' },
    design: { status: 'partial', label: 'إدخال نصوص يدوياً' },
  },
  {
    feature: 'عروض تقديمية من الورقة',
    monjez: { status: 'yes', label: 'مباشر ومنظم' },
    generative: { status: 'partial', label: 'نصوص فقط' },
    coding: { status: 'no', label: 'غير مخصص' },
    academic: { status: 'no', label: 'غير مخصص' },
    design: { status: 'yes', label: 'قوالب وتوليد' },
  },
  {
    feature: 'دعم متعدد المخرجات',
    monjez: { status: 'yes', label: 'دعم كامل متزامن' },
    generative: { status: 'partial', label: 'متسلسل ومتقطع' },
    coding: { status: 'no', label: 'غير مدعوم' },
    academic: { status: 'no', label: 'غير مدعوم' },
    design: { status: 'no', label: 'غير مدعوم' },
  },
  {
    feature: 'سهولة للمبتدئين',
    monjez: { status: 'yes', label: 'واجهة موحدة' },
    generative: { status: 'yes', label: 'محادثة بسيطة' },
    coding: { status: 'partial', label: 'يحتاج خلفية برمجية' },
    academic: { status: 'partial', label: 'تحليل بدون تحويل' },
    design: { status: 'partial', label: 'مسار منفصل' },
  },
  {
    feature: 'وكلاء يعملون معاً',
    monjez: { status: 'yes', label: '6 وكلاء متكاملين' },
    generative: { status: 'partial', label: 'يعتمد على التوجيه' },
    coding: { status: 'partial', label: 'مخصص للبرمجة فقط' },
    academic: { status: 'no', label: 'أداة مفردة' },
    design: { status: 'no', label: 'أداة مفردة' },
  },
]

function StatusCell({ status, label }: { status: Status; label: string }) {
  if (status === 'yes') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-mint-500/15 border border-mint-500/40 text-mint-300">
        <Check className="w-3 h-3" strokeWidth={3} />
        <span className="text-[11px] font-medium">{label}</span>
      </div>
    )
  }
  if (status === 'no') {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300/80">
        <X className="w-3 h-3" strokeWidth={3} />
        <span className="text-[11px] font-medium">{label}</span>
      </div>
    )
  }
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300/85">
      <Minus className="w-3 h-3" strokeWidth={3} />
      <span className="text-[11px] font-medium">{label}</span>
    </div>
  )
}

export default function Comparison() {
  return (
    <section id="comparison" className="relative py-12 lg:py-16 scroll-mt-20">
      <div className="container-monjez">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="chip mb-5"
          >
            <Trophy className="w-3.5 h-3.5" />
            مقارنة شاملة
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="heading-lg text-balance"
          >
            <span className="text-white">لماذا </span>
            <span className="text-gradient-mint">مُنجِز</span>
            <span className="text-white"> هو الخيار الأمثل؟</span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-lg text-white/65"
          >
            مقارنة بين مُنجِز والحلول الأخرى — كل عمود يمثل بدائل في السوق.
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-mint-500/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />

          <div className="relative overflow-x-auto rounded-3xl border border-white/10 bg-ink-900/60 backdrop-blur-xl">
            <table className="w-full text-right min-w-[900px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-4 text-right font-medium text-white/60 text-sm sticky right-0 bg-ink-900/95 backdrop-blur w-[200px]">
                    الميزة
                  </th>
                  <th className="p-4 text-center min-w-[180px]">
                    <div className="relative inline-flex flex-col items-center">
                      <span className="absolute -top-3 px-2 py-0.5 rounded-full bg-mint-500 text-ink-950 text-[10px] font-bold tracking-wider">
                        الأفضل
                      </span>
                      <span className="font-bold text-base text-mint-300 mt-1">مُنجِز</span>
                      <span className="text-[10px] text-white/40 mt-0.5">100%</span>
                    </div>
                  </th>
                  <th className="p-4 text-center min-w-[150px]">
                    <span className="font-semibold text-white/70 text-sm">النماذج التوليدية</span>
                    <div className="text-[10px] text-white/40 mt-1">GPT · Gemini · Claude</div>
                    <div className="mt-1.5 h-1 w-12 mx-auto bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 w-[55%]" />
                    </div>
                  </th>
                  <th className="p-4 text-center min-w-[150px]">
                    <span className="font-semibold text-white/70 text-sm">وكلاء البرمجة</span>
                    <div className="text-[10px] text-white/40 mt-1">Cursor · v0</div>
                    <div className="mt-1.5 h-1 w-12 mx-auto bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 w-[40%]" />
                    </div>
                  </th>
                  <th className="p-4 text-center min-w-[150px]">
                    <span className="font-semibold text-white/70 text-sm">البحث الأكاديمي</span>
                    <div className="text-[10px] text-white/40 mt-1">SciSpace · Elicit</div>
                    <div className="mt-1.5 h-1 w-12 mx-auto bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 w-[45%]" />
                    </div>
                  </th>
                  <th className="p-4 text-center min-w-[150px]">
                    <span className="font-semibold text-white/70 text-sm">التصميم التوليدي</span>
                    <div className="text-[10px] text-white/40 mt-1">Gamma · Canva</div>
                    <div className="mt-1.5 h-1 w-12 mx-auto bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 w-[35%]" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="border-b border-white/[0.04] hover:bg-mint-500/[0.02] transition-colors group"
                  >
                    <td className="p-4 text-sm font-medium text-white/85 sticky right-0 bg-ink-900/95 backdrop-blur group-hover:bg-mint-500/[0.04]">
                      {row.feature}
                    </td>
                    <td className="p-4 text-center bg-mint-500/[0.04]">
                      <StatusCell {...row.monjez} />
                    </td>
                    <td className="p-4 text-center">
                      <StatusCell {...row.generative} />
                    </td>
                    <td className="p-4 text-center">
                      <StatusCell {...row.coding} />
                    </td>
                    <td className="p-4 text-center">
                      <StatusCell {...row.academic} />
                    </td>
                    <td className="p-4 text-center">
                      <StatusCell {...row.design} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
