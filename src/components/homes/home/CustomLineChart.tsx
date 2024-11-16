"use client";
// // components/CustomLineChart.tsx
// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

interface DataPoint {
  date: string;
  "Median Price": number;
  "Total Sold": number;
}

const data: DataPoint[] = [
  { date: "2021-01", "Median Price": 500000, "Total Sold": 410200 },
  { date: "2021-06", "Median Price": 600000, "Total Sold": 522000 },
  { date: "2021-11", "Median Price": 700000, "Total Sold": 603300 },
  { date: "2022-04", "Median Price": 800000, "Total Sold": 700130 },
  { date: "2022-09", "Median Price": 1405000, "Total Sold": 254122 },
  { date: "2023-03", "Median Price": 950000, "Total Sold": 650310 },
  { date: "2023-07", "Median Price": 1100000, "Total Sold": 700410 },
  { date: "2023-12", "Median Price": 1200000, "Total Sold": 800320 },
  { date: "2024-05", "Median Price": 1300000, "Total Sold": 850530 },
];

// const CustomLineChart: React.FC = () => {
//   const isMobile = window.innerWidth < 768; // You can adjust the breakpoint as needed

//   const chartStyle = {
//     margin: "0 auto",
//     borderRadius: "30px",
//     backgroundColor: "white",
//     padding: isMobile ? "5px" : "20px", // Adjust padding for mobile
//   };

//   const tooltipStyle = {
//     backgroundColor: "#ffffff",
//     color: "#000000",
//     borderRadius: "8px",
//     fontSize: isMobile ? "10px" : "12px", // Adjust font size for mobile
//   };

//   return (
//     <ResponsiveContainer width="100%" height={400} style={chartStyle}>
//       <LineChart
//         data={data}
//         margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
//       >
//         <CartesianGrid stroke="#f5f5f5" vertical={false} horizontal={true} />
//         <XAxis
//           dataKey="date"
//           strokeWidth={0}
//           style={{
//             fontSize: isMobile ? "12px" : "14px", // Adjust font size for XAxis
//           }}
//         />
//         <YAxis
//           yAxisId="left"
//           tickFormatter={(value) => `$${value.toLocaleString()}`}
//           strokeWidth={0}
//           style={{
//             fontSize: isMobile ? "12px" : "14px", // Adjust font size for YAxis
//           }}
//         />
//         <YAxis
//           yAxisId="right"
//           orientation="right"
//           tickFormatter={(value) => `${value}`}
//           strokeWidth={0}
//           style={{
//             fontSize: isMobile ? "12px" : "14px", // Adjust font size for right YAxis
//           }}
//         />
//         <Tooltip
//           wrapperStyle={{ borderRadius: "2px" }} // Makes the entire tooltip container rounded
//           cursor={{
//             stroke: "#9896f4",
//             strokeWidth: 0.5,
//             strokeDasharray: "3 3",
//           }}
//           contentStyle={tooltipStyle}
//           itemStyle={{ color: "#0f0f10" }}
//           labelStyle={{ color: "#000000" }}
//         />
//         <Legend />
//         <Line
//           yAxisId="left"
//           type="monotone"
//           dataKey="Median Price"
//           stroke="#8884d8"
//           strokeWidth={3}
//           dot={false}
//           name="Median Price"
//         />
//         <Line
//           yAxisId="right"
//           type="monotone"
//           dataKey="Total Sold"
//           stroke="#82ca9d"
//           strokeWidth={3}
//           dot={false}
//           name="Total Sold"
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default CustomLineChart;

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const LineChartGraph = () => {
  return (
    <div className="w-full font-urbanist h-auto max-w-[650px] bg-white md:rounded-[30px] rounded-[15px] md:max-w-full">
      <LineChart
        width={650}
        height={270}
        data={data}
        margin={{ left: 10, top: 10 }}
        className=" text-black text-[7px] font-[400] bg-none"
        style={{ width: "100%", height: "100%" }}
      >
        <CartesianGrid strokeWidth={0.2} horizontal={true} vertical={false} />
        <XAxis
          dataKey="date"
          strokeWidth={0.01}
          padding={{ left: 30, right: 20 }}
        />

        <YAxis strokeWidth={0.01} dataKey={"Median Price"} />

        <YAxis orientation="right" strokeWidth={0.01} dataKey={"Total Sold"} />

        <Tooltip
          wrapperStyle={{ borderRadius: "2px" }} // Makes the entire tooltip container rounded
          cursor={{
            stroke: "#9896f4",
            strokeWidth: 0.5,
            strokeDasharray: "3 3",
          }}
          contentStyle={{
            backgroundColor: "#ffffff",
            color: "#000000",
            borderRadius: "8px",
          }}
          itemStyle={{ color: "#0f0f10" }}
          labelStyle={{ color: "#000000" }}
        />
        <Legend />

        <Line
          type="monotone"
          dataKey={"Median Price"}
          stroke="#9896f4"
          dot={false}
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey={"Total Sold"}
          stroke="#8dd8aa"
          dot={false}
          strokeWidth={3}
        />
      </LineChart>
    </div>
  );
};

export default LineChartGraph;
