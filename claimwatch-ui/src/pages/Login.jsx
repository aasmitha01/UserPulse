import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    // fake auth (for project demo)
    localStorage.setItem("token", "loggedin");

    navigate("/");
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#020617",
      color: "white",
      flexDirection: "column"
    }}>
      
      <h1 style={{ marginBottom: "20px" }}>
        ClaimWatch AI Login
      </h1>

      <input
        placeholder="Enter Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        style={{
          padding: "12px",
          width: "250px",
          marginBottom: "15px",
          borderRadius: "8px",
          border: "1px solid #334155",
          background: "#0f172a",
          color: "white"
        }}
      />

      <button
        onClick={handleLogin}
        style={{
          padding: "12px 25px",
          borderRadius: "8px",
          border: "none",
          background: "linear-gradient(90deg,#6366f1,#9333ea)",
          color: "white",
          cursor: "pointer"
        }}
      >
        Login
      </button>

    </div>
  );
}