export const getUserCourses = async (userId: string) => {
  const courses = await prisma?.course.findMany({
    where: {
      users: {
        some: {
          userId,
        },
      },
    },
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
