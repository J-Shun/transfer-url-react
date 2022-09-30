import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        font: {
          size: 16,
        },
        color: "#fff",
      },
    },
    title: {
      display: true,
      text: "Visits",
      font: {
        size: 32,
      },
      color: "#fff",
    },
  },
  scales: {
    y: {
      ticks: {
        color: "#fff",
        font: {
          size: 16,
        },
      },
      grid: {
        borderColor: "#666",
        color: "#666",
      },
    },
    x: {
      ticks: {
        color: "#fff",
        font: {
          size: 16,
        },
      },
      grid: {
        borderColor: "#666",
        color: "#666",
      },
    },
  },
};

export function TimeChart({ timeSeriesData }) {
  function compare(a, b) {
    if (a.clickDate < b.clickDate) {
      return -1;
    }
    if (a.clickDate > b.clickDate) {
      return 1;
    }
    return 0;
  }
  timeSeriesData.sort(compare);
  const date = timeSeriesData.map((data) => data.clickDate);
  const visitors = timeSeriesData.map((data) => data.clicks);

  const labels = date.sort();
  const data = {
    labels,
    datasets: [
      {
        label: "Total",
        data: visitors,
        borderColor: "#3AFBD0",
        backgroundColor: "#3AFBD0",
      },
    ],
  };

  return <Line options={options} data={data} />;
}
