import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getCourse } from "./course.query";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const FormSchema = z.object({
  courseId: z.string(),
});

export default async function CourseItem({
  params,
  searchParams,
}: {
  params: {
    courseId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  if (!params?.courseId) redirect("/courses");
  const session = await getRequiredAuthSession();
  const userId = session.user.id;
  const page = Number(searchParams?.page ?? 1);

  const { course, userFound } = await getCourse({
    courseId: params.courseId,
    userId,
  });

  if (!course?.id) {
    console.log("No courses found. Redirected to root");
    redirect("/courses");
    // return <p>Error...</p>;
  }

  console.log("course._count?.users: ", course._count?.users);

  const handleJoinUser = async () => {
    "use server";
    if (!course?.id) return;
    const courseOnUser = await prisma.courseOnUser.create({
      data: {
        courseId: course.id,
        userId,
      },
    });
    if (!courseOnUser) return;

    revalidatePath(`/courses/${course.id}`);
    redirect(`/courses/${course.id}`);
  };

  const handleLeaveCourse = async () => {
    "use server";
    if (!course?.id) return;
    const courseOnUser = await prisma.courseOnUser.delete({
      where: {
        userId_courseId: {
          courseId: course.id,
          userId,
        },
      },
      // data: {
      //   courseId: course.id,
      //   userId,
      // },
    });
    if (!courseOnUser) return;

    revalidatePath(`/courses/${course.id}`);
    redirect(`/courses/${course.id}`);
  };
  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row">
        <Card>
          <CardHeader>
            <CardTitle>Course Info</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{course.name}</CardDescription>
            <div>
              <div>Nb lessons:</div>
              <div>{course._count?.lessons}</div>
            </div>
            <div>
              <div>Pres</div>
              <div>{course.presentation}</div>
            </div>
            <div>
              {!userFound ? (
                <form action={handleJoinUser}>
                  <Button type="submit">Join Course</Button>
                </form>
              ) : (
                <form action={handleLeaveCourse}>
                  <Button type="submit">Leave course</Button>
                </form>
              )}
            </div>
          </CardContent>
        </Card>

        {/* <CourseDetails lessons={course.lessons}/> */}
      </div>
    </>
  );
}
