import React, { PropsWithChildren } from "react";
import { useDraggable } from "@dnd-kit/core";

type Draggable = {
  id: string;
} & PropsWithChildren;

export function Draggable(props: Draggable) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}
