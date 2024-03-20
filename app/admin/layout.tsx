// app/layout.tsx
import BreadCrumbAdmin from "@/components/BreadCrumbAdmin";
import { SiteConfig } from "@/lib/site-config";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
};

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="m-auto flex max-w-3xl items-center gap-2 px-4 py-1">
        <BreadCrumbAdmin />
      </div>
      {children}
    </>
  );
}
