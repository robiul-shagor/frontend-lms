const nearbyData = [
  {
    name: "School & College:",
    value: "1.5km",
  },
  {
    name: "Grocerry Center:",
    value: "0.2km",
  },
  {
    name: "Gym:",
    value: "0.5km",
  },
  {
    name: "Hospital:",
    value: "1.5km",
  },
  {
    name: "Metro Station:",
    value: "0.2km",
  },
  {
    name: "University:",
    value: "0.5km",
  },
  {
    name: "Shopping Mall:",
    value: "1.5km",
  },
  {
    name: "Police Station:",
    value: "0.2km",
  },
  {
    name: "Bus Station:",
    value: "0.5km",
  },
  {
    name: "River:",
    value: "1.5km",
  },
  {
    name: "Park:",
    value: "0.2km",
  },
  {
    name: "Airport:",
    value: "0.5km",
  },
];

export default function Nearby() {
  return (
    <div className="bg-white rounded-xl p-4">
      <h1 className="md:text-[24px] font-abhaya  font-semibold text-dark mb-1 ">
        Nearby
      </h1>
      {/* <p className="text-[#717171] font-lato  mb-4 md:text-[20px] text-[14px]">
        Risk management and compliance, when approached strategically, have the
        potential to go beyond mitigating threats.
      </p> */}

      <div className="flex justify-between font-lato items-center mt-3 md:gap-x-10 gap-y-3 flex-wrap">
        {nearbyData.map((data, index) => (
          <>
            <div
              key={index}
              className="flex md:hidden items-center justify-between w-[45%]   "
            >
              <h1 className=" text-[#717171] md:text-[17px] text-[13px]">
                {data.name}
              </h1>
              <p className="text-black md:text-[17px] text-[13px]">
                {data.value}
              </p>
            </div>
            <div
              key={index}
              className="md:flex hidden items-center justify-between w-[26%] pr-11 "
            >
              <h1 className=" text-[#717171] md:text-[17px] text-[13px]">
                {data.name}
              </h1>
              <p className="text-black md:text-[17px] text-[13px]">
                {data.value}
              </p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
