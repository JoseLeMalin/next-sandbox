import { prisma } from "@/lib/prisma";

export const getCourse = async ({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) => {
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true,
      lessons: true,
      createdAt: true,
      creatorId: true,
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

  const userFound = course?.users.find(
    (courseItem) => courseItem.userId === userId,
  );
  return {
    course: course,
    userFound,
  };
};
