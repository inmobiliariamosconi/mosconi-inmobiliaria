import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";
import { SupabaseNotConfigured } from "@/components/admin/SupabaseNotConfigured";
import { isSupabaseConfigured } from "@/lib/supabase/static";

export const metadata: Metadata = {
  title: "Ingresar | Admin Mosconi",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  if (!isSupabaseConfigured()) return <SupabaseNotConfigured />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-xl">
        <p className="text-xs font-semibold tracking-[0.16em] text-pink-500 uppercase">
          Mosconi Inmobiliaria
        </p>
        <h1 className="mt-2 text-xl font-semibold text-white">Panel de administración</h1>
        <p className="mt-1 text-sm text-slate-400">Ingresá con tu cuenta de administrador.</p>

        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
