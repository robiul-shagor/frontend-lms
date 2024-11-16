import CustomLineChart from "./CustomLineChart";

export default function MarketStats() {
  return (
    <div className="md:w-[88%] font-urbanist w-full mx-auto mt-11 bg-[#eef0ff] md:pt-20 pt-10 pb-10 md:px-7 px-2 md:rounded-[50px]">
      <h1 className="text-black text-center md:text-[50px] text-[25px] font-bold font-urbanist">
        Tracking the Market <br />
        GTA Real Estate Snapshot
      </h1>
      <p className="md:block hidden mt-4 text-[18px] text-[#595959] text-center">
        Easily analyze trends from the last few years - see how <br /> GTA
        housing is shaping up across all property types.
      </p>
      <p className="md:hidden block mt-4 text-[18px] text-[#595959] text-center">
        Easily analyze trends from the last few years - see how GTA housing is
        shaping up across all property types.
      </p>
      <div className="w-full mt-11">
        <CustomLineChart />
      </div>
    </div>
  );
}
