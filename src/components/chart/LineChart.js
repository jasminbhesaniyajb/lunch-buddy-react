import React from "react";
import { Line } from "react-chartjs-2";

function LineChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "new students",
        data: [3, 2, 2, 1, 5],
        borderColor: ["rgba(255,206,86,0.2)"],
        backgroundColor: ["rgba(255,206,86,0.2)"],
        pointBackgroundColor: "rgba(255,206,86,0.2)",
        pointBorderColor: "rgba(255,206,86,0.2)",
      },
      {
        label: "old students",
        data: [1, 3, 2, 2, 3],
        borderColor: ["rgba(54,162,235,0.2)"],
        backgroundColor: ["rgba(54,162,235,0.2)"],
        pointBackgroundColor: "rgba(54,162,235,0.2)",
        pointBorderColor: "rgba(54,162,235,0.2)",
      },
    ],
  };
  return (
    <React.Fragment>
      <div>
        <Line data={data} />
      </div>
    </React.Fragment>
  );
}

export default LineChart;
