"use client";
import { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const searchOptions = [
  {
    label: "Location",
    value: "city",
    icon: <CiLocationOn />,
    options: [
      { value: "toronto", text: "Toronto" },
      { value: "mississauga", text: "Mississauga" },
      { value: "brampton", text: "Brampton" },
      { value: "vaughan", text: "Vaughan" },
      { value: "markham", text: "Markham" },
      { value: "richmondhill", text: "Richmond Hill" },
      { value: "oakville", text: "Oakville" },
      { value: "burlington", text: "Burlington" },
      { value: "milton", text: "Milton" },
      { value: "pickering", text: "Pickering" },
      { value: "ajax", text: "Ajax" },
      { value: "whitby", text: "Whitby" },
      { value: "oshawa", text: "Oshawa" },
      { value: "aurora", text: "Aurora" },
      { value: "newmarket", text: "Newmarket" },
      { value: "kingcity", text: "King City" },
      { value: "caledon", text: "Caledon" },
    ],
  },
  {
    label: "I am looking to...",
    value: "type",
    icon: <MdKeyboardArrowDown />,
    options: [
      { value: "apartments", text: "Buy Apartments" },
      { value: "condos", text: "Rent Condos" },
      { value: "houses", text: "Sell Houses" },
      { value: "industrial", text: "Rent Industrial" },
      { value: "villas", text: "Sell Villas" },
    ],
  },
  {
    label: "Price Range",
    value: "price_range",
    icon: <MdKeyboardArrowDown />,
    options: [
      { value: "1", text: "$1000 - $5000" },
      { value: "2", text: "$5000 - $10000" },
      { value: "3", text: "$10000 - $15000" },
      { value: "4", text: "$15000 - $20000" },
      { value: "5", text: "$20000 - $25000" },
      { value: "6", text: "$25000 - $30000" },
      { value: "7", text: "$30000 - $35000" },
      { value: "8", text: "$35000 - $40000" },
      { value: "9", text: "$40000 - $45000" },
      { value: "10", text: "$45000 - $50000" },
    ],
  },
];

export default function SearchFilters() {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string;
  }>({});

  const handleSelectChange = (value: string, index: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [index]: value,
    }));
    setOpenDropdownIndex(null);
  };
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  const handleDropdownClick = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  return (
    <div className="w-full ">
      <div className="w-[94%] m-auto md:block hidden  px-4 py-0 ">
        <div className="w-full bg-white md:flex justify-between md:px-3 px-1 py-[2px] border border-[#D5D5D5] rounded-md items-center">
          <div className="md:flex justify-between items-center md:w-[61%] w-full gap-4 ">
            {searchOptions.map((option, index) => (
              <div
                key={index}
                className="relative md:w-[32%] w-full p-2 md:border-r border-r-[#D5D5D5]"
              >
                <span className="text-[#bdbdbd] text-[15px] font-urbanist font-[400]">
                  {option.label}
                </span>
                <div
                  onClick={() => handleDropdownClick(index)}
                  className="flex justify-between items-center text-[18px]  text-black font-[400] "
                >
                  <p className="text-black">
                    {selectedOptions[index] || option.options[0].text}
                  </p>
                  <p>{option.icon}</p>
                </div>
                <ul
                  className={`absolute w-full max-h-[200px] rounded-[8px] overflow-y-auto z-[9999] top-[85px] left-0 bg-white border border-[#717171] ${
                    openDropdownIndex === index ? "block" : "hidden"
                  }`}
                >
                  {openDropdownIndex === index &&
                    option.options.map((opt, i) => (
                      <li
                        key={i}
                        className={`p-1 text-[#000000] text-[15px] font-[400] font-urbanist  hover:text-[#938fff] cursor-pointer`}
                        onClick={() => handleSelectChange(opt.text, index)}
                      >
                        {opt.text}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="justify-between items-center md:hidden flex w-full md:gap-2 gap-0">
            <div className=" md:mt-0 mt-2 border-2 border-[#938fff] md:py-3 py-1 md:px-2 px-[2px] flex justify-center items-center md:gap-2 gap-[2px] md:w-[19%] w-[45%] m-auto">
              <span className="text-black md:text-[20px] text-[14px] font-urbanist font-[400]">
                ADVANCED SEARCH
              </span>
              <i className="fa-light fa-sliders-up md:block hidden"></i>
            </div>
            <div className="md:mt-0 mt-2 flex justify-center bg-[#938fff] items-center md:gap-2 gap-1 md:w-[12%] w-[45%] m-auto md:py-3 py-[6px] md:px-2 px-1">
              <span className="text-white md:text-[20px] text-[14px] font-urbanist font-[400]">
                SEARCH
              </span>
              <i className="fa-light text-white fa-search md:block hidden"></i>
            </div>
          </div>
          <div className="justify-between items-center md:w-[38%] md:flex hidden w-full md:gap-2 gap-0">
            <div className=" md:mt-0 mt-2 border-2 border-[#938fff] py-3 px-2  flex justify-center items-center md:gap-2 gap-[2px] w-[48%] m-auto">
              <span className="text-black md:text-[20px] text-[14px] font-urbanist font-[400]">
                ADVANCED SEARCH
              </span>
              <i className="fa-light fa-sliders-up"></i>
            </div>
            <div className="md:mt-0 mt-2 flex justify-center bg-[#938fff] items-center gap-2 w-[48%] m-auto py-3 px-2">
              <span className="text-white md:text-[20px] text-[14px] font-urbanist font-[400]">
                SEARCH
              </span>
              <i className="fa-light text-white fa-search "></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
