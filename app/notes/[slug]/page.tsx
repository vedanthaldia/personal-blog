import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { submitComment } from "./actions";


// Next.js page component now receives params as a Promise in App Router
export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const note = await prisma.note.findUnique({
    where: { slug },
    include: {
      comments: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!note) {
    notFound();
  }

  return (
    <div>
      <article className="mb-16">
        <header className="mb-8">
          <p className="text-sm text-muted font-sans m-0 mb-2">
            {note.createdAt.toLocaleDateString("en-US", {
              timeZone: 'Asia/Kolkata',
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit"
            })}
          </p>
          <h1 className="mt-0">{note.title}</h1>
        </header>

        <div className="prose">
          <ReactMarkdown>{note.content}</ReactMarkdown>
        </div>
      </article>

      <hr />

      <section>
        <h2 className="text-sm font-sans text-muted mb-6 uppercase tracking-wider">
          Comments
        </h2>

        {note.comments.length > 0 ? (
          <div className="flex flex-col gap-6 mb-12">
            {note.comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50/50 p-4 rounded border">
                <div className="flex justify-between items-baseline mb-2">
                  <p className="text-sm font-sans font-semibold m-0">{comment.name}</p>
                  <p className="text-xs text-muted font-sans m-0">
                    {comment.createdAt.toLocaleDateString("en-US", {
                      timeZone: 'Asia/Kolkata', month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit"
                    })}
                  </p>
                </div>
                <p className="m-0 text-sm">{comment.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted italic text-sm mb-12">No comments yet.</p>
        )}

        <div className="max-w-md">
          <h2 className="text-sm font-sans mb-4">Leave a comment</h2>
          <form action={submitComment} className="flex flex-col gap-4">
            <input type="hidden" name="noteId" value={note.id} />
            <input type="hidden" name="slug" value={slug} />

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
                placeholder="Jane Doe"
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
                placeholder="What are your thoughts?"
              ></textarea>
            </div>

            <button type="submit" className="self-start">
              Submit Comment
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
