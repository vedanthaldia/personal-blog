import prisma from "@/lib/prisma";


export default async function Collections() {
  const items = await prisma.collectionEntry.findMany({
    orderBy: { createdAt: 'desc' }
  });

  // Group by category
  const categories = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <div>
      <header className="mb-12">
        <h1>Collections</h1>
        <p className="text-muted italic text-sm">
          Things I'm exploring, enjoying, and keeping track of.
        </p>
      </header>

      {Object.keys(categories).length > 0 ? (
        <div className="flex-col gap-12">
          {Object.entries(categories).map(([category, categoryItems]) => (
            <section key={category}>
              <h2 className="text-sm font-sans text-muted mb-6 uppercase tracking-wider border-b border-border pb-2">{category}</h2>
              <div className="flex-col gap-6">
                {categoryItems.map((item) => (
                  <div key={item.id} className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <p className="m-0 font-semibold font-sans">
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer">
                            {item.title}
                          </a>
                        ) : (
                          item.title
                        )}
                      </p>
                      <span className="text-xs text-muted font-sans">
                        {item.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" })}
                      </span>
                    </div>
                    {item.creator && (
                      <p className="m-0 text-sm text-muted mb-2 font-sans">{item.creator}</p>
                    )}
                    {item.note && (
                      <p className="m-0 text-sm italic border-l-2 border-border pl-3 mt-2">{item.note}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <p className="text-muted italic text-sm">Nothing collected yet.</p>
      )}
    </div>
  );
}
