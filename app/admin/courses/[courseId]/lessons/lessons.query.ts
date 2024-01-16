import { prisma } from "@/lib/prisma";

export const getLessons = async ({
  courseId,
  userPage,
}: {
  courseId: string;
  userPage: number;
}) => {
  const courses = await prisma.lesson.findMany({
    where: {
      courseId,
    },
  });
  return courses;
};
