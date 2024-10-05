"72244305879078692190929763200798";

import { ApiSdk } from "@bandada/api-sdk";

export const useGroupsUser = () => {
  const fetchGroupMembers = async (groupId: string) => {
    const apiSdk = new ApiSdk();
    const group = await apiSdk.getGroup(groupId);
    return group.members;
  };

  return { fetchGroupMembers };
};
