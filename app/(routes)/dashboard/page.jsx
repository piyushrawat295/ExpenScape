"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Typewriter from "./Typewriter";
import CardInfo from "./_components/CardInfo";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
// Adjust the path based on your project structure

function DashBoard() {
  const [budgetsList, setBudgetsList] = useState([]);
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
  };
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold">Hola Amigo!!👋 {user?.fullName}</h2>
      <Typewriter
        text="ExpenScape is your ultimate financial companion, designed to help you take control of your money effortlessly."
        speed={90}
      />

      <CardInfo budgetList={budgetsList} />
    </div>
  );
}

export default DashBoard;
