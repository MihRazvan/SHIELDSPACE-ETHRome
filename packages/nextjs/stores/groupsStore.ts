import { useEmailsStore } from "./emailsStoreAdmin";
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
  sendInvites: (groupId: string) => Promise<void>;
  removeMembers: () => Promise<void>;
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
      name: "Group 2",
      description: "This is Group 2.",
      treeDepth: 16,
      fingerprintDuration: 3600,
    };
    const apiKey = process.env.NEXT_PUBLIC_BANDADA_API_KEY as string;

    const group = await apiSdk.createGroup(groupCreateDetails, apiKey);
    set({ myGroups: [...get().myGroups, group] });
    return group;
  },
  fetchMyGroups: async () => {
    const groups = await apiSdk.getGroupsByAdminId(get().adminId);
    set({ myGroups: groups });
  },
  sendInvites: async (groupId: string) => {
    const apiKey = process.env.NEXT_PUBLIC_BANDADA_API_KEY as string;
    const invite = await apiSdk.createInvite(groupId, apiKey); // TODO: create invites for every email
    console.log(invite);

    const sendEmails = useEmailsStore.getState().sendEmails;
    await sendEmails("This is your invite code: " + invite.code);
  },
  removeMembers: async () => {
    const apiKey = process.env.NEXT_PUBLIC_BANDADA_API_KEY as string;
    await apiSdk.removeMemberByApiKey(
      "73729153565645514153930311341891",
      "0xF061ed1a3EcA9c57cdf7514Cb87B0cF0f8A82833",
      apiKey,
    );
  },
}));
