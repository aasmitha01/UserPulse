import { useEffect, useState } from "react";

export default function History() {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("claimHistory")) || [];
    setHistory(saved);
  }, []);

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Prediction History</h1>

      {history.length === 0 ? (
        <p>No history available</p>
      ) : (
        history.map((item, index) => (
          <div key={index} style={card}>

            <h2>
              {item.status === "FRAUD"
                ? "⚠️ Fraud Claim"
                : "✅ Legal Claim"}
            </h2>

            <p>Confidence: {item.confidence}%</p>
            <p>Age: {item.input?.age}</p>
            <p>Claim Amount: ${item.input?.totalClaim}</p>

            <p style={{ opacity: 0.6, fontSize: "14px" }}>
              {item.time}
            </p>

          </div>
        ))
      )}
    </div>
  );
}

const card = {
  background: "#0f172a",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "20px",
  boxShadow: "0 0 15px rgba(0,0,0,0.4)"
};