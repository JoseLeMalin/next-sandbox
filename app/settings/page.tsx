import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Settings() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Settings page</CardTitle>
          <CardContent>
            <CardDescription>{`Ici c'est la page des settings`}</CardDescription>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
