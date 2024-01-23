"use client";
import { ReaderIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const ButtonUserCourses = () => {
  const session = useSession();
  if (!session) {
    redirect("/");
    // return <p>Error...</p>;
  }
  const router = useRouter();
  const handleOnClick = () => {
    router.push(`/courses/${session.data?.user.id}`);
  };
  return (
    <Button variant="outline" size="sm" onClick={handleOnClick}>
      My courses
    </Button>
  );
};
