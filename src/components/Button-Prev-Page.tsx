"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const ButtonPrevPage = () => {
  const router = useRouter();
  return (
    <Button variant="outline" size="sm" onClick={() => router.back()}>
      Back
    </Button>
  );
};
