import prisma from "@/lib/prisma";
import Link from "next/link";
import { deleteNote } from "./actions";


export default async function AdminNotes() {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="m-0">Manage Notes</h1>
        <Link href="/admin/notes/create" className="p-2 bg-foreground text-background rounded text-sm no-underline">
          Create New Note
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <p className="font-semibold m-0">{note.title}</p>
              <p className="text-sm text-muted m-0">/{note.slug}</p>
            </div>
            <div className="flex gap-4">
              <Link href={`/admin/notes/${note.id}`} className="text-sm">Edit</Link>
              <form action={deleteNote}>
                <input type="hidden" name="id" value={note.id} />
                <button type="submit" className="text-sm text-red-600 bg-transparent p-0">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
