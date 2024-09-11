import Link from "next/link"; // Use Next.js Link
import React from "react";

function BudgetItem({ budget }) {
  const totalSpend = budget?.totalSpend || 0;
  const remainingAmount = budget?.amount - totalSpend;
  const progressPercentage = (totalSpend / budget?.amount) * 100 || 0;

  return (
    <Link href={`/dashboard/expensesScreen/${budget?.id}`}>
      <div className="p-5 gap-2 border rounded-lg hover:shadow-md cursor-pointer h-[170px]">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
              {budget?.icon}
            </h2>
            <div>
              <h2 className="font-bold">{budget?.name}</h2>
              <h2 className="text-sm text-gray-500">
                {budget?.totalItem} Item
              </h2>
            </div>
          </div>
          <h2 className="font-bold text-primary text-lg">₹{budget?.amount}</h2>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400">₹{totalSpend} Spend</h2>
            <h2 className="text-xs text-slate-400">
              ₹{remainingAmount} Remaining
            </h2>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full">
            <div
              className="bg-primary h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
