import { useState } from "react";
import { Button } from "./ui/Button";
import { useJoinEvent } from "~~/hooks/useJoinEvent";
import { useGroupsStore } from "~~/stores/groupsStore";

export const JoinEvent = () => {
  const { joinEvent } = useJoinEvent();
  const [inviteCode, setInviteCode] = useState("");
  const removeMembers = useGroupsStore(state => state.removeMembers);
  const handleJoinEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await joinEvent("72244305879078692190929763200798", inviteCode);
  };

  // https://api.bandada.pse.dev/groups/72244305879078692190929763200798/members/0xF061ed1a3EcA9c57cdf7514Cb87B0cF0f8A82833

  const handleRemoveMembers = async () => {
    await removeMembers();
  };

  return (
    <>
      <form onSubmit={handleJoinEvent}>
        <input
          type="text"
          value={inviteCode}
          onChange={e => setInviteCode(e.target.value)}
          placeholder="Enter your invite code"
          required
        />
        <Button type="submit">Join</Button>
      </form>
      <Button onClick={handleRemoveMembers}>Remove Members</Button>
    </>
  );
};
