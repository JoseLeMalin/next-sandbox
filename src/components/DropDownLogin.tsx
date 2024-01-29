import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PropsWithChildren, useState } from "react";
import { signIn } from "next-auth/react";
import { useSession, getSession, signOut } from "next-auth/react";
import AlertDialogConfirmChoice from "./AlertConfirmeChoice";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import { LoginButton } from "./LoginButton";

type DropDownLogin = PropsWithChildren;
export default async function DropDownLogin({ children }: DropDownLogin) {
  const session = await getAuthSession();

  return (
    <>
      {session?.user ? (
        <AlertDialogConfirmChoice user={session.user} />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Connexion</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-    56">
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LoginButton />
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
