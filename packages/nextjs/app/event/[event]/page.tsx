"use client";

import { useState } from "react";
import Image from "next/image";
// import { Group } from "@semaphore-protocol/group";
import { Identity } from "@semaphore-protocol/identity";
// import { generateProof, verifyProof } from "@semaphore-protocol/proof";
import { Button } from "~~/components/ui/Button";
// import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";
import { EVENTS } from "~~/const/events";
import { useGroupsUser } from "~~/hooks/useGroupsUser";

const EventPage = ({ params }: { params: { event: string } }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  let event = EVENTS[params.event as keyof typeof EVENTS];

  // if (!event) {
  //   return <div>Event not found</div>;
  // }

  if (!event) {
    // return <div>Event not found</div>;
    event = EVENTS["72244305879078692190929763200798"];
  }

  const { fetchGroupMembers } = useGroupsUser();

  const handleDecrypt = async () => {
    const identityString = localStorage.getItem("i");

    if (!identityString) {
      // router.push("/")
      return;
    }

    const identity = new Identity(identityString);

    if (!identity) return;

    const users = await fetchGroupMembers(params.event);
    // const semaphoreGroup = new Group(users);
    // const message = "Get verified!";

    console.log("users", users);

    console.log("identity", identity);

    try {
      // const proof = await generateProof(identity, semaphoreGroup, message, params.event);
      // console.log("proof", proof);
      // const isValid = await verifyProof(proof);
      // console.log("isValid", isValid);
    } catch (error) {
      console.error("Error generating proof", error);
    } finally {
    }

    setModalIsOpen(false);
  };

  return (
    <div className="relative">
      {/* <button
        onClick={() => setModalIsOpen(true)}
        className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded z-10"
      >
        Open Modal
      </button> */}
      <div
        className={`flex flex-col w-full max-w-3xl mx-auto min-h-screen bg-[#FDFEFF] items-center py-4 ${
          modalIsOpen ? "blur-lg" : ""
        }`}
      >
        <Image src={event.img} alt="SafeLink" width={200} height={100} />
        <div className={`text-center mb-2 text-xl text-[${event.color}]`}>{event.description}</div>
      </div>
      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <Button onClick={handleDecrypt}>Decrypt</Button>
        </div>
      )}
    </div>
  );
};

export default EventPage;
