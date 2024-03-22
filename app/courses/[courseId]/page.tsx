import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCourse } from "./course.query";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { prisma } from "@/lib/prisma";
import { ChevronRightIcon } from "lucide-react";
import { removeUserFromCourse } from "@/actions/courses/actions";
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
  const session = await getRequiredAuthSession();
  const userId = session.user.id;
  const page = Number(searchParams.page ?? 1);
  const course = await getCourse({
    courseId: params.courseId,
    userId,
  });

  if (!course.id) {
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
            <div>{course._count?.lessons}</div>
            <div>
              {!course.userFound ? (
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
