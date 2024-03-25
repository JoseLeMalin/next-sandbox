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
import { Lesson } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

import { PropsWithChildren } from "react";

type DialogDemo = {
  params: Lesson;
} & PropsWithChildren;

export const LessonDialog = ({ params, children }: DialogDemo) => {
  const router = useRouter();
  const pathname = usePathname();

  const isLessonPage = pathname?.split("/").filter(Boolean).length === 4;
  return (
    <Dialog
      open={isLessonPage}
      onOpenChange={() => {
        router.back();
      }}
    >
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lesson {params.name}</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
