"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { authAction } from "@/lib/action";
import { v4 } from "uuid";
import { LessonState } from "@prisma/client";

const LessonFormSchema = z.object({
  name: z.string().min(3).max(40),
  rank: z.string(),
  content: z.string(),
  state: z.nativeEnum(LessonState),
  courseId: z.string(),
});

const LessonActionEditProps = z.object({
  lessonId: z.string(),
  data: LessonFormSchema,
});

const LessonActionCreateProps = z.object({
  data: LessonFormSchema,
});
/**
 *
 */
export const updateLessonNextAction = authAction(
  LessonActionEditProps,
  async (props, { userId }) => {
    return await prisma.lesson.update({
      where: {
        id: props.lessonId,
        creatorId: userId,
      },
      data: props.data,
    });
  },
);

export const createLessonNextAction = authAction(
  LessonActionCreateProps,
  async (props, { userId }) => {
    return await prisma.lesson.create({
      data: { ...props.data, id: v4(), creatorId: userId },
    });
  },
);
/*
export const updateLesson = async (data: FormData, courseId: string) => {
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
