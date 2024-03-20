import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAdminLesson } from "../lesson.query";
import { getCourses } from "../../../../courses/courses.query";
import { LessonForm } from "./LessonForm";

export default async function CourseLessonsPage({
  params,
  searchParams,
}: {
  params: {
    lessonId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();
  const page = Number(searchParams.page ?? 1);
  // const lesson = await getAdminLesson({
  //   lessonId: params.lessonId,
  //   userId: session.user.id,
  //   userPage: page,
  // });

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: params.lessonId,
      creatorId: session.user.id,
    },
    select: {
      id: true,
      name: true,
      users: {
        take: 5,
        select: {
          id: true,
          user: {
            select: {
              email: true,
              id: true,
              image: true,
            },
          },
        },
      },
      rank: true,
      state: true,
      content: true,
      courseId: true,
    },
  });
  const courses = await getCourses();
  // console.log("courses SHE: ", courses);
  
  if (!lesson) notFound();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lesson Info</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Update {lesson.name}</CardDescription>
        <LessonForm defaultValue={{ ...lesson, courses }} />
      </CardContent>
    </Card>
  );
}
