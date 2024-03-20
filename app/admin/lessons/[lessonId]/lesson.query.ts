import { prisma } from "@/lib/prisma";

export const getAdminLesson = async ({
  lessonId,
  userId,
  userPage,
}: {
  lessonId: string;
  userId: string;
  userPage: number;
}) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
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
      state: true,
      _count: {
        select: {
          users: true,
        },
      },
    },
  });
  console.log("lesson: ", lesson);

  const users = lesson?.users.map((user) => {
    return {
      // canceled: user.canceledAt ? true : false,
      ...user.user,
    };
  });

  return {
    ...lesson,
    users,
  };
};
