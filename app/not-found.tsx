"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const pathname = usePathname();
  const pageName = pathname?.split("/").pop() || "Page";
  
  const formattedPageName = pageName
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="min-h-[60vh] bg-background flex items-center justify-center p-4">
      <div className="w-[95%] max-w-2xl mx-auto text-center">
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-2">
          {formattedPageName} Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          {
            `Sorry, the ${formattedPageName.toLowerCase()} page you are looking for does not exist. It might have been moved or deleted. Please check the URL and try again.`
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard">
              <Home className="h-4 w-4 mr-2" />
              Go to Dashboard
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" onClick={() => window.history.back()}>
            <button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </button>
          </Button>
        </div>
      </div>
    </div>
  );
}