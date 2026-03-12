import Link from "next/link";
import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Heart,
  Shield,
  HelpCircle,
  FileText,
  MailIcon
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

const navigation = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "Documentation", href: "/docs", icon: FileText },
    { name: "Help Center", href: "/help", icon: HelpCircle },
    { name: "Privacy Policy", href: "/privacy", icon: Shield },
    { name: "Contact", href: "/contact", icon: MailIcon },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Partners", href: "/partners" },
  ],
  social: [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "Email", href: "mailto:support@fintrackerpro.com", icon: Mail },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="w-[95%] max-w-7xl mx-auto   bg-secondary rounded-lg px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">F</span>
                </div>
                <span className="font-bold text-xl">
                  FinTracker<span className="text-primary">Pro</span>
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Take control of your finances with smart tracking, insightful reports, 
              and powerful tools to help you achieve your financial goals.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h3>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="max-w-50"
                />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Product */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Product
              </h3>
              <ul className="mt-4 space-y-2">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Support
              </h3>
              <ul className="mt-4 space-y-2">
                {navigation.support.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                      >
                        {Icon && <Icon className="h-3.5 w-3.5" />}
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Connect
            </h3>
            <div className="mt-4 flex space-x-4">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-2">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@fintrackerpro.com
              </p>
              <p className="text-sm text-muted-foreground">
                123 Finance Street
                <br />
                New York, NY 10001
              </p>
            </div>
          </div>
        </div>

        {/* <separator className="border-t" /> */}

        {/* Bottom Bar */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            &copy; {currentYear} FinTrackerPro. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/privacy" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/cookies" 
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookie Policy
            </Link>
          </div>

          {/* Made with love */}
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> by FinTrackerPro
          </p>
        </div>
      </div>
    </footer>
  );
}