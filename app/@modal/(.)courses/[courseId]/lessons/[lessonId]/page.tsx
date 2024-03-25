import { getAuthSession } from "@/lib/auth";

import { notFound } from "next/navigation";
import LessonItem from "../../../../../courses/[courseId]/lessons/[lessonId]/page";
import { getLesson } from "../../../../../courses/[courseId]/lessons/[lessonId]/lessonId.query";
import { LessonDialog } from "./LessonDialog";

type LessonPageType = {
  params: {
    courseId: string;
    lessonId: string;
    searchParams: { [key: string]: string | string[] | undefined };
  };
};

export default async function LessonPage({
  params: { courseId, lessonId },
}: LessonPageType) {
  console.log("Do we reach here?:Page de la modale ", courseId);
  const session = await getAuthSession();
  if (!session?.user.id) return;
  const userId = session.user.id;

  const lesson = await getLesson({
    lessonId,
    courseId,
    userId,
  });

  if (!lesson) notFound();

  return (
    <LessonDialog params={lesson}>
      <LessonItem
        params={{ courseId: lesson.courseId, lessonId }}
        searchParams={{}}
      />
    </LessonDialog>
  );
}
