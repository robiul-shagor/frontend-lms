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
  Price: number;
}

const data: DataPoint[] = [
  { date: "Jan", Price: 500000 },
  { date: "Feb", Price: 600000 },
  { date: "Mar", Price: 700000 },
  { date: "Apr", Price: 800000 },
  { date: "May", Price: 1405000 },
  { date: "Jun", Price: 950000 },
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
//           dataKey="Price"
//           stroke="#8884d8"
//           strokeWidth={3}
//           dot={false}
//           name="Price"
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
    <div className="w-full h-auto pr-20  md:rounded-[12px] rounded-[12px] ">
      <LineChart
        width={550}
        height={200}
        data={data}
        margin={{ left: 2, top: 10 }}
        className=" text-black text-[7px] font-[400] bg-none"
        style={{ width: "100%", height: "100%", padding: "0px" }}
      >
        <CartesianGrid strokeWidth={0.2} horizontal={true} vertical={false} />
        <XAxis
          dataKey="date"
          strokeWidth={0.01}
          padding={{ left: 10, right: 20 }}
        />

        <YAxis strokeWidth={0.01} dataKey={"Price"} />

        <Tooltip
          wrapperStyle={{ borderRadius: "2px" }} // Makes the entire tooltip container rounded
          cursor={{
            stroke: "#7d38df",
            strokeWidth: 0.5,
            strokeDasharray: "3 3",
          }}
          contentStyle={{
            backgroundColor: "#7d38df",
            color: "#ffffff",
            borderRadius: "12px",
          }}
          itemStyle={{ color: "#ffffff" }}
          // labelStyle={{ color: "#000000" }}
        />
        {/* <Legend /> */}

        <Line
          type="monotone"
          dataKey={"Price"}
          stroke="#9896f4"
          dot={false}
          strokeWidth={1}
        />
      </LineChart>
    </div>
  );
};

export default LineChartGraph;
