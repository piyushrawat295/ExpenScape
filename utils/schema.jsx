import { integer, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Budgets = pgTable('budgets', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: varchar('amount').notNull(),  // Changed to numeric
    icon: varchar('icon'),
    createdBy: varchar('createdBy').notNull(),
});  // Added missing closing parenthesis

export const Expenses = pgTable('expenses', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: numeric('amount').notNull(),
    createdAt: varchar('createdAt').notNull(),
    budgetId: integer('budgetId').references(() => Budgets.id),  // Fixed reference
});
