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
import { buttonVariants } from "@/components/ui/button";
import { getAdminLesson } from "./[lessonId]/lesson.query";
import Image from "next/image";

export default async function CourseItem({
  params,
  searchParams,
}: {
  params: {
    lessonId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();
  const page = Number(searchParams.page ?? 1);
  console.log("page: ", page);
  const lesson = await getAdminLesson({
    lessonId: params.lessonId,
    userId: session.user.id,
    userPage: page,
  });

  if (!lesson) {
    console.log("No courses found. Redirected to root");
    redirect("/");
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
                {lesson?.users?.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user?.image ? (
                        <Image
                          src={user.image}
                          width="80"
                          height="80"
                          alt=""
                          priority={false}
                        />
                      ) : (
                        <div></div>
                      )}
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
            <CardDescription>{lesson.name}</CardDescription>
            <div>{lesson._count?.users}</div>
            <div>{lesson._count?.users}</div>
            <div>
              <Link
                href={`/admin/courses/${lesson.id}/edit`}
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                Edit
              </Link>
            </div>
            <div>
              <Link
                href={`/admin/courses/${lesson.id}/lessons`}
                className={buttonVariants({
                  variant: "outline",
                })}
              >
                Edit lessons
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* <CourseDetails lessons={course.lessons}/> */}
      </div>
    </>
  );
}
