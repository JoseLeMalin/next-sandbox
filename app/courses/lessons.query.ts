import { prisma } from "@/lib/prisma";

export const getCourseLessons = async (courseId?: string) => {
  const lessons = await prisma?.lesson.findMany({
    where: { courseId },
    select: {
      id: true,
      name: true,
      content: true,
    },
  });
  return lessons;
};
