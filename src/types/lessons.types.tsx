import { LessonState } from "@prisma/client";

export const prismaEnumLessonState = Object.entries(LessonState).map(
  ([label, value]) => ({ label, value }),
);
