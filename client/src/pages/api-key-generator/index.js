import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

function Home() {
  const [active, setActive] = useState(false);
  const [Email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [fetching, setFetching] = useState(false);
  const [s3, setS3] = useState("");
  const [glue, setGlue] = useState("");
  const [store_DB, setDBStore] = useState("");

  const notify = () =>
    toast("✅ API Key Copied", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const checkStatus = async () => {
    try {
      const res = await axios.get("https://api.aryansingh.dev/cad/api/status");
      setS3(res.data.s3_status);
      setGlue(res.data.glue);
      setDBStore(res.data.store_DB);
    } catch (err) {
      console.log(err);
    }
  };

  const callInterval = () => {
    setInterval(() => {
      checkStatus();
    }, 3000);
  };

  useEffect(() => {
    if (active) {
      callInterval();
    }
  }, [active]);

  useEffect(() => {
    if (apiKey !== "") {
      notify();
      navigator.clipboard.writeText(apiKey).catch((error) => console.error("Failed to copy:", error));
    }
  }, [apiKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFetching(true);
    const data = {
      email: Email,
    };

    try {
      const res = await axios.post(
        "https://api.aryansingh.dev/cad/api/accessKey",
        data
      );
      setApiKey(res.data.apiKey);
      setActive(true);
    } catch (err) {
      console.log(err);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className="master">
      <ToastContainer />
      <Link href="/">
        <button>Home</button>
      </Link>
      <div className="login-box">
        <form className="formItems">
          <div className="label">
            <label id="text">Email :</label>
            <input
              className="input"
              type="text"
              name="email"
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          
          <button
            disabled={active}
            id="button"
            onClick={(e) => handleSubmit(e)}
          >
            {fetching && !active
              ? "Generating Key..."
              : active
              ? "User Authenticated"
              : "Generate Key"}
          </button>
        </form>
      </div>
      
    </div>
  );
}
export default Home;
