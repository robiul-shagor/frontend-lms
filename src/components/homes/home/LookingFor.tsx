import Image from "next/image";

export default function LookingFor() {
  return (
    <div className="md:w-[88%] font-urbanist w-full mx-auto md:flex md:h-[341.63px] h-auto bg-gradient5 my-10 md:rounded-[50px]">
      <div className="md:w-[50%] w-full flex md:justify-start justify-center md:px-[90px] px-4 md:py-0 pt-4 items-center">
        <div className="md:block flex flex-col md:py-0 py-7 justify-center items-center">
          <h1 className="text-white font-bold font-urbanist md:text-[50px] text-[25px]">
            Looking For Selling Or Buying?
          </h1>
          <div className=" md:mt-3 mt-5 flex justify-center items-center w-[184px] h-[52px] text-[18px] font-bold font-urbanist rounded-[50px]  text-white bg-[#2A1C4F]">
            Get Started
          </div>
        </div>
      </div>
      <div className="md:w-[50%] w-full flex justify-center items-end">
        <div className="flex justify-center items-end">
          <div className="w-full md:h-[316.37px] h-[260px]">
            <Image
              src="/assets/images/hero/looking-for.png"
              alt="looking for"
              width={425}
              height={316.37}
              className="w-full h-full bg-cover md:rounded-[50px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
