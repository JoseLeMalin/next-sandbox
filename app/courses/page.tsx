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
import { getCourseLessons } from "./lessons.query";
import Image from "next/image";

export default async function Courses() {

  const courses = await getCourses();
  const lessons = await getCourseLessons("clrgu4au50011fi9hoon6gukl");
  return (
    <>
    <div  className="flex flex-col gap-4 lg:flex-row">


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
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses?.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    <Image src={course.image} width="80" height="80" alt="Course image"/>
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
