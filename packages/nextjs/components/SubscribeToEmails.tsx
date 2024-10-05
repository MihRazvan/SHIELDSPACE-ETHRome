import { FormEvent, useState } from "react";
import { Button } from "./ui/Button";
import useEmailsUser from "~~/hooks/useEmailsUser";

export const SubscribeToEmails = () => {
  const { subscribeToEmails } = useEmailsUser();

  const [email, setEmail] = useState("ilge.ustun@gmail.com");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await subscribeToEmails(email, "0x0000000000000000000000000000000000000000");
      setEmail("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
      />
      <Button type="submit">Subscribe</Button>
    </form>
  );
};
