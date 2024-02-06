"use client";

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
interface GenCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isComplete: boolean;
}

export const GenCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isComplete,
}: GenCardProps) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <Link href={`/gens/${id}`}>
      <div className="group w-[250px] h-[250px] border rounded-sm flex flex-col justify-center overflow-hidden">
        <div className="relative flex-1 bg-gray-800">
          {/* <Image src={imageUrl} alt={title} fill className="object-fit" /> */}
          <Overlay />
        </div>
        <Footer
          isComplete={isComplete}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  );
};

GenCard.Skeleton = function GenCardSkeleton() {
  return (
    <div className="aspect-[1/1] rounded-lg overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  );
};
