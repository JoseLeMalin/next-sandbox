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

export default async function CourseLessonsPage({
  params,
  searchParams,
}: {
  params: {
    courseId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page ?? 1);
  const lessons = await getLessons({
    courseId: params.courseId,
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
          <TableCaption>A list of your members</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow key={lesson.name}>
                <TableCell className="font-medium">
                  <img src={lesson.image} width="80" height="80" />
                </TableCell>
                <TableCell className="font-medium">{lesson.content}</TableCell>
                <TableCell className="font-medium">
                  <Link href={`/admin/courses/${lesson.id}`}>Aktive</Link>
                </TableCell>
                <TableCell className="font-medium">Btn actions</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
