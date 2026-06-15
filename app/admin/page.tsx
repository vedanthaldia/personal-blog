import prisma from "@/lib/prisma";


export default async function AdminDashboard() {
  const noteCount = await prisma.note.count();
  
  return (
    <div>
      <h1 className="mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 border rounded bg-gray-50/50">
          <h2 className="text-sm font-sans text-muted m-0 mb-2 uppercase tracking-wider">Notes</h2>
          <p className="text-3xl font-sans font-semibold m-0">{noteCount}</p>
        </div>
      </div>
    </div>
  );
}
