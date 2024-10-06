import { useState } from "react";

export const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("other");
  const [ageRestricted, setAgeRestricted] = useState(false);

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

        <div className="flex justify-between">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-black rounded-lg"
            onClick={() => console.log("Encrypt button clicked")}
          >
            Encrypt
          </button>
          <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
