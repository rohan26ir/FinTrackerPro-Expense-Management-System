"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  Menu, 
  X, 
  Settings,
  User,
  LogOut,
  Bell,
  Home,
  LayoutDashboard,
  Wallet,
  TrendingUp,
  CreditCard,
  Phone
} from "lucide-react";

import { ModeToggle } from "./ModeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "@/lib/utils";

// Mock auth state - replace with actual auth logic
const isAuthenticated = true; // Change this based on your auth state
const user = {
  name: "Amy Harris",
  email: "amy.harris@example.com",
  avatar: "https://i.ibb.co.com/5qFH79g/girl.png",
};

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/transactions", label: "Transactions", icon: Wallet },
  { href: "/dashboard/add-income", label: "Income", icon: TrendingUp },
  { href: "/pricing", label: "Pricing", icon: CreditCard },
  { href: "/contact-us", label: "Contact Us", icon: Phone },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Don't show navbar on auth pages
  if (pathname?.startsWith("/login") || pathname?.startsWith("/register") || pathname?.startsWith("/forgot-password")) {
    return null;
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Get icon for active route
  const getCurrentPageIcon = () => {
    const currentLink = navLinks.find(link => 
      pathname === link.href || pathname?.startsWith(link.href + "/")
    );
    const Icon = currentLink?.icon || Home;
    return <Icon className="h-4 w-4 mr-2" />;
  };

  // Get current page label
  const getCurrentPageLabel = () => {
    const currentLink = navLinks.find(link => 
      pathname === link.href || pathname?.startsWith(link.href + "/")
    );
    return currentLink?.label || "Menu";
  };

  return (
    <nav className="sticky top-0 z-50 w-[95%] max-w-7xl mx-auto border rounded-sm bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="w-[95%] max-w-7xl mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2">
              <span className="font-bold text-xl">
                DailyFinTracker <span className="text-primary text-[10px] align-super">Pro</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-lg font-medium rounded-md transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      "flex items-center gap-2",
                      isActive 
                        ? "text-foreground" 
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications (only when authenticated) */}
            {isAuthenticated && (
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
              </Button>
            )}

            {/* Theme Toggle */}
            <ModeToggle />

            {/* User Menu (Authenticated) */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Auth Buttons (Not Authenticated) */
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Dropdown Menu - Using Shadcn Dropdown */}
            <div className="md:hidden">
              <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    aria-label="Toggle menu"
                  >
                    {isMobileMenuOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent 
                  align="end" 
                  className="w-full mt-2"
                  // sideOffset={5}
                >
                  {isAuthenticated ? (
                    <>
                      {/* User Info */}
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>
                              {user.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <p className="text-sm font-medium leading-none">{user.name}</p>
                            <p className="text-xs leading-none text-muted-foreground mt-1">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      {/* Navigation Links with Icons */}
                      {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
                        
                        return (
                          <DropdownMenuItem key={link.href} asChild>
                            <Link 
                              href={link.href}
                              onClick={closeMobileMenu}
                              className={cn(
                                "flex items-center w-full cursor-pointer",
                                isActive && "bg-accent text-accent-foreground font-medium"
                              )}
                            >
                              <Icon className="mr-2 h-4 w-4" />
                              <span>{link.label}</span>
                            </Link>
                          </DropdownMenuItem>
                        );
                      })}

                      <DropdownMenuSeparator />

                      {/* Profile and Settings */}
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/profile" onClick={closeMobileMenu} className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/settings" onClick={closeMobileMenu} className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      {/* Logout */}
                      <DropdownMenuItem 
                        className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer"
                        onClick={() => {
                          // Add logout logic here
                          closeMobileMenu();
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    /* Mobile Auth Options */
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/login" onClick={closeMobileMenu} className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Login</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/register" onClick={closeMobileMenu} className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Sign Up</span>
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}