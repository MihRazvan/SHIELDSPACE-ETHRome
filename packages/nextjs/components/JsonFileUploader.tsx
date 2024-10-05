import React, { ChangeEvent, useRef, useState } from "react";

interface JsonData {
  [key: string]: any;
}

function JsonFileUploader() {
  const [jsonData, setJsonData] = useState<JsonData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      try {
        const content = e.target?.result;
        if (typeof content === "string") {
          const json: JsonData = JSON.parse(content);
          setJsonData(json);
          setError(null);
        }
      } catch (err) {
        setError("Error parsing JSON file");
        setJsonData(null);
      }
    };

    reader.onerror = () => {
      setError("Error reading file");
      setJsonData(null);
    };

    reader.readAsText(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center">
      <input type="file" accept=".json" onChange={handleFileUpload} ref={fileInputRef} style={{ display: "none" }} />
      <div
        onClick={handleClick}
        style={{
          padding: "10px 20px",
          backgroundColor: "rgba(159, 100, 167, 0.1)", // 10% opacity of #9F64A7
          border: "none",
          cursor: "pointer",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        upload a copy of your passport
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {jsonData && (
        <div>
          <h3>Uploaded JSON Data:</h3>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default JsonFileUploader;
