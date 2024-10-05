import { useCallback } from "react";
import { ApiSdk } from "@bandada/api-sdk";
// import { keccak_256 } from "@noble/hashes/sha3";
import { useAccount } from "wagmi";

export const useJoinEvent = () => {
  const account = useAccount();

  const joinEvent = useCallback(
    async (groupId: string, inviteCode: string) => {
      const apiSdk = new ApiSdk();

      // const data = new TextEncoder().encode(account.address as string);
      // const hash = keccak_256(data);
      // const hexString = Buffer.from(hash).toString("hex");

      // console.log("hash", hexString);

      await apiSdk.addMemberByInviteCode(groupId, account.address as string, inviteCode);
    },
    [account.address],
  );

  return { joinEvent };
};
