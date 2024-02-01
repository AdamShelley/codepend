"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { EmptyCompleted } from "./empty-completed";
import { EmptyGens } from "./empty-gens";
import { EmptySearch } from "./empty-search";
import { GenCard } from "./gen-card";

interface GenListProps {
  orgId: string;
  query: {
    search?: string;
    completed?: string;
  };
}

export const GenList = ({ orgId, query }: GenListProps) => {
  const data = useQuery(api.gens.get, { orgId });

  if (data === undefined) {
    return <div> Loading ...</div>;
  }

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.completed) {
    return <EmptyCompleted />;
  }

  if (!data?.length) {
    return <EmptyGens />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query.completed ? "Completed Gens" : "Gens"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        {data?.map((gen) => (
          <GenCard
            key={gen._id}
            id={gen._id}
            title={gen.title}
            imageUrl={gen.imageUrl}
            authorId={gen.authorId}
            authorName={gen.authorName}
            createdAt={gen._creationTime}
            orgId={orgId}
            isComplete={false}
          />
        ))}
      </div>
    </div>
  );
};
