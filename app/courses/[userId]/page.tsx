import { CoursesList } from "@/components/admin/CoursesList";
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
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCourses } from "../courses.query";
import Image from "next/image";


export default async function Courses({
  params,
  searchParams,
}: {
  params: {
    userId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/");
  }
  console.log("params.userId: ", params.userId);
  
  const courses = await getCourses(params.userId);
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Online Courses page</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{`A list of the courses you own`}</CardDescription>
          <Table>
            <TableCaption>A list of your recent courses.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[70px]">Image</TableHead>
                <TableHead >Name</TableHead>
                <TableHead >Presentation</TableHead>
                <TableHead >Created By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses?.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    <Image src={course.image} width="80" height="80" alt=""/>
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
    </>
  );
}
