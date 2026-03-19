"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  ChevronRight,
  Search,
  Command,
  X,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ModeToggle } from "../shared/ModeToggle";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface DashLayoutProps {
  children: React.ReactNode;
  navLinks: NavLink[];
  bottomLinks?: NavLink[];
  brandName?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isLinkActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  
  // Exact match
  if (pathname === href) return true;
  
  // Split paths into segments
  const hrefSegments = href.split("/").filter(Boolean);
  const pathSegments = pathname.split("/").filter(Boolean);
  
  // If href has fewer segments than pathname, it's a parent route
  // Parent routes should only be active when we're on that exact route
  if (hrefSegments.length < pathSegments.length) {
    // Check if all segments match up to the parent length
    const matchesParent = hrefSegments.every((segment, index) => 
      segment === pathSegments[index]
    );
    
    // If it matches parent but has more segments, we're on a child route
    // Parent shouldn't be active for child routes
    if (matchesParent && pathSegments.length > hrefSegments.length) {
      return false;
    }
  }
  
  // For same length or href being longer, check if it's a direct child
  // or exact match with trailing slash handling
  return pathname === href || pathname?.startsWith(href + "/");
}

function getBreadcrumbs(pathname: string): { label: string; href: string }[] {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return [{ label: "Home", href: "/" }];
  return [
    { label: "Home", href: "/" },
    ...segments.map((seg, i) => ({
      label: seg.replace(/-/g, " "),
      href: "/" + segments.slice(0, i + 1).join("/"),
    })),
  ];
}

// ─── Command Palette ──────────────────────────────────────────────────────────

// ─── Command Palette ──────────────────────────────────────────────────────────

