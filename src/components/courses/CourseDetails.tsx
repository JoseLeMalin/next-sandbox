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
  }[];
} & PropsWithChildren;

// { children }: DropDownLogin
export const CourseDetails = ({ lessons, children }: CourseDetails) => {
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
                  <>
                    <Label> {lessonItem.name}</Label>
                    <Textarea defaultValue={lessonItem.content}></Textarea>
                  </>
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
