import { toast } from "@/hooks/use-toast";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";

function ExpenseList({expensesList,refreshData}) {

    const deleteExpense=async(expenses)=>{
        const result = await db.delete(Expenses)
        .where(eq(Expenses.id, expenses.id))
        .returning();

        if (result) {
            refreshData();
            toast({
              title: "Expense Deleted",
              description: "Your expense has been deleated.",
              variant: "destructive",
            });
          }
    }
  return (
    <div>
      <div className="grid grid-cols-4 bg-slate-200 p-2">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expensesList?.length > 0 ? (
        expensesList.map((expenses, index) => (
          <div key={index} className="grid grid-cols-4 bg-slate-50 p-2 gap-2">
            <h2>{expenses.name}</h2>
            <h2>{expenses.amount}</h2>
            <h2>{expenses.createdAt}</h2>
            <h2>
              <Trash className=" cursor-pointer text-red-300" onClick={()=>deleteExpense(expenses)}/>          
            </h2>
          </div>
        ))
      ) : (
        <p>No expenses available.</p>
      )}
    </div>
  );
}

export default ExpenseList;
