import { useEffect, useState } from "react";

export default function RiskMeter({ score }) {

  const [progress, setProgress] = useState(0);

  // smooth animation
  useEffect(() => {
    let start = 0;

    const interval = setInterval(() => {
      start += 1;
      setProgress(start);

      if (start >= score) clearInterval(interval);
    }, 15);

    return () => clearInterval(interval);
  }, [score]);

  const isFraud = score >= 60;

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (progress / 100) * circumference;

  return (
    <div style={container}>

      <svg width="220" height="220">

        {/* Background circle */}
        <circle
          cx="110"
          cy="110"
          r={radius}
          stroke="#111827"
          strokeWidth="14"
          fill="none"
        />

        {/* Animated progress */}
        <circle
          cx="110"
          cy="110"
          r={radius}
          stroke={isFraud ? "#ff4d4d" : "#22c55e"}
          strokeWidth="14"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.4s ease",
            filter: isFraud
              ? "drop-shadow(0 0 15px #ff4d4d)"
              : "drop-shadow(0 0 15px #22c55e)"
          }}
          transform="rotate(-90 110 110)"
        />
      </svg>

      {/* CENTER TEXT */}
      <div style={centerText}>
        <h1>{progress}%</h1>
        <p>AI Risk Score</p>
      </div>
    </div>
  );
}

/* ---------- STYLES ---------- */

const container = {
  position: "relative",
  width: "220px",
  height: "220px",
  margin: "auto",
  animation: "pulseGlow 2s infinite alternate"
};

const centerText = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  color: "white"
};