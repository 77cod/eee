import { describe, expect, it } from "vitest";
import { currencyFromCents, parseAmountToCents } from "@/lib/expense-utils";

describe("expense utils", () => {
  it("parses yuan strings into cents", () => {
    expect(parseAmountToCents("12")).toBe(1200);
    expect(parseAmountToCents("12.3")).toBe(1230);
    expect(parseAmountToCents("12.34")).toBe(1234);
  });

  it("throws on invalid amounts", () => {
    expect(() => parseAmountToCents("12.345")).toThrow();
    expect(() => parseAmountToCents("abc")).toThrow();
  });

  it("formats cents as cny", () => {
    expect(currencyFromCents(1234)).toContain("12.34");
  });
});
