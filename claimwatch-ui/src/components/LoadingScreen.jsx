export default function LoadingScreen() {
  return (
    <div style={{
      height: "100vh",
      background: "#020617",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white"
    }}>
      
      <div className="loader"></div>

      <h2 style={{marginTop:"20px"}}>
        🤖 Analyzing Insurance Claim...
      </h2>

      <p style={{opacity:0.6}}>
        AI models are evaluating fraud patterns
      </p>
    </div>
  );
}