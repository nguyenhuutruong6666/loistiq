'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Xác nhận',
  message = 'Bạn có chắc chắn muốn thực hiện hành động này?',
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  isDestructive = false,
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-black/10 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4.5 bg-[#FAF7F2] border-b border-black/5 flex items-center justify-between">
          <h3 className="text-base font-bold text-[#121212] flex items-center gap-2.5 m-0">
            {isDestructive && (
              <span className="w-7 h-7 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </span>
            )}
            <span>{title}</span>
          </h3>
          <button
            type="button"
            className="p-1.5 rounded-full hover:bg-black/5 text-[#7a7a7a] hover:text-[#121212] transition-colors cursor-pointer"
            onClick={onClose}
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 text-xs sm:text-sm text-[#4a4a4a] leading-relaxed">
          <p className="m-0">{message}</p>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-white border-t border-black/5 flex items-center justify-end gap-3">
          <button
            type="button"
            className="px-5 py-2.5 rounded-full border border-black/15 text-xs font-semibold text-[#555] hover:bg-black/5 hover:text-[#121212] transition-colors cursor-pointer"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`px-5 py-2.5 rounded-full text-xs font-semibold text-white shadow-md transition-all cursor-pointer ${
              isDestructive
                ? 'bg-red-600 hover:bg-red-700 shadow-red-600/20'
                : 'bg-[#121212] hover:bg-[#b8864a]'
            }`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
