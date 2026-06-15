import prisma from "@/lib/prisma";
import Link from "next/link";
import { deleteCollectionEntry } from "./actions";


export default async function AdminCollections() {
  const items = await prisma.collectionEntry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="m-0">Manage Collections</h1>
        <Link href="/admin/collections/create" className="p-2 bg-foreground text-background rounded text-sm no-underline">
          Add New Item
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <p className="font-semibold m-0 font-sans">{item.title}</p>
              <p className="text-sm text-muted m-0 font-sans">
                {item.category} {item.creator && ` • ${item.creator}`}
              </p>
            </div>
            <div>
              <form action={deleteCollectionEntry}>
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className="text-sm text-red-600 bg-transparent p-0">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
