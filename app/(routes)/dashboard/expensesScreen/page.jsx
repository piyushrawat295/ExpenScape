"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { eq } from "drizzle-orm";
import { Expenses, Budgets } from "@/utils/schema";
import ExpenseList from "./_components/ExpenseList";


const ExpensesScreen = () => {
  const { user } = useUser();
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if (user) {
      fetchExpenses();
    }
  }, [user]);

  const fetchExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Expenses)
      .leftJoin(Budgets, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress))
      .orderBy(Expenses.createdAt, "desc");

    setExpensesList(result);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold">My Expenses</h2>
      <ExpenseList expensesList={expensesList} refreshData={fetchExpenses} />
    </div>
  );
};

export default ExpensesScreen;
