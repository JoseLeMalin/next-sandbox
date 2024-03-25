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
import Image from "next/image";
import { getUserCourses } from "./my-courses.query";
import { getAuthSession } from "@/lib/auth";
import CoursesLoading from "../../courses/loading";
import { Suspense } from "react";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export default async function MyCourses() {
  const session = await getAuthSession();
  if (!session?.user.id) return;
  const userId = session.user.id;

  const courses = await getUserCourses(userId);

  return (
    <>
      <Suspense fallback={CoursesLoading()}>
        <div className="flex flex-col gap-4 lg:flex-row">
          <Card>
            <CardHeader>
              <CardTitle>Online Courses page</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{`All available courses`}</CardDescription>
              <Table>
                <TableCaption>Available courses</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[70px]">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead style={{ width: "50%" }}>Presentation</TableHead>
                    <TableHead>Created By</TableHead>
                    <TableHead>Course details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses?.map((course) => (
                    <TableRow key={course.id} id={course.id}>
                      <TableCell className="font-medium">
                        <Image
                          src={course.image}
                          width="80"
                          height="80"
                          alt="Course image"
                          priority={false}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {course.name}
                      </TableCell>
                      <TableCell className="font-medium">
                        {course.presentation}
                      </TableCell>
                      <TableCell className="font-medium">
                        {course.creator.name}
                      </TableCell>
                      <TableCell className="font-medium">
                        <Link href={`/courses/${course.id}`} scroll={false}>
                          <ChevronRightIcon className="h-4 w-4" />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </Suspense>
    </>
  );
}
