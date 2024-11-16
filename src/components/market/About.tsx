import { FaPhone } from "react-icons/fa6";
import { FaGlobe } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const realEstate = "R E A L   E S T A T E";
export default function About() {
  return (
    <>
      <div className="w-full md:h-[70px] md:py-0 py-1 flex flex-wrap  justify-center items-center md:gap-[210px] gap-3 bg-[#7d38df]">
        <div className="flex justify-start items-center md:gap-3 gap-1">
          <FaPhone className="text-[24px] text-white" />
          <label className="text-white text-[18px]">+1 123 456 7890</label>
        </div>
        <div className="flex justify-start items-center md:gap-3 gap-1">
          <MdEmail className="text-[24px] text-white" />
          <label className="text-white text-[18px]">info@houseton.ca </label>
        </div>
        <div className="flex justify-start items-center md:gap-3 gap-1">
          <FaGlobe className="text-[24px] text-white" />
          <label className="text-white text-[18px]">www.houseton.com</label>
        </div>
      </div>
      <div className="md:flex mt-3 justify-between items-center py-3 px-4 md:w-[85%] w-[95%] mx-auto rounded-[12px] bg-white shadow-md">
        <div>
          <p className="text-[20px] text-[#595F67]">Milton Real Estate</p>
          <p className="text-[#3B4758] text-[34px] font-semibold">
            Market Report – October 2024
          </p>
          <p className="text-[18px] text-[#595F67]">
            An overview of current listings, recent sales, and market trends
          </p>
        </div>
        <div className="md:w-[23%] w-full text-[#7065F0]  md:pl-6 pt-4 flex justify-center items-center flex-col">
          <h1 className="text-[32px] font-bold text-[#7065F0]">HOUSETON</h1>
          <p className="text-[14px] text-center">{realEstate}</p>
        </div>
      </div>
    </>
  );
}
