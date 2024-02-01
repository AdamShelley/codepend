"use client";

import Image from "next/image";
import Link from "next/link";

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
  return (
    <Link href={`/gen/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt="Doodle" fill className="object-fit" />
        </div>
      </div>
    </Link>
  );
};
