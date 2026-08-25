"use client"

import * as React from "react"
import type { ComponentProps } from "react"
import { Toast } from "@/components/ui/toast"

export type ToastActionElement = React.ReactElement

export type ToastProps = ComponentProps<typeof Toast>

export type ToastT = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

type ToasterToast = ToastT

type ToastState = {
  toasts: ToasterToast[]
}

const ToastContext = React.createContext<{
  toasts: ToasterToast[]
  toast: (props: Omit<ToasterToast, "id">) => string
  dismiss: (toastId?: string) => void
  remove: (toastId: string) => void
} | null>(null)

let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return `${Date.now()}-${count}`
}

export function ToastProviderInternal({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<ToastState>({ toasts: [] })

  const toast = React.useCallback((props: Omit<ToasterToast, "id">) => {
    const id = genId()
    setState((state) => ({
      toasts: [
        ...state.toasts,
        {
          id,
          ...props,
        },
      ],
    }))
    return id
  }, [])

  const dismiss = React.useCallback((toastId?: string) => {
    setState((state) => ({
      toasts: state.toasts.filter((t) => (toastId ? t.id !== toastId : false)),
    }))
  }, [])

  const remove = React.useCallback((toastId: string) => {
    setState((state) => ({
      toasts: state.toasts.filter((t) => t.id !== toastId),
    }))
  }, [])

  const value = React.useMemo(
    () => ({ toasts: state.toasts, toast, dismiss, remove }),
    [state.toasts, toast, dismiss, remove]
  )

  return React.createElement(ToastContext.Provider, { value }, children as any)
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) {
    // Provide a no-op fallback so hooks can be used without provider, but empty toasts
    return {
      toasts: [] as ToasterToast[],
      toast: (_props: Omit<ToasterToast, "id">) => "",
      dismiss: (_id?: string) => {},
      remove: (_id: string) => {},
    }
  }
  return ctx
}
