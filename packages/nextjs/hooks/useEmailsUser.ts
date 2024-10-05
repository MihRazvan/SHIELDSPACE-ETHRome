import { useCallback } from "react";
import { IExecDataProtector } from "@iexec/dataprotector";
import { useAccount } from "wagmi";

const useEmailsUser = () => {
  const account = useAccount();

  const subscribeToEmails = useCallback(
    async (email: string, orgAddress: string) => {
      const provider = await account.connector?.getProvider();
      if (provider) {
        const dataProtector = new IExecDataProtector(provider as any);

        const dataProtectorCore = dataProtector.core;

        const newProtectedEmail = await dataProtectorCore.protectData({
          data: {
            email: email,
          },
        });

        console.log("newProtectedEmail", newProtectedEmail);

        const grantedAccess = await dataProtectorCore.grantAccess({
          protectedData: newProtectedEmail?.address as string,
          authorizedApp: process.env.NEXT_PUBLIC_WEB3MAIL_APP_ADDRESS as string,
          authorizedUser: orgAddress,
          numberOfAccess: 99999999999,
        });

        console.log("grantedAccess", grantedAccess);
      }
    },
    [account],
  );

  return { subscribeToEmails };
};

export default useEmailsUser;
