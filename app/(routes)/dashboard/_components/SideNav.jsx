"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {
  const menuList = [
    { id: 1, name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
    { id: 2, name: "Budgets", icon: PiggyBank, path: "/dashboard/budgets" },
    { id: 3, name: "Expense", icon: ReceiptText, path: "/dashboard/expense" },
    { id: 4, name: "Upgrade", icon: ShieldCheck, path: "/dashboard/upgrade" },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path); // Log the current path for debugging
  }, [path]);

  return (
    <div className="h-screen p-2 border shadow-sm">
      <Image src="/logo.svg" alt="logo" height={90} width={90} />

      <div>
        {menuList.map((menu) => (
          <Link href={menu.path}>
            <h2
              key={menu.id} // Use unique key
              className={`gap-2 mb-2 flex font-medium items-center text-gray-600 p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-200 ${
                path === menu.path ? "text-primary bg-blue-100" : ""
              }`}
            >
              <menu.icon /> {/* Render the icon */}
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>

      <div className="fixed bottom-10 p-5 flex gap-2 font-medium items-center text-gray-600">
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default SideNav;
