// import type { NextPage } from "next";
import Image from "next/image";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";

export default function Event({ params }: { params: { event: string } }) {
  return (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-safe-link.png')" }}
    >
      <div className="absolute top-0 right-0">
        <RainbowKitCustomConnectButton />
      </div>
      <div className="flex flex-col w-full max-w-3xl mx-auto min-h-screen bg-[#FDFEFF] items-center">
        <Image src="/images/logo-safe-link.png" alt="SafeLink" width={100} height={100} />
        <div className="text-center mb-2">event {params.event}</div>
      </div>
    </div>
  );
}
