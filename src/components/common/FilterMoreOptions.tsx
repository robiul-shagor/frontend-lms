"use client";
import React, { useState, useRef, useEffect } from "react";
import { CiFilter } from "react-icons/ci";
import CustomDropdown from "./CustomDropDown";

interface OptionGroup {
  heading?: string;
  options: string[];
}

interface CustomDropdownProps {
  options: (string | OptionGroup)[];
  placeholder?: string;
  style?: string;
  width?: string;
  onSelect?: (selectedValue: string) => void; // Callback for when an option is selected
  value?: string; // Initial value
  arrow?: boolean;
}

const FilterMoreOptions: React.FC<CustomDropdownProps> = ({
  options,
  placeholder = "Select",
  style = "",
  width,
  onSelect,
  value,
  arrow = true,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    value || null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option); // Trigger callback
    }
  };
  const [activeTab, setActiveTab] = useState("Residential Freehold");
  const moreOptions = {
    pc: {
      heading: "Property Class",
      options: ["Residential Freehold", "Residential Condo", "Commercial"],
    },
    st: {
      heading: "Sub Type",
      options: ["Apartment", "Detached", "Semi Detached", "Townhouse"],
    },
    sk: {
      heading: "Storeys",
      options: ["All Commercial", "Detached", "Semi Detached", "Townhouse"],
    },
    aa: {
      heading: "Approximate Age",
      options: ["New", "0-5", "6-15", "16-25", "26-50", "50+"],
    },
    acre: {
      heading: "Acreage",
      options: ["All Commercial", "Detached", "Semi Detached", "Townhouse"],
    },
    dom: {
      heading: "Days on Market",
      options: ["All Commercial", "Detached", "Semi Detached", "Townhouse"],
    },
    lf: {
      heading: "Lot Frontage (ft)",
      options: ["All Commercial", "Detached", "Semi Detached", "Townhouse"],
    },
    ld: {
      heading: "Lot Depth (ft)",
      options: ["All Commercial", "Detached", "Semi Detached", "Townhouse"],
    },
    ptyc: {
      heading: "Property Class",
      options: [
        "Separate Entrance",
        "Finished",
        "Partially Finished",
        "Walk Out",
        "Walk Up",
        "Crawl Space",
      ],
    },
    pfl: {
      heading: "Portion for Lease",
      options: [
        "Entire Property",
        "Basement",
        "Above Grade",
        "Ancillary",
        "Main",
        "2nd",
        "3rd",
        "Other",
        "Basement",
      ],
    },
    ll: {
      heading: "Laundry Level",
      options: ["Main", "Upper", "Basement"],
    },
  };

  const tabs = [
    {
      name: "Schedule a Tour",
      value: "scheduleTour",
    },
    {
      name: "Request Info",
      value: "requestInfo",
    },
  ];
  const subtype = [
    {
      heading: "",
      options: ["All Residential"],
    },
    {
      heading: "Freehold",
      options: ["Detached", "Semi Detached", "Townhouse"],
    },
    {
      heading: "Condo",
      options: ["Apartment", "Detached", "Semi Detached", "Townhouse"],
    },
    {
      heading: "Commercial",
      options: [
        "All Commercial",
        "Business",
        "Multi Family",
        "Retail",
        "Industrial",
        "Office",
        "Hospitality",
        "Institutional",
      ],
    },
  ];
  const typeOptions = [
    {
      heading: "",
      options: ["All"],
    },
    {
      heading: "Bungalows",
      options: ["2 Storey", "3 Storey", "3+ Storey"],
    },
  ];
  const minOptt = [
    {
      heading: "",
      options: ["$0", "$20", "$5,000", "$10,000", "$1,000,00"],
    },
  ];
  const maxOptt = [
    {
      heading: "",
      options: ["$400", "$400,000", "$500,000", "$600,000", "$1,000,000"]
    },
  
  ];
  return (
    <div ref={dropdownRef} className={`relative ${width}`}>
      {/* Dropdown header */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex justify-center items-center  cursor-pointer ${style}`}
      >
        <span className="flex gap-2 items-center">
          <span className="text-[14px]">{selectedOption || placeholder} </span>{" "}
          <CiFilter className="text-[20px] text-black" />
        </span>
        {/* {
                    arrow &&
                    <span className={`transform transition-transform ${isOpen ? 'rotate-0' : 'rotate-180'}`}>
               
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.41 7.41L6 2.83L10.59 7.41L12 6L6 0L0 6L1.41 7.41Z" fill="#7A5CFA" />
                    </svg>
                </span>
                } */}
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-full md:min-w-[500px] p-3 right-0">
          <p className="text-black text-[24px] font-[600] mb-2">More Options</p>
          {/* First */}
          <p className="text-black text-[14px] font-[600]">
            {moreOptions?.pc?.heading}
          </p>
          <div className="flex justify-center gap-3 items-center w-full my-2">
            {moreOptions?.pc?.options?.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? "bg-[#6965fd] text-white font-[600]"
                    : "text-black border border-[#D5D5D5]"
                } sm:text-[14px] text-sm px-2 py-2 rounded-3xl sm:h-[40px] w-[47%]`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Second & Third */}
          <div className="grid grid-cols-2 gap-2">
            <div className="">
              <p className="text-black text-[14px] font-[600]">
                {moreOptions?.st?.heading}
              </p>
              <CustomDropdown
                options={subtype}
                placeholder="Sub Type"
                width={""}
                style={
                  "h-[40px] flex my-2 justify-between px-2 items-center w-full rounded-[8px] border border-[#b3b3b3] text-black cursor-pointer"
                }
              />
            </div>
            <div className="">
              <p className="text-black text-[14px] font-[600]">
                {moreOptions?.sk?.heading}
              </p>
              <CustomDropdown
                options={typeOptions}
                placeholder="Storeys"
                width={""}
                style={
                  "h-[40px] my-2 flex justify-between px-2 items-center w-full rounded-[8px] border border-[#b3b3b3] text-black cursor-pointer"
                }
              />
            </div>
          </div>
          {/* 6 */}
          <p className="text-black text-[14px] font-[600] mt-2">
            {moreOptions?.aa?.heading}
          </p>
          <div className="flex justify-center gap-3 items-center  w-full my-2">
            {moreOptions?.aa?.options?.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? "bg-[#6965fd] text-white font-[600]"
                    : "text-black border border-[#D5D5D5]"
                } sm:text-[14px] text-sm px-2 py-2 rounded-[8px] sm:h-[40px] w-[47%]`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* 7,8 */}
          <div className="grid grid-cols-2 gap-2">
            <div className="">
              <p className="text-black text-[14px] font-[600] mb-2">
                {moreOptions?.acre?.heading}
              </p>
              <div className="grid grid-cols-2 gap-2 items-center w-full my-2">
                <CustomDropdown
                  options={minOptt}
                  placeholder="Min"
                  width={""}
                  style={
                    "h-[40px] flex  justify-between px-2 items-center w-full rounded-[8px] border border-[#b3b3b3] text-black cursor-pointer"
                  }
                />
                <CustomDropdown
                  options={maxOptt}
                  placeholder="Max"
                  width={""}
                  style={
                    "h-[40px] flex  justify-between px-2 items-center w-full rounded-[8px] border border-[#b3b3b3] text-black cursor-pointer"
                  }
                />
              </div>
            </div>
            <div className="">
              <p className="text-black text-[14px] font-[600] mb-2">
                {moreOptions?.dom?.heading}
              </p>
              <div className="grid grid-cols-2  gap-2 items-center w-full">
                <CustomDropdown
                  options={minOptt}
                  placeholder="Min"
                  width={""}
                  style={
                    "h-[40px] flex  justify-between px-2 items-center w-full rounded-[8px] border border-[#b3b3b3] text-black cursor-pointer"
                  }
                />
                <CustomDropdown
                  options={maxOptt}
                  placeholder="Max"
                  width={""}
                  style={
                    "h-[40px] flex  justify-between px-2  items-center w-full rounded-[8px] border border-[#b3b3b3] text-black cursor-pointer"
                  }
                />
              </div>
            </div>
          </div>
          {/* 9, 10, 11 */}
          <p className="text-black text-[14px] font-[600] mt-2">
            Basement
          </p>
          <div className="grid grid-cols-3 justify-center gap-3 items-center w-full my-2">
            {moreOptions?.ptyc?.options?.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? "bg-[#6965fd] text-white font-[600]"
                    : "text-black border border-[#D5D5D5]"
                } sm:text-[14px] text-sm px-2 py-2 rounded-3xl sm:h-[40px] w-full`}
              >
                {tab}
              </button>
            ))}
          </div>
          <p className="text-black text-[14px] font-[600] mt-2">
            {moreOptions?.pfl?.heading}
          </p>
          <div className="grid grid-cols-3 justify-center gap-3 items-center w-full my-2">
            {moreOptions?.pfl?.options?.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? "bg-[#6965fd] text-white font-[600]"
                    : "text-black border border-[#D5D5D5]"
                } sm:text-[14px] text-sm px-2 py-2 rounded-3xl sm:h-[40px] w-full`}
              >
                {tab}
              </button>
            ))}
          </div>
          <p className="text-black text-[14px] font-[600] mt-2">
            {moreOptions?.ll?.heading}
          </p>
          <div className="flex justify-center gap-3 items-center w-full my-2">
            {moreOptions?.ll?.options?.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? "bg-[#6965fd] text-white font-[600]"
                    : "text-black border border-[#D5D5D5]"
                } sm:text-[14px] text-sm px-2 py-2 rounded-3xl sm:h-[40px] w-[47%]`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMoreOptions;
