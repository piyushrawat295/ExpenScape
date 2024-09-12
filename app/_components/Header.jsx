'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="sticky top-0 w-full p-1 flex justify-between items-center border-b shadow-md bg-white z-50">
      <Link href="/" passHref>
        <div className="cursor-pointer">
          <Image src="/logo.svg" alt="logo" height={90} width={90} className="max-w-full" />
        </div>
      </Link>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href="/sign-in">
          <Button>Sign In</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
