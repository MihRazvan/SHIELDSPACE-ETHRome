// import { useState } from "react";
import Image from "next/image";
import { Identity } from "@semaphore-protocol/identity";
import { useJoinEvent } from "~~/hooks/useJoinEvent";

export const SuccessJoinModal = ({
  eventId,
  inviteCode,
  children,
}: {
  eventId: string;
  inviteCode: string;
  children: React.ReactNode;
}) => {
  // const [identity, setIdentity] = useState<Identity | null>(null);

  const handleClose = () => {
    const modal = document.getElementById("success_join_modal") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  const { joinEvent } = useJoinEvent();

  const handleJoin = async (e: any) => {
    e.preventDefault();
    const _identity = new Identity();
    // setIdentity(_identity);

    localStorage.setItem("i", _identity.export());

    const identityString = localStorage.getItem("i");
    console.log("identityString", identityString);

    console.log("commitment", _identity.commitment.toString());

    console.log("Your new Semaphore identity was just created 🎉");
    await joinEvent(eventId, inviteCode, _identity.commitment);
    handleClose();
  };

  return (
    <dialog id="success_join_modal" className="modal">
      <div className="modal-box flex flex-col text-white items-center justify-center rounded-none bg-[#681374] text-center">
        <h3 className="font-bold text-xl">Success!</h3>
        <Image src="/images/success.png" alt="Success" width={100} height={100} />
        <div className="text-xl text-bold">You are now verified and can privately confirm your attendance:</div>
        {children}
        <div className="modal-action">
          <form method="dialog" className="text-black">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn text-lg px-10" type="button" onClick={handleJoin}>
              Confirm
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
