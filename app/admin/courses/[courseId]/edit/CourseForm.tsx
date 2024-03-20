"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  createCourseNextAction,
  updateCourseNextAction,
} from "@/actions/courses/actions";
import { z } from "zod";

export const CourseFormSchema = z.object({
  name: z.string().min(3).max(40).optional(),
  image: z.string().url().optional(),
  presentation: z.string().optional(),
});

export type CourseFormSchema = z.infer<typeof CourseFormSchema>;

export type CourseFormProps = {
  defaultValue?: CourseFormSchema & {
    id: string;
  };
};

export const CourseForm = async (defaultValue: CourseFormProps) => {
  const { name, image, presentation, id } = { ...defaultValue.defaultValue };
  return (
    <form
      className="flex flex-col"
      onSubmit={async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;
        const image = formData.get("image") as string;
        const presentation = formData.get("presentation") as string;

        if (!id)
          return await createCourseNextAction({
            data: {
              name,
              image,
              presentation,
            },
          });

        await updateCourseNextAction({
          data: {
            name,
            image,
            presentation,
          },
          courseId: id,
        });
      }}
    >
      <Label>Course Name</Label>
      <Input defaultValue={name} name="name" id="name" />
      <Label>Course Image</Label>
      <Input defaultValue={image} name="image" id="image" />
      <Label>Course Presentation</Label>
      <Input
        defaultValue={presentation}
        name="presentation"
        id="presentation"
      />
      <Button type="submit">Submit Changes</Button>
    </form>
  );
};
