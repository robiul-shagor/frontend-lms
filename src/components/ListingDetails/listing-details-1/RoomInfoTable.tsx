import React, { useState } from "react";
import { CgMathMinus } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";

const RoomInfoTable: React.FC = ({ data }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const roomData = [
    {
      room: "-",
      level: "-",
      dimensions: "-",
      feature1: "-",
      feature2: "-",
      feature3: "-",
    },
    {
      room: "-",
      level: "-",
      dimensions: "-",
      feature1: "-",
      feature2: "-",
      feature3: "-",
    },
    {
      room: "-",
      level: "-",
      dimensions: "-",
      feature1: "-",
      feature2: "-",
      feature3: "-",
    },
    {
      room: "-",
      level: "-",
      dimensions: "-",
      feature1: "-",
      feature2: "-",
      feature3: "-",
    },
    {
      room: "-",
      level: "-",
      dimensions: "-",
      feature1: "-",
      feature2: "-",
      feature3: "-",
    },
    {
      room: "-",
      level: "-",
      dimensions: "-",
      feature1: "-",
      feature2: "-",
      feature3: "-",
    },
  ];

  return (
    <div className="">
      <div
        onClick={toggleExpand}
        className="d-flex cursor-pointer justify-content-between align-items-center"
      >
        <p className="fw-semibold text-dark fs-20">Room info</p>
        <button className="bg-black text-white p-2 rounded-full">
          {isExpanded ? (
            <CgMathMinus className="text-xl text-white" />
          ) : (
            <FiPlus className="text-xl text-white" />
          )}
        </button>
      </div>

      {/* Expandable table section */}
      <div
        className="overflow-hidden mt-10 transition-all duration-300 bg-white"
        style={{
          maxHeight: isExpanded ? "400px" : "0",
        }}
      >
        <div className="overflow-x-auto ">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="">
                <th className="border border-gray-300 px-4 py-2">ROOM</th>
                <th className="border border-gray-300 px-4 py-2">LEVEL</th>
                <th className="border border-gray-300 px-4 py-2">DIMENSIONS</th>
                <th className="border border-gray-300 px-4 py-2">Feature 1</th>
                <th className="border border-gray-300 px-4 py-2">Feature 2</th>
                <th className="border border-gray-300 px-4 py-2">Feature 3</th>
              </tr>
            </thead>
            <tbody>
              {roomData.map((room, index) => (
                <tr key={index} className={`${index % 2 === 0 ? "" : ""}`}>
                  <td className="border border-gray-300 px-4 py-2">
                    {room.room}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {room.level}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {room.dimensions}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {room.feature1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {room.feature2}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {room.feature3}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoomInfoTable;
