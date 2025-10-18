"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

type ToastType = "success" | "error" | "info";
type Toast = { id: string; message: string; type?: ToastType; duration?: number };

type ToastContextValue = {
  addToast: (t: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const addToast = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    const toast: Toast = { id, duration: 4000, ...t };
    setToasts((cur) => [toast, ...cur]);
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => removeToast(id), toast.duration);
    }
    return id;
  }, [removeToast]);

  // keyboard: escape to clear toasts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setToasts([]);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Toast container (top-right) */}
      <div aria-live="polite" className="fixed z-60 top-4 right-4 flex flex-col gap-3 max-w-sm w-full">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`shadow-lg rounded-lg pointer-events-auto ring-1 ring-black/5 overflow-hidden transform transition-all duration-200 ease-out 
              ${t.type === "success" ? "bg-emerald-50 border border-emerald-100" : t.type === "error" ? "bg-rose-50 border border-rose-100" : "bg-sky-50 border border-sky-100"}`}
          >
            <div className="flex items-start gap-3 p-3">
              <div className="flex-1">
                <div className="font-medium" style={{ color: 'var(--card-text)' }}>{t.message}</div>
              </div>
              <div>
                <button
                  aria-label="Close toast"
                  onClick={() => removeToast(t.id)}
                  className="text-sm px-2 py-1 rounded hover:bg-black/5"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
