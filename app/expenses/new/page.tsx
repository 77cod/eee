import { AppShell } from "@/components/app-shell";
import { ExpenseForm } from "@/components/expense-form";

export default function NewExpensePage() {
  return (
    <AppShell
      title="记一笔花销 🌙"
      description="像写日记一样，把今天的花费轻轻放进账本里。未来的你会感谢现在认真记录的自己。"
    >
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <ExpenseForm />
        <section className="rounded-[30px] border border-white/70 bg-white/70 p-6 shadow-[0_24px_80px_-45px_rgba(125,211,252,0.5)] backdrop-blur-xl">
          <h2 className="text-xl font-black text-slate-900">记录小贴士</h2>
          <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
            <p>• 金额写实际支付金额，比如 18.60。</p>
            <p>• 分类不用太纠结，先记下来最重要。</p>
            <p>• 备注建议写场景：奶茶、通勤、宵夜、礼物……月底回头看会更有感觉。</p>
          </div>
          <div className="mt-6 rounded-[24px] bg-gradient-to-br from-fuchsia-100 via-pink-50 to-sky-100 p-4 text-sm text-slate-700">
            <div className="font-bold text-fuchsia-700">今日动漫感提醒</div>
            <div className="mt-2">记账不是惩罚自己，而是在给生活做字幕。</div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
