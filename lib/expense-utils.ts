export const EXPENSE_CATEGORIES = [
  "餐饮",
  "奶茶",
  "交通",
  "购物",
  "娱乐",
  "住房",
  "学习",
  "医疗",
  "社交",
  "其他",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export function currencyFromCents(cents: number) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 2,
  }).format(cents / 100);
}

export function parseAmountToCents(input: string) {
  const normalized = input.trim();
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    throw new Error("请输入正确的金额，最多保留两位小数");
  }

  const [yuan, decimal = ""] = normalized.split(".");
  const padded = (decimal + "00").slice(0, 2);
  return Number(yuan) * 100 + Number(padded);
}

export function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function startOfNextDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
}

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function formatDateLabel(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).format(date);
}

export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
