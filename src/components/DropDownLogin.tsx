"use client";
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

type DropDownLogin = PropsWithChildren;
export default function DropDownLogin({ children }: DropDownLogin) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

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
                <Button onClick={() => signIn("github")}>
                  Sign in with Github
                </Button>
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
