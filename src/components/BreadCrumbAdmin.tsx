"use client";

import { PropsWithChildren } from "react";
import { Home, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useIsClient } from "@/hooks/useIsClient";
import { v4 } from "uuid";
import Link from "next/link";

export default function BreadCrumbAdmin({ children }: PropsWithChildren) {
  const _pathname = usePathname();
  const pathname = _pathname?.split("/").filter(Boolean) ?? [];

  const isClient = useIsClient();

  if (!isClient) return;
  return (
    <>
      <div>
        <nav className="bg-gray-200 px-4 py-2">
          <ol role="list" className="flex list-none items-center">
            {pathname.map((pathnameItem, index) => {
              return (
                <>
                  <li key={`${pathnameItem}-${v4()}`}>
                    <Link
                      href={`/${pathname.slice(0, index + 1).join("/")}`}
                      className="block text-xs text-muted-foreground transition hover:text-foreground"
                    >
                      {pathnameItem}
                    </Link>
                  </li>
                  {index !== pathname.length - 1 && (
                    <ChevronRight className="text-muted-foreground" size={16} />
                  )}
                </>
              );
            })}
          </ol>
        </nav>
      </div>
    </>
  );
}
const isPrismaId = (id: string): boolean => {
  // Regular expression to match URL-friendly strings of exactly 25 characters.
  const regex = /^[\w-]{25}$/;
  return regex.test(id);
};

export const formatId = (id: string) => {
  return `${id.slice(0, 2)}...${id.slice(-2)}`;
};
