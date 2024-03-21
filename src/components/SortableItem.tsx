"use client";


import React, { PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { LessonState } from "@prisma/client";

type SortableItem = {
  lesson: {
    id: string;
    name: string;
    rank: string;
    content: string;
    state: LessonState;
    createdAt: Date;
    courseId: string;
    creatorId: string;
  };
} & PropsWithChildren;

export function SortableItem(props: SortableItem) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {`${props.lesson.id} - ${props.lesson.name} - ${props.lesson.rank} - ${props.lesson.state} - ${props.lesson.creatorId}`}
    </div>
  );
}
