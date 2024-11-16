import {
  HiArrowLongRight,
  HiArrowLongDown,
  HiArrowLongUp,
} from "react-icons/hi2";
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
    <div className="md:w-[369.93px] font-urbanist w-[330px] h-[424.52px] rounded-[20px] shadow-md relative group">
      <div className="w-full h-[283.24px] relative">
        <Image
          src={item.img}
          width={369.93}
          height={283.24}
          alt={item.price}
          className="rounded-[20px] w-full h-full object-cover"
        />
        <div className="absolute top-5 px-3 flex justify-between items-center w-full">
          <div className="w-[134px] h-[39px] rounded-[50px] bg-white text-black flex justify-center items-center">
            Condominium
          </div>
          <FaHeart className="text-[#78809c] text-[22px]" />
        </div>
      </div>
      <div className="w-full px-2 py-1">
        <p className="text-[17.56px] text-[#595959]">{item.time}</p>
        <div className="h-[30px] truncate w-full text-black">
          {item.address}
        </div>
        <div className="flex justify-start gap-3 items-center mt-1">
          <div className="flex justify-start gap-1 pr-2 border-r border-[#595959] text-[#595959]">
            <MdOutlineKingBed className="text-[18px]" />
            <p className="text-[14px]">{item.bed}</p>
          </div>
          <div className="flex justify-start gap-1 pr-2 border-r border-[#595959] text-[#595959]">
            <PiBathtub className="text-[18px]" />
            <p className="text-[14px]">{item.bath}</p>
          </div>
          <div className="flex justify-start gap-1 pr-2 border-r border-[#595959] text-[#595959]">
            <BsTextarea className="text-[18px]" />
            <p className="text-[14px]">{item.sqft}</p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-3 mt-1">
          <p className="text-[#7d7aed] font-semibold font-urbanist text-[25px]">
            {item.price}
          </p>
          <div
            className={`w-[152.09px] h-[33.03px] flex justify-center items-center gap-1 rounded-[50px] ${
              item.trend === "down"
                ? "bg-[#DFFFEA] text-[#15973C]"
                : "bg-[#ffebeb] text-[#f76d57]"
            }`}
          >
            {item.trend === "up" ? (
              <HiArrowLongDown className="text-[#f76d57] text-[18px]" />
            ) : (
              <HiArrowLongUp className="text-[#15973C] text-[18px]" />
            )}
            <p className="text-[14px]">{item.market}</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 hidden group-hover:flex bg-[#c2c2cd] bg-opacity-60 text-white px-2 rounded-[20px] justify-center items-center font-urbanist">
        <div className="flex flex-col text-center justify-center items-center">
          <p className="text-[30px] font-bold">
            To View Listing please create account or Login
          </p>
          <div className="w-[220px] h-[52px] border border-white rounded-[50px] text-[18px] flex justify-center items-center mt-2 cursor-pointer">
            Signup
          </div>
          <p className="text-[18px] cursor-pointer mt-3">Login</p>
        </div>
      </div>
    </div>
  );
};

export default function NewListing() {
  return (
    <div className="w-full mt-11 font-urbanist">
      <div className="flex justify-between items-center w-[88%] m-auto">
        <h1 className="md:text-[48px] text-[25px] text-black font-bold font-urbanist">
          Recently Sold
        </h1>
        <div className="flex justify-between items-center gap-4">
          <p className="text-[18px] text-[#595959] md:block hidden">SEE ALL</p>
          <div className="bg-[#2A1C4F] md:w-[55px] w-[39px] md:h-[55px] h-[39px] rounded-full flex justify-center items-center">
            <HiArrowLongRight className="text-white font-bold text-[27px]" />
          </div>
        </div>
      </div>
      <div className="my-6 flex justify-start items-center md:gap-5 gap-3 ml-[6vw] pr-4 overflow-x-auto scrollable py-1">
        {data.map((item, index) => (
          <Card key={index} item={item as any} />
        ))}
      </div>
    </div>
  );
}
