import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLessons } from "./lessons.query";
import Link from "next/link";
import { ButtonNewLesson } from "@/components/ButtonNewLesson";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { getRequiredAuthSession } from "@/lib/auth";

export default async function CourseLessonsPage({
  params,
  searchParams,
}: {
  params: {
    courseId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();
  const page = Number(searchParams.page ?? 1);
  const course = await getLessons({
    courseId: params.courseId,
    userId: session.user.id,
    userPage: page,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Lessons</CardDescription>
        <Table>
          <TableCaption>The list of lessons</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {course?.lessons.map((lesson) => (
              <TableRow key={lesson.name}>
              
                <TableCell className="font-medium">{lesson.content}</TableCell>
                <TableCell className="font-medium">
                  <Link href={`/admin/courses/${lesson.id}`}>
                    {lesson.state}
                  </Link>
                </TableCell>
                <TableCell className="font-medium">
                  <Button variant="outline" size="icon">
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ButtonNewLesson />
      </CardContent>
    </Card>
  );
}
