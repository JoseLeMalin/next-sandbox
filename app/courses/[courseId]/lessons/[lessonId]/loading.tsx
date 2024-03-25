import { Suspense } from "react";
import LessonItem from "./page";
import { Skeleton } from "@/components/ui/skeleton";

export default function LessonLoading() {
  return (
    <>
      <Skeleton className="h-[400px] w-[700px] rounded-xl" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </>
  );
}
