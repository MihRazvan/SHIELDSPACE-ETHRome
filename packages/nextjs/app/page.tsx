"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Groups } from "~~/components/Groups";
import { IdentityTest } from "~~/components/IdentityTest";
import { JoinEvent } from "~~/components/JoinEvent";
import MyEmailContacts from "~~/components/MyEmailContacts";
import { SubscribeToEmails } from "~~/components/SubscribeToEmails";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
        </div>
        <SubscribeToEmails />

        <div>
          <MyEmailContacts />
        </div>

        <div>
          <Groups />
        </div>

        <div>
          <JoinEvent />
        </div>

        <div>
          <IdentityTest />
        </div>
      </div>
    </>
  );
};

export default Home;
