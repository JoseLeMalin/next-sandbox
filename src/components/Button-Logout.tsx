"use client";
import { Button } from "@/components/ui/button";

import { PropsWithChildren } from "react";

import { LogOut } from "lucide-react";
import { Session } from "next-auth";
import { useLogoutNextAuth } from "@/hooks/useLogoutNextAuth";

type DropDownLogin = { session: Session; status: string } & PropsWithChildren;
export function ButtonLogout({
  session,
  status,
  children,
}: DropDownLogin) {
  // const { data: session, status } = useSession();
  const { isPending, mutate } = useLogoutNextAuth();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  // console.log("session: ", session);
  const handleLogout = () => {
    mutate();
  };
  return (
    <>
      {session?.user ? (
        <Button disabled={isPending} variant={"link"} onClick={handleLogout}>
          <LogOut className="mr-2" size={12} />
          Logout
        </Button>
      ) : (
        <></>
      )}
    </>
  );
}
