import { PropsWithChildren } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

type CoursesList = PropsWithChildren;
export async function CoursesList({ children }: CoursesList) {
  const session = await getServerSession()
  if (!session) {
    redirect("/");
    // return <p>Error...</p>;
  }
  const courses = await prisma.course.findMany({
    where: {
      creatorId: session.user.id,
    },
  });

  // const courses: {
  //   course: string;
  //   paymentStatus: string;
  //   totalAmount: string;
  //   paymentMethod: string;
  // }[] = [];

  return (
    <>
      <Table>
        <TableCaption>A list of your recent courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead className="w-[100px]">Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.image}</TableCell>
              <TableCell className="font-medium">
                <Link href={`/admin/courses/:courseId`}>{course.name}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
