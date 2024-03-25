import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminLayout from "./layout";

export default function Admin() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Admin page</CardTitle>
          <CardContent>
            <CardDescription>{`Ici c'est la page de l'Admin`}</CardDescription>
            <div>
              {/*  <Link href={"/admin/courses"}>Courses</Link> */}
              <Link href={"/admin/courses"} scroll={false}>
                Courses
              </Link>
            </div>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
