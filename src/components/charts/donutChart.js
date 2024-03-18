import React from "react";
import styles from "./donutChart.module.css";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const DonutChart = ({ valueOne, valueTwo }) => {
  // Sample data for the chart
  const data = [
    { name: "Risk", value: valueOne },
    { name: "Reward", value: valueTwo },
  ];

  // Define colors for the chart
  const COLORS = ["#284d5f", "#0c969a"];

  return (
    <ResponsiveContainer
      className={styles.responsive_container}
      width="100%"
      height="100%"
    >
      <PieChart height={100}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke={"none"}
            />
          ))}
        </Pie>
        <Legend
          layout="vertical"
          verticalAlign="middle"
          iconSize={10}
          iconType="circle"
          wrapperStyle={{
            position: "absolute",
            left: "52%",
            top: "50.2%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
