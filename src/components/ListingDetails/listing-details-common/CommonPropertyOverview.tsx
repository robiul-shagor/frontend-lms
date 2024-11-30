'use client'
import Image, { StaticImageData } from "next/image";

import icon_1 from "@/assets/images/icon/icon_47.svg";
import icon_2 from "@/assets/images/icon/bed.png";
import icon_3 from "@/assets/images/icon/bath.svg";
import icon_5 from "@/assets/images/icon/icon_51.svg";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { PiGarage } from "react-icons/pi";
import { GoHourglass } from "react-icons/go";
import { useState } from "react";

interface DataType {
  id: number;
  icon: StaticImageData;
  title: string;
  value: string;
}

interface CommonPropertyOverviewProps {
  data: {
    PropertySubType: string;
    BedroomsTotal: string;
    BathroomsTotalInteger: string;
    LivingAreaRange: string;
    LotSizeDimensions: string;
    Basement: string;
    ApproximateAge: string;
    VirtualTourURLUnbranded: string;
    FrontageLength: any;
    LotDepth: any,
    ArchitecturalStyle: any,
    Acres: any, 
    LotSizeRangeAcres: any
  };
}

const CommonPropertyOverview = ({ data }: CommonPropertyOverviewProps ) => {

  const [selectedButton, setSelectedButton] = useState<string>('Virtual Tour');

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);

    if (buttonName === "Virtual Tour" && data.VirtualTourURLUnbranded) {
      window.open(data.VirtualTourURLUnbranded, "_blank"); // Open the URL in a new tab
    }
  };

  const property_overview_data: DataType[] = [
    {
      id: 1,
      icon: icon_5,
      value: data.PropertySubType,
      title: "Type",
    },
    {
      id: 2,
      icon: icon_2,
      value: data.BedroomsTotal,
      title: "Bed",
    },
    {
      id: 3,
      icon: icon_3,
      value: data.BathroomsTotalInteger,
      title: "Bath",
    },
    {
      id: 4,
      icon: <HiArrowPathRoundedSquare />,
      value: data.LivingAreaRange, 
      title: "Sqft.",
    },
    {
      id: 5,
      icon: icon_1,
      value: `${data.FrontageLength} X ${data.LotDepth}`,
      title: "Lot",
    },
    {
      id: 6,
      icon: "/assets/images/icon/basement.png",
      value: data.Basement,
      title: "Basement",
    },
    {
      id: 7,
      icon: <GoHourglass />,
      value: data.ApproximateAge,
      title: "Age",
    },   
    {
      id: 8,
      icon: icon_1,
      value: data.ArchitecturalStyle,
      title: "Sub Type",
    },
    {
      id: 9,
      icon: icon_1,
      value: data.LotSizeRangeAcres,
      title: "Acres",
    },
  ];

  return (
    <div className="w-full bg-white sm:pb-0 pb-8  rounded-[18px] font-lato shadow-lg pt-6 mb-4 md:mt-10 mt-3 flex justify-center items-center ">
      <div className="w-[95%] m-auto">
        <div className="flex flex-wrap justify-between gap-2">
          {property_overview_data.map((item, index) => (
            <div
              key={item.id}
              className={`md:w-[15%] sm:w-[25%] md:mb-0 mb-3 pb-2 flex justify-center sm:items-start flex-col md:gap-2 gap-1 ${index === property_overview_data.length - 0
                  ? ""
                  : "md:border-r border-[#b3b3b3]"
                }`}
            >
              <div className="flex gap-1 ml-2">
                {item.title === "Sqft." ? (
                  <HiArrowPathRoundedSquare className="text-[#767575] w-[30px] md:w-[30px] h-[30px]  md:h-[30px]" />
                ) : item.title === "Age" ? (
                  <GoHourglass className="text-[#8e8d8d] w-[30px] md:w-[30px] h-[30px]  md:h-[30px]" />
                ) : (
                  <Image
                    src={item.icon}
                    alt="icon"
                    width={30}
                    height={30}
                    className=" w-[30px] md:w-[30px] h-[30px]  md:h-[30px]"
                  />
                )}

                <span className="ml-2 sm:block hidden md:text-[18px] text-[16px] text-black">
                  {item.title}
                </span>
              </div>
              <p className="text-black mt-2 md:text-[18px] sm:text-[16px] text-sm font-bold ml-3 sm:w-[100px]">
                {item.value}
              </p>
            </div>
          ))}
          { data?.VirtualTourURLUnbranded  !== null && (
            <div className={`md:w-[30%] sm:w-[25%] md:mb-0 mb-3 pb-2 flex justify-center sm:items-start items-center flex-col md:gap-2 gap-1`}>
              <button
                onClick={() => handleButtonClick('Virtual Tour')}
                className={`w-1/2 py-2 text-[16px] rounded font-semibold ${selectedButton === 'Virtual Tour' ? 'bg-[#7A5CFA] text-white' : 'bg-white text-[#333]'
                  }`}
              >
                Virtual Tour
              </button>
            </div>
          ) }
        </div>

        <div className="hidden border w-full border-[#0000000A] rounded-full overflow-hidden">

          <button
            onClick={() => handleButtonClick('Request Info')}
            className={`w-1/2 py-2 text-[16px] font-semibold ${selectedButton === 'Request Info' ? 'bg-[#7A5CFA] text-white' : 'bg-white text-[#333]'
              }`}
          >
            Request Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonPropertyOverview;
