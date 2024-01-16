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
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCourse } from "./course.query";
import { Button, buttonVariants } from "@/components/ui/button";

export default async function CourseItem({
  params,
  searchParams,
}: {
  params: {
    courseId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log("params.courseId: ", params.courseId);
  console.log("searchParams: ", searchParams);

  const session = await getRequiredAuthSession();
  const page = Number(searchParams.page ?? 1);
  console.log("page: ", page);
  const course = await getCourse({
    courseId: params.courseId,
    userId: session.user.id,
    userPage: page,
  });
  // const course =[];

  if (!course) {
    redirect("/admin/courses");
    // return <p>Error...</p>;
  }
  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row">
        <Card>
          <CardHeader>
            <CardTitle>Members</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{`Ici c'est les members`}</CardDescription>
            <Table>
              <TableCaption>A list of your members</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead className="w-[100px]">Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {course?.users?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <img src={user.image} width="80" height="80" />
                    </TableCell>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell className="font-medium">
                      <Link href={`/admin/courses/${user.id}`}>Aktive</Link>
                    </TableCell>
                    <TableCell className="font-medium">Btn actions</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Course Info</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{course.name}</CardDescription>
            <div>{course._count?.users}</div>
            <div>{course._count?.lessons}</div>
            <div>
              <Link
                href={`/admin/courses/${course.id}/edit`}
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                Edit
              </Link>
            </div>
            <div>
              <Link
                href={`/admin/courses/${course.id}/lessons`}
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                Edit lessons
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
