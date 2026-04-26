import { AppShell } from "@/components/app-shell";
import { deleteExpense } from "@/app/actions/expenses";
import { getAllExpenses } from "@/lib/expenses";

export default async function ExpensesPage() {
  const expenses = await getAllExpenses();

  return (
    <AppShell
      title="账单簿 📖"
      description="这里会收好你所有的消费记录。看到每一笔，才更容易看见自己的生活节奏和花钱习惯。"
    >
      <section className="rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_-45px_rgba(192,132,252,0.45)] backdrop-blur-xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900">全部记录</h2>
            <p className="mt-1 text-sm text-slate-500">如果记错了，可以直接删掉，别让错误数据影响你复盘。</p>
          </div>
          <div className="text-sm font-semibold text-fuchsia-700">共 {expenses.length} 笔</div>
        </div>

        <div className="mt-5 space-y-3">
          {expenses.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-fuchsia-200 bg-fuchsia-50/60 px-5 py-8 text-center text-slate-500">
              还没有记录，先去新增第一笔花销吧。
            </div>
          ) : (
            expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-gradient-to-r from-white via-slate-50 to-fuchsia-50/60 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-bold text-fuchsia-700">{expense.category}</span>
                    <span className="text-xs text-slate-400">{expense.spentDateLabel}</span>
                  </div>
                  <div className="mt-2 text-base font-bold text-slate-800">{expense.note || "没有备注"}</div>
                  <div className="mt-1 text-sm text-slate-500">记录时间：{expense.spentDateTimeLabel}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-lg font-black text-sky-700">{expense.amountLabel}</div>
                  <form action={deleteExpense}>
                    <input type="hidden" name="id" value={expense.id} />
                    <button
                      type="submit"
                      className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
                    >
                      删除
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </AppShell>
  );
}
