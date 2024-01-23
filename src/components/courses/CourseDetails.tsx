import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { LessonState } from "@prisma/client";

type CourseDetails = {
  lessons: {
    id: string;
    name: string;
    rank: string;
    content: string;
    state: LessonState;
    createdAt: string;
    courseId: string;
}[]
} & PropsWithChildren;

// { children }: DropDownLogin
export const CourseDetails = ({ lessons, children }: CourseDetails) => {
  const handleOnClick = () => {
    console.log("Dans le btn lesson");
  };
  return (
    <>
      {lessons.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              {lessons.map((lessonItem) => {
                return (
                  <div key={lessonItem.id}>
                    <Label>{lessonItem.name}</Label>
                    <Textarea>{lessonItem.name}</Textarea>
                  </div>
                );
              })}
            </CardDescription>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No lesson</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{`Please comme back later`}</CardDescription>
          </CardContent>
        </Card>
      )}
    </>
  );
};
