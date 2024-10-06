import { useState } from "react";
import { handleSubmit } from "../functions/submit";

// Import handleSubmit from your submit.js

export const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [buttonText, setButtonText] = useState("Encrypt Data");
  const [isEncrypting, setIsEncrypting] = useState(false);

  const handleEncrypt = async () => {
    // Disable button during encryption process
    setIsEncrypting(true);

    try {
      // Call the handleSubmit function to encrypt and submit the event data
      const key = "unique_event_key"; // Generate or assign a unique key for the event
      const viewingKey = "example_viewing_key"; // Replace with actual viewing key logic

      const eventData = {
        location,
        dateTime,
        description,
      };

      // Encrypt and submit data using handleSubmit from submit.js
      await handleSubmit(null, key, JSON.stringify(eventData), viewingKey);

      console.log("Event data submitted successfully");

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

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full p-3 border rounded-lg h-32 mt-6"
        />

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
