import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

export const useLogoutNextAuth = () => {
  return useMutation({
    mutationFn: async () => {
      signOut();
    },
  });
  //  mutation.mutate();
};
