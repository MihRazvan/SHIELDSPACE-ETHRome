import { useState } from "react";
import { SuccessModal } from "./SuccessModal";
import { Button } from "./ui/Button";
import { ORGS } from "~~/const/orgs";
import useEmailsUser from "~~/hooks/useEmailsUser";

export const Communities = () => {
  const [email, setEmail] = useState("");
  const [selectedOrgs, setSelectedOrgs] = useState<string[]>([]);
  const { subscribeToEmails } = useEmailsUser();

  const handleToggle = (address: string) => {
    setSelectedOrgs(prev => (prev.includes(address) ? prev.filter(a => a !== address) : [...prev, address]));
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedOrgs.length === 0) {
      return;
    }

    selectedOrgs.forEach(async org => {
      console.log("org", org);
      try {
        await subscribeToEmails(email, org);
      } catch (error) {
        console.error("Error subscribing to emails for:", org);
      }
    });

    const modal = document.getElementById("success_modal") as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col gap-2 items-center justify-center w-full px-3 sm:px-24">
        <h1 className="text-5xl mt-10 text-left w-full">Communities</h1>
        <div className="flex flex-col gap-4 w-full my-4">
          {ORGS.map(group => (
            <div className="flex justify-between gap-2 w-full" key={group.address}>
              <span className="text-4xl">{group.name}</span>
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="toggle"
                  checked={selectedOrgs.includes(group.address)}
                  onChange={() => handleToggle(group.address)}
                />
              </label>
            </div>
          ))}
        </div>
        <form className="flex gap-2" onSubmit={handleSignIn}>
          <input
            className="input border-none rounded-full bg-[#D9D9D9] text-2xl leading-8 focus:outline-none focus:ring-0"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your email here"
            required
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
      <SuccessModal>
        <div>
          {selectedOrgs.map(org => (
            <div key={org} className="text-xl text-bold underline">
              {ORGS.find(o => o.address === org)?.name}
            </div>
          ))}
        </div>
      </SuccessModal>
    </>
  );
};
