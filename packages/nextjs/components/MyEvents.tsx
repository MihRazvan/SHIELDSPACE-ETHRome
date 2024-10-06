import { useEffect } from "react";
import { useGroupsStore } from "../stores/groupsStore";

export const MyEvents = () => {
  const myGroups = useGroupsStore(state => state.myGroups);
  const fetchMyGroups = useGroupsStore(state => state.fetchMyGroups);

  useEffect(() => {
    if (myGroups.length === 0) {
      fetchMyGroups();
    }
  }, [fetchMyGroups, myGroups]);

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div className="p-5 min-w-full sm:min-w-[400px] text-xl">
        <h1 className="text-3xl">My Events</h1>
        {myGroups.map(group => (
          <div className="flex gap-2 justify-between" key={group.id}>
            <div>{group.name}</div>
            <div>{group.members.length} members</div>
          </div>
        ))}
      </div>
    </div>
  );
};
