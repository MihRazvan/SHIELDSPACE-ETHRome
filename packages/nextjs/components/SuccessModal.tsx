import Image from "next/image";

export const SuccessModal = ({ children }: { children: React.ReactNode }) => {
  const handleClose = () => {
    const modal = document.getElementById("success_modal") as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  return (
    <dialog id="success_modal" className="modal">
      <div className="modal-box flex flex-col text-white items-center justify-center rounded-none bg-black text-center">
        <h3 className="font-bold text-xl">Success!</h3>
        <Image src="/images/success.png" alt="Success" width={100} height={100} />
        <div className="text-xl text-bold">You have signed up for notifications from:</div>
        {children}
        <div className="modal-action">
          <form method="dialog" className="text-black">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn text-lg px-10" type="button" onClick={handleClose}>
              Ok
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
