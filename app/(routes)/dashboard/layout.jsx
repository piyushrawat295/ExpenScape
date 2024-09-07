"use client";

import React, { useEffect } from "react";
import SideNav from "./_components/SideNav"; // Ensure this path is correct
import DashboardHeader from "./_components/DashboardHeader"; // Ensure this path is correct
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { db }from "@/utils/dbConfig";

function DashBoardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) checkUserBudgets();
  }, [user]);

  const checkUserBudgets = async () => {
    const result = await db
    .select()
    .from(Budgets)
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
    
    console.log(result);
    
    if (result?.length === 0) {
      router.replace('/dashboard/budgets');
    }
  };

  return (
    <>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav /> {/* Ensure SideNav is properly exported */}
      </div>
      <div className="md:ml-64">
        <DashboardHeader /> {/* Ensure DashboardHeader is properly exported */}
        {children}
      </div>
    </>
  );
}

export default DashBoardLayout;
