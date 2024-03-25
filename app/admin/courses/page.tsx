import { CoursesList } from "@/components/admin/CoursesList";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function Courses() {
  // const session = await getRequiredAuthSession();

  return (
    <>
      <Button>
        <Link href={"/admin/courses/create"} scroll={false}>
          Create new Course
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Online Courses page</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{`Ici c'est la page des courses`}</CardDescription>
          <CoursesList />
        </CardContent>
      </Card>
    </>
  );
}
