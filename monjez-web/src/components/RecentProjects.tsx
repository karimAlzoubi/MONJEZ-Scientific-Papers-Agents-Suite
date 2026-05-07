import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FolderOpen, Eye, Trash2, FileText, Plus, ArrowLeft, Code2, Video,
  Presentation, Image as ImageIcon, Mic, Brain, X, Download, History, LayoutGrid,
} from 'lucide-react'
import { useApp } from '../app/AppContext'
import { SAMPLE_ASSETS } from '../app/mock/sampleProject'
import CodeOutput from './try/outputs/CodeOutput'
import VideoOutput from './try/outputs/VideoOutput'
import SlideOutput from './try/outputs/SlideOutput'
import PosterOutput from './try/outputs/PosterOutput'
import PodcastOutput from './try/outputs/PodcastOutput'
import ModelOutput from './try/outputs/ModelOutput'
import type { OutputType, Project } from '../app/types'
import { formatDate } from '../app/lib/format'

const OUTPUT_META: Record<OutputType, { icon: typeof Code2; label: string; color: string }> = {
  code: { icon: Code2, label: 'كود', color: 'from-blue-500 to-cyan-500' },
  video: { icon: Video, label: 'فيديو', color: 'from-purple-500 to-pink-500' },
  slide: { icon: Presentation, label: 'سلايد', color: 'from-amber-500 to-orange-500' },
  poster: { icon: ImageIcon, label: 'بوستر', color: 'from-emerald-500 to-teal-500' },
  podcast: { icon: Mic, label: 'بودكاست', color: 'from-rose-500 to-red-500' },
  model: { icon: Brain, label: 'نموذج', color: 'from-violet-500 to-purple-500' },
}

