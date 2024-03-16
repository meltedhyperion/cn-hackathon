import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Link from "next/link";

function Injector() {
  const [s3, setS3] = useState("");
  const [glue, setGlue] = useState("");
  const [store_DB, setDBStore] = useState("");
  const [file, setFile] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [uploadEnabled, setUploadEnabled] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
    setUploadEnabled(!!event.target.value);
  };

  const startSimulation = async () => {
    if (!apiKey) {
      errorNotify("API key not provided.");
      return;
    }

    if (!file) {
      setModalOpen(true); // Open modal if no file is selected
      errorNotify("No file has been selected for upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    notify("🚀 Starting Jobs...");
    try {
      try{
        await axios.post("https://api.aryansingh.dev/sdi/api/bucketUpload", formData, {
        headers: {
          "api-key": apiKey,
          "Content-Type": "multipart/form-data",
        },
      });
      }
      catch (err) {
        notifyError("Failed to upload file. Please try again.");
        return;
      }

      // Simulate S3 upload process
      setTimeout(() => {
        setS3("uploaded");
      }, 4000);

      // Simulate Crawler processing after S3 is done
      setTimeout(() => {
        setGlue("processed");
      }, 24000);

      // Simulate Database update after Crawler is done
      setTimeout(() => {
        setDBStore("uploaded");
      }, 27000);
    } catch (error) {
      console.error("Error:", error);
      errorNotify("Failed to upload file. Please try again.");
    }
  };

  const notify = (message) =>
    toast(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const errorNotify = (message) =>
    toast.error(`❌ ${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  return (
    <div className="master">
      <ToastContainer />
      <Link href="/">
        <button>Home</button>
      </Link>
      <div className="login-box">
        <label htmlFor="apiKey" id="text">API Key:</label>
        <input type="text" id="apiKey" onChange={handleApiKeyChange} value={apiKey} />
        <label htmlFor="file" id="text">Upload File:</label>
        <input type="file" id="file" onChange={handleFileChange} accept=".csv, .json" />
        <button onClick={startSimulation} disabled={!uploadEnabled}>Upload and Start ETL</button>
        <ol className="orderList">
          <li className="listItem">
            S3 Status:{" "}
            {s3 === "uploading"
              ? "Uploading file to S3"
              : s3 === "uploaded"
              ? "File successfully Uploaded to S3 ✔️"
              : null}
          </li>
          <li className="listItem">
            Crawler Status:
            {glue === "pending"
              ? "Waiting for Apache Spark to start"
              : glue === "processing"
              ? "Running Apache Spark"
              : glue === "processed"
              ? "Processing Complete ✔️"
              : null}
          </li>
          <li className="listItem">
            Database Status:
            {store_DB === "pending"
              ? "Waiting for file"
              : store_DB === "uploaded"
              ? "File uploaded to database ✔️"
              : null}
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Injector;
