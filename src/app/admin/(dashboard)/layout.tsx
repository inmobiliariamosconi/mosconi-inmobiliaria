import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SupabaseNotConfigured } from "@/components/admin/SupabaseNotConfigured";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/static";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  if (!isSupabaseConfigured()) return <SupabaseNotConfigured />;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // middleware.ts already enforces this; this is a second, independent check
  // in case the layout is ever reached without going through middleware.
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 sm:flex-row">
      <AdminSidebar userEmail={user.email ?? ""} />
      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
