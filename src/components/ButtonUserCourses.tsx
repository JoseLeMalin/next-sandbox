"use client";
import { ReaderIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ButtonUserCourses = () => {
  const session = useSession();
  if (!session) {
    redirect("/");
    // return <p>Error...</p>;
  }
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/account/my-courses");
  };
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" onClick={handleOnClick}>
            My courses
          </Button>
        </TooltipTrigger>
        <TooltipContent>The courses you are registered to</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
