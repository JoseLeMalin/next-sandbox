import { prisma } from "@/lib/prisma";

export const getCourse = async ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) => {
  const courses = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      lessons: true,
      users: {
        where: {
          userId: userId,
        },
        select: {
          userId: true,
        },
      },
      _count: {
        select: {
          lessons: true,
          users: true,
        },
      },
    },
  });

  const userFound = courses?.users.find(
    (courseItem) => courseItem.userId === userId
  );
  return {
    ...courses,
    userFound,
  };
};
