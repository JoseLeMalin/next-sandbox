import { getRequiredAuthSession } from "@/lib/auth";
import { CourseForm } from "../[courseId]/edit/CourseForm";

export default async function CreateCourse() {
  const session = await getRequiredAuthSession();

  return (
    <>
      <CourseForm />
    </>
  );
}
