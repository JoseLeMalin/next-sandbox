// "use client";
import { useSession } from "next-auth/react";
import { PropsWithChildren } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { ButtonLogout } from "../Button-Logout";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";

type Account = PropsWithChildren;
export default async function Account({ children }: Account) {
  // const mutation = useMutation({
  //   mutationFn: async () => {
  //     signOut();
  //   },
  // });
  // const { data: session, status } = useSession();
  const session = await getServerSession();
  // if (session.status === "loading") {
  //   return <p>Loading...</p>;
  // }
  if (!session) {
    redirect("/");
    // return <p>Error...</p>;
  }
  const handleClickSettings = () => {
    redirect("/settings");
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div>
            <Avatar>{session?.user.image ? session?.user.image : null}</Avatar>
            <div>{session?.user.email}</div>
            <div>{session?.user.name}</div>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <Link href={`/account/settings`} scroll={false}>
              Settings
            </Link>
            <Link href={`/admin`} scroll={false}>
              Admin
            </Link>

            <ButtonLogout />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
