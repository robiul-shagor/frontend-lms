import CustomLineChart from "./CustomLineChart";

export default function MarketStats() {
  return (
    <div className="md:w-[85%] w-[95%] mx-auto mb-3 mt-11 bg-[#ffffff] md:pt-2 pt-5 pb-0 md:px-0 px-2 rounded-[12px]">
      <h1 className="text-black text-left md:text-[24px] text-[18px] font-bold font-urbanist  ml-10 mt-2">
        Price Trend
      </h1>

      <div className="w-full mt-4">
        <CustomLineChart />
      </div>
    </div>
  );
}
