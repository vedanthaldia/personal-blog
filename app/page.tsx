import prisma from "@/lib/prisma";
import Link from 'next/link';


export default async function Home() {
  // Fetch Now Activity
  const now = await prisma.nowActivity.findUnique({
    where: { id: 'singleton' }
  });

  // Fetch recent Notes (limit to 3 for the homepage)
  const recentNotes = await prisma.note.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3
  });

  return (
    <div>
      <header className="mb-8">
        <h1>Vedant</h1>
        <p className="text-muted italic">A small place on the internet.</p>
      </header>

      <section className="mb-8">
        <h2 className="text-sm font-sans text-muted mb-4 uppercase tracking-wider">Currently</h2>
        {now ? (
          <div className="flex-col gap-4">
            {now.building && (
              <div>
                <span className="font-sans text-sm text-muted block mb-1">Building</span>
                <p className="m-0">{now.building}</p>
              </div>
            )}
            {now.learning && (
              <div className="mt-4">
                <span className="font-sans text-sm text-muted block mb-1">Learning</span>
                <p className="m-0">{now.learning}</p>
              </div>
            )}
            {now.reading && (
              <div className="mt-4">
                <span className="font-sans text-sm text-muted block mb-1">Reading</span>
                <p className="m-0">{now.reading}</p>
              </div>
            )}
            {now.listeningTo && (
              <div className="mt-4">
                <span className="font-sans text-sm text-muted block mb-1">Listening To</span>
                <p className="m-0">{now.listeningTo}</p>
              </div>
            )}
            {now.thinkingAbout && (
              <div className="mt-4">
                <span className="font-sans text-sm text-muted block mb-1">Thinking About</span>
                <p className="m-0">{now.thinkingAbout}</p>
              </div>
            )}
            <p className="text-sm text-muted mt-8 font-sans">
              Last updated: {now.updatedAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        ) : (
          <p className="text-muted italic text-sm">No recent updates.</p>
        )}
      </section>

      <hr />

      <section>
        <h2 className="text-sm font-sans text-muted mb-4 uppercase tracking-wider">Recent Notes</h2>
        {recentNotes.length > 0 ? (
          <div className="flex-col gap-4">
            {recentNotes.map((note) => (
              <div key={note.id} className="mb-4">
                <p className="text-sm text-muted font-sans m-0 mb-1">
                  {note.createdAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <Link href={`/notes/${note.slug}`} className="block font-semibold" style={{ textDecoration: 'none' }}>
                  {note.title}
                </Link>
              </div>
            ))}
            <div className="mt-6">
              <Link href="/notes" className="text-sm font-sans">View all notes &rarr;</Link>
            </div>
          </div>
        ) : (
          <p className="text-muted italic text-sm">No notes yet.</p>
        )}
      </section>
    </div>
  );
}
