import React, { PropsWithChildren } from "react";
import { useDroppable } from "@dnd-kit/core";

type Droppable = {
  id: string;
} & PropsWithChildren;

export function Droppable(props: Droppable) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable",
  });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
