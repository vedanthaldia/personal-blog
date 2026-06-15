"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function createNote(formData: FormData) {
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;

  if (!title || !slug || !content) {
    throw new Error("Missing fields");
  }

  await prisma.note.create({
    data: {
      title,
      slug,
      content,
    },
  });

  revalidatePath("/");
  revalidatePath("/notes");
  redirect("/admin/notes");
}

export async function updateNote(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;

  if (!id || !title || !slug || !content) {
    throw new Error("Missing fields");
  }

  await prisma.note.update({
    where: { id },
    data: { title, slug, content },
  });

  revalidatePath("/");
  revalidatePath("/notes");
  revalidatePath(`/notes/${slug}`);
  redirect("/admin/notes");
}

export async function deleteNote(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) throw new Error("Missing id");

  await prisma.note.delete({ where: { id } });

  revalidatePath("/");
  revalidatePath("/notes");
  redirect("/admin/notes");
}
