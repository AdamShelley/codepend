"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Roboto } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const QuestionSidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const sidebarHandler = () => {
    setOpenSidebar(!openSidebar);
  };

  return (
    <>
      <div
        className={cn(
          "z-[999] h-full flex absolute top-0 left-0 w-[500px] bg-slate-900 rounded-md shadow-slate-100 transition ease-in-out duration-300 p-10",
          openSidebar ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col">
          <ChevronLeft
            className="absolute top-[40%] right-0 h-10 w-10 cursor-pointer"
            onClick={sidebarHandler}
          />
          <Link href="/">
            <Button className="flex" variant="ghost">
              <ChevronLeft className="h-10 w-10" />
              <h3 className={cn("text-lg", roboto.className)}>
                Back to all Gens
              </h3>
            </Button>
          </Link>
          <h3 className={cn("text-2xl", roboto.className)}>Question</h3>
          <p className={cn("mt-5 text-sm", roboto.className)}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum rem,
            odio architecto quibusdam hic nemo ratione, omnis ullam iusto fugiat
            quam vero culpa debitis. Dolorum nostrum nesciunt officia saepe
            aperiam, harum velit at quisquam animi, nihil eum? Labore at, id
            recusandae eligendi quaerat quas doloremque quo repellendus autem,
            sint molestias?
          </p>
          <h3 className={cn("text-2xl mt-5", roboto.className)}>
            Starting Point
          </h3>
          <p className={cn("mt-5 text-sm", roboto.className)}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum rem,
            odio architecto quibusdam hic nemo ratione, omnis ullam iusto fugiat
            quam vero culpa debitis. Dolorum nostrum nesciunt officia saepe
            aperiam, harum velit at quisquam animi, nihil eum? Labore at, id
            recusandae eligendi quaerat quas doloremque quo repellendus autem,
            sint molestias?
          </p>
          <h3 className={cn("text-2xl mt-5", roboto.className)}>Tips</h3>
          <p className={cn("mt-5 text-sm", roboto.className)}>Tip area</p>
        </div>
      </div>
      <ChevronRight
        className="absolute top-[40%] left-5 h-10 w-10  cursor-pointer"
        onClick={sidebarHandler}
      />
    </>
  );
};
