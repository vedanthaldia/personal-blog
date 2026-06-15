import prisma from "@/lib/prisma";
import { updateNowActivity } from "./actions";


export default async function AdminNow() {
  const now = await prisma.nowActivity.findUnique({
    where: { id: "singleton" },
  });

  return (
    <div className="max-w-2xl">
      <h1 className="mb-8">Manage "Now" Page</h1>

      <form action={updateNowActivity} className="flex flex-col gap-6">
        <div>
          <label htmlFor="building" className="block text-sm font-sans text-muted mb-2">Building</label>
          <input
            id="building"
            name="building"
            type="text"
            defaultValue={now?.building || ""}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="learning" className="block text-sm font-sans text-muted mb-2">Learning</label>
          <input
            id="learning"
            name="learning"
            type="text"
            defaultValue={now?.learning || ""}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="listeningTo" className="block text-sm font-sans text-muted mb-2">Listening To</label>
          <input
            id="listeningTo"
            name="listeningTo"
            type="text"
            defaultValue={now?.listeningTo || ""}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="reading" className="block text-sm font-sans text-muted mb-2">Reading</label>
          <input
            id="reading"
            name="reading"
            type="text"
            defaultValue={now?.reading || ""}
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="thinkingAbout" className="block text-sm font-sans text-muted mb-2">Thinking About</label>
          <input
            id="thinkingAbout"
            name="thinkingAbout"
            type="text"
            defaultValue={now?.thinkingAbout || ""}
            className="w-full"
          />
        </div>

        <button type="submit" className="self-start px-6 py-2">
          Update Status
        </button>
      </form>
    </div>
  );
}
