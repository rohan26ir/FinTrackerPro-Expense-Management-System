import Link from "next/link";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";

// import { Button } from "../ui/button";


export default function Footer() {
  const currentYear = new Date().getFullYear();

  const social: { name: string; href: string; icon: React.ElementType }[] = [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "Email", href: "mailto:support@fintrackerpro.com", icon: Mail },
  ];

  const footerLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact-us" },
    { name: "Privacy Policy", href: "/privecy-policy" },
    { name: "Terms of Service", href: "/terms-and-conditions" },
  ];

  return (
    <footer className="w-[95%] max-w-400 mx-auto">
      <div className="bg-background  border rounded-lg">
        {/* Main Footer Content - keep your existing content here */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 ">
          {/* ... your existing brand column, navigation, social links ... */}
        </div>

        {/* Bottom Bar - styled like the image */}
        <div className="py-8">
          {/* Main Links */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-md text-muted-foreground">
            {footerLinks.map((link, index) => (
              <span key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
                {index < footerLinks.length - 1 && (
                  <span className="ml-4 text-muted-foreground/30">•</span>
                )}
              </span>
            ))}
          </div>

          {/* GDPR Compliant Badge */}
          <div className="flex justify-center mt-7">
            <Link href="/gdpr" className="flex items-center gap-2 text-sm ">
              <span className="text-3xl lg:text-9xl font-extrabold font-serif flex gap-1">
                DailyFinTracker<span className="text-[1.5rem]">Pro</span>
              </span>
            </Link>
          </div>

          {/* Social Media */}
          <div className="flex justify-center gap-4 mt-6">
            {social.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  className="p-2 rounded-full border hover:bg-muted transition"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">
              Copyright © {currentYear} · <Link href="/" className="text-black">DailyFinTracker</Link> · All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}