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
import { getCourses } from "./courses.query";
import Image from "next/image";
import { z } from "zod";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

export default async function Courses() {
  const courses = await getCourses();
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
                    <TableCell className="font-medium">{course.name}</TableCell>
                    <TableCell className="font-medium">
                      {course.presentation}
                    </TableCell>
                    <TableCell className="font-medium">
                      {course.creator.name}
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link href={`/courses/${course.id}`}>
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
    </>
  );
}
