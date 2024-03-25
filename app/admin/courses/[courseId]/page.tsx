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
import { getAdminCourse } from "./course.query";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { prisma } from "@/lib/prisma";
import { ChevronRightIcon } from "lucide-react";
import { removeUserFromCourse } from "@/actions/courses/actions";
import { revalidatePath } from "next/cache";

export default async function CourseItem({
  params,
  searchParams,
}: {
  params: {
    courseId: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();
  const userId = session.user.id;
  const page = Number(searchParams.page ?? 1);
  const course = await getAdminCourse({
    courseId: params.courseId,
    userId,
    userPage: page,
  });
  // const course =[];

  if (!course) {
    console.log("No courses found. Redirected to root");
    redirect("/admin");
    // return <p>Error...</p>;
  }
  if (!course.lessons?.length) {
    console.log("No courses found. Redirected to root");
    redirect("/admin");
    // return <p>Error...</p>;
  }

  const handleRemoveUser = async () => {
    "use server";
    if (!course?.id) return;
    const courseOnUser = await prisma.courseOnUser.findFirst({
      where: {
        userId,
        course: {
          id: course.id,
          creatorId: userId,
        },
      },
    });

    if (!courseOnUser) return;

    await removeUserFromCourse({
      courseId: course.id,
      userId,
    });

    revalidatePath(`/admin/courses/${course.id}`);
    redirect(`/admin/courses/${course.id}`);
  };

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row">
        <Card>
          <CardHeader>
            <CardTitle>Course {course.name}</CardTitle>
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
                      {user?.image ? (
                        <Image
                          src={user.image}
                          width="80"
                          height="80"
                          alt="User avatar"
                        />
                      ) : (
                        <div></div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell className="font-medium">
                      <Link href={`/admin/courses/${user.id}`} scroll={false}>
                        Aktive
                      </Link>
                    </TableCell>
                    <TableCell className="font-medium">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <ChevronRightIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <form>
                              <Button
                                variant="outline"
                                size="sm"
                                formAction={handleRemoveUser}
                              >
                                Remove user
                              </Button>
                            </form>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
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
                scroll={false}
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
                scroll={false}
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
