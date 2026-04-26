export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <section className="rounded-[28px] border border-white/70 bg-white/75 p-5 shadow-[0_24px_70px_-40px_rgba(56,189,248,0.55)] backdrop-blur-xl">
      <div className="text-sm font-medium text-slate-500">{label}</div>
      <div className="mt-3 text-3xl font-black tracking-tight text-slate-900">{value}</div>
      <div className="mt-2 text-sm text-slate-500">{hint}</div>
    </section>
  );
}
