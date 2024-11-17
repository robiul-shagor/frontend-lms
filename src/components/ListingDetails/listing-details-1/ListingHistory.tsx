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

interface ListingHistoryItem {
  dateListed: string;
  lastPrice: string;
  dateRemoved: string;
  status: string;
  soldPrice: string;
  mls: string;
}

interface ListingHistoryProps {
  propertyData: {
    OriginalEntryTimestamp: string | null;
    OriginalListPrice: number | null;
    PriceChangeTimestamp: string | null;
    PreviousListPrice: number | null;
    SoldConditionalEntryTimestamp: string | null;
    TransactionType: string | null;
    MlsStatus: string | null;
    ListingKey: string | null;
  };
}


const ListingHistory = ({ propertyData }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const formatDate = (date: string | null) =>
    date ? new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "-";
  const formatPrice = (price: number | null) =>
    price !== null && price !== undefined ? `$${price.toLocaleString()}` : "-";

  const listingHistoryData = [
    {
      dateListed: formatDate(propertyData.OriginalEntryTimestamp),
      lastPrice: formatPrice(propertyData.OriginalListPrice),
      dateRemoved: propertyData.SoldConditionalEntryTimestamp
        ? formatDate(propertyData.SoldConditionalEntryTimestamp)
        : "-",
      status: propertyData.MlsStatus || "Unknown",
      soldPrice: propertyData.SoldConditionalEntryTimestamp
        ? formatPrice(propertyData.ClosePrice)
        : "-",
      mls: propertyData.ListingKey || "-",
    },
    // Add an entry if there is a previous price or price change timestamp
    propertyData.PriceChangeTimestamp || propertyData.PreviousListPrice
      ? {
          dateListed: formatDate(propertyData.PriceChangeTimestamp),
          lastPrice: formatPrice(propertyData.PreviousListPrice),
          dateRemoved: "-",
          status: "Price Changed",
          soldPrice: "-",
          mls: propertyData.ListingKey || "-",
        }
      : null,
  ].filter((entry): entry is ListingHistoryItem => entry !== null); // Remove `null` entries

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
              <th className="pb-3 pt-2 font-medium">Sold Date</th>
              <th className="pb-3 pt-2 font-medium">Status</th>
              <th className="pb-3 pt-2 font-medium">Sold Price</th>
              <th className="pb-3 pt-2 font-medium">MLS#</th>
            </tr>
          </thead>
          <tbody>
            {listingHistoryData.map((item, index) => (
              <tr
                key={index}
                className="border-[#b7b7b7] font-lato border-t text-left md:text-[17px] text-[14px] text-black"
              >
                <td className="py-3">{item.dateListed}</td>
                <td className="py-3">{item.lastPrice}</td>
                <td className="py-3">{item.dateRemoved}</td>
                <td className="py-3">{item.status}</td>
                <td className="py-3">{item.soldPrice}</td>
                <td className="py-3">{item.mls}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListingHistory;
