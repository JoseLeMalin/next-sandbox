"use server";

import { getRequiredAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(3).max(40),
  imageUrl: z.string().url(),
});

export const updateUser = async (data: FormData) => {
  const userSession = await getRequiredAuthSession();
  const imageUrl = data.get("imageUrl");
  const name = data.get("name");
  const safeData = FormSchema.safeParse({
    imageUrl,
    name,
  });

  if (!name) return;
  if (!imageUrl) return;
  if (!safeData.success) {
    const searchParams = new URLSearchParams();
    searchParams.set(
      "error",
      "Invalid data. Image must be an URL and name must be between 3 and 40 characters.",
    );
    redirect(`/account/settings?${searchParams.toString()}`);
  }

  const updateUser = await prisma.user.update({
    where: {
      id: userSession.user.id,
    },
    data: {
      name: name.toString(),
      image: imageUrl.toString(),
    },
  });
  revalidatePath("/account/settings");
  redirect("/account/settings");
};

export const deletePost = async (id: string) => {
  const deletedUser = await prisma.user.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
  redirect("/");
};
