import { Mail, Github, Twitter, Linkedin, Heart } from 'lucide-react'
import Logo, { Wordmark } from './Logo'

const cols = [
  {
    title: 'المنتج',
    links: [
      { label: 'الحلول', href: '#solutions' },
      { label: 'كيف يعمل', href: '#how' },
      { label: 'الباقات', href: '#pricing' },
      { label: 'المقارنة', href: '#comparison' },
    ],
  },
  {
    title: 'الموارد',
    links: [
      { label: 'التوثيق', href: '#' },
      { label: 'دليل المطور', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'مدونة الأبحاث', href: '#' },
    ],
  },
  {
    title: 'الشركة',
    links: [
      { label: 'الفريق', href: '#team' },
      { label: 'شركاؤنا', href: '#' },
      { label: 'تواصل معنا', href: '#' },
      { label: 'فرص العمل', href: '#' },
    ],
  },
  {
    title: 'قانوني',
    links: [
      { label: 'الخصوصية', href: '#' },
      { label: 'الشروط', href: '#' },
      { label: 'الأمن', href: '#' },
      { label: 'GDPR', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none mask-fade-bottom" />
      <div className="container-monjez relative z-10">
        <div className="grid lg:grid-cols-[1.4fr_2.6fr] gap-12 mb-12">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-3 mb-5" aria-label="مُنجِز · Monjez">
              <Logo className="w-14 h-14" />
              <Wordmark className="h-11" />
            </a>
            <p className="text-sm text-white/55 leading-relaxed max-w-sm mb-6">
              منصة وكلاء الذكاء الاصطناعي لتحويل الأوراق البحثية إلى مخرجات عملية.
              نبثّ الحياة في الأوراق ونضع الابتكار بين يديك بضغطة.
            </p>

            {/* Newsletter */}
            <div className="glass rounded-2xl p-4 max-w-sm">
              <div className="text-sm font-semibold text-white mb-2">اشترك في النشرة البريدية</div>
              <div className="text-xs text-white/50 mb-3">آخر التحديثات وميزات قادمة</div>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="email@example.com"
                  className="flex-1 px-3 py-2 rounded-xl bg-ink-950 border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-mint-500/50 transition-colors"
                />
                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-mint-500 text-ink-950 text-sm font-bold hover:bg-mint-400 transition-colors"
                >
                  اشترك
                </button>
              </form>
            </div>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {cols.map((c, i) => (
              <div key={i}>
                <h4 className="text-sm font-bold text-white mb-4">{c.title}</h4>
                <ul className="space-y-2.5">
                  {c.links.map((l, j) => (
                    <li key={j}>
                      <a
                        href={l.href}
                        className="text-sm text-white/55 hover:text-mint-300 transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col-reverse md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-xs text-white/50">
            <span>© 2026 مُنجِز · Monjez. جميع الحقوق محفوظة.</span>
            <span className="hidden sm:flex items-center gap-1.5">
              صُنع بـ <Heart className="w-3 h-3 fill-mint-400 text-mint-400" /> في المملكة العربية السعودية
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/karimAlzoubi/MONJEZ-Scientific-Papers-Agents-Suite"
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-mint-500/10 hover:border-mint-500/40 hover:text-mint-300 text-white/60 flex items-center justify-center transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-mint-500/10 hover:border-mint-500/40 hover:text-mint-300 text-white/60 flex items-center justify-center transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-mint-500/10 hover:border-mint-500/40 hover:text-mint-300 text-white/60 flex items-center justify-center transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:bg-mint-500/10 hover:border-mint-500/40 hover:text-mint-300 text-white/60 flex items-center justify-center transition-all">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
