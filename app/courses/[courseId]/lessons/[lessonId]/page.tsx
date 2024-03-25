import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { getLesson } from "./lessonId.query";
import { getAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import LessonLoading from "./loading";

type LessonItemType = {
  params: {
    courseId: string;
    lessonId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function LessonItem({
  params: { courseId, lessonId },
  searchParams,
}: LessonItemType) {
  const session = await getAuthSession();
  if (!session?.user.id) return;
  const userId = session.user.id;
  const lesson = await getLesson({
    courseId,
    userId,
    lessonId,
  });
  if (!lesson) notFound();
  return (
    <Suspense fallback={LessonLoading()}>
      <Card>
        <CardHeader>Lesson {lesson.name}</CardHeader>
        <CardDescription> {lesson.id}</CardDescription>
        <CardContent className="main-container">
          <div className="left-container">
            Created At {lesson.createdAt.toString()}
          </div>
          <div className="right-container">Content: {lesson.content}</div>
        </CardContent>
      </Card>
    </Suspense>
  );
}
