"use client";

import { createCollectionEntry } from "../actions";

export default function CreateCollectionEntry() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-8">Add to Collection</h1>

      <form action={createCollectionEntry} className="flex flex-col gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-sans text-muted mb-2">Category (e.g., Music, Books, Articles)</label>
          <input
            id="category"
            name="category"
            type="text"
            className="w-full"
            required
            list="categories"
          />
          <datalist id="categories">
            <option value="Music" />
            <option value="Books" />
            <option value="Articles" />
            <option value="Movies" />
            <option value="Ideas" />
          </datalist>
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-sans text-muted mb-2">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            className="w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="creator" className="block text-sm font-sans text-muted mb-2">Creator / Artist / Author (Optional)</label>
          <input
            id="creator"
            name="creator"
            type="text"
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="link" className="block text-sm font-sans text-muted mb-2">Link / URL (Optional)</label>
          <input
            id="link"
            name="link"
            type="url"
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="note" className="block text-sm font-sans text-muted mb-2">Short Note / Why is it meaningful? (Optional)</label>
          <textarea
            id="note"
            name="note"
            rows={3}
            className="w-full"
          ></textarea>
        </div>

        <button type="submit" className="self-start px-6 py-2">
          Add Entry
        </button>
      </form>
    </div>
  );
}
