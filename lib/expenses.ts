import { prisma } from "@/lib/prisma";
import {
  EXPENSE_CATEGORIES,
  currencyFromCents,
  formatDateLabel,
  formatDateTime,
  startOfDay,
  startOfMonth,
  startOfNextDay,
} from "@/lib/expense-utils";

export type ExpenseFormState = {
  error?: string;
  success?: boolean;
};

export async function getDashboardData() {
  const now = new Date();
  const todayStart = startOfDay(now);
  const tomorrowStart = startOfNextDay(now);
  const monthStart = startOfMonth(now);

  const [todayExpenses, monthExpenses, recentExpenses] = await Promise.all([
    prisma.expense.findMany({
      where: {
        spentAt: {
          gte: todayStart,
          lt: tomorrowStart,
        },
      },
      orderBy: { spentAt: "desc" },
    }),
    prisma.expense.findMany({
      where: {
        spentAt: {
          gte: monthStart,
          lt: tomorrowStart,
        },
      },
    }),
    prisma.expense.findMany({
      orderBy: [{ spentAt: "desc" }, { createdAt: "desc" }],
      take: 8,
    }),
  ]);

  const todayTotalCents = todayExpenses.reduce((sum, item) => sum + item.amountCents, 0);
  const monthTotalCents = monthExpenses.reduce((sum, item) => sum + item.amountCents, 0);

  return {
    todayTotalCents,
    monthTotalCents,
    todayCount: todayExpenses.length,
    recentExpenses: recentExpenses.map((item) => ({
      id: item.id,
      category: item.category,
      note: item.note,
      amountLabel: currencyFromCents(item.amountCents),
      dateLabel: formatDateTime(item.spentAt),
    })),
    categoryHighlights: EXPENSE_CATEGORIES.map((category) => {
      const total = monthExpenses
        .filter((item) => item.category === category)
        .reduce((sum, item) => sum + item.amountCents, 0);

      return {
        category,
        totalCents: total,
        totalLabel: currencyFromCents(total),
      };
    })
      .filter((item) => item.totalCents > 0)
      .sort((a, b) => b.totalCents - a.totalCents)
      .slice(0, 4),
  };
}

export async function getAllExpenses() {
  const expenses = await prisma.expense.findMany({
    orderBy: [{ spentAt: "desc" }, { createdAt: "desc" }],
  });

  return expenses.map((item) => ({
    id: item.id,
    category: item.category,
    note: item.note,
    amountLabel: currencyFromCents(item.amountCents),
    spentDateLabel: formatDateLabel(item.spentAt),
    spentDateTimeLabel: formatDateTime(item.spentAt),
  }));
}
