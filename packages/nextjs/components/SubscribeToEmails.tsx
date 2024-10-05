import { FormEvent, useCallback, useEffect, useState } from "react";
import { IExecDataProtector, IExecDataProtectorCore } from "@iexec/dataprotector";
import { IExecWeb3mail } from "@iexec/web3mail";
import { useAccount } from "wagmi";

const ORG_ETH_ADDRESS = "0xF061ed1a3EcA9c57cdf7514Cb87B0cF0f8A82833";

export const SubscribeToEmails = () => {
  const [dataProtector, setDataProtector] = useState<IExecDataProtectorCore>();
  const [web3mail, setWeb3mail] = useState<IExecWeb3mail>();

  const [email, setEmail] = useState("ilge.ustun@gmail.com");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement email subscription logic here
    console.log("Subscribing email:", email);

    await protectEmailAndGrantAccess(email);
    // Reset the email input after submission
    setEmail("");
  };

  const account = useAccount();

  /*
   * @what: Init The dataProtector and web3mail modules
   * @when: Execute it only once after user is connected, and only if user switch wallet
   */
  useEffect(() => {
    const fetchData = async () => {
      if (!(account?.status === "connected") || dataProtector || web3mail) {
        return;
      }

      const provider = await account.connector?.getProvider();
      if (provider) {
        // setDataProtector(new IExecDataProtector(window.ethereum as any));
        setWeb3mail(new IExecWeb3mail(window.ethereum as any));

        const dataProtector = new IExecDataProtector(provider as any);

        const dataProtectorCore = dataProtector.core;
        // const dataProtectorSharing = dataProtector.sharing;

        setDataProtector(dataProtectorCore);
      }
    };
    fetchData();
  }, [account, dataProtector, web3mail]);

  const protectEmailAndGrantAccess = useCallback(
    async (email: string) => {
      if (!dataProtector) {
        console.error("Web3MailProvider ---- protectEmailAndGrantAccess --- dataProtector undefined");
        return;
      }

      const newProtectedEmail = await dataProtector.protectData({
        data: {
          email: email,
        },
      });

      console.log("newProtectedEmail", newProtectedEmail);

      const grantedAccess = await dataProtector.grantAccess({
        protectedData: newProtectedEmail?.address as string,
        authorizedApp: process.env.NEXT_PUBLIC_WEB3MAIL_APP_ADDRESS as string,
        authorizedUser: ORG_ETH_ADDRESS as string,
        numberOfAccess: 99999999999,
      });

      console.log("grantedAccess", grantedAccess);
    },
    [dataProtector],
  );

  console.log("dataProtector", dataProtector);
  console.log("web3mail", web3mail);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <button className="btn btn-outline rounded-sm" type="submit">
        Subscribe
      </button>
    </form>
  );
};
