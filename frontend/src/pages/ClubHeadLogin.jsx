import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHero from "../components/PageHero";

const CLUB_HEAD_USERNAME = "clubhead";
const CLUB_HEAD_PASSWORD = "password123";

function ClubHeadLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      credentials.username.trim() === CLUB_HEAD_USERNAME &&
      credentials.password === CLUB_HEAD_PASSWORD
    ) {
      localStorage.setItem("isClubHead", "true");
      navigate("/club-head/create-event");
      return;
    }
    setMessage("Invalid club head credentials.");
  };

  return (
    <div>
      <PageHero
        title="Club Head Login"
        subtitle="Login to access the event creation dashboard."
      />

      <section className="mx-auto w-full max-w-xl px-4 py-12 lg:px-6">
        <form
          onSubmit={handleSubmit}
          className="surface p-6"
        >
          <label className="mb-2 block text-sm font-semibold text-slate-200">Username</label>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, username: e.target.value }))
            }
            className="input mb-4"
            placeholder="Enter username"
            required
          />

          <label className="mb-2 block text-sm font-semibold text-slate-200">Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }
            className="input"
            placeholder="Enter password"
            required
          />

          {message && <p className="mt-3 text-sm text-red-200">{message}</p>}

          <button className="btn btn-primary mt-5 w-full">
            Login and Continue
          </button>

          <Link
            to="/campus-life"
            className="link mt-4 inline-block text-sm"
          >
            Back to Campus Life
          </Link>
        </form>
      </section>
    </div>
  );
}

export default ClubHeadLogin;
