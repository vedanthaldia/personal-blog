import prisma from "@/lib/prisma";
import Link from 'next/link';


export default async function Notes() {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <header className="mb-12">
        <h1>Notes</h1>
        <p className="text-muted italic text-sm">
          A reverse chronological collection of short notes and thoughts.
        </p>
      </header>

      {notes.length > 0 ? (
        <div className="flex-col gap-8">
          {notes.map((note) => (
            <article key={note.id} className="mb-8">
              <p className="text-xs text-muted font-sans m-0 mb-1">
                {note.createdAt.toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
              </p>
              <Link href={`/notes/${note.slug}`} className="block font-semibold text-lg" style={{ textDecoration: 'none' }}>
                {note.title}
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-muted italic text-sm">No notes yet.</p>
      )}
    </div>
  );
}
