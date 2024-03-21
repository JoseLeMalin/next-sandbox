"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  createCourseNextAction,
  updateCourseNextAction,
} from "@/actions/courses/actions";
import { z } from "zod";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableItem } from "@/components/SortableItem";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

export const CourseFormSchema = z.object({
  name: z.string().min(3).max(40).optional(),
  image: z.string().url().optional(),
  presentation: z.string().optional(),
  lessons: z.array(
    z.object({
      id: z.string(),
      name: z.string().optional(),
      rank: z.string().optional(),
      content: z.string().optional(),
      state: z.string().optional(),
      createdAt: z.date(),
      courseId: z.string().optional(),
      creatorId: z.string().optional(),
    })
  ),
});

export type CourseFormSchema = z.infer<typeof CourseFormSchema>;

export type CourseFormProps = {
  defaultValue?: CourseFormSchema & {
    id: string;
  };
};

export const CourseForm = async (defaultValue: CourseFormProps) => {
  const { name, image, presentation, id, lessons } = {
    ...defaultValue.defaultValue,
  };

  // const [items] = useState(["1", "2", "3"]);
  const [items, setItems] = useState(lessons);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <>
      <form
        className="flex flex-col"
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);
          const name = formData.get("name") as string;
          const image = formData.get("image") as string;
          const presentation = formData.get("presentation") as string;

          // if (!id)
          //   return await createCourseNextAction({
          //     data: {
          //       name,
          //       image,
          //       presentation,
          //     },
          //   });
          //
          // await updateCourseNextAction({
          //   data: {
          //     name,
          //     image,
          //     presentation,
          //   },
          //   courseId: id,
          // });
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items?.map((item) => (
              <SortableItem key={item.id} id={item.id} lesson={item} />
            ))}
          </SortableContext>
        </DndContext>
        <div style={{ paddingTop: "250px" }}>
          <Button type="submit">Submit Changes</Button>
        </div>
      </form>
    </>
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      console.log("Before the error ?");

      setItems((items) => {
        const oldIndex = items?.findIndex((item) => item.id === active.id);
        const newIndex = items?.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);

        console.log({ newIndex, newItems });

        const newUpItem = newItems[newIndex - 1]?.rank;
        const newDownItem = newItems[newIndex + 1]?.rank;

        return newItems;
      });
    }
  }
};
