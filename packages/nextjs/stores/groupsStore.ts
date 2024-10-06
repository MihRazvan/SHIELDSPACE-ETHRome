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
  createGroup: ({ title, description }: { title: string; description: string }) => Promise<Group>;
  fetchMyGroups: () => Promise<void>;
  sendInvites: (groupId: string, org: string) => Promise<boolean | undefined>;
  removeMembers: () => Promise<void>;
}

const initialState: GroupState = {
  bandadaSdk: apiSdk,
  myGroups: [],
  adminId: "0x7b0e5a2f27fe0c2b1428ba260f15a39bfd309aa9568461c6a8cfaf47daf1af02",
};

export const useGroupsStore = create<GroupState & GroupActions>((set, get) => ({
  ...initialState,

  createGroup: async ({
    title,
    description,
  }: // dateTime,
  // location,
  // gender,
  // ageRestricted,
  {
    title: string;
    description: string;
    // dateTime: string;
    // location: string;
    // gender: string;
    // ageRestricted: boolean;
  }) => {
    const groupCreateDetails = {
      name: title,
      description: description,
      treeDepth: 16,
      fingerprintDuration: 3600,
    };
    const apiKey = process.env.NEXT_PUBLIC_BANDADA_API_KEY as string;

    console.log(groupCreateDetails);

    const group = await apiSdk.createGroup(groupCreateDetails, apiKey);
    set({ myGroups: [...get().myGroups, group] });
    return group;
  },

  fetchMyGroups: async () => {
    const groups = await apiSdk.getGroupsByAdminId(get().adminId);
    set({ myGroups: groups });
  },

  sendInvites: async (groupId: string, org: string) => {
    console.log("Sending invites");
    const apiKey = process.env.NEXT_PUBLIC_BANDADA_API_KEY as string;
    const sendInvite = useEmailsStore.getState().sendInvite;

    // const contacts = useEmailsStore.getState().contacts;
    const fetchContacts = useEmailsStore.getState().fetchContacts;
    const contacts = await fetchContacts();
    if (!contacts || contacts.length === 0) return;

    try {
      // this should be done for each contact
      const invite = await apiSdk.createInvite(groupId, apiKey);
      console.log("invite", invite, contacts[0]);
      await sendInvite(
        `This is your invite code: ${invite.code}, register via link https://secretevent-nextjs.vercel.app/join/${groupId}`,
        org,
        contacts[0].protectedDataAddress,
      );
      console.log("invite sent");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
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