export default function RecentProjects() {
  const { state, dispatch, toast } = useApp()
  const [openProject, setOpenProject] = useState<Project | null>(null)
  const [activeTab, setActiveTab] = useState<OutputType | null>(null)

  const allProjects = state.projects.filter((p) => p.status === 'done')
  const PREVIEW_COUNT = 3
  const projects = allProjects.slice(0, PREVIEW_COUNT)
  const hiddenCount = Math.max(0, allProjects.length - PREVIEW_COUNT)

  function openModal(p: Project) {
    setOpenProject(p)
    setActiveTab(p.selectedOutputs[0] ?? null)
  }

  function closeModal() {
    setOpenProject(null)
    setActiveTab(null)
  }

  function deleteProject(id: string) {
    if (!confirm('حذف هذا المشروع؟')) return
    dispatch({ type: 'delete_project', payload: id })
    toast({ type: 'success', title: 'تم الحذف' })
  }

  function downloadOutput(type: OutputType) {
    const asset = SAMPLE_ASSETS[type]
    const link = document.createElement('a')
    link.href = asset.fileUrl
    link.download = asset.fileName
    link.click()
    toast({ type: 'success', title: `بدأ تنزيل ${asset.label}` })
  }

  return (
    <section id="projects" className="relative py-12 lg:py-16 scroll-mt-20">
      <div className="container-monjez relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="chip mb-4"
          >
            <History className="w-3.5 h-3.5" />
            مشاريعك
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-lg text-balance"
          >
            <span className="text-white">الأوراق </span>
            <span className="text-gradient-mint">المحفوظة سابقاً</span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-3 text-base text-white/60"
          >
            {allProjects.length === 0
              ? 'كل مشاريعك ستحفظ هنا تلقائياً — جرّب الآن لتبدأ.'
              : `${allProjects.length} مشروع محفوظ — اضغط أي بطاقة للعرض والتحميل.`}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6"
          >
            <a href="#try" className="btn-primary !px-5 !py-2.5 text-sm">
              <Plus className="w-4 h-4" />
              مشروع جديد
            </a>
          </motion.div>
        </div>

        {/* Empty state */}
        {allProjects.length === 0 ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12 text-center"
          >
            <FolderOpen className="w-12 h-12 text-mint-400/50 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">لا توجد مشاريع بعد</h3>
            <p className="text-sm text-white/55 mb-6 max-w-md mx-auto">
              ارفع ورقتك الأولى أو شاهد عينة جاهزة، وسنحفظ نتيجتها هنا تلقائياً للرجوع إليها لاحقاً.
            </p>
            <a href="#try" className="btn-primary !px-5 !py-2.5 text-sm">
              <ArrowLeft className="w-4 h-4 rotate-180" />
              ابدأ الآن
            </a>
          </motion.div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative glass rounded-2xl p-5 hover:border-mint-500/30 transition-all card-hover"
                >
                  <button
                    onClick={() => deleteProject(p.id)}
                    className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 text-white/40 hover:text-rose-400 transition-all"
                    aria-label="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-start gap-3 mb-4">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-mint-500/15 border border-mint-500/30 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-mint-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[9px] font-bold">
                          <span className="w-1 h-1 rounded-full bg-emerald-400" />
                          مكتمل
                        </span>
                        <span className="text-[10px] text-white/45">{p.paper.pages} صفحة</span>
                      </div>
                      <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">{p.paper.title}</h3>
                    </div>
                  </div>

                  {/* Output icons */}
                  <div className="flex items-center gap-1.5 mb-4">
                    {p.selectedOutputs.map((o) => {
                      const meta = OUTPUT_META[o]
                      return (
                        <div
                          key={o}
                          className={`w-8 h-8 rounded-lg bg-gradient-to-br ${meta.color} flex items-center justify-center shadow-md ring-1 ring-white/10`}
                          title={meta.label}
                        >
                          <meta.icon className="w-3.5 h-3.5 text-white" />
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/5">
                    <span className="text-[10px] text-white/45">{formatDate(p.createdAt)}</span>
                    <button
                      onClick={() => openModal(p)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-mint-500/10 hover:bg-mint-500/20 border border-mint-500/30 text-mint-300 text-xs font-bold transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      عرض المخرجات
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {hiddenCount > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 0.2 }}
                className="mt-8 flex justify-center"
              >
                <button
                  type="button"
                  className="group relative inline-flex items-center gap-3 pr-5 pl-3 py-3 rounded-2xl glass border-mint-500/20 hover:border-mint-500/50 hover:bg-mint-500/[0.06] transition-all overflow-hidden"
                >
                  {/* shimmer */}
                  <span className="absolute inset-0 bg-gradient-to-l from-mint-500/0 via-mint-500/10 to-mint-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

                  <span className="shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-mint-400 to-mint-600 flex items-center justify-center shadow-md ring-1 ring-white/10">
                    <LayoutGrid className="w-4 h-4 text-ink-950" strokeWidth={2.5} />
                  </span>

                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-sm font-bold text-white">عرض كل الأوراق</span>
                    <span className="text-[11px] text-white/55">
                      <span className="text-mint-300 font-bold tabular-nums">+{hiddenCount}</span> مشروع آخر محفوظ
                    </span>
                  </span>

                  <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/5 group-hover:bg-mint-500/15 text-mint-300 transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </span>
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openProject && activeTab && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl my-auto bg-ink-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-mint-500/15 border border-mint-500/30 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-mint-400" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{openProject.paper.title}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-white/45">
                      <span>{openProject.paper.pages} صفحة</span>
                      <span>·</span>
                      <span>{formatDate(openProject.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="shrink-0 w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors"
                  aria-label="إغلاق"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tabs */}
              <div className="px-6 py-3 border-b border-white/[0.06] flex items-center gap-2 overflow-x-auto">
                {openProject.selectedOutputs.map((id) => {
                  const meta = OUTPUT_META[id]
                  const isActive = activeTab === id
                  return (
                    <button
                      key={id}
                      onClick={() => setActiveTab(id)}
                      className={`shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all text-xs font-medium ${
                        isActive
                          ? 'bg-mint-500/10 border-mint-500/40 text-mint-300'
                          : 'bg-white/[0.02] border-white/10 text-white/65 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <meta.icon className="w-3.5 h-3.5" />
                      {meta.label}
                    </button>
                  )
                })}
                <div className="flex-1" />
                <button
                  onClick={() => downloadOutput(activeTab)}
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-br from-mint-400 to-mint-600 text-ink-950 text-xs font-bold transition-all hover:shadow-mint-glow"
                >
                  <Download className="w-3.5 h-3.5" />
                  تحميل
                </button>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {activeTab === 'code' && <CodeOutput onDownload={() => downloadOutput('code')} />}
                {activeTab === 'video' && <VideoOutput onDownload={() => downloadOutput('video')} />}
                {activeTab === 'slide' && <SlideOutput onDownload={() => downloadOutput('slide')} />}
                {activeTab === 'poster' && <PosterOutput onDownload={() => downloadOutput('poster')} />}
                {activeTab === 'podcast' && <PodcastOutput onDownload={() => downloadOutput('podcast')} />}
                {activeTab === 'model' && <ModelOutput onDownload={() => downloadOutput('model')} />}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
