import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ImportanceChart from "../components/ImportanceChart";
import RiskMeter from "../components/RiskMeter";

export default function Result() {

  const location = useLocation();
  const navigate = useNavigate();

  // receive prediction data
  const result = location.state;

  /* ================= SAFETY REDIRECT ================= */
  useEffect(() => {
    if (!result) {
      // auto redirect after 2 sec
      setTimeout(() => {
        navigate("/analysis");
      }, 2000);
    }
  }, [result, navigate]);

  if (!result) {
    return (
      <div style={{ color: "white", padding: "40px" }}>
        <h2>No Result Found</h2>
        <p>Redirecting to New Analysis...</p>
      </div>
    );
  }

  const isFraud = result.status === "FRAUD";

  return (
    <div style={{ padding: "40px", color: "white" }}>

      {/* ================= TOP SECTION ================= */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "30px",
        alignItems: "center",
        marginBottom: "40px"
      }}>

        {/* RESULT CARD */}
        <div style={{
          background: isFraud
            ? "linear-gradient(135deg,#3a0a0a,#1a0000)"
            : "linear-gradient(135deg,#063b2d,#021a13)",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 0 25px rgba(0,0,0,0.4)"
        }}>

          <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
            {isFraud
              ? "⚠️ Fraud Claim Detected"
              : "✅ Legal Insurance Claim"}
          </h1>

          <p style={{ opacity: 0.8 }}>
            AI analysis completed successfully.
          </p>

          <h2 style={{ marginTop: "20px" }}>
            Confidence: {result.confidence}%
          </h2>

          {/* Confidence Bar */}
          <div style={{
            height: "10px",
            background: "#111",
            borderRadius: "10px",
            marginTop: "12px",
            overflow: "hidden"
          }}>
            <div style={{
              width: `${result.confidence}%`,
              height: "100%",
              background: isFraud ? "#ff4d4d" : "#22c55e",
              borderRadius: "10px",
              transition: "width 0.8s ease"
            }} />
          </div>

        </div>

        {/* RISK METER RIGHT SIDE */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <RiskMeter score={result.confidence} />
        </div>

      </div>


      {/* ================= SUMMARY SECTION ================= */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "20px",
        marginBottom: "40px"
      }}>

        <Card title="Age" value={`${result.input?.age ?? "-"} yrs`} />
        <Card title="Customer Since" value={`${result.input?.months ?? "-"} months`} />
        <Card title="Annual Premium" value={`$${result.input?.premium ?? "-"}`} />
        <Card title="Total Claim" value={`$${result.input?.totalClaim ?? "-"}`} />

      </div>


      {/* ================= AI DECISION FACTORS ================= */}
      <div>
        <h2 style={{ marginBottom: "15px" }}>
          AI Decision Factors
        </h2>

        {result.importance && result.importance.length > 0 && (
          <ImportanceChart data={result.importance} />
        )}
      </div>

    </div>
  );
}


/* ================= CARD COMPONENT ================= */
function Card({ title, value }) {
  return (
    <div style={{
      background: "#0b1220",
      padding: "25px",
      borderRadius: "12px",
      textAlign: "center",
      boxShadow: "0 0 15px rgba(0,0,0,0.35)",
      transition: "transform 0.2s ease"
    }}>
      <p style={{ opacity: 0.7 }}>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}