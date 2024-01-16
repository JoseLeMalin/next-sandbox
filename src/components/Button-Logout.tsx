"use client";
import { Button } from "@/components/ui/button";

import { PropsWithChildren } from "react";

import { LogOut } from "lucide-react";
import { useLogoutNextAuth } from "@/hooks/useLogoutNextAuth";

type DropDownLogin = PropsWithChildren;
export function ButtonLogout({ children }: DropDownLogin) {
  // const { data: session, status } = useSession();
  const { isPending, mutate } = useLogoutNextAuth();

  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }
  // console.log("session: ", session);
  const handleLogout = () => {
    mutate();
  };
  return (
    <>
      <Button disabled={isPending} variant={"link"} onClick={handleLogout}>
        <LogOut className="mr-2" size={12} />
        Logout
      </Button>
    </>
  );
}
