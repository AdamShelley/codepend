import { OrgSidebar } from "../org-sidebar";
import { List } from "./list";
import { NewButton } from "./new-button";

export const Sidebar = () => {
  return (
    <aside className="text-white fixed z-[1] left-0 bg-gray-900 h-full w-[300px] flex p-3 flex-col gap-y-4">
      <OrgSidebar />
    </aside>
  );
};
