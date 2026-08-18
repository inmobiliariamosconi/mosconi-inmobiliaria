"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/propiedades", label: "Propiedades", exact: false },
];

export function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col justify-between border-b border-slate-800 bg-slate-900/60 p-5 sm:h-screen sm:w-60 sm:border-r sm:border-b-0 sm:sticky sm:top-0">
      <div>
        <p className="text-xs font-semibold tracking-[0.16em] text-pink-500 uppercase">Mosconi</p>
        <p className="text-sm text-slate-400">Panel de administración</p>

        <nav className="mt-8 flex gap-1 sm:flex-col">
          {links.map((link) => {
            const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-pink-600/15 text-pink-400"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-8 border-t border-slate-800 pt-4 sm:mt-0">
        <p className="truncate text-xs text-slate-500">{userEmail}</p>
        <form action={signOut}>
          <button
            type="submit"
            className="mt-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  );
}
