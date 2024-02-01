"use client";

import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <div className="flex items-center gap-x-y p-5 ">
      <div className="hidden lg:flex-1 lg:flex">{/* Add Search */}</div>

      <UserButton />
    </div>
  );
};
