// import type { NextPage } from "next";
import Image from "next/image";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";
import { EVENTS } from "~~/const/events";

export default function Event({ params }: { params: { event: string } }) {
  const event = EVENTS[params.event as keyof typeof EVENTS];

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-safe-link.png')" }}
    >
      <div className="absolute top-0 right-0">
        <RainbowKitCustomConnectButton />
      </div>
      <div className="flex flex-col w-full max-w-3xl mx-auto min-h-screen bg-[#FDFEFF] items-center py-4">
        <Image src={event.img} alt="SafeLink" width={200} height={100} />
        <div className={`text-center mb-2 text-xl text-[${event.color}]`}>{event.description}</div>
      </div>
    </div>
  );
}
