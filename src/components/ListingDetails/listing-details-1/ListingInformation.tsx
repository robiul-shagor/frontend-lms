import React, { useState } from "react";
import { CgMathMinus } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";
import { IoCheckmark } from "react-icons/io5";

const ListingData = [
  {
    Listed: "03/15/2020",
  },
  {
    "MLS#": "W5342689",
  },
  {
    "Last Updated": "02/14/2023",
  },
  {
    Posession: "03/14/2024",
  },
  {
    "Original Price": "$1,256,134",
  },
  {
    Taxes: "$2876.04",
  },
];

const propertyMockData = [
  {
    Bedrooms: "03",
  },
  {
    Bedrooms: 5,
  },
  {
    Bathrooms: "02",
  },
  {
    Washrooms: 4,
  },
  {
    "Approx. Age": "5-10 yr",
  },
  {
    Kitchens: 1,
  },
  {
    "Lot Size": "103`x 200`",
  },
  {
    "Property Type": "Detached",
  },
  {
    "Sq Footage": "2000-2500",
  },
  {
    Status: "For Sale",
  },
];

const parkingData = [
  {
    "Drive Parking": 2,
  },
  {
    "Garage Parking": 2,
  },
];

const basementData = [
  {
    Status: "Finished",
  },
  {
    Entrance: "Walkout",
  },
];

const UtilitiesData = [
  { "Central A/C": "Yes" },
  { "Heat Source": "Gas / Forced Air" },
  {
    Water: "Municipal",
  },
  {
    Sewers: "Septic",
  },
];

const interiorData = [
  "A/C & Heating",
  "Garage",
  "Swimming Pool",
  "Parking",
  "Garden",
  "Disabled Access",
  "Pet Friendly",
  "Ceiling Height",
  "Refriegerator",
  "Fire Place",
  "Elevator",
  "Wifi",
];

