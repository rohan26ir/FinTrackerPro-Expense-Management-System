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
  Bell
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
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Mock auth state - replace with actual auth logic
const isAuthenticated = true; // Change this based on your auth state
const user = {
  name: "Amy Harris",
  email: "amy.harris@example.com",
  avatar: "https://i.ibb.co.com/5qFH79g/girl.png",
};

const navLinks = [
  { href: "/dashboard", label: "Dashboard",  },
  { href: "/dashboard/transactions", label: "Transactions"},
  { href: "/dashboard/add-income", label: "Income"},
  { href: "/dashboard/add-expense", label: "Expenses"},
  { href: "/dashboard/reports", label: "Reports"},
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

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="w-[95%] max-w-7xl mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2">
            <Link href={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2">
              
              <span className="font-bold text-xl hidden sm:inline-block">
                FinTracker<span className="text-primary">Pro</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                // const Icon = link.icon;
                const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      "flex items-center gap-2",
                      isActive 
                        ? "bg-accent text-accent-foreground" 
                        : "text-muted-foreground"
                    )}
                  >
                    {/* <Icon className="h-4 w-4" /> */}
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

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="w-[95%] max-w-7xl mx-auto py-4 space-y-1">
            {isAuthenticated ? (
              <>
                {/* Mobile Navigation Links */}
                {navLinks.map((link) => {
                  // const Icon = link.icon;
                  const isActive = pathname === link.href || pathname?.startsWith(link.href + "/");
                  
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md",
                        "hover:bg-accent hover:text-accent-foreground",
                        isActive 
                          ? "bg-accent text-accent-foreground" 
                          : "text-muted-foreground"
                      )}
                    >
                      {/* <Icon className="h-5 w-5" /> */}
                      {link.label}
                    </Link>
                  );
                })}

                {/* Mobile User Menu Items */}
                <div className="pt-4 mt-4 border-t">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      // Add logout logic here
                      closeMobileMenu();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="h-5 w-5" />
                    Log out
                  </button>
                </div>
              </>
            ) : (
              /* Mobile Auth Buttons */
              <div className="flex flex-col gap-2">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login" onClick={closeMobileMenu}>Login</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/register" onClick={closeMobileMenu}>Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}