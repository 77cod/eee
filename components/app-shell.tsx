import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "今日结界" },
  { href: "/expenses/new", label: "记一笔" },
  { href: "/expenses", label: "账单簿" },
];

export function AppShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(255,240,252,0.9)_35%,_rgba(224,236,255,0.95)_100%)] text-slate-800">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 rounded-[28px] border border-white/60 bg-white/65 p-5 shadow-[0_20px_80px_-35px_rgba(129,140,248,0.55)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-2 inline-flex rounded-full bg-gradient-to-r from-pink-200 via-fuchsia-100 to-sky-100 px-3 py-1 text-xs font-semibold tracking-[0.24em] text-fuchsia-700 uppercase">
                Anime Budget Diary
              </p>
              <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">{description}</p>
            </div>
            <div className="rounded-[24px] border border-fuchsia-100 bg-gradient-to-br from-white to-fuchsia-50/80 p-4 text-sm text-slate-600 shadow-inner">
              <div className="font-semibold text-fuchsia-700">今日理财咒语</div>
              <div className="mt-1">每记下一笔花销，都是在把钱的去向重新握回自己手里。</div>
            </div>
          </div>
          <nav className="mt-5 flex flex-wrap gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/80 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-fuchsia-200 hover:text-fuchsia-700 hover:shadow-md"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
