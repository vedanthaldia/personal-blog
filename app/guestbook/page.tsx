import prisma from "@/lib/prisma";
import { submitGuestbookEntry } from "./actions";


export default async function Guestbook() {
  const entries = await prisma.guestbookEntry.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div>
      <header className="mb-12">
        <h1>Guestbook</h1>
        <p className="text-muted italic text-sm">
          Like leaving a note in a physical notebook. Feel free to say hello.
        </p>
      </header>

      <section className="mb-16 max-w-md">
        <h2 className="text-sm font-sans mb-4">Sign the Guestbook</h2>
        <form action={submitGuestbookEntry} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-sans text-muted mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-sans text-muted mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full"
              placeholder="Leave a message..."
            ></textarea>
          </div>

          <button type="submit" className="self-start">
            Sign
          </button>
        </form>
      </section>

      <hr />

      <section>
        <h2 className="text-sm font-sans text-muted mb-6 uppercase tracking-wider">
          Previous Visitors
        </h2>

        {entries.length > 0 ? (
          <div className="flex flex-col gap-8">
            {entries.map((entry) => (
              <div key={entry.id}>
                <p className="text-sm font-sans font-semibold m-0 mb-1">{entry.name}</p>
                <p className="m-0 text-sm">{entry.message}</p>
                <p className="text-xs text-muted mt-2 m-0 font-sans">
                  {entry.createdAt.toLocaleDateString("en-US", {
                    timeZone: 'Asia/Kolkata',
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted italic text-sm">No entries yet.</p>
        )}
      </section>
    </div>
  );
}
