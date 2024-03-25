import { getAuthSession } from "@/lib/auth";
import { getCourse } from "../../../courses/[courseId]/course.query";
import CourseItem from "../../../courses/[courseId]/page";
import { notFound } from "next/navigation";
import { CourseDialog } from "./CourseDialog";

export default async function CoursePage({
  params: { courseId },
}: {
  params: { courseId: string };
}) {
  console.log("Do we reach here?:Page de la modale ", courseId);
  const session = await getAuthSession();
  if (!session?.user.id) return;

  const course = await getCourse({
    courseId: courseId,
    userId: session.user.id,
  });

  if (!course.course) notFound();

  return (
    <CourseDialog params={course.course}>
      <CourseItem params={{ courseId: course.course.id }} searchParams={{}} />
    </CourseDialog>
  );
}
