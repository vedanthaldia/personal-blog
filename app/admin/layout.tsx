import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <nav className="mb-8 flex gap-4 font-sans text-sm border-b border-border pb-4">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/notes">Notes</Link>
        <Link href="/admin/now">Now Page</Link>
        <Link href="/admin/collections">Collections</Link>
        <Link href="/api/auth/signout" className="ml-auto">Sign Out</Link>
      </nav>
      {children}
    </div>
  );
}
