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
import { prisma } from "@/lib/prisma";
import { getCourses } from "./courses.query";
import { getCourseLessons } from "./lessons.query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getRequiredAuthSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import Link from "next/link";

const FormSchema = z.object({
  courseId: z.string(),
});

export default async function Courses() {
  const courses = await getCourses();
  const joinCourse = async (courseId: string) => {
    "use server";

    revalidatePath(`/courses/${courseId}`);
    redirect(`/courses/${courseId}`);
  };
  return (
    <>
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
                  <TableHead>Presentation</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Join Course</TableHead>
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
                    <TableCell className="font-medium">{course.name}</TableCell>
                    <TableCell className="font-medium">
                      {course.presentation}
                    </TableCell>
                    <TableCell className="font-medium">
                      {course.creator.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      <Button>
                        <Link href={`/courses/${course.id}`}>
                          Course details
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {/* <CourseDetails lessons={lessons}/> */}
      </div>
    </>
  );
}
