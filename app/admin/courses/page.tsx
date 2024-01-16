import { CoursesList } from "@/components/admin/CoursesList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";

export default async function Courses() {
  // const session = await getRequiredAuthSession();

  return (
    <>
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
