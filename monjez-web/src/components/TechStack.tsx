import { motion } from 'framer-motion'
import { Cpu } from 'lucide-react'

const techs = [
  { name: 'Python', symbol: 'py', color: '#3776AB' },
  { name: 'OpenAI', symbol: 'AI', color: '#10A37F' },
  { name: 'Gemini', symbol: 'G', color: '#4285F4' },
  { name: 'LLAMA 4', symbol: 'L4', color: '#0668E1' },
  { name: 'LightRAG', symbol: 'RAG', color: '#34D9B6' },
  { name: 'Playwright', symbol: 'PW', color: '#2EAD33' },
  { name: 'MoviePy', symbol: 'MP', color: '#F5C518' },
  { name: 'Docling', symbol: 'DL', color: '#FF9500' },
  { name: 'PyMuPDF', symbol: 'Mu', color: '#E25A26' },
  { name: 'MinerU', symbol: 'Mn', color: '#7C3AED' },
  { name: 'PyMOL', symbol: 'Mo', color: '#3B82F6' },
  { name: 'MeloTTS', symbol: 'TTS', color: '#A855F7' },
  { name: 'Jina', symbol: 'Jn', color: '#FFB800' },
  { name: 'Jinja', symbol: 'Jj', color: '#B41717' },
  { name: 'Pillow', symbol: 'PIL', color: '#0D9488' },
]

export default function TechStack() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="container-monjez">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="chip mb-5"
          >
            <Cpu className="w-3.5 h-3.5" />
            التقنيات تحت الغطاء
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="heading-md text-balance"
          >
            <span className="text-white">مبني على </span>
            <span className="text-gradient-mint">أفضل ما في الذكاء الاصطناعي</span>
          </motion.h2>
        </div>
      </div>

      {/* Marquee row 1 */}
      <div className="relative mask-fade-edges">
        <div className="flex gap-4 animate-marquee whitespace-nowrap py-3">
          {[...techs, ...techs].map((t, i) => (
            <TechBadge key={i} {...t} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 - reverse */}
      <div className="relative mask-fade-edges mt-3">
        <div className="flex gap-4 animate-marquee whitespace-nowrap py-3" style={{ animationDirection: 'reverse', animationDuration: '50s' }}>
          {[...techs.slice().reverse(), ...techs.slice().reverse()].map((t, i) => (
            <TechBadge key={i} {...t} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TechBadge({ name, symbol, color }: { name: string; symbol: string; color: string }) {
  return (
    <div className="shrink-0 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur hover:border-mint-500/30 hover:bg-white/[0.06] transition-all group">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm shadow-md ring-1 ring-white/10 group-hover:scale-110 transition-transform"
        style={{
          background: `linear-gradient(135deg, ${color}cc, ${color}88)`,
          color: '#fff',
        }}
      >
        {symbol}
      </div>
      <span className="font-semibold text-white/90 text-sm">{name}</span>
    </div>
  )
}
