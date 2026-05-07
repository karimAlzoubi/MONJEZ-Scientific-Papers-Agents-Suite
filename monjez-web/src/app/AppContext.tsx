import { createContext, useContext, useEffect, useReducer, ReactNode, useCallback } from 'react'
import type { AppState, Project, Toast, OutputType, PaperMeta } from './types'
import { loadState, saveState } from './lib/storage'
import { uid } from './lib/uid'

const WEEK_MS = 7 * 24 * 60 * 60 * 1000

const initialState: AppState = {
  projects: [],
  toasts: [],
  lastUsedAt: null,
}

type Action =
  | { type: 'init'; payload: AppState }
  | { type: 'create_project'; payload: { paper: PaperMeta; outputs: OutputType[] } }
  | { type: 'finish_project'; payload: { id: string } }
  | { type: 'delete_project'; payload: string }
  | { type: 'add_toast'; payload: Toast }
  | { type: 'remove_toast'; payload: string }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'init':
      return action.payload

    case 'create_project': {
      const project: Project = {
        id: uid('proj'),
        paper: action.payload.paper,
        selectedOutputs: action.payload.outputs,
        status: 'processing',
        createdAt: Date.now(),
      }
      return {
        ...state,
        projects: [project, ...state.projects],
        lastUsedAt: Date.now(),
      }
    }

    case 'finish_project':
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.id ? { ...p, status: 'done' } : p
        ),
      }

    case 'delete_project':
      return { ...state, projects: state.projects.filter((p) => p.id !== action.payload) }

    case 'add_toast':
      return { ...state, toasts: [...state.toasts, action.payload] }

    case 'remove_toast':
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.payload) }

    default:
      return state
  }
}

export interface QuotaInfo {
  canGenerate: boolean
  daysRemaining: number
  hoursRemaining: number
  nextAvailableAt: number | null
}

interface AppContextValue {
  state: AppState
  dispatch: React.Dispatch<Action>
  toast: (t: Omit<Toast, 'id'>) => void
  quota: QuotaInfo
}

const Ctx = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = loadState<AppState>()
    if (saved) {
      dispatch({ type: 'init', payload: { ...saved, toasts: [] } })
    }
  }, [])

  // Persist to localStorage on every state change (skip toasts)
  useEffect(() => {
    if (state.projects.length === 0 && state.lastUsedAt === null) return
    const { toasts: _toasts, ...rest } = state
    saveState({ ...rest, toasts: [] })
  }, [state])

  const toast = useCallback((t: Omit<Toast, 'id'>) => {
    const id = uid('toast')
    dispatch({ type: 'add_toast', payload: { ...t, id } })
    setTimeout(() => {
      dispatch({ type: 'remove_toast', payload: id })
    }, t.durationMs ?? 3500)
  }, [])

  // Compute quota
  // NOTE: Quota enforcement is disabled while in testing/demo mode.
  // To re-enable the 1-paper-per-week limit, set TESTING_MODE = false.
  const TESTING_MODE = true
  const quota: QuotaInfo = (() => {
    if (TESTING_MODE || !state.lastUsedAt) {
      return { canGenerate: true, daysRemaining: 0, hoursRemaining: 0, nextAvailableAt: null }
    }
    const elapsed = Date.now() - state.lastUsedAt
    if (elapsed >= WEEK_MS) {
      return { canGenerate: true, daysRemaining: 0, hoursRemaining: 0, nextAvailableAt: null }
    }
    const remaining = WEEK_MS - elapsed
    return {
      canGenerate: false,
      daysRemaining: Math.floor(remaining / (24 * 60 * 60 * 1000)),
      hoursRemaining: Math.floor((remaining / (60 * 60 * 1000)) % 24),
      nextAvailableAt: state.lastUsedAt + WEEK_MS,
    }
  })()

  return <Ctx.Provider value={{ state, dispatch, toast, quota }}>{children}</Ctx.Provider>
}

export function useApp() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
