import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import { getAdminCourse } from "../course.query";
import { CourseForm } from "./CourseForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

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

  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
      creatorId: session.user.id,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
    },
  });
  if (!course) {
    notFound();
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course {course.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Update {course.name}</CardDescription>
        <CourseForm defaultValue={course} />
      </CardContent>
    </Card>
  );
}
