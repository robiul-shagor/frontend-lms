"use client";
import FeatureListing from "../listing-details-sidebar.tsx/FeatureListing";
import LandTaxCalculator from "../listing-details-sidebar.tsx/LandTaxCalculator";
import MortgageCalculator from "../listing-details-sidebar.tsx/MortgageCalculator";
import ScheduleForm from "../listing-details-sidebar.tsx/ScheduleForm";
import SidebarInfo from "../listing-details-sidebar.tsx/SidebarInfo";
import { useState } from "react";

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

const tourTypes = [
  {
    name: "In Person",
    value: "inPerson",
  },
  {
    name: "Video Chat",
    value: "videoChat",
  },
];

const DateCarousel = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: any;
  setSelectedDate: any;
}) => {
  const generateYearDates = (year: number) => {
    const datesArray = [];
    const months = [
      { name: "Jan", days: 31 },
      { name: "Feb", days: 28 }, // Consider leap year logic if necessary
      { name: "Mar", days: 31 },
      { name: "Apr", days: 30 },
      { name: "May", days: 31 },
      { name: "Jun", days: 30 },
      { name: "Jul", days: 31 },
      { name: "Aug", days: 31 },
      { name: "Sep", days: 30 },
      { name: "Oct", days: 31 },
      { name: "Nov", days: 30 },
      { name: "Dec", days: 31 },
    ];

    for (const month of months) {
      for (let day = 1; day <= month.days; day++) {
        const date = new Date(year, months.indexOf(month), day);
        const weekday = date.toLocaleString("default", { weekday: "short" });
        datesArray.push({
          day: String(day).padStart(2, "0"), // Pad day with leading zero
          month: month.name,
          weekday,
          fullDate: date, // Store the full date object for later use
        });
      }
    }
    return datesArray;
  };

  const currentYear = new Date().getFullYear();
  const dates = generateYearDates(currentYear);

  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleDates = 5; // Number of dates to show at a time

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dates.length - visibleDates : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= dates.length - visibleDates ? 0 : prevIndex + 1
    );
  };

  const handleSelectDate = (index: number) => {
    setSelectedDate(dates[index]);
    setCurrentIndex(index);
  };

  return (
    <div className="flex items-center justify-center space-x-0 mt-10 mb-5 relative 2-full font-urbanist">
      <button
        onClick={handlePrev}
        className="bg-[#eeeefd] absolute top-[30%] left-1 z-40 rounded-full w-[30px] h-[30px] flex justify-center items-center p-2 text-black"
      >
        &lt;
      </button>
      <div className="overflow-hidden w-[91%] m-auto">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 60}px)`,
          }}
        >
          {dates.map((date, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-2 min-w-[58px] min-h-[88px] rounded-lg mx-1 border border-[#f5f5f5] bg-white"
              onClick={() => handleSelectDate(index)}
            >
              <span className="text-sm text-[#777980] font-medium ">
                {date.month}
              </span>
              <span className="text-lg font-semibold">{date.day}</span>
              <span className="text-sm text-[#777980]">{date.weekday}</span>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleNext}
        className="bg-[#eeeefd] absolute top-[30%] right-1 z-40 rounded-full w-[30px] h-[30px] flex justify-center items-center p-2 text-black"
      >
        &gt;
      </button>
    </div>
  );
};

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("scheduleTour");
  const [activeTourType, setActiveTourType] = useState<string>("inPerson");
  const [selectedDate, setSelectedDate] = useState<any>("");
  return (
    <div className="md:w-[28%] w-full md:mt-0 mt-9">
      <div className="">
        <div className="tour-schedule bg-white border-20 p-30  mb-4">
          <h1 className="mb-2 text-[24px] text-center">Schedule Booking</h1>
          <div className="flex justify-center gap-3 items-center w-full my-4">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab.value)}
                className={`${
                  activeTab === tab.value
                    ? "bg-[#6965fd] text-white"
                    : "text-black border border-[#D5D5D5]"
                } sm:text-[16px] text-sm px-2 py-2 rounded-3xl sm:h-[51px] w-[47%]`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <DateCarousel
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <h1 className="text-[16px] text-[#4a4c56] font-bold mt-6 mb-4">
            Tour Type
          </h1>
          <div className="flex justify-center gap-3 items-center w-full mb-4">
            {/* <div className=" rounded-3xl bg-[#6965fd] text-white py-2 px-3 text-[16px]">
              In Person
            </div>
            <div className="rounded-3xl border border-[#D5D5D5] text-black py-2 px-3 text-[16px]">
              Video Chat
            </div> */}
            {tourTypes.map((tourType, index) => (
              <button
                key={index}
                onClick={() => setActiveTourType(tourType.value)}
                className={`${
                  activeTourType === tourType.value
                    ? "bg-[#6965fd] text-white"
                    : "text-black border border-[#D5D5D5]"
                } sm:text-[16px] text-sm px-4 py-2 rounded-3xl sm:h-[51px] w-[47%]`}
              >
                {tourType.name}
              </button>
            ))}
          </div>
          <ScheduleForm
            tourType={activeTourType as string}
            date={selectedDate as any}
          />
        </div>
        <div className="mortgage-calculator bg-white border-20 p-30 mb-4">
          <h5 className="mb-4 text-[24px] text-center font-urbanist">
            Mortgage Calculator
          </h5>
          <MortgageCalculator />
        </div>
        <div className="mortgage-calculator bg-white border-20 p-30 mb-4">
          <h5 className="mb-4 text-[24px] text-center font-urbanist">
            Land Transfer Tax Calculator
          </h5>
          {/* <LandTaxCalculator /> */}
        </div>
        {/* <FeatureListing /> */}
      </div>
    </div>
  );
};

export default Sidebar;
