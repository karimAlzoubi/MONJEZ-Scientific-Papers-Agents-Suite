export type OutputType = 'code' | 'video' | 'slide' | 'poster' | 'podcast' | 'model'

export interface PaperMeta {
  id: string
  title: string
  authors: string
  year: number
  pages: number
  abstract: string
  source: 'sample' | 'upload' | 'url'
  fileName?: string
  fileSize?: number // bytes
}

export interface Project {
  id: string
  paper: PaperMeta
  selectedOutputs: OutputType[]
  status: 'processing' | 'done'
  createdAt: number
}

export interface Toast {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  description?: string
  durationMs?: number
}

export interface AppState {
  projects: Project[]
  toasts: Toast[]
  lastUsedAt: number | null // timestamp of last project creation
}
