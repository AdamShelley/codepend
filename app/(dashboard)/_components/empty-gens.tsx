"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

export const EmptyGens = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.gen.create);

  const onClick = () => {
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Gen Created");
        // Redirect to id
      })
      .catch(() => toast.error("Failed to create gen"));
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/note.svg" height={110} width={110} alt="empty" />
      <h2 className="text-2xl font-semibold mt-6">Go to your first Gen</h2>
      <p className="text-muted-foreground text-sm mt-2">Start Improving now!</p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size="lg">
          Go to Gen
        </Button>
      </div>
    </div>
  );
};
