/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from "react";
import { useEmailsStore } from "../stores/emailsStoreAdmin";
import { Button } from "./ui/Button";
import { useAccount } from "wagmi";

export default function MyEmailContacts() {
  const fetchContacts = useEmailsStore(state => state.fetchContacts);
  const web3mail = useEmailsStore(state => state.web3mail);
  const initWeb3mail = useEmailsStore(state => state.initWeb3mail);
  const sendEmails = useEmailsStore(state => state.sendEmails);
  const contacts = useEmailsStore(state => state.contacts);
  const isLoading = useEmailsStore(state => state.isLoading);
  const isError = useEmailsStore(state => state.isError);
  const isSuccess = useEmailsStore(state => state.isSuccess);

  const account = useAccount();

  useEffect(() => {
    const fetchData = async () => {
      if (account?.status !== "connected") return;
      if (!web3mail && account?.status === "connected") {
        const provider = await account.connector?.getProvider();
        await initWeb3mail(provider);
      }
      await fetchContacts();
    };
    fetchData();
  }, [web3mail, fetchContacts, account.connector, initWeb3mail, account?.status]);

  const handleSendEmails = async () => {
    try {
      await sendEmails();
      console.log("Emails sent");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>Contacts List</h2>

      {isLoading && <div className="flex flex-col items-center gap-y-4">Fetching your contacts...</div>}

      {isError && (
        <div className="mt-10">Oops, something went wrong while fetching protected data shared with you.</div>
      )}

      {isSuccess && contacts!.length === 0 && (
        <div className="my-10 flex items-center justify-center gap-x-2">
          So far, nobody shared their protected data with you.
        </div>
      )}

      {isSuccess && contacts!.length > 0 && (
        <>
          <Button onClick={handleSendEmails}>Send emails</Button>
          <div
            className="mt-10 grid w-full gap-x-3 px-2"
            style={{
              gridTemplateColumns: "2fr 2fr 1fr",
            }}
          >
            <div className="text-sm font-normal">Owner address</div>
            <div className="text-sm font-normal">Protected data address</div>
            <div className="text-sm font-normal">Access granted on</div>

            {contacts!.map(
              ({
                id,
                owner,
                protectedDataAddress,
                accessGrantTimestamp,
                // isUserStrict,
              }) => (
                <div key={id} className="contents [&>div]:flex [&>div]:items-center [&>div]:py-2 [&>div]:text-sm">
                  <div className="relative min-w-0">
                    <span className="truncate">{owner}</span>
                  </div>
                  <div className="min-w-0">
                    <span className="truncate">{protectedDataAddress}</span>
                  </div>
                  <div>{accessGrantTimestamp}</div>
                </div>
              ),
            )}
          </div>
        </>
      )}
    </>
  );
}
