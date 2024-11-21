import { HiArrowLongRight } from "react-icons/hi2";

export default function Hero() {
  return (
    <div className="flex justify-center flex-col items-center  text-center font-urbanist">
      <h1 className="md:text-[75px] text-[30px] font-urbanist text-black font-bold md:mt-0 mt-[-20px]">
        Find the perfect home <br />{" "}
        <span className="text-[#4297ff]">guided by AI</span>
      </h1>
      <p className="font-[400] text-[18px] text-[#595959] mt-10 md:px-0 px-7">
        Checkout Our Comprehensive set of MLS Listings
      </p>
      <div className="px-3 flex justify-center items-center rounded-[50px] md:w-[508px] w-[321px] h-[55px] bg-gradient2 rounded-50px font-urbanist font-bold mt-10">
        <div className="text-black md:w-[264px] w-[160px]  font-bold text-[18px] h-[42px] rounded-[50px] flex justify-center items-center">
          For Sale
        </div>
        <div className="md:w-[264px] w-[160px]  h-[42px] bg-gradient4 rounded-[50px] flex justify-center items-center text-white text-[18px]  ">
          Recently Sold
        </div>
      </div>
      <form action="/listing_13" method="GET" className="mt-7 px-3 md:w-[651px] w-[320px] md:h-[70px] h-[68px] flex justify-between items-center rounded-[50px] bg-white shadow-lg">   
        <input
          type="text"
          name="search"
          placeholder="Search for an Address, MLS Number or neighoourhood"
          className="md:w-[463.77px] w-auto border-none outline-none text-[#adadad] placeholder-[#adadad] rounded-[50px] text-[18px] font-urbanist font-[400]"
        />
        <button type="submit" className="bg-[#110B23] md:w-[70px] w-[41] md:h-[47px] h-[41] rounded-[50px] flex justify-center items-center">
              <HiArrowLongRight className="text-white font-bold text-[27px]" />
        </button>
      </form>
      <div className="flex justify-center mb-11 px-2 items-center rounded-[50px] md:w-[508px] w-[321px] h-[55px] bg-gradient2 rounded-50px font-urbanist font-bold mt-10">
        <div className="text-white md:w-[264px] w-[167px] bg-gradient4  font-bold text-[18px] h-[42px] rounded-[50px] flex justify-center items-center">
          Home Evalutaion
        </div>
        <div className="md:w-[264px] w-[167px] h-[42px]  rounded-[50px] flex justify-center items-center text-black text-[18px]  ">
          Market Report
        </div>
      </div>
    </div>
  );
}
