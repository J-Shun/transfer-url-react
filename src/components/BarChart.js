import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = ({ browserData, title }) => {
  const labels = browserData.map((browser) => browser.name);
  const visitors = browserData.map((browser) => browser.clicks);

  const options = {
    indexAxis: "y",
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
        text: title,
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
          display: false,
          drawBorder: false,
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

  const data = {
    labels,
    datasets: [
      {
        label: "Visitors",
        data: visitors,
        backgroundColor: "#3AFBD0",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};
