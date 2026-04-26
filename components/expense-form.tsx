"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createExpense } from "@/app/actions/expenses";
import { EXPENSE_CATEGORIES } from "@/lib/expense-utils";
import type { ExpenseFormState } from "@/lib/expenses";

const initialState: ExpenseFormState = {};

function todayValue() {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

export function ExpenseForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(createExpense, initialState);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      router.push("/");
      router.refresh();
    }
  }, [router, state.success]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-[0_24px_80px_-45px_rgba(217,70,239,0.45)] backdrop-blur-xl"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold text-slate-700">
          金额（元）
          <input
            name="amount"
            type="text"
            inputMode="decimal"
            placeholder="比如 23.50"
            className="w-full rounded-2xl border border-fuchsia-100 bg-fuchsia-50/50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-fuchsia-300 focus:bg-white"
            required
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-700">
          分类
          <select
            name="category"
            defaultValue={EXPENSE_CATEGORIES[0]}
            className="w-full rounded-2xl border border-sky-100 bg-sky-50/60 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-sky-300 focus:bg-white"
          >
            {EXPENSE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-700 md:col-span-2">
          备注
          <input
            name="note"
            type="text"
            placeholder="比如：和朋友吃火锅、买耳机、下班打车"
            className="w-full rounded-2xl border border-violet-100 bg-violet-50/50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-violet-300 focus:bg-white"
          />
        </label>

        <label className="space-y-2 text-sm font-semibold text-slate-700 md:col-span-2">
          花销时间
          <input
            name="spentAt"
            type="datetime-local"
            defaultValue={todayValue()}
            className="w-full rounded-2xl border border-pink-100 bg-pink-50/50 px-4 py-3 text-base font-medium text-slate-900 outline-none transition focus:border-pink-300 focus:bg-white"
            required
          />
        </label>
      </div>

      {state.error ? (
        <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {state.error}
        </div>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">这笔账会同时出现在首页和账单簿里。</p>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-sky-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-fuchsia-300/50 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "正在记下来…" : "记下这笔花销"}
        </button>
      </div>
    </form>
  );
}
