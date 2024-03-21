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
      creatorId: userId,
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

export const getAdminLessons = async ({
  userId,
  userPage,
}: {
  userId: string;
  userPage: number;
}) => {
  const userLessons = await prisma.lesson.findMany({
    where: {
      creatorId: userId,
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

  return userLessons;
};
