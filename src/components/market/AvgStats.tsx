import { IoMdHome } from "react-icons/io";
import { PiGarageDuotone } from "react-icons/pi";
import { FaCalendarDays } from "react-icons/fa6";

export default function AvgStats() {
  return (
    <div className="mt-2 flex flex-wrap justify-between items-center py-3 mx-auto  md:w-[85%] w-[95%] rounded-[12px] ">
      <div className="md:w-[30%] w-[48%] flex md:flex-row flex-col justify-center items-center md:gap-3 gap-2 rounded-[12px] bg-white md:h-[189px] h-[140px] md:mb-0 mb-2">
        <div className="bg-[#7D38DF] rounded-[12px] md:h-[76px] md:w-[76px] w-[50px] h-[50px] flex justify-center items-center">
          <IoMdHome className="text-white md:text-[55px] text-[40px]" />
        </div>
        <div>
          <p className="md:text-[31px] text-[18px] font-bold text-[#3B4758]">
            $ 3,503.26
          </p>
          <p className="text-[#504C4C] md:text-[18px] text-[15px]">
            Average Home Price
          </p>
        </div>
      </div>
      <div className="md:w-[30%] w-[48%] flex md:flex-row flex-col justify-center items-center md:gap-3 gap-2 rounded-[12px] bg-white md:h-[189px] h-[140px] md:mb-0 mb-2">
        <div className="bg-[#7D38DF] rounded-[12px] md:h-[76px] md:w-[76px] w-[50px] h-[50px] flex justify-center items-center">
          <PiGarageDuotone className="text-white md:text-[55px] text-[40px]" />
        </div>
        <div>
          <p className="md:text-[31px] text-[18px] font-bold text-[#3B4758]">
            3,503
          </p>
          <p className="text-[#504C4C] md:text-[18px] text-[15px]">
            Homes sold on this Period
          </p>
        </div>
      </div>
      <div className="md:w-[30%] w-[48%] flex md:flex-row flex-col justify-center items-center md:gap-3 gap-2 rounded-[12px] bg-white md:h-[189px] h-[140px]">
        <div className="bg-[#7D38DF] rounded-[12px] md:h-[76px] md:w-[76px] w-[50px] h-[50px] flex justify-center items-center">
          <FaCalendarDays className="text-white md:text-[55px] text-[40px]" />
        </div>
        <div>
          <p className="md:text-[31px] text-[18px] font-bold text-[#3B4758]">
            122
          </p>
          <p className="text-[#504C4C] md:text-[18px] text-[15px]">
            Average days on Marekt
          </p>
        </div>
      </div>
    </div>
  );
}
