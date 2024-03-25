"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Course } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

import { PropsWithChildren } from "react";

type DialogDemo = {
  params: Course;
} & PropsWithChildren;

export const CourseDialog = ({ params, children }: DialogDemo) => {
  const router = useRouter();
  const pathname = usePathname();

  const isCoursePage = pathname?.split("/").filter(Boolean).length === 2;
  return (
    <Dialog
      open={isCoursePage}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
