import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function ImportanceChart({ data }) {

  const chartData = data.map((v, i) => ({
    name: `Feature ${i+1}`,
    value: v
  }));

  return (
    <div style={{height:"300px"}}>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="name"/>
          <YAxis/>
          <Tooltip/>
          <Bar dataKey="value" fill="#8b5cf6"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}