import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditNoteForm from "./form";

export default async function EditNote({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const note = await prisma.note.findUnique({
    where: { id },
  });

  if (!note) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-8">Edit Note</h1>
      <EditNoteForm note={note} />
    </div>
  );
}
