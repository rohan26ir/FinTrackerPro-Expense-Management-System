"use client";

import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const pageName = pathname.split("/").pop() || "Page";

  return (
    <div>
      <h1>404 - {pageName} Page Not Found</h1>
    </div>
  );
}