# Daily Expense Tracker Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Build a web-based daily expense tracker that lets the user quickly record expenses and see today/month totals in a cute anime-inspired UI.

**Architecture:** Use Next.js App Router for the web app, Tailwind CSS for styling, and SQLite for persistence. Keep the MVP single-user, local-first, and simple: add expense, view totals, browse recent records.

**Tech Stack:** Next.js 14+, TypeScript, Tailwind CSS, Prisma ORM, SQLite, Vitest, React Testing Library, Playwright.

---

## Product Scope

### MVP user stories
1. As a user, I can add one expense with amount, category, note, and date.
2. As a user, I can see how much I spent today.
3. As a user, I can see how much I spent this month.
4. As a user, I can browse my recent expense records.
5. As a user, I can delete a mistaken expense.

### Out of scope for MVP
- Login / multi-user
- Income tracking
- Budget alerts
- Charts beyond one small category summary
- Cloud sync
- Export/import

---

## UI direction: anime-inspired but practical

### Visual theme
- Soft pastel palette: blush pink, sky blue, lavender, cream.
- Card-based layout with rounded corners.
- Light gradients and subtle sparkles/stars as decorative accents.
- Friendly typography and expressive empty states.
- Mascot/avatar accent optional in header illustration area.

### Design rules
- Keep data readable first; decoration second.
- Avoid cluttered otaku-style overdecoration.
- Dashboard should feel cozy and cute, not childish.
- Use category chips with color coding.

### Suggested component styling
- Main shell: centered max-width container with gradient background.
- Summary cards: glassmorphism-lite, soft shadow, rounded-2xl.
- Form: large inputs, segmented category pills, obvious primary CTA.
- Expense list rows: date, category badge, note, amount aligned right.

---

## Data model

### Expense
- id: string (cuid)
- amount: decimal stored as integer cents
- category: enum-like string
- note: string nullable
- spentAt: datetime
- createdAt: datetime
- updatedAt: datetime

### Initial categories
- food
- transport
- shopping
- entertainment
- bills
- other

---

## Routes / pages

### `/`
Dashboard page with:
- today total
- month total
- recent expenses (last 10)
- category summary for current month
- quick button to add expense

### `/expenses/new`
Expense creation page with form fields:
- amount
- category
- note
- spent date

### `/expenses`
Full expense list page with:
- records ordered by spentAt desc
- simple filters: today / this month / all
- delete action per row

---

## API / server actions

### Create expense
Input:
- amount string from form
- category string
- note optional
- spentAt date string

Validation:
- amount required and > 0
- category must be known value
- spentAt required and valid date
- note trimmed to max 120 chars

### Delete expense
Input:
- expense id

Validation:
- id must exist

---

## File plan

### App setup
- Create: `app/page.tsx`
- Create: `app/expenses/page.tsx`
- Create: `app/expenses/new/page.tsx`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `components/dashboard/summary-card.tsx`
- Create: `components/expenses/expense-form.tsx`
- Create: `components/expenses/expense-list.tsx`
- Create: `components/ui/category-badge.tsx`
- Create: `lib/db.ts`
- Create: `lib/expense-service.ts`
- Create: `lib/validators/expense.ts`
- Create: `prisma/schema.prisma`
- Create: `prisma/seed.ts`
- Create: `tests/unit/expense-service.test.ts`
- Create: `tests/unit/expense-validator.test.ts`
- Create: `tests/components/expense-form.test.tsx`
- Create: `tests/e2e/add-expense.spec.ts`

---

## Bite-sized execution plan

### Task 1: Bootstrap the Next.js app
**Objective:** Create the base app with TypeScript and Tailwind in the repo.

**Files:**
- Create framework files in repository root

**Step 1: Write failing smoke test**
Create `tests/unit/smoke.test.ts`:
```ts
import { describe, it, expect } from 'vitest'

describe('project bootstrap', () => {
  it('has test runner working', () => {
    expect(true).toBe(true)
  })
})
```

**Step 2: Run test to verify red/initial missing setup**
Run: `npm test`
Expected: FAIL because project not initialized.

**Step 3: Initialize project**
Create Next.js + Tailwind + TypeScript app in current repo.

**Step 4: Run test to verify green**
Run: `npm test`
Expected: PASS for smoke test.

**Step 5: Commit**
`git commit -m "chore: bootstrap next app"`

---

### Task 2: Add Prisma and SQLite schema
**Objective:** Persist expense data locally.

**Files:**
- Create: `prisma/schema.prisma`
- Create: `lib/db.ts`
- Test: `tests/unit/expense-service.test.ts`

**Step 1: Write failing test**
Add a test that expects an expense record can be created and queried.

**Step 2: Verify failure**
Run: `npm test -- expense-service`
Expected: FAIL due to missing DB layer.

**Step 3: Implement minimal schema**
Create `Expense` model with cents-based amount storage and required fields.

**Step 4: Verify pass**
Run tests again; expected PASS.

