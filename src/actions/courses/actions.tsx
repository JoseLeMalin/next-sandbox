'use server';
import { prisma } from "@/lib/prisma";
import { FormEvent } from "react";

export const updateCourse = async (data: FormEvent<HTMLFormElement>, courseId: string) => {
    console.log("in the updatecourse");
    
  // const image = data.get("image");
  // const name = data.get("name");
  // const presentation = data.get("presentation");
  // const state = data.get("state");
  // const resultUpdate = await prisma.course.update({
  //   where: {
  //     id: courseId,
  //   },
  //   data: {
  //     image: image?.toString(),
  //     name: name?.toString(),
  //     presentation: presentation?.toString(),
  //     // state: state?.toString(),
  //   },
  // });
  // return resultUpdate;
};
