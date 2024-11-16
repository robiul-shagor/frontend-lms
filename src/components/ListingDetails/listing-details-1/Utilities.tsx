import React, { useState } from "react";
import { CgMathMinus } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";
import {
  IoFlash,
  IoScale,
  IoPhonePortrait,
  IoWater,
  IoWaterOutline,
  IoThermometer,
  IoConstruct,
} from "react-icons/io5";

const Utilities = ({ propertyData }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const utilityData = [
    {
      label: "Hydro",
      value: "-",
      icon: <IoFlash className="text-secondary" />,
      labelFontSize: "16px",
      valueFontSize: "14px",
    },
    {
      label: "Cable",
      value: propertyData?.CableYNA || "-",
      icon: <IoScale className="text-secondary" />,
      labelFontSize: "16px",
      valueFontSize: "14px",
    },
    // { label: 'Telephone', value: '-', icon: <IoPhonePortrait className="text-secondary" />, labelFontSize: '16px', valueFontSize: '14px' },
    {
      label: "Water",
      value: propertyData?.WaterSource || "-",
      icon: <IoWater className="text-secondary" />,
      labelFontSize: "16px",
      valueFontSize: "14px",
    },
    {
      label: "Sewers",
      value: propertyData?.Sewer || "-",
      icon: <IoWaterOutline className="text-secondary" />,
      labelFontSize: "16px",
      valueFontSize: "14px",
    },
    {
      label: "Heat source",
      value: propertyData?.HeatSource || "-",
      icon: <IoThermometer className="text-secondary" />,
      labelFontSize: "16px",
      valueFontSize: "14px",
    },
    {
      label: "Heat type",
      value: propertyData?.HeatType || "-",
      icon: <IoConstruct className="text-secondary" />,
      labelFontSize: "16px",
      valueFontSize: "14px",
    },
  ];

  return (
    <div className="mt-7 pt-3 border-t border-t-[#DADADA]">
      <div
        onClick={toggleExpand}
        className="d-flex cursor-pointer justify-content-between align-items-center"
      >
        <p className="fw-semibold text-dark fs-20 ">Utilities</p>
        <button className="bg-black text-white p-2 rounded-full">
          {isExpanded ? (
            <CgMathMinus className="text-xl text-white" />
          ) : (
            <FiPlus className="text-xl text-white" />
          )}
        </button>
      </div>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isExpanded ? "300px" : "0",
          // opacity: isExpanded ? '1' : '0',
        }}
      >
        <div className="d-flex mt-3 justify-between gap-3 flex-wrap rounded-4 align-items-start bg-white rounded-2 ">
          {utilityData.map((utility, index) => (
            <div
              key={index}
              className="d-flex md:w-2/5 w-full justify-between align-items-center"
            >
              <p
                style={{ fontSize: utility.labelFontSize }}
                className="fw-medium m-0 text-[#5a5a5a] d-flex align-items-center gap-1 "
              >
                {utility.icon} {utility.label}
              </p>
              <p
                style={{ fontSize: utility.valueFontSize }}
                className="text-[#5a5a5a] m-0 "
              >
                {utility.value === "" ? "-" : utility.value || "-"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Utilities;
