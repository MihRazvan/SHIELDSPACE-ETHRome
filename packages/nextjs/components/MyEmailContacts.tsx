/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from "react";
import { Address, IExecWeb3mail, TimeStamp } from "@iexec/web3mail";
// import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { getLocalDateFromTimeStamp } from "~~/utils/scaffold-eth/utils";

type OneEmailContact = {
  id: string;
  owner: Address;
  protectedDataAddress: Address;
  accessGrantTimestamp: TimeStamp;
};

export default function MyEmailContacts() {
  const [web3mail, setWeb3mail] = useState<IExecWeb3mail>();
  const account = useAccount();

  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [myContacts, setMyContacts] = useState<OneEmailContact[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!(account?.status === "connected") || web3mail) {
        return;
      }

      const provider = await account.connector?.getProvider();
      if (provider) {
        // setDataProtector(new IExecDataProtector(window.ethereum as any));
        setWeb3mail(new IExecWeb3mail(window.ethereum as any));
      }
    };
    fetchData();
  }, [account, web3mail]);

  useEffect(() => {
    async function fetchContacts() {
      if (!web3mail) return;
      try {
        setIsLoading(true);
        setIsError(false);

        if (!web3mail) {
          setMyContacts([]);
          setIsSuccess(true);
          return;
        }

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

        setMyContacts(processedContacts as any);
        setIsSuccess(true);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchContacts();
  }, [web3mail]); // Empty dependency array means this effect runs once on mount

  // ... rest of your component code ...

  // const {
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   data: myContacts,
  // } = useQuery({
  //   queryKey: ["myWeb3mailContacts"],
  //   // queryKey: ['myWeb3mailContacts', showZeroAddressGrants],
  //   queryFn: async () => {
  //     // const { web3mail } = await getWeb3mailClient();
  //     if (!web3mail) return [];
  //     const myEmailContacts = await web3mail.fetchMyContacts({
  //       isUserStrict: true,
  //       // isUserStrict: !showZeroAddressGrants,
  //     });
  //     return myEmailContacts;
  //   },
  //   select: contacts => {
  //     return contacts
  //       .sort((a: Contact, b: Contact) => Date.parse(b.accessGrantTimestamp) - Date.parse(a.accessGrantTimestamp))
  //       .map((contact: Contact, index: number) => {
  //         return {
  //           id: index.toString(),
  //           owner: contact.owner.toLowerCase(),
  //           protectedDataAddress: contact.address.toLowerCase(),
  //           accessGrantTimestamp: getLocalDateFromTimeStamp(contact.accessGrantTimestamp),
  //           // isUserStrict: contact.isUserStrict,
  //         };
  //       });
  //   },
  // });

  // const filteredRows: OneEmailContact[] | undefined = myContacts?.filter((contact: { owner: string }) =>
  //   contact.owner.toLowerCase().includes(searchTerm.toLowerCase()),
  // );

  const handleSendEmails = async () => {
    if (!web3mail) return;

    const emailsArray = myContacts.map(contact => ({
      senderName: "John Doe",
      contentType: "text/plain",
      emailSubject: "Hello from Web3Mail",
      emailContent: "This is a test email",
      protectedData: contact.protectedDataAddress,
      /**
       * this demo uses a workerpool offering free computing power dedicated to learning
       * this resource is shared and may be throttled, it should not be used for production applications
       * remove the `workerpoolAddressOrEns` option to switch back to a production ready workerpool
       */
      workerpoolAddressOrEns: "prod-v8-learn.main.pools.iexec.eth",
    }));

    emailsArray.forEach(email => {
      web3mail.sendEmail(email);
    });
  };
  return (
    <>
      <h2>Contacts List</h2>

      {isLoading && <div className="flex flex-col items-center gap-y-4">Fetching your contacts...</div>}

      {isError && (
        <div className="mt-10">Oops, something went wrong while fetching protected data shared with you.</div>
      )}

      {isSuccess && myContacts!.length === 0 && (
        <div className="my-10 flex items-center justify-center gap-x-2">
          So far, nobody shared their protected data with you.
        </div>
      )}

      {isSuccess && myContacts!.length > 0 && (
        <>
          <button className="btn btn-outline rounded-sm" onClick={handleSendEmails}>
            Send emails
          </button>
          <div
            className="mt-10 grid w-full gap-x-3 px-2"
            style={{
              gridTemplateColumns: "2fr 2fr 1fr",
            }}
          >
            <div className="text-sm font-normal">Owner address</div>
            <div className="text-sm font-normal">Protected data address</div>
            <div className="text-sm font-normal">Access granted on</div>

            {myContacts!.map(
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
