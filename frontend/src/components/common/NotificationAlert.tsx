'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Alert, AlertDescription, AlertTitle, AlertVariant } from '@/components/ui/alert';
import { CircleCheck, CircleAlert, Info, TriangleAlert, X } from 'lucide-react';

export interface NotificationAlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description: string;
  onClose?: () => void;
  className?: string;
  /**
   * Khi `floating=true` (mặc định), thông báo sẽ hiển thị cố định ở góc trên bên phải màn hình.
   * Khi `floating=false`, thông báo hiển thị inline tại vị trí trong luồng trang.
   */
  floating?: boolean;
  /** Tự động ẩn sau số mili-giây. Mặc định 4500ms. Truyền 0 để tắt tự động ẩn. */
  duration?: number;
}

/**
 * Component hiển thị thông báo xử lý Trạng thái (Thành công / Thất bại / Cảnh báo / Thông tin).
 * Mặc định ghim cố định ở góc trên bên phải màn hình (floating).
 */
export function NotificationAlert({
  type = 'success',
  title,
  description,
  onClose,
  className,
  floating = true,
  duration = 4500,
}: NotificationAlertProps) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const exitTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleClose = useCallback(() => {
    setExiting(true);
    exitTimerRef.current = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (duration > 0) {
      timer = setTimeout(() => handleClose(), duration);
    }
    return () => {
      if (timer) clearTimeout(timer);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, [duration, handleClose]);

  if (!visible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CircleCheck className="w-5 h-5" />;
      case 'error':
        return <CircleAlert className="w-5 h-5" />;
      case 'warning':
        return <TriangleAlert className="w-5 h-5" />;
      case 'info':
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const variantMap: Record<string, AlertVariant> = {
    success: 'success',
    error: 'destructive',
    warning: 'warning',
    info: 'info',
  };

  const alertContent = (
    <Alert
      variant={variantMap[type] || 'default'}
      className={`shadow-xl border backdrop-blur-md transition-all duration-300 ${
        exiting ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
      } ${className ?? ''}`}
    >
      {getIcon()}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-0.5 pr-1">
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </div>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Đóng thông báo"
          className="text-inherit opacity-60 hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-black/8 cursor-pointer -mr-1 -mt-1 shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </Alert>
  );

  if (!floating) {
    return alertContent;
  }

  // Floating: cố định góc trên bên phải màn hình
  return (
    <div
      role="region"
      aria-label="Thông báo"
      className={`fixed top-5 right-4 sm:right-6 z-9999 w-full max-w-sm sm:max-w-md pointer-events-auto transition-all duration-300 ${
        exiting ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
      }`}
    >
      <Alert
        variant={variantMap[type] || 'default'}
        className={`shadow-2xl border backdrop-blur-md ${className ?? ''}`}
      >
        {getIcon()}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-0.5 pr-1">
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Đóng thông báo"
            className="text-inherit opacity-60 hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-black/8 cursor-pointer -mr-1 -mt-1 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </Alert>
    </div>
  );
}

// Mẫu Pattern thông báo Thành công (Success)
export function SuccessPattern({
  title = "Success! All good",
  description = "Everything is working as expected. You can continue with your task.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Alert variant="success">
      <CircleCheck className="w-5 h-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}

// Mẫu Pattern thông báo Thất bại (Error / Failed)
export function ErrorPattern({
  title = "Error! Something went wrong",
  description = "Unable to process the request. Please check your inputs and try again.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Alert variant="destructive">
      <CircleAlert className="w-5 h-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