function CommandPalette({
  open,
  onClose,
  allLinks,
}: {
  open: boolean;
  onClose: () => void;
  allLinks: NavLink[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filtered = query.trim()
    ? allLinks.filter((l) =>
        l.label.toLowerCase().includes(query.toLowerCase())
      )
    : allLinks;

  // Reset refs array when filtered results change
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, filtered.length);
  }, [filtered]);

  // Scroll selected item into view
  useEffect(() => {
    if (selected >= 0 && selected < filtered.length && itemRefs.current[selected]) {
      itemRefs.current[selected]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [selected, filtered]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
    // Scroll to top when query changes
    if (resultsRef.current) {
      resultsRef.current.scrollTop = 0;
    }
  }, [query]);

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
    },
    [router, onClose]
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter" && filtered[selected]) {
        e.preventDefault();
        navigate(filtered[selected].href);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, selected, navigate, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg mx-4 bg-popover border border-border rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input row */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-accent text-muted-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Results */}
        <div ref={resultsRef} className="py-2 max-h-72 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              No pages found for &ldquo;{query}&rdquo;
            </p>
          ) : (
            filtered.map((link, i) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.href}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  onClick={() => navigate(link.href)}
                  onMouseEnter={() => setSelected(i)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left",
                    i === selected
                      ? "bg-accent text-accent-foreground"
                      : "text-foreground hover:bg-accent/50"
                  )}
                >
                  <span
                    className={cn(
                      "flex items-center justify-center h-7 w-7 rounded-lg border shrink-0",
                      i === selected
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-border bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="flex-1 font-medium">{link.label}</span>
                  <span className="text-xs text-muted-foreground font-mono truncate max-w-30">
                    {link.href}
                  </span>
                  {i === selected && (
                    <ArrowRight className="h-3.5 w-3.5 text-primary shrink-0" />
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-border bg-muted/40">
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <kbd className="px-1.5 py-0.5 rounded bg-border text-foreground font-mono text-[10px]">↑↓</kbd>
            <span>navigate</span>
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <kbd className="px-1.5 py-0.5 rounded bg-border text-foreground font-mono text-[10px]">↵</kbd>
            <span>open</span>
          </span>
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <kbd className="px-1.5 py-0.5 rounded bg-border text-foreground font-mono text-[10px]">Esc</kbd>
            <span>close</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar Link ─────────────────────────────────────────────────────────────

function SidebarLink({ link, pathname }: { link: NavLink; pathname: string }) {
  const Icon = link.icon;
  const active = isLinkActive(link.href, pathname);

  return (
    <Link
      href={link.href}
      className={cn(
        "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      )}
    >
      {/* Active left bar */}
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 rounded-r-full bg-primary-foreground/40" />
      )}
      <Icon
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-150",
          !active && "group-hover:scale-110"
        )}
      />
      <span className="truncate">{link.label}</span>
      {active && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-50" />}
    </Link>
  );
}

// ─── Mobile Tab ───────────────────────────────────────────────────────────────

function MobileTab({ link, pathname }: { link: NavLink; pathname: string }) {
  const Icon = link.icon;
  const active = isLinkActive(link.href, pathname);

  return (
    <Link
      href={link.href}
      className={cn(
        "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-150",
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center h-6 w-6 rounded-lg transition-all",
          active && "bg-primary/10"
        )}
      >
        <Icon className={cn("h-4 w-4", active && "scale-110")} />
      </span>
      <span className="text-[10px] font-medium leading-none">{link.label}</span>
    </Link>
  );
}

// ─── DashLayout ───────────────────────────────────────────────────────────────

const DashLayout = ({
  children,
  navLinks,
  bottomLinks = [],
  brandName = "Dashboard",
}: DashLayoutProps) => {
  const pathname = usePathname();
  const [cmdOpen, setCmdOpen] = useState(false);
  const allLinks = [...navLinks, ...bottomLinks];
  const mobileLinks = navLinks.slice(0, 5);
  const breadcrumbs = getBreadcrumbs(pathname);

  // Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <CommandPalette
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        allLinks={allLinks}
      />

      <div className="flex min-h-screen bg-background ">
        {/* ── Sidebar ── */}
        <aside className="hidden lg:flex flex-col w-60 shrink-0 border-r border-border bg-sidebar fixed top-0 left-0 h-full z-30">
          {/* Brand */}
          <div className="flex items-center gap-2.5 px-5 h-14 border-b border-border shrink-0">
            <Link href='/' >
              <span className="text-sm font-semibold text-sidebar-foreground truncate">
              {brandName}
            </span>
            </Link>
          </div>

          {/* Search trigger */}
          <div className="px-4 pt-4 pb-2">
            <button
              onClick={() => setCmdOpen(true)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background/50 hover:bg-accent text-muted-foreground text-xs transition-colors group"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="flex-1 text-left">Search...</span>
              <span className="flex items-center gap-0.5">
                <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px] text-foreground">
                  ⌘
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px] text-foreground">
                  K
                </kbd>
              </span>
            </button>
          </div>

          {/* Main nav */}
          <nav className="flex-1 px-4 py-3 space-y-0.5 overflow-y-auto">
            <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              Menu
            </p>
            {navLinks.slice(1).map((link) => (
              <SidebarLink key={link.href} link={link} pathname={pathname} />
            ))}
          </nav>

          {/* Bottom links */}
          {bottomLinks.length > 0 && (
            <div className="px-4 py-3 space-y-0.5 border-t border-border">
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
                Account
              </p>
              {bottomLinks.map((link) => (
                <SidebarLink key={link.href} link={link} pathname={pathname} />
              ))}
            </div>
          )}

          {/* Mode toggle */}
          <div className="px-4 py-3 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Theme</span>
            <ModeToggle />
          </div>
        </aside>

        {/* ── Main ── */}
        <div className="flex flex-col flex-1 min-w-0 lg:ml-60">
          {/* Top bar */}
          <header className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 lg:px-8 h-14 border-b border-border bg-background/90 backdrop-blur shrink-0">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-1.5 text-sm overflow-hidden">
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-1.5 min-w-0">
                  {i > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
                  )}
                  {i === breadcrumbs.length - 1 ? (
                    <span className="capitalize font-medium text-foreground truncate">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="capitalize text-muted-foreground hover:text-foreground transition-colors truncate"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>

            {/* Right: search trigger (desktop) + mobile mode toggle */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setCmdOpen(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-muted/50 hover:bg-accent text-muted-foreground text-xs transition-colors"
              >
                <Command className="h-3 w-3" />
                <span>Quick nav</span>
                <span className="flex items-center gap-0.5 ml-1">
                  <kbd className="px-1 py-0.5 rounded bg-background border border-border font-mono text-[10px] text-foreground">⌘K</kbd>
                </span>
              </button>
              <div className="lg:hidden">
                <ModeToggle />
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
            {children}
          </main>
        </div>

        {/* ── Mobile bottom tab bar ── */}
        <nav className="lg:hidden flex items-center justify-around border-t border-border bg-background/95 backdrop-blur px-2 py-1.5 shrink-0 fixed bottom-0 left-0 right-0 z-30">
          {mobileLinks.map((link) => (
            <MobileTab key={link.href} link={link} pathname={pathname} />
          ))}
          {/* Search icon in mobile tab */}
          <button
            onClick={() => setCmdOpen(true)}
            className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="flex items-center justify-center h-6 w-6 rounded-lg">
              <Search className="h-4 w-4" />
            </span>
            <span className="text-[10px] font-medium leading-none">Search</span>
          </button>
        </nav>

        {/* Mobile bottom padding */}
        <div className="lg:hidden h-16 w-full fixed bottom-0 pointer-events-none" />
      </div>
    </>
  );
};

export default DashLayout;