"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Typewriter from "./Typewriter";
import CardInfo from "./_components/CardInfo";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import BarChartDashboard from "./_components/BarChartDashboard";
import BudgetsList from "./budgets/_components/BudgetsList";
import BudgetItem from "./budgets/_components/BudgetItem";
import ExpenseList from "./expensesScreen/_components/ExpenseList";
// Adjust the path based on your project structure

function DashBoard() {
  const [budgetsList, setBudgetsList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getBudgetList();
  }, [user]);
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
    getAllExpenses();
  };

  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Expenses)
      .leftJoin(Budgets, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));
  
    setExpensesList(result);
  };
  
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold">Hola Amigo!!👋 {user?.fullName}</h2>
      <Typewriter
        text="ExpenScape is your ultimate financial companion, designed to help you take control of your money effortlessly."
        speed={90}
      />

      <CardInfo budgetList={budgetsList} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-6 gap-5">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetsList} />
          <h2 className="font-bold text-lg">Latest Expenses</h2>
          <ExpenseList
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          />
        </div>
        <div className="grid gap-4">
          <h2 className="font-bold text-2xl">Latest Budget</h2>
          {budgetsList && budgetsList.length > 0 ? (
            budgetsList.map((budget, index) => (
              <BudgetItem budget={budget} key={index} />
            ))
          ) : (
            <p>No budgets available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
