'use client';

import * as React from 'react';
import { PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const SIDEBAR_WIDTH = '17rem';
const SIDEBAR_WIDTH_ICON = '4rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean | ((value: boolean) => boolean)) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean | ((value: boolean) => boolean)) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return context;
}

export function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [isMobile, setIsMobile] = React.useState(false);
  const [openMobile, setOpenMobile] = React.useState(false);

  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp !== undefined ? openProp : _open;

  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }
    },
    [setOpenProp, open]
  );

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = React.useCallback(() => {
    return isMobile
      ? setOpenMobile((open) => !open)
      : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Keyboard shortcut (ctrl+b or cmd+b)
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? 'expanded' : 'collapsed';

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        style={
          {
            '--sidebar-width': SIDEBAR_WIDTH,
            '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          'group/sidebar-wrapper flex min-h-svh w-full text-[#121212] bg-[#F8F7F3]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === 'none') {
    return (
      <div
        className={cn(
          'flex h-full w-(--sidebar-width) flex-col bg-[#FAF7F2] text-[#121212] border-r border-black/10',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <>
        {openMobile && (
          <div
            onClick={() => setOpenMobile(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
          />
        )}
        <div
          data-sidebar="sidebar"
          data-mobile="true"
          className={cn(
            'fixed inset-y-0 z-50 flex h-full w-(--sidebar-width) flex-col bg-[#FAF7F2] text-[#121212] border-r border-black/10 shadow-2xl transition-transform duration-300 ease-in-out',
            side === 'left'
              ? openMobile
                ? 'left-0 translate-x-0'
                : 'left-0 -translate-x-full'
              : openMobile
              ? 'right-0 translate-x-0'
              : 'right-0 translate-x-full',
            className
          )}
          {...props}
        >
          <div className="flex h-full w-full flex-col">{children}</div>
        </div>
      </>
    );
  }

  return (
    <div
      className="group peer hidden lg:block text-[#121212]"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
    >
      {/* Spacer for desktop layout */}
      <div
        className={cn(
          'duration-200 relative h-svh bg-transparent transition-[width] ease-linear',
          state === 'collapsed'
            ? collapsible === 'icon'
              ? 'w-(--sidebar-width-icon)'
              : 'w-0'
            : 'w-(--sidebar-width)'
        )}
      />
      <div
        className={cn(
          'duration-200 fixed inset-y-0 z-30 hidden h-svh transition-[left,right,width] ease-linear lg:flex',
          side === 'left' ? 'left-0' : 'right-0',
          state === 'collapsed'
            ? collapsible === 'icon'
              ? 'w-(--sidebar-width-icon)'
              : 'w-0 overflow-hidden'
            : 'w-(--sidebar-width)',
          variant === 'floating' || variant === 'inset'
            ? 'p-2'
            : 'border-r border-black/10',
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className="flex h-full w-full flex-col bg-[#FAF7F2] text-[#121212] overflow-hidden"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="trigger"
      type="button"
      aria-label="Toggle Sidebar"
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      className={cn(
        'inline-flex items-center justify-center rounded-xl p-2 text-[#121212] bg-white border border-black/10 hover:bg-black/5 hover:text-[#b8864a] transition-all cursor-pointer shadow-xs',
        className
      )}
      {...props}
    >
      <PanelLeft className="h-4 w-4" />
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
}

export function SidebarRail({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex cursor-w-resize after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 hover:after:bg-[#b8864a]/50',
        className
      )}
      {...props}
    />
  );
}

export function SidebarInset({
  className,
  children,
  ...props
}: React.ComponentProps<'main'>) {
  return (
    <main
      className={cn(
        'relative flex min-h-svh flex-1 flex-col bg-[#F8F7F3]',
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}

export function SidebarHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="header"
      className={cn('flex flex-col gap-2 p-4 border-b border-black/5', className)}
      {...props}
    />
  );
}

export function SidebarFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="footer"
      className={cn('flex flex-col gap-2 p-4 border-t border-black/5 bg-[#F3EFE6]/40', className)}
      {...props}
    />
  );
}

export function SidebarContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overflow-x-hidden p-3 scrollbar-thin scrollbar-thumb-black/10',
        className
      )}
      {...props}
    />
  );
}

export function SidebarGroup({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="group"
      className={cn('relative flex w-full min-w-0 flex-col p-1.5', className)}
      {...props}
    />
  );
}

export function SidebarGroupLabel({
  className,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const baseClasses = cn(
    'duration-200 flex h-8 shrink-0 items-center px-2 text-[10px] font-bold uppercase tracking-widest text-[#8c5a1e] outline-none transition-[margin,opacity] ease-linear group-data-[collapsible=icon]:opacity-0',
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
      className: cn(baseClasses, (children.props as { className?: string }).className),
    });
  }

  return (
    <div
      data-sidebar="group-label"
      className={baseClasses}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarGroupAction({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <button
      data-sidebar="group-action"
      className={cn(
        'absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-[#7a7a7a] outline-none hover:bg-black/5 hover:text-[#121212] transition-colors cursor-pointer',
        className
      )}
      {...props}
    />
  );
}

export function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="group-content"
      className={cn('w-full text-xs', className)}
      {...props}
    />
  );
}

export function SidebarMenu({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-sidebar="menu"
      className={cn('flex w-full min-w-0 flex-col gap-1 list-none p-0 m-0', className)}
      {...props}
    />
  );
}

export function SidebarMenuItem({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-sidebar="menu-item"
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  );
}

export function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  className,
  children,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}) {
  const baseClasses = cn(
    'peer/menu-button flex w-full items-center gap-3 overflow-hidden rounded-xl p-2.5 text-left text-xs font-medium outline-none transition-all duration-200 hover:bg-black/5 hover:text-[#121212] disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 group-data-[collapsible=icon]:!size-9 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
    variant === 'outline' && 'border border-black/10 hover:bg-black/5',
    isActive
      ? 'bg-[#b8864a] text-white font-semibold shadow-xs shadow-[#b8864a]/20 hover:bg-[#a67439]'
      : 'text-[#5c5c5c]',
    size === 'sm' && 'h-8 text-xs',
    size === 'lg' && 'h-12 text-sm',
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
      className: cn(baseClasses, (children.props as { className?: string }).className),
    });
  }

  return (
    <button
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={baseClasses}
      {...props}
    >
      {children}
    </button>
  );
}

export function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-sidebar="menu-badge"
      className={cn(
        'pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold select-none group-data-[collapsible=icon]:hidden',
        className
      )}
      {...props}
    />
  );
}

export function SidebarMenuAction({
  className,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
}) {
  const baseClasses = cn(
    'absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-[#7a7a7a] outline-none hover:bg-black/5 hover:text-[#121212] transition-colors cursor-pointer group-data-[collapsible=icon]:hidden',
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
      className: cn(baseClasses, (children.props as { className?: string }).className),
    });
  }

  return (
    <button
      data-sidebar="menu-action"
      className={baseClasses}
      {...props}
    >
      {children}
    </button>
  );
}