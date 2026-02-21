import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <div style={{
      width: "260px",
      background: "#020617",
      color: "white",
      padding: "25px",
      borderRight: "1px solid #1e293b"
    }}>
      <h2 style={{
  color:"#8b5cf6",
  display:"flex",
  alignItems:"center",
  gap:"8px",
  whiteSpace:"nowrap"
}}>

    
  🛡 <span>ClaimWatch AI</span>
</h2>

      <hr style={{borderColor:"#1e293b", margin:"20px 0"}}/>

      <Link to="/">📊 Dashboard</Link>
<br /><br />

<Link to="/analysis">🧠 New Analysis</Link>
<br /><br />

<Link to="/results">📈 Results</Link><br></br><br></br>
<Link to="/history">📜 History</Link><br></br>


      <Link to="/analysis">
  <button className="predict-btn" style={{
        marginTop:"30px",
        width:"100%"
      }}>
    New Prediction
  </button>
</Link><br></br><br></br>

    </div>
  );
}