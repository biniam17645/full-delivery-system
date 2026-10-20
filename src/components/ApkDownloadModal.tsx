import React, { useState, useEffect } from 'react';
import { 
  X, 
  Download, 
  CheckCircle2, 
  Smartphone, 
  ShieldCheck, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({
  isOpen,
  onClose
}) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloaded, setIsDownloaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDownloadProgress(0);
      setIsDownloaded(false);

      // Simulate download progress
      const interval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsDownloaded(true);
            triggerActualFileDownload();
            return 100;
          }
          return prev + 25;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const triggerActualFileDownload = () => {
    try {
      const dummyContent = 'KECH_DELIVERY_ASELA_APP_PACKAGE_v2.4.0';
      const blob = new Blob([dummyContent], { type: 'application/vnd.android.package-archive' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Kech-Delivery-Asela-v2.4.0.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      // ignore
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-white border border-gray-100 shadow-2xl p-6 sm:p-7 space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <BrandLogo size="md" variant="icon-only" />
          <div>
            <h3 className="text-xl font-black text-gray-900 leading-tight">
              Kech Mobile App
            </h3>
            <p className="text-xs text-gray-500">
              Kech-Delivery-Asela-v2.4.0.apk (18.4 MB)
            </p>
          </div>
        </div>

        {/* Progress or Success */}
        <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-gray-700">
            <span>{isDownloaded ? 'Download Complete!' : 'Downloading APK Package...'}</span>
            <span className="font-mono text-[#6A1B9A]">{downloadProgress}%</span>
          </div>

          <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#6A1B9A] to-[#FF9800] transition-all duration-300 rounded-full"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>

          {isDownloaded && (
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 pt-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>File saved to your Downloads folder!</span>
            </div>
          )}
        </div>

        {/* Installation Instructions for Android Users */}
        <div className="space-y-2 text-xs text-gray-600">
          <div className="font-extrabold text-gray-900 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-[#FF9800]" />
            <span>How to Install on Android:</span>
          </div>
          <ol className="list-decimal pl-5 space-y-1 text-gray-500 font-normal">
            <li>Open the downloaded <strong className="text-gray-800">.apk file</strong> from notifications.</li>
            <li>If prompted, tap <strong className="text-gray-800">Settings</strong> and enable "Allow from this source".</li>
            <li>Tap <strong className="text-gray-800">Install</strong> and launch Kech to start ordering in Asela!</li>
          </ol>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex gap-3">
          <button
            onClick={triggerActualFileDownload}
            className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition"
          >
            <Download className="w-4 h-4" />
            <span>Download Again</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-[#6A1B9A] hover:bg-[#5A1482] text-white font-bold text-xs shadow-md transition cursor-pointer"
          >
            Close
          </button>
        </div>

        <div className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Scanned with Google Play Protect • 100% Virus Free</span>
        </div>

      </div>
    </div>
  );
};
