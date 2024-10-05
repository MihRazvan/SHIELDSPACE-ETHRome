import { useEffect } from "react";
import { useGroupsStore } from "../stores/groupsStore";
import { Button } from "./ui/Button";

export const Groups = () => {
  const myGroups = useGroupsStore(state => state.myGroups);
  const fetchMyGroups = useGroupsStore(state => state.fetchMyGroups);
  const createGroup = useGroupsStore(state => state.createGroup);
  const sendInvites = useGroupsStore(state => state.sendInvites);

  useEffect(() => {
    if (myGroups.length === 0) {
      fetchMyGroups();
    }
  }, [fetchMyGroups, myGroups]);

  const handleCreateGroup = async () => {
    try {
      const newGroup = await createGroup();
      console.log("New group created", newGroup);

      await sendInvites(newGroup.id);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(myGroups);

  return (
    <>
      <div>
        <Button onClick={handleCreateGroup}>Create Group</Button>
        {myGroups.map(group => (
          <div className="flex gap-2" key={group.id}>
            <div>{group.name}</div>
            <div>{group.description}</div>
            <div>{group.members.length} members</div>
          </div>
        ))}
      </div>
    </>
  );
};
