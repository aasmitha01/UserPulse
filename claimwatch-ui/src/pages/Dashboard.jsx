import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {

  const data = [
    { name: "Legal Claims", value: 72 },
    { name: "Fraud Claims", value: 28 }
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div style={{ padding: "40px", color: "white" }}>

      <h1>AI Analytics Dashboard</h1>
      <p style={{opacity:0.7}}>Insurance Fraud Insights</p>

      {/* STATS */}
      <div style={statsGrid}>
        <StatCard title="Total Claims" value="1,240"/>
        <StatCard title="Fraud Rate" value="28%"/>
        <StatCard title="Model Accuracy" value="89.1%"/>
      </div>

      {/* PIE CHART */}
      <div style={chartCard}>
        <h3>Fraud Detection Distribution</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip/>
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

/* COMPONENTS */

function StatCard({title,value}) {
  return (
    <div style={{
      background:"#0f172a",
      padding:"25px",
      borderRadius:"14px"
    }}>
      <p style={{opacity:0.6}}>{title}</p>
      <h2>{value}</h2>
    </div>
  );
}

const statsGrid = {
  display:"grid",
  gridTemplateColumns:"repeat(3,1fr)",
  gap:"20px",
  marginTop:"30px"
};

const chartCard = {
  background:"#0f172a",
  marginTop:"40px",
  padding:"25px",
  borderRadius:"14px"
};