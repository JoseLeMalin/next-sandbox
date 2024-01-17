import { prisma } from "@/lib/prisma";

export const getLessons = async ({
  courseId,
  userId,
  userPage,
}: {
  courseId: string;
  userId: string;
  userPage: number;
}) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      creatorId: userId,
    },
    select: {
      id: true,
      name: true,
      lessons: true,
    },
  });
  return course;
};
