import * as React from "react";
import { cn } from "@/lib/utils";

export type AlertVariant = "default" | "success" | "destructive" | "error" | "warning" | "info";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

const alertVariants: Record<AlertVariant, string> = {
  default:
    "bg-white text-[#121212] border-black/10 [&>svg]:text-[#121212]",
  success:
    "bg-[#f0fdf4] text-[#14532d] border-[#bbf7d0] [&>svg]:text-[#16a34a]",
  destructive:
    "bg-[#fef2f2] text-[#7f1d1d] border-[#fecaca] [&>svg]:text-[#dc2626]",
  error:
    "bg-[#fef2f2] text-[#7f1d1d] border-[#fecaca] [&>svg]:text-[#dc2626]",
  warning:
    "bg-[#fffbeb] text-[#78350f] border-[#fde68a] [&>svg]:text-[#d97706]",
  info:
    "bg-[#F4F1EA] text-[#121212] border-[#b8864a]/30 [&>svg]:text-[#b8864a]",
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-2xl border p-4 sm:p-5 text-sm transition-all duration-200 shadow-xs",
          "[&>svg]:absolute [&>svg]:left-4 sm:[&>svg]:left-5 [&>svg]:top-4 sm:[&>svg]:top-5 [&>svg]:w-5 [&>svg]:h-5 [&>svg~*]:pl-7 sm:[&>svg~*]:pl-8",
          alertVariants[variant] || alertVariants.default,
          className
        )}
        {...props}
      />
    );
  }
);
Alert.displayName = "Alert";

export const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h5
      ref={ref}
      className={cn("mb-1 font-semibold leading-none tracking-tight text-base font-serif", className)}
      {...props}
    />
  );
});
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("text-xs sm:text-sm leading-relaxed opacity-90", className)}
      {...props}
    />
  );
});
AlertDescription.displayName = "AlertDescription";
