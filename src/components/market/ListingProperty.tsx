import { BsArrowUpRight } from "react-icons/bs";

import { FaHeart } from "react-icons/fa";
import { MdOutlineKingBed } from "react-icons/md";
import { PiBathtub } from "react-icons/pi";
import { BsTextarea } from "react-icons/bs";
import Image from "next/image";

const data = [
  {
    img: "/assets/images/listing/img_32.jpg",
    time: "1 hour ago",
    address:
      "Unit 705 — 85 Queens Wharf Rd, Toront ngfdghjkljhgfdghjk dfghf jjfhj",
    bed: "3+3 Bed",
    bath: "3 Bath",
    sqft: "300 Sq ft.",
    price: "$16,888,141",
    market: "25% from Market",
    trend: "down",
  },
  {
    img: "/assets/images/listing/img_33.jpg",
    time: "1 hour ago",
    address:
      "Unit 705 — 85 Queens Wharf Rd, Toront ngfdghjkljhgfdghjk dfghf jjfhj",
    bed: "3+3 Bed",
    bath: "3 Bath",
    sqft: "300 Sq ft.",
    price: "$16,888,141",
    market: "25% from Market",
    trend: "up",
  },
  {
    img: "/assets/images/listing/img_34.jpg",
    time: "1 hour ago",
    address:
      "Unit 705 — 85 Queens Wharf Rd, Toront ngfdghjkljhgfdghjk dfghf jjfhj",
    bed: "3+3 Bed",
    bath: "3 Bath",
    sqft: "300 Sq ft.",
    price: "$16,888,141",
    market: "25% from Market",
    trend: "down",
  },
  {
    img: "/assets/images/listing/img_36.jpg",
    time: "1 hour ago",
    address:
      "Unit 705 — 85 Queens Wharf Rd, Toront ngfdghjkljhgfdghjk dfghf jjfhj",
    bed: "5+3 Bed",
    bath: "4 Bath",
    sqft: "320 Sq ft.",
    price: "$16,898,141",
    market: "15% from Market",
    trend: "up",
  },
];

const Card = ({ item }: { item: any }) => {
  return (
    <div className="md:w-[23%] w-full h-auto rounded-[12px] shadow-md relative group md:mb-0 mb-3">
      <div className="w-full h-[166px] relative">
        <Image
          src={item.img}
          width={369.93}
          height={283.24}
          alt={item.price}
          className="rounded-t-[10px] w-full h-full object-cover"
        />
        <div className="absolute top-[150px] z-[9999] -left-3">
          <Image
            src={"/assets/images/market/popular.png"}
            width={120}
            height={80}
            alt="popular"
          />
        </div>
      </div>
      <div className="w-full px-2 pb-1 pt-3 bg-white ">
        <div className="flex justify-between items-center font-bold font-urbanist py-2 text-[19.89px] w-full text-black">
          Banglow
          <p className="text-[#7d7aed]">{item.price}</p>
        </div>
        <div className="w-full text-[#7f8393] text-[14.26px] mt-1 mb-2">
          2699 Green Valley, Highland Lake, FL
        </div>
        <div className="flex justify-start gap-3 items-center mt-1 pt-2 pb-4 border-t border-t-[#D5D5D5]">
          <div className="flex justify-start items-center gap-1  text-[#4d536a]">
            <MdOutlineKingBed className="text-[18px] text-[#7065F0]" />
            <p className="text-[14px]">{item.bed}</p>
          </div>
          <div className="flex justify-start items-center gap-1   text-[#4d536a]">
            <PiBathtub className="text-[18px] text-[#7065F0]" />
            <p className="text-[14px]">{item.bath}</p>
          </div>
          <div className="flex justify-start items-center gap-1   text-[#4d536a]">
            <BsTextarea className="text-[18px] text-[#7065F0]" />
            <p className="text-[14px]">{item.sqft}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function NewListing() {
  return (
    <div className=" mt-10 md:w-[85%] w-[95%] m-auto">
      <div className="flex justify-between items-center ">
        <h1 className="md:text-[48px] text-[25px] text-[#3B4758] font-bold font-urbanist">
          Properties For Sale
        </h1>
        <div className="flex justify-between items-center gap-4 md:bg-[#7D38DF] rounded-[50px] py-1 md:px-0 px-1 md:pl-3 md:pr-[2px]">
          <p className="text-[18px] text-[#ffffff] md:block hidden">
            View more
          </p>
          <div className="bg-white md:w-[40px] w-[39px] md:h-[40px] h-[39px] rounded-full flex justify-center items-center">
            <BsArrowUpRight className="text-[#7D38DF] font-bold text-[27px]" />
          </div>
        </div>
      </div>
      <div className="my-4 md:flex justify-between md:px-2 px-[4px] items-center md:gap-5 gap-3   overflow-x-auto scrollable py-1">
        {data.map((item, index) => (
          <Card key={index} item={item as any} />
        ))}
      </div>
    </div>
  );
}
