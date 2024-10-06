"use client";

import { useRouter } from "next/navigation";
import type { NextPage } from "next";
import { Communities } from "~~/components/Communities";
import { Hero } from "~~/components/Hero";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";
import { Button } from "~~/components/ui/Button";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/background.png')" }}
    >
      <div className="absolute top-0 left-0">
        <RainbowKitCustomConnectButton />
      </div>
      <div className="flex flex-col w-full max-w-3xl mx-auto min-h-screen bg-[#FDFEFF]">
        <Hero />
        <Communities />
        <div className="text-center mb-2">Built at ETHRome 2024</div>
      </div>
      <div className="absolute top-5 right-5">
        <Button
          onClick={() => {
            router.push("/create");
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default Home;
