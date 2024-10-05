import { ApiSdk, Group } from "@bandada/api-sdk";
import { create } from "zustand";

const apiSdk = new ApiSdk();

interface GroupState {
  bandadaSdk: ApiSdk;
  myGroups: Group[];
  adminId: string;
}

interface GroupActions {
  createGroup: () => Promise<Group>;
  fetchMyGroups: () => Promise<void>;
}

const initialState: GroupState = {
  bandadaSdk: apiSdk,
  myGroups: [],
  adminId: "0x7b0e5a2f27fe0c2b1428ba260f15a39bfd309aa9568461c6a8cfaf47daf1af02",
};

export const useGroupsStore = create<GroupState & GroupActions>((set, get) => ({
  ...initialState,

  createGroup: async () => {
    const groupCreateDetails = {
      name: "Group 1",
      description: "This is Group 1.",
      treeDepth: 16,
      fingerprintDuration: 3600,
    };
    const apiKey = process.env.NEXT_PUBLIC_BANDADA_API_KEY as string;

    console.log(apiKey);

    const group = await apiSdk.createGroup(groupCreateDetails, apiKey);
    console.log(group);
    set({ myGroups: [...get().myGroups, group] });
    return group;
  },
  fetchMyGroups: async () => {
    const groups = await apiSdk.getGroupsByAdminId(get().adminId);
    set({ myGroups: groups });
  },
}));
