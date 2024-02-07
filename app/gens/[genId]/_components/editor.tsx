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
    <div className="h-full w-full">
      <div className="w-full h-full flex flex-col items-center ">
        <div className="w-3/4 h-1/2 flex items-center justify-center">
          <div className="flex h-full  w-[150px] mr-2 p-2 bg-slate-600">
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
          <div className="w-full h-full bg-slate-500 "></div>
        </div>
        <div className="bg-slate-400 w-3/4 h-1/4 mt-4"></div>
      </div>
    </div>
  );
};
