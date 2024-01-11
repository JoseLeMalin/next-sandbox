"use client";
import { PropsWithChildren } from "react";
import { signOut } from "next-auth/react";
import { Loader } from "@/components/ui/loader";
import { useMutation } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Session } from "next-auth";
import Link from "next/link";
import { useLogoutNextAuth } from "@/hooks/useLogoutNextAuth";

type AlertDialogConfirmChoice = {
  user: Session["user"];
} & PropsWithChildren;
export default function AlertDialogConfirmChoice({
  user,
  children,
}: AlertDialogConfirmChoice) {
  // const mutation = useMutation({
  //   mutationFn: async () => {
  //     signOut();
  //   },
  // });
  const { isPending, mutate } = useLogoutNextAuth();
  return (
    <>
      <DropdownMenu>
        <AlertDialog>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Avatar className="mr-2 h-6 w-6">
                <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                {/*user.image && (
                <AvatarImage
                  src={user.image}
                  alt={user.name ?? 'user picture'}
                />
              )*/}
              </Avatar>
              {/*user.name*/}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href={"/account"}>
                <Button>Account</Button>
              </Link>
            </DropdownMenuItem>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                <LogOut className="mr-2" size={12} />
                Logout
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to logout?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="secondary">Cancel</Button>
              </AlertDialogCancel>
              <Button
                variant="destructive"
                disabled={isPending}
                onClick={() => {
                  mutate();
                }}
              >
                {isPending ? (
                  <Loader className="mr-2" size={12} />
                ) : (
                  <LogOut className="mr-2" size={12} />
                )}
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenu>
    </>
  );
}
