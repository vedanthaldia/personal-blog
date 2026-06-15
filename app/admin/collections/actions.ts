"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function createCollectionEntry(formData: FormData) {
  const category = formData.get("category") as string;
  const title = formData.get("title") as string;
  const creator = formData.get("creator") as string;
  const link = formData.get("link") as string;
  const note = formData.get("note") as string;

  if (!category || !title) {
    throw new Error("Missing fields");
  }

  await prisma.collectionEntry.create({
    data: {
      category,
      title,
      creator: creator || null,
      link: link || null,
      note: note || null,
    },
  });

  revalidatePath("/collections");
  revalidatePath("/admin/collections");
  redirect("/admin/collections");
}

export async function deleteCollectionEntry(formData: FormData) {
  const id = formData.get("id") as string;

  if (!id) throw new Error("Missing id");

  await prisma.collectionEntry.delete({ where: { id } });

  revalidatePath("/collections");
  revalidatePath("/admin/collections");
  redirect("/admin/collections");
}
