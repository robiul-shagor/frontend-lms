import { FaCalendarDays } from "react-icons/fa6";
import { ImLocation2 } from "react-icons/im";
import Image from "next/image";

const realEstate = "R E A L   E S T A T E";
export default function Hero() {
  return (
    <div className="w-full min-h-[100vh] custom-market-theme relatve">
      <div className="md:w-[13%] w-[40%] text-white  pl-6 pt-4">
        <h1 className="text-[32px] font-bold text-white">HOUSETON</h1>
        <p className="text-[14px] text-center">{realEstate}</p>
      </div>
      <div className="md:flex justify-between items-center w-full h-full  py-4 mt-20">
        <div className="md:flex hidden justify-center items-center mt-10 pl-[210px] md:w-[50%] w-full  h-full">
          <div className="w-full">
            <p className="text-black text-[40px]">Your Key to the</p>
            <p className="text-[60px] font-bold text-[#6740DD]">PERFECT HOME</p>
            <p className="text-[18px] text-black font-[500]">
              Finding the perfect place to call home – let us guide you every
              step of the way.
            </p>
            <div className="flex justify-start mt-5 gap-20 items-center">
              <div className="flex justify-start gap-3 items-center">
                <div className="bg-[#6740DD] flex justify-center items-center rounded-full w-[63px] h-[63px]">
                  <FaCalendarDays className="text-white text-[24px]" />
                </div>
                <div className="text-black">
                  <label className="text-[28px] font-bold">90 Days</label>
                  <p className="text-[18px] font-[500]">Old Last Prices</p>
                </div>
              </div>
              <div className="flex justify-start gap-3 items-center">
                <div className="bg-[#6740DD] flex justify-center items-center rounded-full w-[63px] h-[63px]">
                  <ImLocation2 className="text-white text-[24px]" />
                </div>
                <div className="text-black">
                  <label className="text-[28px] font-bold">90 Days</label>
                  <p className="text-[18px] font-[500]">Old Last Prices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden flex justify-center items-center -mt-[70px] px-3  w-full  h-full">
          <div className="w-full">
            <p className="text-black  text-[28px]">Your Key to the</p>
            <p className=" text-[40px] font-bold text-[#000000]">
              PERFECT HOME
            </p>
            <p className=" text-[15px] text-black font-[500]">
              Finding the perfect place to call home – let us guide you every
              step of the way.
            </p>
            <div className="flex justify-start mt-5 gap-4 items-center mb-3">
              <div className="flex justify-start gap-3 items-center">
                <div className="bg-[#6740DD] flex justify-center items-center rounded-full w-[40px] h-[40px]">
                  <FaCalendarDays className="text-white  w-[18px]" />
                </div>
                <div className="text-black">
                  <label className=" text-[18px] font-bold">90 Days</label>
                  <p className="text-[13px] font-[500]">Old Last Prices</p>
                </div>
              </div>
              <div className="flex justify-start gap-3 items-center">
                <div className="bg-[#6740DD] flex justify-center items-center rounded-full w-[40px] h-[40px]">
                  <ImLocation2 className="text-white  w-[18px]" />
                </div>
                <div className="text-black">
                  <label className=" text-[18px] font-bold">90 Days</label>
                  <p className=" text-[13px] font-[500]">Old Last Prices</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-[50%] w-full h-full md:px-20 px-3 flex justify-center items-center">
          <div className=" md:absolute md:top-[170px] md:right-[120px] md:w-[433px] w-[333px] md:h-[433px] h-[333px] mx-auto">
            <Image
              src="/assets/images/market/hero-user.png"
              width={433}
              height={433}
              alt="User"
              className="w-full h-full bg-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
