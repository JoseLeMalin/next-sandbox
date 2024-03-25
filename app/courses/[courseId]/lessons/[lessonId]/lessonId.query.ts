import { prisma } from "@/lib/prisma";

export const getLesson = async ({
  courseId,
  lessonId,
  userId,
}: {
  courseId: string;
  lessonId: string;
  userId: string;
}) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
      name: true,
      state: true,
      content: true,
      rank: true,
      courseId: true,
      creatorId: true,
      course: {
        select: {
          name: true,
          presentation: true,
        },
      },
      users: {
        select: {
          userId: true,
          progress: true,
        },
      },
      createdAt: true,
    },
  });

  return lesson;
};
