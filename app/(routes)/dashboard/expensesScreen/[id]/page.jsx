"use client";

import { db } from "@/utils/dbConfig";
import { eq, getTableColumns, sql } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Budgets, Expenses } from "@/utils/schema";
import { useParams } from "next/navigation"; // for dynamic route
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpense from "../_components/AddExpense";

function ExpensesScreen() {
  const { user, isLoaded } = useUser();
  const { id } = useParams(); // Access route parameter
  const [budgetData, setBudgetData] = useState(null);

  useEffect(() => {
    if (isLoaded && user) {
      getBudgetInfo();
    }
  }, [isLoaded, user]);

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user.primaryEmailAddress?.emailAddress)) // Ensure user data is available
      .where(eq(Budgets.id, id)) // Use id from URL params
      .groupBy(Budgets.id);

    setBudgetData(result[0]);
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">My Expenses</h2>
      <div className="mt-6 gap-5 grid grid-cols-1 md:grid-cols-2">
        {budgetData ? (
          <BudgetItem budget={budgetData} />
        ) : (
          <div className="height-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpense budgetId={id} user={user} refreshData={getBudgetInfo} />
      </div>
    </div>
  );
}

export default ExpensesScreen;
