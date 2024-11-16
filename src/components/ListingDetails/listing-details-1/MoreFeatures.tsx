import React, { useState } from "react";
import { CgMathMinus } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";
import { IoCheckmark } from "react-icons/io5";
import {
  IoHomeOutline,
  IoLayersOutline,
  IoBusinessOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";

const MoreFeatures = ({ propertyData }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const featuresData = [
    // { label: 'Unit#', value: propertyData?.ApartmentNumber || '-', icon: <IoHomeOutline className="text-secondary" /> },
    // { label: 'Basement Features', value: '-', icon: <IoLayersOutline className="text-secondary" /> },
    // { label: 'Building Name', value: propertyData?.BuildingName || '-', icon: <IoBusinessOutline className="text-secondary" /> },
    // { label: 'Status', value: propertyData?.ContractStatus || '-', icon: <IoInformationCircleOutline className="text-secondary" /> },
    // { label: 'Lot Frontage', value: propertyData?.FrontageLength || '-', icon: <IoInformationCircleOutline className="text-secondary" /> },
    // { label: 'Inclusions', value: propertyData?.Inclusions || '-', icon: <IoInformationCircleOutline className="text-secondary" /> },
    {
      label: "Interior Features",
      value: propertyData?.InteriorFeatures?.join(", ") || "-",
      icon: <IoInformationCircleOutline className="text-secondary" />,
    },
    // { label: 'Square Footage', value: propertyData?.LivingAreaRange || '-', icon: <IoInformationCircleOutline className="text-secondary" /> },
    // { label: 'Sq Ft', value: propertyData?.LivingAreaUnits || '-', icon: <IoInformationCircleOutline className="text-secondary" /> },
    // { label: 'Locker', value: propertyData?.Locker || '-', icon: <IoInformationCircleOutline className="text-secondary" /> },
    // { label: 'Lot Depth', value: propertyData?.LotDepth || '-', icon: <IoInformationCircleOutline className="text-secondary" /> },
    {
      label: "Lot Acres",
      value: propertyData?.LotSizeRangeAcres || "-",
      icon: <IoInformationCircleOutline className="text-secondary" />,
    },
    // { label: 'Pets', value: '-', icon: <IoInformationCircleOutline className="text-secondary" /> },
    // { label: 'Class', value: propertyData?.PropertyType || '-', icon: <IoInformationCircleOutline className="text-secondary" /> },
    // { label: 'Tax Year', value: propertyData?.TaxYear || '-', icon: <IoInformationCircleOutline className="text-secondary" /> },
    // { label: 'Unparsed Address', value: propertyData?.UnparsedAddress || '-', icon: <IoInformationCircleOutline className="text-secondary" /> },
    // { label: 'Zoning', value: propertyData?.Zoning || '-', icon: <IoInformationCircleOutline className="text-secondary" /> },
  ];

  return (
    <div className="mt-7 mb-10 pt-3 border-t border-t-[#DADADA]">
      <div
        onClick={toggleExpand}
        className="d-flex cursor-pointer justify-content-between align-items-center"
      >
        <p className="fw-semibold text-dark fs-20 ">Interior Features</p>
        <button className="bg-black text-white p-2 rounded-full ">
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
          maxHeight: isExpanded ? "400px" : "0",
          // opacity: isExpanded ? '1' : '0',
        }}
      >
        <div className="d-flex mt-3 gap-3 flex-wrap rounded-4 align-items-start bg-white justify-between">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="d-flex justify-between md:w-2/5 w-full align-items-center"
            >
              <p
                style={{ fontSize: "18px" }}
                className="fw-medium m-0 text-black d-flex align-items-center gap-1 "
              >
                <IoCheckmark className="text-black" /> {feature.label}
              </p>
              <p style={{ fontSize: "18px" }} className="text-black m-0 ">
                {feature.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoreFeatures;
