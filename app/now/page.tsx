import prisma from "@/lib/prisma";


export default async function Now() {
  const now = await prisma.nowActivity.findUnique({
    where: { id: 'singleton' }
  });

  return (
    <div>
      <header className="mb-8">
        <h1>Now</h1>
        <p className="text-muted italic text-sm">
          A living snapshot of the current moment.
        </p>
      </header>

      {now ? (
        <div className="flex-col gap-6">
          {now.building && (
            <div>
              <h2 className="text-sm font-sans text-muted mb-2 uppercase tracking-wider">Building</h2>
              <p className="m-0">{now.building}</p>
            </div>
          )}
          {now.learning && (
            <div>
              <h2 className="text-sm font-sans text-muted mb-2 uppercase tracking-wider">Learning</h2>
              <p className="m-0">{now.learning}</p>
            </div>
          )}
          {now.reading && (
            <div>
              <h2 className="text-sm font-sans text-muted mb-2 uppercase tracking-wider">Reading</h2>
              <p className="m-0">{now.reading}</p>
            </div>
          )}
          {now.listeningTo && (
            <div>
              <h2 className="text-sm font-sans text-muted mb-2 uppercase tracking-wider">Listening To</h2>
              <p className="m-0">{now.listeningTo}</p>
            </div>
          )}
          {now.thinkingAbout && (
            <div>
              <h2 className="text-sm font-sans text-muted mb-2 uppercase tracking-wider">Thinking About</h2>
              <p className="m-0">{now.thinkingAbout}</p>
            </div>
          )}
          
          <p className="text-sm text-muted mt-12 font-sans italic">
            Last updated: {now.updatedAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      ) : (
        <p className="text-muted italic text-sm">No recent updates.</p>
      )}
    </div>
  );
}
