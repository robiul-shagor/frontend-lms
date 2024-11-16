import Image from "next/image";

const mockData = [
  {
    label: "AI-Powered Property Recommendations",
    icon: "/assets/images/hero/icon1.svg",
  },
  {
    label: "Comprehensive Market Reports",
    icon: "/assets/images/hero/icon2.svg",
  },
  {
    label: "Active and Sold Listings at Your Fingertips",
    icon: "/assets/images/hero/icon3.svg",
  },
  {
    label: "Advanced Search Filters",
    icon: "/assets/images/hero/icon4.svg",
  },
  {
    label: "Interactive Map Search",
    icon: "/assets/images/hero/icon5.svg",
  },
  {
    label: "Real-Time Chat Support",
    icon: "/assets/images/hero/icon6.svg",
  },
  {
    label: "Save Your Favorite Listings",
    icon: "/assets/images/hero/icon7.svg",
  },
  {
    label: "Instant Alerts for New Listings",
    icon: "/assets/images/hero/icon8.svg",
  },
];

export default function Features() {
  return (
    <div className="w-full mt-11 mb-11 font-urbanist  mx-auto md:flex justify-between items-center ">
      <div className="md:block hidden w-[30%]">
        {mockData.slice(0, 4).map((item, index) => (
          <div key={index} className="flex gap-4 justify-end items-center mb-3">
            <div className="w-[98px] h-[98px] bg-white rounded-full flex justify-center items-center">
              <div className="w-[50.8px] h-[50.8px]">
                <Image
                  src={item.icon}
                  alt="icon"
                  width={50.8}
                  height={50.8}
                  className="w-full h-full bg-cover"
                />
              </div>
            </div>
            <div className="w-[65%] text-[25px] font-semibold font-urbanist text-black">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <div className="md:w-[39%] m-auto w-[70%] md:h-[622px] h-[300.28px] my-[60px]">
        <Image
          src="/assets/images/hero/features.png"
          alt="feature"
          width={576.21}
          height={622}
          className="w-full h-full bg-cover"
        />
      </div>
      <div className="md:block hidden w-[30%]">
        {mockData.slice(4).map((item, index) => (
          <div
            key={index}
            className="flex gap-4 justify-start items-center mb-3"
          >
            <div className="w-[98px] h-[98px] bg-white rounded-full flex justify-center items-center">
              <div className="w-[50.8px] h-[50.8px]">
                <Image
                  src={item.icon}
                  alt="icon"
                  width={51}
                  height={51}
                  className="w-full h-full bg-cover"
                />
              </div>
            </div>
            <div className="text-[25px] w-[55%] font-semibold font-urbanist text-black">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <div className="m-auto mt-3 w-[95%] pl-10 md:hidden block">
        {mockData.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 justify-start items-center mb-3"
          >
            <div className="w-[58.12px] h-[58.12px] bg-white rounded-full flex justify-center items-center">
              <div className="w-[27.59px] h-[27.59px]">
                <Image
                  src={item.icon}
                  alt="icon"
                  width={27.59}
                  height={27.59}
                  className="w-full h-full bg-cover"
                />
              </div>
            </div>
            <div className="md:text-[25px] text-[20.79px] w-[60%] font-semibold font-urbanist text-black">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
