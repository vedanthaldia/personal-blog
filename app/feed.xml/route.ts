import prisma from "@/lib/prisma";
import { Feed } from 'feed';


export async function GET() {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vedant.com'; // Change to actual production URL

  const feed = new Feed({
    title: "Vedant's Notes",
    description: "A small place on the internet.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Vedant`,
    author: {
      name: "Vedant",
      link: siteUrl,
    }
  });

  notes.forEach((note) => {
    feed.addItem({
      title: note.title,
      id: `${siteUrl}/notes/${note.slug}`,
      link: `${siteUrl}/notes/${note.slug}`,
      description: note.content.substring(0, 200) + (note.content.length > 200 ? '...' : ''),
      content: note.content,
      author: [
        {
          name: "Vedant",
          link: siteUrl,
        }
      ],
      date: note.createdAt,
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
