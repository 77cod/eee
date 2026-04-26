"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { EXPENSE_CATEGORIES, parseAmountToCents } from "@/lib/expense-utils";
import type { ExpenseFormState } from "@/lib/expenses";

export async function createExpense(
  _prevState: ExpenseFormState,
  formData: FormData,
): Promise<ExpenseFormState> {
  const amount = String(formData.get("amount") ?? "");
  const category = String(formData.get("category") ?? "");
  const note = String(formData.get("note") ?? "").trim();
  const spentAt = String(formData.get("spentAt") ?? "");

  if (!amount || !category || !spentAt) {
    return { error: "金额、分类和日期都要填哦" };
  }

  if (!EXPENSE_CATEGORIES.includes(category as (typeof EXPENSE_CATEGORIES)[number])) {
    return { error: "这个分类暂时不支持" };
  }

  try {
    const amountCents = parseAmountToCents(amount);

    await prisma.expense.create({
      data: {
        amountCents,
        category,
        note: note || null,
        spentAt: new Date(spentAt),
      },
    });

    revalidatePath("/");
    revalidatePath("/expenses");
    revalidatePath("/expenses/new");

    return { success: true };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "保存失败了，等下再试试",
    };
  }
}

export async function deleteExpense(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.expense.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/expenses");
}
