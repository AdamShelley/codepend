"use client";

import { useOthers, useSelf } from "@/liveblocks.config";
import { UserAvatar } from "./avatar";

const MAX_SHOWN_USERS = 2;

export const Editor = () => {
  const info = useSelf((me) => me.info);
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOWN_USERS;

  return (
    <div className="h-full w-full ">
      <p>Editor</p>
      <div className="flex gap-x-2">
        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
          <UserAvatar
            key={connectionId}
            src={info?.picture}
            name={info?.name}
            fallback={info?.name?.[0] || "T"}
          />
        ))}
        {currentUser && (
          <UserAvatar
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0] || "T"}
          />
        )}
      </div>
    </div>
  );
};
