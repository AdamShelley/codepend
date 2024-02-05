"use client";

import { useSelf } from "@/liveblocks.config";

export const Editor = () => {
  const info = useSelf((me) => me.info);

  return (
    <div>
      <p>Editor</p>
    </div>
  );
};
