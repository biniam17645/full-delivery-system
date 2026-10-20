import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { ToastMessage } from '../../types/navigation';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
          info: <Info className="w-5 h-5 text-kechPurple shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-kechOrange shrink-0" />,
        };

        const borders = {
          success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
          info: 'border-purple-200 bg-white text-gray-900 shadow-xl',
          warning: 'border-orange-200 bg-orange-50 text-orange-950',
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl border flex items-start gap-3 shadow-lg transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${borders[toast.type]}`}
          >
            {icons[toast.type]}
            <div className="flex-1 text-sm">
              <div className="font-bold text-xs uppercase tracking-wider mb-0.5 opacity-80">
                {toast.title}
              </div>
              <div className="font-medium">{toast.message}</div>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
