"use client";

import { updateNote } from "../actions";
import { useState, useRef } from "react";

export default function EditNoteForm({ note }: { note: any }) {
  const [content, setContent] = useState(note.content);
  const [isUploading, setIsUploading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.url) {
        const imageMarkdown = `\n\n![${file.name}](${data.url})\n\n`;
        setContent((prev: string) => prev + imageMarkdown);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form action={updateNote} className="flex flex-col gap-6">
      <input type="hidden" name="id" value={note.id} />
      
      <div>
        <label htmlFor="title" className="block text-sm font-sans text-muted mb-2">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={note.title}
          className="w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-sans text-muted mb-2">Slug</label>
        <input
          id="slug"
          name="slug"
          type="text"
          defaultValue={note.slug}
          className="w-full"
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="content" className="block text-sm font-sans text-muted m-0">Content (Markdown)</label>
          <div>
            <label htmlFor="image-upload-edit" className="text-sm font-sans cursor-pointer text-muted border p-1 rounded bg-gray-50/50">
              {isUploading ? "Uploading..." : "Attach Image"}
            </label>
            <input 
              id="image-upload-edit" 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="hidden" 
              style={{ display: "none" }}
            />
          </div>
        </div>
        <textarea
          id="content"
          name="content"
          ref={textareaRef}
          rows={15}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full font-mono text-sm"
          required
        ></textarea>
      </div>

      <button type="submit" className="self-start px-6 py-2">
        Update Note
      </button>
    </form>
  );
}
