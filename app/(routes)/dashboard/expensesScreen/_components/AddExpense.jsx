import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import React, { useState } from "react";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const addNewExpense = async () => {
    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: name,
          amount: parseFloat(amount),
          budgetId: budgetId,
          createdAt: new Date().toISOString(), // Add current timestamp for createdAt
          createdBy: user.primaryEmailAddress?.emailAddress, // Assuming this is the user identifier
        })
        .returning({ insertedId: Expenses.id });

      if (result) {
        refreshData(); // Refresh the data after adding expense
        toast({
          title: "Expense Added",
          description: "Your new expense has been successfully created.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="p-5 border rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="p-2 text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Expenditure..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="p-2 text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. ₹1000"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!(name && amount)}
        className="mt-3 w-full"
        onClick={addNewExpense} // Fixed placement of onClick
      >
        Add New Expense
      </Button>
    </div>
  );
}

export default AddExpense;
