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

const RoomsInfo = ({ propertyData }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className=" bg-white shadow-lg rounded-[18px] md:py-[10px] md:px-[35px] px-[20px] py-[15px] mt-[20px]">
      <div
        onClick={toggleExpand}
        className="flex cursor-pointer w-full justify-between items-center py-2"
      >
        <p className="font-[500] md:text-[24px] font-abhaya text-[24px] text-black ">
        Rooms
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
              <th className="pb-3 pt-2 font-medium">Level</th>
              <th className="pb-3 pt-2 font-medium">Name</th>
              <th className="pb-3 pt-2 font-medium">Length</th>
              <th className="pb-3 pt-2 font-medium">Width</th>
              <th className="pb-3 pt-2 font-medium">Features</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr
                key={index}
                className={` border-[#b7b7b7] font-lato border-t text-left md:text-[17px] text-[14px]  ${index === 0 ? 'text-black': 'text-[#7f7f7f]'}`}
              >
                <td className="py-3">{data.dateListed}</td>
                <td className="py-3">{data.lastPrice}</td>
                <td className="py-3">{data.dateRemoved}</td>
                <td className="py-3">{data.status}</td>
                <td className="py-3">{data.soldPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomsInfo;
