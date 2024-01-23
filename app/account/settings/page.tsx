import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateUser } from "@/actions/account/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getRequiredAuthSession } from "@/lib/auth";
import { Label } from "@/components/ui/label";
export default async function Settings() {
  const session = await getRequiredAuthSession();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Settings page</CardTitle>
          <CardContent>
            <CardDescription>{`Ici c'est la page des settings`}</CardDescription>
            <form className="flex flex-col" action={updateUser}>
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  name="imageUrl"
                  id="image"
                  alt="User Image link"
                  defaultValue={session.user.image}
                />
              </div>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  id="name"
                  alt="User name"
                  defaultValue={session.user.name}
                />
              </div>
              <Button type="submit">Update</Button>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
