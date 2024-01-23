"use client";
import { ReaderIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const ButtonExploreCourses = () => {
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/courses");
  };
  return (
    <Button variant="outline" size="sm" onClick={handleOnClick}>
      Explore courses
    </Button>
  );
};
