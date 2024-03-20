"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  createLessonNextAction,
  updateLessonNextAction,
} from "@/actions/lessons/actions.lessons";
import { LessonState } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { prismaEnumLessonState } from "@/types/lessons.types";

export const LessonFormSchema = z.object({
  name: z.string().min(3).max(40).optional(),
  rank: z.string().optional(),
  content: z.string().optional(),
  state: z.nativeEnum(LessonState).optional(),
  courseId: z.string().optional(),
  courses: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
    })
  ),
});

export type LessonFormSchema = z.infer<typeof LessonFormSchema>;

export type LessonFormProps = {
  defaultValue?: LessonFormSchema & {
    id: string;
  };
};

export const LessonForm = async (defaultValue: LessonFormProps) => {
  const { name, content, rank, courses, courseId, state, id } = {
    ...defaultValue.defaultValue,
  };

  return (
    <form
      className="flex flex-col"
      onSubmit={async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;
        const rank = formData.get("rank") as string;
        const content = formData.get("content") as string;
        const state = formData.get("state") as LessonState;
        const courseId = formData.get("courseId") as string;
        const lesson = {
          name,
          rank,
          content,
          state,
          courseId,
        };
        if (!id)
          return await createLessonNextAction({
            data: lesson,
          });

        await updateLessonNextAction({
          data: lesson,
          lessonId: id,
        });
      }}
    >
      <Label>Lesson Name</Label>
      <Input defaultValue={name} name="name" id="name" />
      <Label>Lesson rank</Label>
      <Input defaultValue={rank} name="rank" id="rank" />
      <Label>Lesson Presentation</Label>
      <Input defaultValue={content} name="content" id="content" />
      <Label>Parent Course</Label>
      <Select defaultValue={courseId ? courseId : ""} name="courseId">
        <SelectTrigger>
          <SelectValue placeholder="Select a course" />
        </SelectTrigger>

        <SelectContent>
          {courses?.map((courseItem, index) => {
            return (
              <SelectItem key={courseItem.id} value={courseItem.id}>
                {courseItem.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Label>Lesson State</Label>
      <Select defaultValue={state} name="state">
        <SelectTrigger>
          <SelectValue placeholder="Select a State" />
        </SelectTrigger>

        <SelectContent>
          {prismaEnumLessonState.map((courseItem, index) => {
            return (
              <SelectItem key={courseItem.label} value={courseItem.value}>
                {courseItem.value}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button type="submit">Submit Changes</Button>
    </form>
  );
};
