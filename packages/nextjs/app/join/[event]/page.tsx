"use client";

import { useState } from "react";
import Image from "next/image";
import { FailJoinModal } from "~~/components/FailJoinModal";
import JsonFileUploader from "~~/components/JsonFileUploader";
import { SuccessJoinModal } from "~~/components/SuccessJoinModal";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth/RainbowKitCustomConnectButton";
import { EVENTS } from "~~/const/events";

export default function Event({ params }: { params: { event: string } }) {
  let event = EVENTS[params.event as keyof typeof EVENTS];
  const [inviteCode, setInviteCode] = useState("");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");

  if (!event) {
    // return <div>Event not found</div>;
    event = EVENTS["72244305879078692190929763200798"];
  }

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: add secret network part
    try {
      const modal = document.getElementById("success_join_modal") as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
    } catch (error) {
      console.error(error);
      const modal = document.getElementById("fail_join_modal") as HTMLDialogElement;
      if (modal) {
        modal.showModal();
      }
    }
  };

  return (
    <>
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg-safe-link.png')" }}
      >
        <div className="absolute top-5 left-14">
          <RainbowKitCustomConnectButton />
        </div>
        <div className="flex flex-col max-w-3xl mx-auto min-h-screen bg-[#FDFEFF] items-center p-4 justify-evenly">
          <div className="flex flex-col items-center">
            <Image src={event.img} alt="SafeLink" width={200} height={100} />
            <div className={`text-center mb-2 text-xl text-[${event.color}]`}>{event.description}</div>
          </div>

          <form className="gap-2 text-[#9F64A7] max-w-xl" onSubmit={handleJoin}>
            <input
              className={`w-auto input border-none rounded-full bg-[#9F64A7]/10 text-2xl leading-8 focus:outline-none focus:ring-0 my-2`}
              type="text"
              value={inviteCode}
              onChange={e => setInviteCode(e.target.value)}
              placeholder="your invite code"
              // required
            />
            <div className="flex flex-wrap gap-2">
              <input
                className={`input border-none rounded-full bg-[#9F64A7]/10 text-2xl leading-8 focus:outline-none focus:ring-0`}
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="title"
                // required
              />
              <input
                className={`input border-none rounded-full bg-[#9F64A7]/10 text-2xl leading-8 focus:outline-none focus:ring-0`}
                type="text"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="password"
                // required
              />
            </div>
            <h6 className="text-4xl">Verification</h6>
            <JsonFileUploader />
            <p className="text-sm text-[#9F64A7]">
              *We take great care of your privacy. Upon uploading your passport, your gender (only) information will be
              encrypted and verified, confirming your eligibility while keeping your identity protected.
            </p>
            <div className="flex justify-center w-full mt-10">
              <button className="btn px-6 text-[#9F64A7] text-xl shadow-2xl font-semibold" type="submit">
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
      <SuccessJoinModal eventId={params.event} inviteCode={inviteCode}>
        <div className="text-xl text-bold underline">{event.name}</div>
      </SuccessJoinModal>
      <FailJoinModal>
        <div className="text-xl text-bold underline">{event.name}</div>
      </FailJoinModal>
    </>
  );
}
