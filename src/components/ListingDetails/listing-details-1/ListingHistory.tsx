import React, { useState } from "react";
import { CgMathMinus } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";

const tableData = [
  {
    dateListed: "10/27/2021",
    lastPrice: "16,567,000",
    dateRemoved: "10/27/2021",
    status: "Sold",
    soldPrice: "16,00,000",
    mls: "W2345432",
  },
  {
    dateListed: "10/27/2021",
    lastPrice: "16,567,000",
    dateRemoved: "10/27/2021",
    status: "Sold",
    soldPrice: "16,00,000",
    mls: "W2345432",
  },
  {
    dateListed: "10/27/2021",
    lastPrice: "16,567,000",
    dateRemoved: "10/27/2021",
    status: "Sold",
    soldPrice: "16,00,000",
    mls: "W2345432",
  },
  {
    dateListed: "10/27/2021",
    lastPrice: "16,567,000",
    dateRemoved: "10/27/2021",
    status: "Sold",
    soldPrice: "16,00,000",
    mls: "W2345432",
  },
];

const ListingHistory = ({ propertyData }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className=" bg-white shadow-lg rounded-[18px] md:py-[10px] md:px-[35px] px-[20px] py-[15px]">
      <div
        onClick={toggleExpand}
        className="flex cursor-pointer w-full justify-between items-center py-2"
      >
        <p className="font-[500] md:text-[24px] font-abhaya text-[24px] text-black ">
          Listing History
        </p>
        <div className="bg-black text-white md:w-[30px] md:h-[30px] w-[27px] h-[27px] flex items-center justify-center p-1 rounded-full cursor-pointer">
          {isExpanded ? (
            <CgMathMinus className="text-2xl text-white" />
          ) : (
            <FiPlus className="text-2xl text-white" />
          )}
        </div>
      </div>
      <div
        className="overflow-hidden  transition-all duration-300"
        style={{
          maxHeight: isExpanded ? "300px" : "0",
          // opacity: isExpanded ? '1' : '0',
        }}
      >
        <table className="md:w-full w-[700px] overflow-x-auto ">
          <thead>
            <tr className=" text-left md:text-[17px] font-abhaya text-[16px]  text-black ">
              <th className="pb-3 pt-2 font-medium">Date Listed</th>
              <th className="pb-3 pt-2 font-medium">Last Price</th>
              <th className="pb-3 pt-2 font-medium">Date Removed</th>
              <th className="pb-3 pt-2 font-medium">Status</th>
              <th className="pb-3 pt-2 font-medium">Sold Price</th>
              <th className="pb-3 pt-2 font-medium">MLS#</th>
            </tr>
          </thead>
          <tbody>
            <tr
              className={` border-[#b7b7b7] font-lato border-t text-left md:text-[17px] text-[14px] text-black}`}
            >
              <td className="py-3">{new Date(propertyData.OriginalEntryTimestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
              <td className="py-3">{propertyData.OriginalListPrice}</td>
              <td className="py-3">-</td>
              <td className="py-3">{propertyData.TransactionType}</td>
              <td className="py-3">-</td>
              <td className="py-3">{propertyData.ListingKey}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListingHistory;
