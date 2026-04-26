import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { StatCard } from "@/components/stat-card";
import { currencyFromCents } from "@/lib/expense-utils";
import { getDashboardData } from "@/lib/expenses";

export default async function Home() {
  const data = await getDashboardData();

  return (
    <AppShell
      title="今天花了多少 ✨"
      description="一个带点动漫梦幻感的小账本。你可以很快记下一笔花销，也能一眼看到今天和这个月的钱都去了哪里。"
    >
      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.9fr]">
        <section className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              label="今天支出"
              value={currencyFromCents(data.todayTotalCents)}
              hint={`今天记了 ${data.todayCount} 笔`}
            />
            <StatCard
              label="本月支出"
              value={currencyFromCents(data.monthTotalCents)}
              hint="从本月 1 号到现在"
            />
            <section className="rounded-[28px] border border-white/70 bg-gradient-to-br from-fuchsia-500 via-pink-500 to-sky-400 p-5 text-white shadow-[0_24px_80px_-35px_rgba(192,38,211,0.55)] sm:col-span-2 xl:col-span-1">
              <div className="text-sm font-medium text-white/80">快速入口</div>
              <div className="mt-3 text-2xl font-black">把今天每一笔都抓住</div>
              <p className="mt-2 text-sm leading-6 text-white/85">不靠意志力，只靠顺手记。你越温柔地看账本，钱越不会偷偷溜走。</p>
              <Link
                href="/expenses/new"
                className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-fuchsia-700 transition hover:-translate-y-0.5"
              >
                去记一笔
              </Link>
            </section>
          </div>

          <section className="rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_-45px_rgba(56,189,248,0.45)] backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">最近账单</h2>
                <p className="mt-1 text-sm text-slate-500">先看最近花了什么，通常最容易找到钱悄悄流走的地方。</p>
              </div>
              <Link href="/expenses" className="text-sm font-semibold text-fuchsia-700 hover:text-fuchsia-500">
                看全部 →
              </Link>
            </div>

            <div className="mt-5 space-y-3">
              {data.recentExpenses.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-fuchsia-200 bg-fuchsia-50/60 px-5 py-8 text-center text-slate-500">
                  还没有记账记录，先去记第一笔吧。
                </div>
              ) : (
                data.recentExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between rounded-3xl border border-slate-100 bg-slate-50/80 px-4 py-4"
                  >
                    <div>
                      <div className="text-base font-bold text-slate-800">{expense.category}</div>
                      <div className="mt-1 text-sm text-slate-500">{expense.note || "没有备注，但这笔钱也值得被看见。"}</div>
                      <div className="mt-1 text-xs text-slate-400">{expense.dateLabel}</div>
                    </div>
                    <div className="text-lg font-black text-fuchsia-700">{expense.amountLabel}</div>
                  </div>
                ))
              )}
            </div>
          </section>
        </section>

        <section className="space-y-5">
          <section className="rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_-45px_rgba(99,102,241,0.45)] backdrop-blur-xl">
            <h2 className="text-xl font-black text-slate-900">本月花销焦点</h2>
            <p className="mt-1 text-sm text-slate-500">哪个分类最容易把你的钱悄悄带走，这里会先告诉你。</p>
            <div className="mt-5 space-y-3">
              {data.categoryHighlights.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-sky-200 bg-sky-50/60 px-5 py-8 text-center text-slate-500">
                  这个月还没有可分析的分类花销。
                </div>
              ) : (
                data.categoryHighlights.map((item, index) => (
                  <div key={item.category} className="rounded-3xl bg-gradient-to-r from-sky-50 via-white to-fuchsia-50 px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-[0.24em] text-sky-500">Top {index + 1}</div>
                        <div className="mt-1 text-base font-bold text-slate-800">{item.category}</div>
                      </div>
                      <div className="text-lg font-black text-sky-700">{item.totalLabel}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-[30px] border border-dashed border-fuchsia-200 bg-white/60 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-black text-slate-900">使用建议</h2>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
              <li>• 金额尽量当天记，越接近真实花费越准。</li>
              <li>• 备注简单写下场景，月底会更容易复盘。</li>
              <li>• 如果想控制消费，先盯住本月 Top 分类。</li>
            </ul>
          </section>
        </section>
      </div>
    </AppShell>
  );
}
