export function SupabaseNotConfigured() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="max-w-md rounded-2xl border border-amber-500/30 bg-amber-500/5 p-8 text-center">
        <p className="text-xs font-semibold tracking-[0.16em] text-amber-500 uppercase">
          Configuración pendiente
        </p>
        <h1 className="mt-3 text-lg font-semibold text-white">Supabase todavía no está conectado</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Faltan las variables de entorno <code className="text-slate-300">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
          y <code className="text-slate-300">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> en{" "}
          <code className="text-slate-300">.env.local</code>. Una vez agregadas y con el servidor
          reiniciado, el panel de administración va a funcionar normalmente.
        </p>
      </div>
    </div>
  );
}
