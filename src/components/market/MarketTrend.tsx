"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Price",
      data: [2400, 1398, 9800, 3908, 4800, 3800],
      backgroundColor: "#e6d4ff", // Bar color
      borderColor: "rgba(136, 132, 216, 1)",
      borderWidth: 0,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    tooltip: {
      enabled: true,
    },
  },
  scales: {
    x: {
      grid: {
        display: true,
      },
    },
    y: {
      grid: {
        drawBorder: false,
        display: true,
      },
    },
  },
  barPercentage: 0.5,
  categoryPercentage: 0.5,
};

const MarketTrendGraph = () => {
  return (
    <div className="md:w-[85%] w-[95%] mx-auto my-3">
      <h1 className="text-black text-[34px] font-bold">Market Trend</h1>
      <p className="text-[#595F67] text-[16px] ">
        Home prices in Milton have increased by 5% over the last three months
      </p>
      <p className="text-[#595F67] text-[16px] mb-3">due to higher demand</p>
      <div className="w-full md:p-3 p-1 bg-white rounded-[12px]">
        <p className="text-black font-bold md:text-[24px] text-[18px] mb-3">
          Trend over the last six Month Price Changes & Sales Volume
        </p>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MarketTrendGraph;
