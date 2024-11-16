import React, { useState } from "react";
import { IoIosBed } from "react-icons/io";
import { CgMathMinus } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";

const DistinctiveOtherFee = ({ propertyData }: any) => {
  const [isBasementExpanded, setIsBasementExpanded] = useState(false);
  const [isParkingExpanded, setIsParkingExpanded] = useState(false);

  const distinctiveFeatures = [
    { label: "Separate Entrance", value: "-" },
    { label: "Entrance Type", value: "-" },
    {
      label: "Basement Kitchen",
      value: propertyData?.KitchensBelowGrade || "-",
    },
  ];

  const otherFees = [
    { label: "Garage Type", value: propertyData?.GarageType || "-" },
    { label: "Garage Spaces", value: propertyData?.GarageParkingSpaces || "-" },
    { label: "Driveway Parking", value: propertyData?.ParkingSpaces || "-" },
  ];

  const toggleBasement = () => {
    setIsBasementExpanded(!isBasementExpanded);
  };

  const toggleParking = () => {
    setIsParkingExpanded(!isParkingExpanded);
  };

  return (
    <div className="d-flex mt-3 pt-3 row align-items-center gap-4 border-t border-t-[#DADADA]">
      <div className="col-12">
        <div
          onClick={toggleBasement}
          className="d-flex cursor-pointer justify-content-between align-items-center"
        >
          <p className="fw-semibold text-dark fs-20 ">Basement</p>
          <button className="bg-black text-white p-2 rounded-full ">
            {isBasementExpanded ? (
              <CgMathMinus className="text-xl text-white" />
            ) : (
              <FiPlus className="text-xl text-white" />
            )}
          </button>
        </div>
        <div
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: isBasementExpanded ? "200px" : "0",
            opacity: isBasementExpanded ? "1" : "0",
          }}
        >
          <div className="d-flex mt-3 w-full gap-3 rounded-4 flex-wrap justify-between align-items-start bg-white p-3y rounded-2">
            {distinctiveFeatures.map((feature, index) => (
              <div
                key={index}
                className="d-flex align-items-center justify-between md:w-2/5 w-full"
              >
                <p
                  style={{ fontSize: "16px" }}
                  className="fw-medium m-0 d-flex  align-items-center text-[#5a5a5a] gap-1"
                >
                  <IoIosBed className="text-[#5a5a5a]" /> {feature.label}
                </p>
                <p style={{ fontSize: "14px" }} className=" m-0 text-[#5a5a5a]">
                  {feature.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="col-12 mt-0 pt-3 border-t border-t-[#DADADA]">
        <div
          onClick={toggleParking}
          className="d-flex justify-content-between align-items-center"
        >
          <p className="fw-semibold text-dark fs-20 ">Parking</p>
          <button className="bg-black text-white p-2 rounded-full ">
            {isParkingExpanded ? (
              <CgMathMinus className="text-xl text-white" />
            ) : (
              <FiPlus className="text-xl text-white" />
            )}
          </button>
        </div>
        <div
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: isParkingExpanded ? "200px" : "0",
            opacity: isParkingExpanded ? "1" : "0",
          }}
        >
          <div className="d-flex mt-3 gap-3 rounded-4 justify-between flex-wrap align-items-start bg-white rounded-2">
            {otherFees.map((fee, index) => (
              <div
                key={index}
                className="d-flex justify-between align-items-center md:w-2/5 w-full"
              >
                <p
                  style={{ fontSize: "16px" }}
                  className="fw-medium m-0  d-flex align-items-center gap-1 text-[#5a5a5a] "
                >
                  <IoIosBed className="text-[#5a5a5a]" /> {fee.label}
                </p>
                <p style={{ fontSize: "14px" }} className="m-0 text-[#5a5a5a] ">
                  {fee.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistinctiveOtherFee;
