import Image from "next/image";
import { BsArrowUpRight } from "react-icons/bs";

export default function Contact() {
  return (
    <div className=" my-3 md:w-[85%] w-[95%] h-[387px] mx-auto flex justify-center items-center py-4 relative">
      <div className="absolute md:block hidden top-0 right-0 w-[175px] h-[154px] z-10">
        <Image
          src="/assets/images/market/dotted.png"
          width={175}
          height={154}
          alt="contact"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="md:block hidden absolute bottom-0 left-0 w-[178px] h-[178px] z-10">
        <div className="min-w-full min-h-full bg-[#7D38DF]"></div>
      </div>
      <div className="custom-market-theme2 min-h-full w-[90%] mx-auto z-[9999] px-20 md:flex hidden justify-center items-center">
        <div className="flex justify-start items-center gap-[60px] w-[100%]">
          <div className="text-[30px] text-black font-semibold w-[43%]">
            Want to know how these trends affect your home? Contact us for a
            <span className="text-[#7D38DF]">free consultation!</span>
          </div>
          <div className="flex  w-[30%] justify-between  shadow-md items-center  bg-white rounded-[50px] px-3 py-3">
            <p className="text-[16px] text-black ">Get Free Consultation</p>
            <div className="bg-[#7D38DF] w-[30px]  h-[30px]  rounded-full flex justify-center items-center">
              <BsArrowUpRight className="text-white font-bold text-[22px]" />
            </div>
          </div>
        </div>
      </div>
      <div className="md:custom-market-theme2 bg-white md:py-0 py-2 min-h-full md:rounded-0 rounded-[12px] md:w-[90%] w-full mx-auto z-[9999] md:px-20 px-3 md:hidden flex justify-center items-center">
        <div className="flex md:flex-row flex-col md:justify-start justify-center items-center md:gap-[60px] gap-3 w-[100%]">
          <div className="md:text-[30px] text-[18px] text-black font-semibold md:w-[43%] w-full">
            Want to know how these trends affect your home? Contact us for a
            <span className="text-[#7D38DF]">free consultation!</span>
          </div>
          <div className="flex  md:w-[30%] w-[70%] justify-between  shadow-md items-center  bg-white rounded-[50px] px-3 py-3">
            <p className="md:text-[16px] text-[14px] text-black ">
              Get Free Consultation
            </p>
            <div className="bg-[#7D38DF] w-[30px]  h-[30px]  rounded-full flex justify-center items-center">
              <BsArrowUpRight className="text-white font-bold text-[22px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
