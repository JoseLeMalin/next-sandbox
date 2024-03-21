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

const CourseActionRemoveUserProps = z.object({
  courseId: z.string(),
  userId: z.string(),
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
  },
);

export const createCourseNextAction = authAction(
  CourseActionCreateProps,
  async (props, { userId }) => {
    return await prisma.course.create({
      data: { ...props.data, id: v4(), creatorId: userId },
    });
  },
);

export const removeUserFromCourse = authAction(
  CourseActionRemoveUserProps,
  async ({ courseId, userId }) => {
    // Delete entry from many to many relation
    return await prisma.courseOnUser.delete({
      where: {
        userId_courseId: {
          courseId,
          userId,
        },
      },
    });
  },
);
