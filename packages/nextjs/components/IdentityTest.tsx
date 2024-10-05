import { useState } from "react";
import { Button } from "./ui/Button";
import { Group } from "@semaphore-protocol/group";
import { Identity } from "@semaphore-protocol/identity";
import { verifyProof } from "@semaphore-protocol/proof";
import { generateProof } from "@semaphore-protocol/proof";
import { useGroupsUser } from "~~/hooks/useGroupsUser";

const groupId = "72244305879078692190929763200798";

export const IdentityTest = () => {
  const [identity, setIdentity] = useState<Identity | null>(null);

  const { fetchGroupMembers } = useGroupsUser();
  // Function to create a new Semaphore identity and store it.
  const createIdentity = async () => {
    const identity = new Identity();
    setIdentity(identity);

    localStorage.setItem("i", identity.export());

    console.log("Your new Semaphore identity was just created 🎉");
  };

  const verify = async () => {
    // Fetch group members and generate proof.
    if (!identity) return;

    const users = await fetchGroupMembers(groupId);
    const semaphoreGroup = new Group(users);
    const message = "Hello, world!";

    const proof = await generateProof(identity, semaphoreGroup, message, groupId);

    const isValid = await verifyProof(proof);
    console.log(isValid, proof);
  };

  console.log(identity);

  return (
    <div>
      <Button onClick={createIdentity}>Create Identity</Button>
      <Button onClick={verify}>Verify</Button>
    </div>
  );
};
