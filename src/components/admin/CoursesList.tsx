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
import Image from "next/image";

type CoursesList = PropsWithChildren;
export async function CoursesList({ children }: CoursesList) {
  const session = await getRequiredAuthSession();
  if (!session) {
    redirect("/");
    // return <p>Error...</p>;
  }
  const courses = await prisma.course.findMany({
    where: {
      creatorId: session.user.id,
    },
  });

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
              <TableCell className="font-medium">
                <Image src={course.image} width="80" height="80" alt=""/>
              </TableCell>
              <TableCell className="font-medium">
                <Link href={`/admin/courses/${course.id}`}>{course.name}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
