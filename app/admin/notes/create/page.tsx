"use client";

import { createNote } from "../actions";
import { useState, useRef } from "react";

export default function CreateNote() {
  const [content, setContent] = useState("");
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
        setContent((prev) => prev + imageMarkdown);
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
    <div className="max-w-2xl">
      <h1 className="mb-8">Create Note</h1>

      <form action={createNote} className="flex flex-col gap-6">
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
          <label htmlFor="slug" className="block text-sm font-sans text-muted mb-2">Slug (e.g. ffmpeg-is-black-magic)</label>
          <input
            id="slug"
            name="slug"
            type="text"
            className="w-full"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="content" className="block text-sm font-sans text-muted m-0">Content (Markdown)</label>
            <div>
              <label htmlFor="image-upload" className="text-sm font-sans cursor-pointer text-muted border p-1 rounded bg-gray-50/50">
                {isUploading ? "Uploading..." : "Attach Image"}
              </label>
              <input 
                id="image-upload" 
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
          Publish Note
        </button>
      </form>
    </div>
  );
}
