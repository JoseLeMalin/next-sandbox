import { prisma } from "@/lib/prisma";

export const getCourses = async (userId?: string) => {
  const courses = await prisma?.course.findMany({
    where: userId
      ? {
          users: {
            some: {
              userId,
            },
          },
        }
      : undefined,
    select: {
      name: true,
      image: true,
      presentation: true,
      id: true,
      creator: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
  return courses;
};
