"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function submitGuestbookEntry(formData: FormData) {
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;

  if (!name || !message) {
    throw new Error("Missing fields");
  }

  await prisma.guestbookEntry.create({
    data: {
      name,
      message,
    },
  });

  revalidatePath("/guestbook");
}
