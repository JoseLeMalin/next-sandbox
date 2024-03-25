import { Suspense } from "react";
import LessonItem from "./page";
import { Skeleton } from "@/components/ui/skeleton";

export default function CoursesLoading() {
  return (
    <>
      <Skeleton className="h-[800px] w-[500px] rounded-xl" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </>
  );
}
