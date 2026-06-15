"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function submitComment(formData: FormData) {
  const name = formData.get("name") as string;
  const message = formData.get("message") as string;
  const noteId = formData.get("noteId") as string;
  const slug = formData.get("slug") as string;

  if (!name || !message || !noteId) {
    throw new Error("Missing fields");
  }

  await prisma.comment.create({
    data: {
      name,
      content: message,
      noteId,
    },
  });

  revalidatePath(`/notes/${slug}`);
}
