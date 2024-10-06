import Image from "next/image";
import { useRouter } from "next/navigation";

export const FailJoinModal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const handleClose = () => {
    const modal = document.getElementById("success_join_modal") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
    // Add redirect to home page
    router.push("/");
  };

  return (
    <dialog id="fail_join_modal" className="modal">
      <div className="modal-box flex flex-col text-white items-center justify-center rounded-none bg-[#681374] text-center">
        <h3 className="font-bold text-xl">Declined!</h3>
        <Image src="/images/fail.png" alt="Declined" width={100} height={100} />
        <div className="text-xl text-bold">You are not elegible to join:</div>
        {children}
        <div className="modal-action">
          <form method="dialog" className="text-black">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn text-lg px-10" type="button" onClick={handleClose}>
              Home
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