**Step 5: Commit**
`git commit -m "feat: add expense data model"`

---

### Task 3: Add expense validation
**Objective:** Reject invalid form input before saving.

**Files:**
- Create: `lib/validators/expense.ts`
- Test: `tests/unit/expense-validator.test.ts`

**Step 1: Write failing tests**
Cover:
- valid payload
- zero amount rejected
- invalid category rejected
- bad date rejected
- overlong note rejected

**Step 2: Verify red**
Run: `npm test -- expense-validator`
Expected: FAIL.

**Step 3: Implement minimal validator**
Return normalized values including integer cents and trimmed note.

**Step 4: Verify green**
Run tests again; expected PASS.

**Step 5: Commit**
`git commit -m "feat: validate expense input"`

---

### Task 4: Implement expense service
**Objective:** Add CRUD-like operations needed for MVP.

**Files:**
- Create: `lib/expense-service.ts`
- Modify: `lib/db.ts`
- Test: `tests/unit/expense-service.test.ts`

**Step 1: Write failing tests**
Cover:
- create expense
- list recent expenses
- compute today total
- compute month total
- delete expense

**Step 2: Verify red**
Run: `npm test -- expense-service`
Expected: FAIL.

**Step 3: Implement minimal service**
Expose functions:
- `createExpense`
- `deleteExpense`
- `getRecentExpenses`
- `getTodayTotal`
- `getMonthTotal`
- `getMonthCategorySummary`

**Step 4: Verify green**
Run targeted tests then full unit suite.

**Step 5: Commit**
`git commit -m "feat: implement expense service"`

---

### Task 5: Build anime-style dashboard
**Objective:** Show totals and recent expenses on the home page.

**Files:**
- Create: `app/page.tsx`
- Create: `components/dashboard/summary-card.tsx`
- Create: `components/expenses/expense-list.tsx`
- Create: `components/ui/category-badge.tsx`
- Modify: `app/globals.css`
- Test: `tests/components/dashboard.test.tsx`

**Step 1: Write failing component tests**
Assert dashboard renders:
- today total card
- month total card
- recent expense list header

**Step 2: Verify red**
Run: `npm test -- dashboard`
Expected: FAIL.

**Step 3: Implement minimal UI**
Use soft pastel anime-inspired styling and readable layout.

**Step 4: Verify green**
Run component tests.

**Step 5: Commit**
`git commit -m "feat: add dashboard ui"`

---

### Task 6: Build add-expense page
**Objective:** Let the user record a new expense quickly.

**Files:**
- Create: `app/expenses/new/page.tsx`
- Create: `components/expenses/expense-form.tsx`
- Test: `tests/components/expense-form.test.tsx`
- Test: `tests/e2e/add-expense.spec.ts`

**Step 1: Write failing tests**
Cover:
- submit button disabled or guarded for bad input
- successful submission redirects or resets
- amount/category/date fields exist

**Step 2: Verify red**
Run unit/component test and one e2e spec.
Expected: FAIL.

**Step 3: Implement minimal form**
Use server action or route handler to save validated expense.

**Step 4: Verify green**
Run component + e2e tests.

**Step 5: Commit**
`git commit -m "feat: add expense entry form"`

---

### Task 7: Build expense history page with delete
**Objective:** Let the user browse and remove records.

**Files:**
- Create: `app/expenses/page.tsx`
- Modify: `components/expenses/expense-list.tsx`
- Test: `tests/components/expense-list.test.tsx`
- Test: `tests/e2e/delete-expense.spec.ts`

**Step 1: Write failing tests**
Cover:
- list displays rows
- filter switches visible set
- delete removes row

**Step 2: Verify red**
Run related tests; expected FAIL.

**Step 3: Implement page and delete flow**
Add today/month/all filter and delete button.

**Step 4: Verify green**
Run component and e2e tests.

**Step 5: Commit**
`git commit -m "feat: add expense history page"`

---

### Task 8: Polish anime UI and empty states
**Objective:** Make the MVP feel intentionally designed.

**Files:**
- Modify: `app/globals.css`
- Modify: relevant components
- Test visually with browser tools

**Step 1: Add visual polish checklist**
- pastel gradient background
- cute icon accents
- consistent spacing
- mobile-friendly layout
- pleasant empty states

**Step 2: Implement minimal polish**
No behavior changes.

**Step 3: Verify manually**
Run local app and inspect key pages at mobile and desktop widths.

**Step 4: Commit**
`git commit -m "style: polish anime-inspired ui"`

---

## Verification checklist
- User can add an expense from browser
- Today total updates correctly
- Month total updates correctly
- Expense list shows recent items
- Delete works
- UI looks cute/cozy on mobile and desktop
- Tests pass cleanly

## Suggested commands
```bash
npm install
npm test
npx prisma migrate dev --name init
npm run dev
```

## Nice-to-have after MVP
- income support
- monthly budget progress bar
- category icons/avatars
- calendar view
- export CSV
- dark mode anime theme
