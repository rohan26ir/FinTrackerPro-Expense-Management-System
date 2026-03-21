'use client';

import {
  Home, 
  LayoutDashboard, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  BarChart3, 
  PieChart,
  Receipt,
  Target,
  PiggyBank,
  CreditCard,
  Calendar,
  Tags,
  Bell,
  User,
  Settings,
  HelpCircle,
  FileText,
  Download,
  Shield,
  Globe,
  Moon,
  Sun
} from "lucide-react";
import DashLayout from "../components/dashboard/DashLayout";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/add-income", label: "Add Income", icon: TrendingUp },
  { href: "/dashboard/add-expense", label: "Add Expense", icon: TrendingDown },
  { href: "/dashboard/transactions", label: "Transactions", icon: Receipt },
  { href: "/dashboard/wallet", label: "Wallet", icon: Wallet },
  { href: "/dashboard/budget", label: "Budget", icon: Target },
  { href: "/dashboard/savings", label: "Savings", icon: PiggyBank },
  { href: "/dashboard/investments", label: "Investments", icon: BarChart3 },
  { href: "/dashboard/reports", label: "Reports", icon: PieChart },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/categories", label: "Categories", icon: Tags },
  { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { href: "/dashboard/bills", label: "Bills & Reminders", icon: Bell },
  { href: "/dashboard/cards", label: "Cards", icon: CreditCard },
  { href: "/dashboard/export", label: "Export Data", icon: Download },
  { href: "/dashboard/tax", label: "Tax Reports", icon: FileText },
];

const bottomLinks = [
  { href: "/dashboard/profile", label: "Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  // { href: "/dashboard/security", label: "Security", icon: Shield },
  // { href: "/dashboard/preferences", label: "Preferences", icon: Globe },
  { href: "/dashboard/help", label: "Help & Support", icon: HelpCircle },
  // { href: "/contact-us", label: "Contact Us", icon: Phone },
];

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashLayout navLinks={navLinks} bottomLinks={bottomLinks} brandName="DailyFinTracker">
      {children}
    </DashLayout>
    </div>
  );
}