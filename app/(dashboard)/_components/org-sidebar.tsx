"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { ModeToggle } from "@/components/theme-toggle";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const completed = searchParams.get("completed");

  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image
            src="logo.svg"
            alt="Logo"
            height={60}
            width={60}
            className="bg-white rounded-lg p-1"
          />
          <span className={cn("font-semibold text-2xl", font.className)}>
            Codepend
          </span>
        </div>
      </Link>

      <div className="space-y-1 w-full">
        <Button
          variant={completed ? "ghost" : "secondary"}
          asChild
          size="lg"
          className="font-normal justify-start px-2"
        >
          <Link href="/">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Unfinished Gens
          </Link>
        </Button>
      </div>
      <div className="space-y-1 w-full">
        <Button
          variant={completed ? "secondary" : "ghost"}
          asChild
          size="lg"
          className="font-normal justify-start px-2"
        >
          <Link href={{ pathname: "/", query: { completed: true } }}>
            <Star className="h-4 w-4 mr-2" />
            Completed Gens
          </Link>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};
