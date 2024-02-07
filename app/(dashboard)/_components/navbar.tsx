"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex items-center  gap-x-y p-5 ">
      <Link href="/" className="flex-1">
        <div className="flex items-center gap-x-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            height={60}
            width={60}
            className="bg-white rounded-lg p-1"
          />
          <span className={cn("font-semibold text-2xl mr-2")}>Codepend</span>
        </div>
      </Link>
      <UserButton />
    </div>
  );
};
