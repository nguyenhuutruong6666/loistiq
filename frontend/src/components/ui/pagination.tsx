import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

export function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      className={cn('flex flex-row items-center gap-1 sm:gap-1.5', className)}
      {...props}
    />
  );
}

export function PaginationItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li className={cn('', className)} {...props} />;
}

export interface PaginationLinkProps extends React.ComponentProps<'button'> {
  isActive?: boolean;
  href?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function PaginationLink({
  className,
  isActive,
  size = 'default',
  href,
  children,
  disabled,
  ...props
}: PaginationLinkProps) {
  const sizeClasses =
    size === 'icon'
      ? 'h-9 w-9 p-0'
      : size === 'sm'
      ? 'h-8 px-3 text-xs'
      : size === 'lg'
      ? 'h-10 px-4 text-sm'
      : 'h-9 px-3.5 text-xs sm:text-sm';

  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 cursor-pointer select-none',
    sizeClasses,
    isActive
      ? 'bg-[#121212] text-white shadow-xs font-semibold hover:bg-[#222222]'
      : 'bg-white text-[#5c5c5c] hover:text-[#121212] hover:bg-[#FAF7F2] border border-black/10',
    disabled && 'opacity-40 pointer-events-none cursor-not-allowed bg-[#FAF7F2] text-[#999999] border-black/5',
    className
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses} aria-current={isActive ? 'page' : undefined}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      aria-current={isActive ? 'page' : undefined}
      disabled={disabled}
      className={baseClasses}
      {...props}
    >
      {children}
    </button>
  );
}

export function PaginationPrevious({
  className,
  text = 'Trước',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Trang trước"
      size="default"
      className={cn('gap-1 pl-2.5', className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="hidden sm:inline">{text}</span>
    </PaginationLink>
  );
}

export function PaginationNext({
  className,
  text = 'Sau',
  ...props
}: React.ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink
      aria-label="Trang tiếp theo"
      size="default"
      className={cn('gap-1 pr-2.5', className)}
      {...props}
    >
      <span className="hidden sm:inline">{text}</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
}

export function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      className={cn('flex h-9 w-9 items-center justify-center text-[#7a7a7a]', className)}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">Nhiều trang hơn</span>
    </span>
  );
}
