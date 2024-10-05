import { Address, IExecWeb3mail, TimeStamp } from "@iexec/web3mail";
import { create } from "zustand";
import { getLocalDateFromTimeStamp } from "~~/utils/scaffold-eth/utils";

type OneEmailContact = {
  id: string;
  owner: Address;
  protectedDataAddress: Address;
  accessGrantTimestamp: TimeStamp;
};

type EmailsStore = {
  web3mail: IExecWeb3mail | null;
  contacts: OneEmailContact[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  initWeb3mail: (provider: any) => Promise<void>;
  fetchContacts: () => Promise<void>;
  sendEmails: () => Promise<void>;
};

export const useEmailsStore = create<EmailsStore>((set, get) => ({
  web3mail: null,
  contacts: [],
  isLoading: true,
  isSuccess: false,
  isError: false,

  initWeb3mail: async (provider: any) => {
    const web3mail = new IExecWeb3mail(provider);
    set({ web3mail });
  },

  fetchContacts: async () => {
    const { web3mail } = get();
    if (!web3mail) return;

    set({ isLoading: true, isError: false });

    try {
      const myEmailContacts = await web3mail.fetchMyContacts({
        isUserStrict: true,
      });

      const processedContacts = myEmailContacts
        .sort((a, b) => Date.parse(b.accessGrantTimestamp) - Date.parse(a.accessGrantTimestamp))
        .map((contact, index) => ({
          id: index.toString(),
          owner: contact.owner.toLowerCase(),
          protectedDataAddress: contact.address.toLowerCase(),
          accessGrantTimestamp: getLocalDateFromTimeStamp(contact.accessGrantTimestamp),
        }));

      set({ contacts: processedContacts, isSuccess: true });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      set({ isError: true });
    } finally {
      set({ isLoading: false });
    }
  },

  sendEmails: async () => {
    const { web3mail, contacts } = get();
    if (!web3mail) return;

    const emailsArray = contacts.map(contact => ({
      senderName: "John Doe",
      contentType: "text/plain",
      emailSubject: "Hello from Web3Mail",
      emailContent: "This is a test email",
      protectedData: contact.protectedDataAddress,
      workerpoolAddressOrEns: "prod-v8-learn.main.pools.iexec.eth",
    }));

    for (const email of emailsArray) {
      await web3mail.sendEmail(email);
    }
  },
}));