const DistinctiveOtherFee = ({ propertyData }: any) => {
  const [isListingExpanded, setIsListingExpanded] = useState(true);
  const [isPropertyExpanded, setIsPropertyExpanded] = useState(true);
  const [isBasementExpanded, setIsBasementExpanded] = useState(true);
  const [isParkingExpanded, setIsParkingExpanded] = useState(true);
  const [isUtilitiesExpanded, setIsUtilitiesExpanded] = useState(true);
  const [isInteriorExpanded, setIsInteriorExpanded] = useState(true);

  // const distinctiveFeatures = [
  //   { label: "Separate Entrance", value: "-" },
  //   { label: "Entrance Type", value: "-" },
  //   { label: "Basement Kitchen", value: propertyData?.KitchensBelowGrade },
  // ];

  // const otherFees = [
  //   { label: "Garage Type", value: propertyData?.GarageType || "-" },
  //   { label: "Garage Spaces", value: propertyData?.GarageParkingSpaces || "-" },
  //   { label: "Driveway Parking", value: propertyData?.ParkingSpaces || "-" },
  // ];

  const toggleListing = () => {
    setIsListingExpanded(!isListingExpanded);
  };

  const toggleProperty = () => {
    setIsPropertyExpanded(!isPropertyExpanded);
  };
  const toggleBasement = () => {
    setIsBasementExpanded(!isBasementExpanded);
  };

  const toggleParking = () => {
    setIsParkingExpanded(!isParkingExpanded);
  };
  const toggleUtilities = () => {
    setIsUtilitiesExpanded(!isUtilitiesExpanded);
  };
  const toggleInterior = () => {
    setIsInteriorExpanded(!isInteriorExpanded);
  };

  return (
    <div className="w-full ">
      <div className="w-full py-4">
        <div
          onClick={toggleListing}
          className="flex justify-between font-abhaya items-center cursor-pointer  w-full"
        >
          <p className="text-black font-[500] md:text-[24px] text-[20px] ">
            Listing Information
          </p>
          <button className="bg-black text-white md:h-[30px] h-[27px] md:w-[30px] w-[27px] flex justify-center items-center md:p-2 p-1 rounded-full">
            {isListingExpanded ? (
              <CgMathMinus className="text-xl text-white" />
            ) : (
              <FiPlus className="text-xl text-white" />
            )}
          </button>
        </div>
        <div
          className="overflow-hidden font-lato transition-all duration-300"
          style={{
            maxHeight: isListingExpanded ? "700px" : "0",
            opacity: isListingExpanded ? "1" : "0",
          }}
        >
          <div className="flex mt-3 w-full gap-3 rounded-4 flex-wrap justify-between items-center bg-white py-3 rounded-2">
            <div
              className="md:w-2/5 w-full flex justify-between items-center"
            >
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400] ">
                Listed:
              </p> 
              <p className="text-black md:text-[17px] text-[15px] font-[400]">
                {new Date(propertyData.OriginalEntryTimestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>         
            <div
              className="md:w-2/5 w-full flex justify-between items-center"
            >
              <p className="text-black md:text-[17px] text-[15px] font-[400] ">
                MLS#: 
              </p>
              <p className="text-black md:text-[17px] text-[15px] font-[400]">
                {propertyData.ListingKey}
              </p>
            </div>            
            
            <div
              className="md:w-2/5 w-full flex justify-between items-center"
            >
              <p className="text-black md:text-[17px] text-[15px] font-[400] ">
                Last Updated: 
              </p>
              <p className="text-black md:text-[17px] text-[15px] font-[400]">
                {new Date(propertyData.ModificationTimestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>            
            
            {/* <div
              className="md:w-2/5 w-full flex justify-between items-center"
            >
              <p className="text-black md:text-[17px] text-[15px] font-[400] ">
                Posession: 
              </p>
              <p className="text-black md:text-[17px] text-[15px] font-[400]">
                
              </p>
            </div>          */}
            
            <div
              className="md:w-2/5 w-full flex justify-between items-center"
            >
              <p className="text-black md:text-[17px] text-[15px] font-[400] ">
                Original Price: 
              </p>
              <p className="text-black md:text-[17px] text-[15px] font-[400]">
                {`${propertyData?.OriginalListPrice !== null ? `${propertyData?.OriginalListPrice.toLocaleString()}` : ""}`}
              </p>
            </div>         
            
            <div
              className="md:w-2/5 w-full flex justify-between items-center"
            >
              <p className="text-black md:text-[17px] text-[15px] font-[400] ">
                Taxes: 
              </p>
              <p className="text-black md:text-[17px] text-[15px] font-[400]">
                {`${propertyData?.TaxAnnualAmount !== null ? `${propertyData?.TaxAnnualAmount.toLocaleString()}` : ""}`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-t-[#DADADA] w-full  py-4">
        <div
          onClick={toggleProperty}
          className="flex justify-between font-abhaya items-center cursor-pointer  w-full"
        >
          <p className="text-black font-[500] md:text-[24px] text-[20px] ">
            Property Details
          </p>
          <button className="bg-black text-white md:h-[30px] md:w-[30px] h-[27px] w-[27px] flex justify-center items-center md:p-2 p-1 rounded-full">
            {isPropertyExpanded ? (
              <CgMathMinus className="text-xl text-white" />
            ) : (
              <FiPlus className="text-xl text-white" />
            )}
          </button>
        </div>
        <div
          className="overflow-hidden font-lato transition-all duration-300"
          style={{
            maxHeight: isPropertyExpanded ? "700px" : "0",
            opacity: isPropertyExpanded ? "1" : "0",
          }}
        >
          <div className="flex mt-3 w-full gap-3 rounded-4 flex-wrap justify-between items-center bg-white py-3 rounded-2">
            <div className="md:w-2/5 w-full flex justify-between items-center">
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400]">Bedrooms :</p>
              <p className="text-black md:text-[17px] text-[15px] font-[400]">{`${propertyData.BedroomsAboveGrade} + ${propertyData.BedroomsBelowGrade}`}</p> 
            </div>         
            
            <div className="md:w-2/5 w-full flex justify-between items-center">
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400]">Bathrooms :</p>
              <p className="text-black md:text-[17px] text-[15px] font-[400]">0{propertyData.BathroomsTotalInteger}</p>
            </div>           
            
            <div className="md:w-2/5 w-full flex justify-between items-center">
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400]">Approx. Age :</p>
              <p className="text-black md:text-[17px] text-[15px] font-[400]">{`${propertyData?.ApproximateAge !== null ? `${propertyData?.ApproximateAge}` : "-"}`}</p>
            </div>   
            
            <div className="md:w-2/5 w-full flex justify-between items-center">
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400]">Kitchens :</p>
              <p className="text-black md:text-[17px] text-[15px] font-[400]">{`${propertyData?.KitchensTotal !== null ? `0${propertyData?.KitchensTotal}` : "-"}`}</p>
            </div>     
            
            <div className="md:w-2/5 w-full flex justify-between items-center">
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400]">Lot Size :</p>
              <p className="text-black md:text-[17px] text-[15px] font-[400]">{`${propertyData?.LotSizeRangeAcres !== null ? `${propertyData?.LotSizeRangeAcres}` : "-"}`}</p>
            </div>        
            
            <div className="md:w-2/5 w-full flex justify-between items-center">
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400]">Property Type :</p>
              <p className="text-black md:text-[17px] text-[15px] font-[400]">{`${propertyData?.PropertySubType !== null ? `${propertyData?.PropertySubType}` : "-"}`}</p>
            </div>       
            
            <div className="md:w-2/5 w-full flex justify-between items-center">
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400]">Sq Footage :</p>
              <p className="text-black md:text-[17px] text-[15px] font-[400]">{`${propertyData?.LivingAreaRange !== null ? `${propertyData?.LivingAreaRange}` : "-"}`}</p>
            </div>      
            
            <div className="md:w-2/5 w-full flex justify-between items-center">
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400]">Status :</p>
              <p className="text-black md:text-[17px] text-[15px] font-[400]">{`${propertyData?.TransactionType !== null ? `${propertyData?.TransactionType}` : ""}`}</p>
            </div>      
            
            <div className="md:w-2/5 w-full flex justify-between items-center">
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400]">Class :</p>
              <p className="text-black md:text-[17px] text-[15px] font-[400]">{`${propertyData?.PropertyType !== null ? `${propertyData?.PropertyType}` : ""}`}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-t-[#DADADA] w-full  py-4">
        <div
          onClick={toggleBasement}
          className="flex justify-between font-abhaya items-center cursor-pointer  w-full"
        >
          <p className="text-black font-[500] md:text-[24px] md:w-[35px] text-[20px] ">
            Basement
          </p>
          <button className="bg-black text-white md:h-[30px] md:w-[30px] h-[27px] w-[27px] flex justify-center items-center md:p-2 p-1 rounded-full">
            {isBasementExpanded ? (
              <CgMathMinus className="text-xl text-white" />
            ) : (
              <FiPlus className="text-xl text-white" />
            )}
          </button>
        </div>
        <div
          className="overflow-hidden font-lato transition-all duration-300"
          style={{
            maxHeight: isBasementExpanded ? "700px" : "0",
            opacity: isBasementExpanded ? "1" : "0",
          }}
        >
          <div className="flex mt-3 w-full gap-3 rounded-4 flex-wrap justify-between items-center bg-white py-3 rounded-2">
            <div
              className="md:w-2/5 w-full flex justify-between items-center"
            >
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400] ">
              Status:
              </p>
              <p className="text-[#000000] md:text-[17px] text-[15px] font-[400] ">
              {propertyData?.Basement?.[0] || "N/A"}
              </p>
            </div>            
            
            <div
              className="md:w-2/5 w-full flex justify-between items-center"
            >
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400] ">
              Entrance:
              </p>
              <p className="text-[#000000] md:text-[17px] text-[15px] font-[400] ">
              {propertyData?.Basement?.[1] || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-t-[#DADADA] w-full  py-4">
        <div
          onClick={toggleParking}
          className="flex justify-between font-abhaya items-center cursor-pointer  w-full"
        >
          <p className="text-black font-[500] md:text-[24px] text-[20px] ">
            Parking
          </p>
          <button className="bg-black text-white md:h-[30px] md:w-[30px] h-[27px] w-[27px] flex justify-center items-center md:p-2 p-1 rounded-full">
            {isParkingExpanded ? (
              <CgMathMinus className="text-xl text-white" />
            ) : (
              <FiPlus className="text-xl text-white" />
            )}
          </button>
        </div>
        <div
          className="overflow-hidden font-lato transition-all duration-300"
          style={{
            maxHeight: isParkingExpanded ? "700px" : "0",
            opacity: isParkingExpanded ? "1" : "0",
          }}
        >
          <div className="flex mt-3 w-full gap-3 rounded-4 flex-wrap justify-between items-center bg-white py-3 rounded-2">
            <div
              className="md:w-2/5 w-full flex justify-between items-center"
            >
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400] ">
                Garage Parking
              </p>
              <p className="text-[#000] md:text-[17px] text-[15px] font-[400] ">
                {`${propertyData?.GarageParkingSpaces !== null ? `${propertyData?.GarageParkingSpaces}` : "-"}`}
              </p>
            </div>   
            
            <div
              className="md:w-2/5 w-full flex justify-between items-center"
            >
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400] ">
                Total Parking
              </p>
              <p className="text-[#000] md:text-[17px] text-[15px] font-[400] ">
                {`${propertyData?.ParkingTotal !== null ? `${propertyData?.ParkingTotal}` : ""}`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-t-[#DADADA] w-full  py-4">
        <div
          onClick={toggleUtilities}
          className="flex justify-between font-abhaya items-center cursor-pointer  w-full"
        >
          <p className="text-black font-[500] md:text-[24px] text-[20px] ">
            Utilities
          </p>
          <button className="bg-black text-white md:h-[30px] md:w-[30px] h-[27px] w-[27px] flex justify-center items-center md:p-2 p-1 rounded-full">
            {isUtilitiesExpanded ? (
              <CgMathMinus className="text-xl text-white" />
            ) : (
              <FiPlus className="text-xl text-white" />
            )}
          </button>
        </div>
        <div
          className="overflow-hidden font-lato transition-all duration-300"
          style={{
            maxHeight: isUtilitiesExpanded ? "700px" : "0",
            opacity: isUtilitiesExpanded ? "1" : "0",
          }}
        >
          <div className="flex mt-3 w-full gap-3 rounded-4 flex-wrap justify-between items-center bg-white py-3 rounded-2">
            <div
              className="md:w-2/5 w-full flex justify-between items-center"
            >
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400] ">
              Central A/C:
              </p>
              <p className="text-[#000] md:text-[17px] text-[15px] font-[400] ">
              {`${propertyData?.Cooling !== null ? `${propertyData?.Cooling}` : ""}`}
              </p>
            </div>           
            
            <div
              className="md:w-2/5 w-full flex justify-between items-center"
            >
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400] ">
              Heat Source:
              </p>
              <p className="text-[#000] md:text-[17px] text-[15px] font-[400] ">
              {`${propertyData?.HeatSource !== null ? `${propertyData?.HeatSource}` : ""}`}
              </p>
            </div>       
            
            <div
              className="md:w-2/5 w-full flex justify-between items-center"
            >
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400] ">
              Water:
              </p>
              <p className="text-[#000] md:text-[17px] text-[15px] font-[400] ">
              {`${propertyData?.Water !== null ? `${propertyData?.Water}` : ""}`}
              </p>
            </div>         
            
            <div
              className="md:w-2/5 w-full flex justify-between items-center"
            >
              <p className="text-[#5a5a5a] md:text-[17px] text-[15px] font-[400] ">
              Sewers:
              </p>
              <p className="text-[#000] md:text-[17px] text-[15px] font-[400] ">
              {`${propertyData?.Sewer !== null ? `${propertyData?.Sewer}` : ""}`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-t-[#DADADA] font-abhaya w-full  pt-3 pb-0">
        <div
          onClick={toggleInterior}
          className="flex cursor-pointer w-full justify-between items-center py-2"
        >
          <p className="text-black font-[500] md:text-[24px] text-[20px] ">
            Interior Features
          </p>
          <button className="bg-black text-white md:w-[30px]  md:h-[30px] h-[27px] w-[27px] flex justify-center items-center md:p-2 p-1 rounded-full">
            {isInteriorExpanded ? (
              <CgMathMinus className="text-xl text-white" />
            ) : (
              <FiPlus className="text-2xl text-white" />
            )}
          </button>
        </div>
        <div
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: isInteriorExpanded ? "700px" : "0",
            opacity: isInteriorExpanded ? "1" : "0",
          }}
        >
          <div className="flex mt-3 w-full md:gap-3 rounded-4 flex-wrap justify-between items-center bg-white pt-2 pb-1 rounded-2">
            {propertyData.InteriorFeatures.map((feature: any, index: any) => (
              <div
                key={index}
                className="md:w-1/5 w-[48%] flex justify-start md:mb-0 mb-[2px] gap-1 items-center"
              >
                <IoCheckmark className="text-black" />
                <p className="text-black md:text-[17px] text-[15px] font-[400] ">
                  {feature}
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
