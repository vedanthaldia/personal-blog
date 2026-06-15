"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function updateNowActivity(formData: FormData) {
  const building = formData.get("building") as string;
  const learning = formData.get("learning") as string;
  const listeningTo = formData.get("listeningTo") as string;
  const reading = formData.get("reading") as string;
  const thinkingAbout = formData.get("thinkingAbout") as string;

  await prisma.nowActivity.upsert({
    where: { id: "singleton" },
    update: {
      building,
      learning,
      listeningTo,
      reading,
      thinkingAbout,
    },
    create: {
      id: "singleton",
      building,
      learning,
      listeningTo,
      reading,
      thinkingAbout,
    },
  });

  revalidatePath("/");
  revalidatePath("/now");
}
