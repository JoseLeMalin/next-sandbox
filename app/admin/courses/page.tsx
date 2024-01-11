import { CoursesList } from "@/components/admin/CoursesList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default async function Courses() {
    


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
