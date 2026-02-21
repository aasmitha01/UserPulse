import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

export default function NewAnalysis() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
  age: "",
  months: "",
  premium: "",
  totalClaim: "",
  injury: "",
  property: "",
  vehicle: "",
  severity: "",
  education: "",
  occupation: "",
  autoYear: ""
});

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      // SAVE HISTORY
      const history =
        JSON.parse(localStorage.getItem("claimHistory")) || [];

      history.unshift(data);

      localStorage.setItem(
        "claimHistory",
        JSON.stringify(history.slice(0, 10))
      );

      setLoading(false);

      navigate("/result", { state: data });

    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Prediction failed. Check backend.");
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div style={container}>
      <h1>New Claim Analysis</h1>
      <p style={{ color: "#9ca3af" }}>
        Submit claim details for ML fraud prediction
      </p>

      {/* ================= CUSTOMER DETAILS ================= */}
      <div style={card}>
        <h3>01 Customer Details</h3>

        <div style={grid3}>
          <input name="age" placeholder="Age" style={input} onChange={handleChange}/>
          <input name="months" placeholder="Months as Customer" style={input} onChange={handleChange}/>
          <input name="premium" placeholder="Annual Premium ($)" style={input} onChange={handleChange}/>
        </div>
      </div>

      {/* ================= CLAIM AMOUNTS ================= */}
      <div style={grid2}>
  <input
    name="totalClaim"
    placeholder="Total Claim Amount ($)"
    style={input}
    onChange={handleChange}
  />

  <input
    name="injury"
    placeholder="Injury Claim ($)"
    style={input}
    onChange={handleChange}
  />

  {/* ✅ NEW */}
  <input
    name="property"
    placeholder="Property Claim ($)"
    style={input}
    onChange={handleChange}
  />

  {/* ✅ NEW */}
  <input
    name="vehicle"
    placeholder="Vehicle Claim ($)"
    style={input}
    onChange={handleChange}
  />
</div>
<br></br>

<select name="severity" style={input} onChange={handleChange}>
  <option value="">Incident Severity</option>
  <option value="Minor Damage">Minor Damage</option>
  <option value="Major Damage">Major Damage</option>
  <option value="Total Loss">Total Loss</option>
</select><br></br><br></br>

<select name="education" style={input} onChange={handleChange}>
  <option value="">Education Level</option>
  <option value="Bachelor">Bachelor</option>
  <option value="Masters">Masters</option>
</select>
<br></br><br></br>
<select name="occupation" style={input} onChange={handleChange}>
  <option value="">Occupation</option>
  <option value="exec-managerial">exec-managerial</option>
  <option value="tech-support">tech-support</option>
</select><br></br><br></br>

<input
  name="autoYear"
  placeholder="Auto Year"
  style={input}
  onChange={handleChange}
/>

      {/* ================= BUTTON ================= */}
      <button style={predictBtn} onClick={handleSubmit}>
        🧠 Submit for AI Prediction
      </button>

    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  padding: "40px",
  color: "white",
};

const card = {
  background: "#0f172a",
  padding: "25px",
  borderRadius: "14px",
  marginTop: "25px",
  boxShadow: "0 0 20px rgba(0,0,0,0.4)"
};

const grid3 = {
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gap: "50px",
  marginTop: "15px"
};

const grid2 = {
  display: "grid",
  gridTemplateColumns: "repeat(2,1fr)",
  gap: "50px",
  marginTop: "15px"
};

const input = {
  padding: "14px",
  borderRadius: "10px",
  border: "1px solid #1e293b",
  background: "#020617",
  color: "white",
  fontSize: "15px",
  width: "100%",        // keep responsive
  boxSizing: "border-box"
};

const predictBtn = {
  marginTop: "30px",
  padding: "16px",
  width: "100%",
  border: "none",
  borderRadius: "10px",
  background: "linear-gradient(90deg,#6366f1,#9333ea)",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer"
};