import { useState } from "react";
import { ethers } from "ethers";

export const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("other");
  const [ageRestricted, setAgeRestricted] = useState(false);
  const [buttonText, setButtonText] = useState("Encrypt Data"); // Initial button text
  const [isEncrypting, setIsEncrypting] = useState(false); // To disable button during encryption

  const handleEncrypt = async () => {
    if (!window.ethereum) {
      console.log("MetaMask is not installed");
      return;
    }

    // Disable button during encryption process
    setIsEncrypting(true);

    // Explicitly set the Sepolia provider using the correct chain ID
    const provider = new ethers.providers.Web3Provider(window.ethereum, {
      name: "sepolia",
      chainId: 11155111, // Sepolia Testnet chain ID
    });
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();

    try {
      const recipientAddress = "0x33A5608b3D641114f4d07576F2a6552baec9baA7"; // Replace with a valid Sepolia testnet address

      // Generate fake data to simulate encryption
      const eventData = {
        title,
        password,
        dateTime,
        location,
        description,
        gender,
        ageRestricted,
      };
      const fakeEncryptedData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(JSON.stringify(eventData)));
      console.log("Fake Encrypted Data:", fakeEncryptedData);

      // Prepare the transaction
      const tx = {
        to: recipientAddress,
        value: ethers.utils.parseEther("0.001"), // Sending 0.001 Sepolia ETH
        gasLimit: 21000, // Minimum gas limit for a simple transfer
      };

      // Sign and send the transaction
      const txResponse = await signer.sendTransaction(tx);
      console.log("Transaction Hash:", txResponse.hash);

      // Wait for the transaction to be mined
      const receipt = await txResponse.wait();
      console.log("Transaction confirmed:", receipt);

      // Change button text to "Create Event" after transaction is confirmed
      setButtonText("Create Event");
    } catch (error) {
      console.error("Error encrypting or submitting data:", error);
    } finally {
      // Re-enable the button after the transaction
      setIsEncrypting(false);
    }
  };

  return (
    <div className="p-6 mt-10 mx-auto bg-white rounded-lg shadow-md max-w-md">
      <h2 className="text-2xl font-bold text-center mb-4">Create an event</h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Date & Time"
            value={dateTime}
            onChange={e => setDateTime(e.target.value)}
            className="w-1/2 p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
            className="w-1/2 p-3 border rounded-lg"
          />
        </div>

        {/* Event Restrictions Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Event Restrictions</h3>

          {/* Gender Restriction */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700">Gender Restriction</label>
            <div className="space-x-2">
              <label className="text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                />{" "}
                Female
              </label>
              <label className="text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                />{" "}
                Male
              </label>
              <label className="text-gray-700">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === "other"}
                  onChange={() => setGender("other")}
                />{" "}
                Other
              </label>
            </div>
          </div>

          {/* Age Restriction */}
          <div className="flex items-center justify-between mt-4">
            <label className="text-gray-700">Age Restriction</label>
            <div className="flex items-center">
              <label className="text-gray-700 mr-2">18+</label>
              <input
                type="checkbox"
                checked={ageRestricted}
                onChange={() => setAgeRestricted(!ageRestricted)}
                className="w-5 h-5"
              />
            </div>
          </div>
        </div>

        {/* Event Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full p-3 border rounded-lg h-32 mt-6"
        />

        {/* Button Section */}
        <div className="flex justify-center mt-6">
          <button
            type="button"
            className="px-6 py-3 bg-black text-white rounded-lg"
            onClick={handleEncrypt}
            disabled={isEncrypting}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};
