"use client";

import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { db } from "@/utils/dbConfig";
import { eq, sql, getTableColumns, desc } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";

function BudgetsList() {
  const [budgetsList, setBudgetsList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getBudgetList();
  }, [user]);

  // Fetch budget list from the database and calculate total spend and total items per budget.

  const getBudgetList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Budgets.id))
      .groupBy(Budgets.id);

    setBudgetsList(result);
  };
  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget refreshData={getBudgetList} />
        {budgetsList?.length > 0
          ? budgetsList.map((budget, index) => (
              <BudgetItem key={budget.id || index} budget={budget} />
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default BudgetsList;
