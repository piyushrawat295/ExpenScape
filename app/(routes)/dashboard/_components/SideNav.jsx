'use client';

import Image from 'next/image';
import React, { useEffect } from 'react';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

function SideNav() {
  const menuList = [
    { id: 1, name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { id: 2, name: 'Budgets', icon: PiggyBank, path: '/dashboard/budgets' },
    { id: 3, name: 'Expenses', icon: ReceiptText, path: '/dashboard/expensesScreen' },
    { id: 4, name: 'Upgrade', icon: ShieldCheck, path: '/dashboard/upgrade' },
  ];

  const path = usePathname();

  useEffect(() => {
    console.log(path); // Log the current path for debugging
  }, [path]);

  return (
    <div className="h-screen p-2 border shadow-sm">
      <Link href="/" passHref>
        <div className="cursor-pointer">
          <Image src="/logo.svg" alt="logo" height={90} width={90} />
        </div>
      </Link>

      <div>
        {menuList.map((menu) => {
          const Icon = menu.icon; // Get the icon component
          return (
            <Link
              key={menu.id}
              href={menu.path}
              className={`gap-2 mb-2 flex font-medium items-center text-gray-600 p-5 cursor-pointer rounded-md hover:text-primary hover:bg-blue-200 ${
                path === menu.path ? 'text-primary bg-blue-100' : ''
              }`}
            >
              <Icon /> {/* Render the icon */}
              {menu.name}
            </Link>
          );
        })}
      </div>

      <div className="fixed bottom-10 p-5 flex gap-2 font-medium items-center text-gray-600">
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default SideNav;
