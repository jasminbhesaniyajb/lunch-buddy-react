import React from "react";
import { Bar } from "react-chartjs-2";

function BarChart() {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Student Performance Chart",
        data: [3, 2, 2, 9, 5, 3, 2, 4, 2, 5, 3, 12],
        borderColor: ["rgba(255,206,86,0.2)"],
        backgroundColor: ["rgba(255,206,86,0.2)"],
      },      
    ],
  };
  return (
    <React.Fragment>
      <div>
        <Bar data={data} />
      </div>
    </React.Fragment>
  );
}

export default BarChart;
