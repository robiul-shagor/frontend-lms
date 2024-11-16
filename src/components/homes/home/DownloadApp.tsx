import Image from "next/image";
import Link from "next/link";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaApple } from "react-icons/fa";

export default function DownloadApp() {
  return (
    <div className="font-urbanist md:w-[88%] w-full mx-auto mt-[60px] mb-[100px] flex md:flex-row flex-col-reverse justify-between items-center bg-gradient4 md:rounded-[50px] md:h-[525.59px] h-auto">
      <div className="md:w-[45%] w-full flex flex-col justify-start h-full md:pr-8 p-10">
        <p className="text-black md:text-left text-center md:text-[50px] text-[25px] font-bold font-urbanist leading-tight">
          Download our App
        </p>
        <p className="text-[#595959] md:text-left text-center text-[18px] mt-5 leading-relaxed">
          Lörem ipsum gobel vefökopöktiga men lajyns beskade. Exopp timent. Ar
          astrosade för att farat dekasangen. Mick bara stenosamma teck. Mänera
          gigasel som tepänera dianing. Lörem ipsum gobel vefökopöktiga men
          lajyns beskade. Exopp timent.
        </p>
        <div className="md:flex mt-8 gap-6">
          <div className="w-[203.95px] h-[59.07px] md:mb-0 mb-3 flex justify-center gap-3 items-center bg-black rounded-[11px]">
            <IoLogoGooglePlaystore className="text-[#ffffff] font-bold text-[32px]" />
            <div className="text-white">
              <p className="text-[13px]">GET IT ON</p>
              <p className="text-[20px] -mt-[2px]">Google Play</p>
            </div>
          </div>
          <div className="w-[203.95px] h-[57.07px] flex justify-center gap-3 items-center bg-black rounded-[11px]">
            <FaApple className="text-[#ffffff] font-bold text-[32px]" />
            <div className="text-white">
              <p className="text-[13px]">Download on the</p>
              <p className="text-[20px] -mt-[2px]">App Store</p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-[50%] w-[98%] h-full flex justify-center items-end">
        <div className="md:h-[460px] h-[360px] w-full flex justify-center md:items-end items-center">
          <Image
            src="/assets/images/hero/download-img.png"
            alt="download app"
            width={425}
            height={460}
            className="w-full min-h-full bg-cover md:rounded-[50px]"
          />
        </div>
      </div>
    </div>
  );
}
