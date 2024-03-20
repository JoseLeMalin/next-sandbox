"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { authAction } from "@/lib/action";
import { v4 } from "uuid";

const CourseFormSchema = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
  presentation: z.string(),
});

const CourseActionEditProps = z.object({
  courseId: z.string(),
  data: CourseFormSchema,
});

const CourseActionCreateProps = z.object({
  data: CourseFormSchema,
});
/**
 *
 */
export const updateCourseNextAction = authAction(
  CourseActionEditProps,
  async (props, { userId }) => {
    return await prisma.course.update({
      where: {
        id: props.courseId,
        creatorId: userId,
      },
      data: props.data,
    });
  }
);

export const createCourseNextAction = authAction(
  CourseActionCreateProps,
  async (props, { userId }) => {
    return await prisma.course.create({
      data: { ...props.data, id: v4(), creatorId: userId },
    });
  }
);
/*
export const updateCourse = async (data: FormData, courseId: string) => {
  // async (data: FormData, courseId: string) => {
  console.log("in the updatecourse");

  const image = data.get("image");
  const name = data.get("name");
  const presentation = data.get("presentation");
  const state = data.get("state");
  console.log("image: ", image);
  console.log("name: ", name);
  console.log("presentation: ", presentation);

  const resultUpdate = await prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      image: image?.toString(),
      name: name?.toString(),
      presentation: presentation?.toString(),
      // state: state?.toString(),
    },
  });
  return resultUpdate;
  // };
};
*/
