"use server";
import { prisma } from "@/lib/prisma";
import { FormEvent } from "react";
import { z } from "zod";
import { authAction } from "@/lib/action";

import { createSafeActionClient } from "next-safe-action";

const CourseFormSchema = z.object({
  name: z.string().min(3).max(40),
  image: z.string().url(),
  presentation: z.string(),
});
const CourseActionEditProps = z.object({
  courseId: z.string(),
  data: CourseFormSchema,
});
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

// export const updateCourse = authAction (
//   CourseActionEditProps,
//   async (props, { userId }) => {
//     await prisma.course.update({
//       where: {
//         id: props.courseId,
//         creatorId: userId,
//       },
//       data: props.data,
//     });
//
//     return 'Course updated successfully';
//   }
// );
