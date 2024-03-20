"use client";

import { PropsWithChildren } from "react";
import { Home, ChevronRight } from "lucide-react";

export default function BreadCrumbAdmin({ children }: PropsWithChildren) {
  return (
    <>
      <div>
        <nav className="bg-gray-200 px-4 py-2">
          <ol className="flex list-none items-center">
            <li>
              <a
                href="#"
                className="flex items-center gap-2 text-blue-500 underline"
              >
                <Home className="h-4 w-4" />
                Home
              </a>
            </li>
            <li className="mx-2 flex items-center">
              <ChevronRight className="mr-1 h-4 w-4 text-gray-400" />
              <a href="#" className="text-gray-500">
                Products
              </a>
            </li>
            <li className="mx-2 flex items-center">
              <ChevronRight className="mr-1 h-4 w-4 text-gray-400" />
              <a href="#" className="text-gray-500">
                Shirts
              </a>
            </li>
            <li className="mx-2 flex items-center">
              <ChevronRight className="mr-1 h-4 w-4 text-gray-400" />
              <span className="text-gray-500">Casual</span>
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
}
