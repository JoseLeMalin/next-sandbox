"use client";

import { Button } from "@/components/ui/button";

export const ButtonNewLesson = () => {
  const handleOnClick = () => {
    console.log("Dans le btn lesson");
  };
  return (
    <Button variant="outline" size="sm" onClick={handleOnClick}>
      Create new Lesson
    </Button>
  );
};
