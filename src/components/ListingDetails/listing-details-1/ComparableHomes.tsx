"use client";
import Image from "next/image";
import Link from "next/link";
import { TfiArrowTopRight } from "react-icons/tfi";
import { BsHeart } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoBookmarkOutline } from "react-icons/io5";
import { useState } from "react";
import { PiBathtub, PiGarage } from "react-icons/pi";
import { LiaBedSolid } from "react-icons/lia";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
   import "slick-carousel/slick/slick-theme.css";

const Card = ({
  title,
  location,
  price,
  cardName,
  cardImage,
}: {
  title: string;
  location: string;
  price: string;
  cardName: string;
  cardImage: string;
}) => {
  return (
    <div className="py-3 px-[10px] mb-2 bg-white shadow-xl rounded-xl md:w-[30%]  w-full">
      <div className="h-[190px] w-full bg-[#717171] rounded-xl relative">
        <div className="w-full h-full">
          <Image
            src={cardImage}
            alt="card"
            width={500}
            height={190}
            objectFit="contain"
            className="rounded-xl w-full h-full bg-cover"
          />
        </div>
        <div className="w-full h-full flex flex-col justify-between items-start px-3 py-2 absolute top-0 left-0">
          <div className="rounded-3xl bg-white px-3 font-abhaya py-2 text-[11px] ">
            {cardName}
          </div>
          <div className="flex justify-end items-end absolute bottom-3 right-5">
            <div className="bg-[#ff6b2c] p-1 rounded-full text-white text-[14px] flex justify-center items-center">
              <TfiArrowTopRight className="text-white" />
            </div>
          </div>
        </div>
      </div>
      <h3 className="md:text-[22px] text-[19px] text-black mt-2 font-abhaya">
        {title}
      </h3>
      <p className="md:text-[15px] text-[14px] text-[#999999]  ">{location}</p>

      <div className="flex justify-between items-center mt-4">
        <p className="md:text-[24px] text-[22px] font-abhaya">{price}</p>
        <div className="flex justify-end gap-2 items-center">
          <BsHeart className="text-[#D5D5D5] text-md hover:text-[#6965fd]" />
          <IoBookmarkOutline className="text-[#D5D5D5] text-md hover:text-[#6965fd]" />
          <IoIosAddCircleOutline className="text-[#D5D5D5] text-2xl hover:text-[#6965fd]" />
        </div>
      </div>
    </div>
  );
};

const tabs = [
  {
    name: "For Sale",
    isActive: true,
  },
  {
    name: "Sold",
    isActive: false,
  },
  {
    name: "For Rent",
    isActive: false,
  },
  {
    name: "Rented",
    isActive: false,
  },
];

const CardsData = [
  {
    title: "Blueberry villa.",
    location: "Mirpur 10, Stadium dhaka 1208",
    price: "$34000",
    cardName: "FOR SALE",
    cardImage: "/assets/images/listing/img_07.jpg",
  },
  {
    title: "Redwood apartment.",
    location: "Mirpur 11, Stadium dhaka 1208",
    price: "$28000",
    cardName: "SOLD",
    cardImage: "/assets/images/listing/img_08.jpg",
  },
  {
    title: "Greenfield estate.",
    location: "Mirpur 12, Stadium dhaka 1208",
    price: "$50000",
    cardName: "FOR RENT",
    cardImage: "/assets/images/listing/img_09.jpg",
  },
  {
    title: "Blueberry villa.",
    location: "Mirpur 10, Stadium dhaka 1208",
    price: "$34000",
    cardName: "FOR SALE",
    cardImage: "/assets/images/listing/img_10.jpg",
  },
  {
    title: "Redwood apartment.",
    location: "Mirpur 11, Stadium dhaka 1208",
    price: "$28000",
    cardName: "SOLD",
    cardImage: "/assets/images/listing/img_11.jpg",
  },
  {
    title: "Greenfield estate.",
    location: "Mirpur 12, Stadium dhaka 1208",
    price: "$50000",
    cardName: "FOR RENT",
    cardImage: "/assets/images/listing/img_12.jpg",
  },
  {
    title: "Blueberry villa.",
    location: "Mirpur 10, Stadium dhaka 1208",
    price: "$34000",
    cardName: "FOR SALE",
    cardImage: "/assets/images/listing/img_13.jpg",
  },
  {
    title: "Redwood apartment.",
    location: "Mirpur 11, Stadium dhaka 1208",
    price: "$28000",
    cardName: "SOLD",
    cardImage: "/assets/images/listing/img_14.jpg",
  },
  {
    title: "Greenfield estate.",
    location: "Mirpur 12, Stadium dhaka 1208",
    price: "$50000",
    cardName: "FOR RENT",
    cardImage: "/assets/images/listing/img_15.jpg",
  },
  {
    title: "Greenfield estate.",
    location: "Mirpur 12, Stadium dhaka 1208",
    price: "$50000",
    cardName: "FOR RENT",
    cardImage: "/assets/images/listing/img_15.jpg",
  },
];

const comparableSelector = [{ id: "1" }, { id: "2" }, { id: "3" }];

export default function ComparableHomes() {
  const [activeTab, setActiveTab] = useState("For Sale");
  const [activeComparable, setActiveComparable] = useState("1");


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    dotsClass: 'slick-dots custom-dots',
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // For screens smaller than 768px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // For screens smaller than 1024px
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  
  const dotStyles = `
  .custom-dots {
    bottom: -30px; /* Adjust position */
    display: flex !important;
    justify-content: center;
  }
  
  .custom-dots li {
    margin: 0 5px;
  }

  .custom-dots li button {
    border: 1px solid #6965FD;
    border-radius: 50%;
    width: 10px;
    height: 10px;
  }

  .custom-dots li.slick-active button {
    background: #6965FD;
  }
`;

  const handleActiveComparable = (id: string) => {
    setActiveComparable(id);
  };

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  // Filter cards based on active tab
  const filteredCards = CardsData.filter((card) => {
    return card.cardName === activeTab.toUpperCase();
  });

  return (
    <div className="bg-white md:px-4 px-2 py-3 rounded-xl ">
      <div className="md:flex justify-between items-center">
        <h1 className="md:px-0 font-abhaya px-2 font-semibold  text-dark md:text-[24px] text-left  ">
          Comparable Homes You May Like
        </h1>
        <div className="sm:flex hidden justify-end items-center gap-3">
          {comparableSelector.map((item, index) => (
            <div
              key={index}
              className={`rounded-full cursor-pointer h-[12px] w-[12px] ${activeComparable === item.id
                ? "bg-black border border-black"
                : "bg-white border border-black"
                } `}
              onClick={() => handleActiveComparable(item.id)}
            ></div>
          ))}
        </div>
      </div>
      <div className="sm:flex grid sm:grid-cols-4 grid-cols-2 w-full md:gap-10 sm:gap-0 gap-3 justify-between items-center border-b border-b-[#DADADA] mt-4 pb-1">
        {tabs.map((tab, index) => (
          <>
            <button
              key={index}
              onClick={() => handleTabChange(tab.name)}
              className={`${activeTab === tab.name
                ? "bg-[#6965fd]  text-white"
                : "text-[#4a4c56] font-bold border bg-[#F8F8F8] border-[#717171]"
                } text-[14px] px-5  sm:py-2 py-3 md:rounded-3xl sm:rounded-xl rounded-full      md:w-[200px]`}
            >
              {tab.name}
            </button>
            {/* <button
              key={index}
              onClick={() => handleTabChange(tab.name)}
              className={`${activeTab === tab.name
                ? " text-[#6965fd] font-bold border border-[#6965fd] text-[11px]"
                : " text-[#4a4c56] font-bold"
                } text-[14px]   rounded-md md:mb-0 mb-2  w-[25%] md:hidden block`}
            >
              {tab.name}
            </button> */}
          </>
        ))}
      </div>
      <div className="md:flex md:flex-wrap justify-start gap-8 overflow-x-auto items-center">
        {/* {filteredCards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            location={card.location}
            price={card.price}
            cardName={card.cardName}
            cardImage={card.cardImage}
          />
        ))} */}
        <div className="sm:grid hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 w-full">
          {[1, 2, 3]?.map((item: any, index: any) => (
            <div
              key={index}
              className="rounded-xl shadow-md   w-full h-full"
            >
              <div className="listing-card-one style-two  w-full h-full flex flex-col">
                <div className="img-gallery w-full">
                  <div className="relative overflow-hidden pt-[6px]">
                    <div className="absolute w-full top-5 left-0 px-[7px] flex justify-between items-center">
                      <div className="font-[500] rounded-r-[8px] text-[12px] font-urbanist w-[68.94px] h-[21.0px] flex justify-center items-center text-white bg-[#6CCFAC]">
                        For Sale
                      </div>
                      <Link
                        href="#"
                        className="bg-white text-black rounded-l-[8px] px-2 py-[2px] text-[12px]"
                      >
                        Detached
                      </Link>
                    </div>

                    <div className="w-[96%] pt-1 mx-auto">
                      <Image
                        alt=""
                        src={"/assets/images/listing/img_15.jpg"}
                        width={400}
                        height={300}
                      />
                    </div>
                  </div>
                </div>

                <div className="property-info w-full px-2 mt-1 pt-2 pb-[2px] flex-grow">
                  <div className="flex flex-wrap justify-between">
                    <Link
                      href={`/listing_details_01?id=${1}`}
                      className="text-[20px] text-black font-urbanist font-[500]"
                    >
                      246 Leadership Drive,
                    </Link>
                    <p className="text-[12px] text-[#999999]">1 hour old</p>
                  </div>
                  <div className="flex flex-wrap justify-between mt-1">
                    <p className="text-[14px] text-[#999999]">Brampton, On, L6Y 3M9</p>
                    <p className="text-[14px] text-[#999999]">Sandighram-Wellington</p>
                  </div>

                  <ul className="flex justify-between items-center mt-2">
                    <li className="flex items-center gap-1">
                      <LiaBedSolid className="text-black text-xl" />
                      <p className="text-black text-[16px]">03</p>
                      <p className="text-[#999999] text-[16px] font-urbanist">bed</p>
                    </li>
                    <li className="flex items-center gap-1">
                      <PiBathtub className="text-black text-xl" />
                      <p className="text-black text-[16px]">02</p>
                      <p className="text-[#999999] text-[16px] font-urbanist">bath</p>
                    </li>
                    <li className="flex items-center gap-1">
                      <PiGarage className="text-black text-xl" />
                      <p className="text-black text-[16px]">02</p>
                      <p className="text-[#999999] text-[16px] font-urbanist">garage</p>
                    </li>
                  </ul>

                  <div className="pl-footer py-1 border-t border-[#a8a8a8] border-dashed flex justify-between items-center">
                    <div className="text-[32px] font-[500] text-[#000]">
                      $1,720,000
                    </div>
                    <Link
                      href={`/listing_details_01?id=${1}`}
                      className="h-10 w-10 bg-[#6965fd] flex justify-center items-center"
                    >
                      <i className="bi text-white bi-arrow-up-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>



        <div className="w-full sm:hidden h-full overflow-hidden pb-4 block">
        <style jsx>{dotStyles}</style>
         <Slider {...settings}>
           {[1, 2, 3].map((item, index) => (
             <div key={index} className="rounded-xl shadow-md w-full h-full">
              <div className="listing-card-one style-two  w-full h-full flex flex-col" style={{borderBottom:'0'}}>
                <div className="img-gallery w-full">
                  <div className="relative overflow-hidden pt-[6px]">
                    <div className="absolute w-full top-5 left-0 px-[7px] flex justify-between items-center">
                      <div className="font-[500] rounded-r-[8px] text-[12px] font-urbanist w-[68.94px] h-[21.0px] flex justify-center items-center text-white bg-[#6CCFAC]">
                        For Sale
                      </div>
                      <Link
                        href="#"
                        className="bg-white text-black rounded-l-[8px] px-2 py-[2px] text-[12px]"
                      >
                        Detached
                      </Link>
                    </div>

                    <div className="w-[96%] pt-1 mx-auto">
                      <Image
                        alt=""
                        src={"/assets/images/listing/img_15.jpg"}
                        width={400}
                        height={300}
                      />
                    </div>
                  </div>
                </div>

                <div className="property-info w-full px-2 mt-1 pt-2 pb-[2px] flex-grow">
                  <div className="flex flex-wrap justify-between">
                    <Link
                      href={`/listing_details_01?id=${1}`}
                      className="text-[20px] text-black font-urbanist font-[500]"
                    >
                      246 Leadership Drive,
                    </Link>
                    <p className="text-[12px] text-[#999999]">1 hour old</p>
                  </div>
                  <div className="flex flex-wrap justify-between mt-1">
                    <p className="text-[14px] text-[#999999]">Brampton, On, L6Y 3M9</p>
                    <p className="text-[14px] text-[#999999]">Sandighram-Wellington</p>
                  </div>

                  <ul className="flex justify-between items-center mt-2">
                    <li className="flex items-center gap-1">
                      <LiaBedSolid className="text-black text-xl" />
                      <p className="text-black text-[16px]">03</p>
                      <p className="text-[#999999] text-[16px] font-urbanist">bed</p>
                    </li>
                    <li className="flex items-center gap-1">
                      <PiBathtub className="text-black text-xl" />
                      <p className="text-black text-[16px]">02</p>
                      <p className="text-[#999999] text-[16px] font-urbanist">bath</p>
                    </li>
                    <li className="flex items-center gap-1">
                      <PiGarage className="text-black text-xl" />
                      <p className="text-black text-[16px]">02</p>
                      <p className="text-[#999999] text-[16px] font-urbanist">garage</p>
                    </li>
                  </ul>

                  <div className="pl-footer py-1 border-t  border-[#a8a8a8] border-dashed flex justify-between items-center">
                    <div className="text-[32px] font-[500] text-[#000]">
                      $1,720,000
                    </div>
                    <Link
                      href={`/listing_details_01?id=${1}`}
                      className="h-10 w-10 bg-[#6965fd] flex justify-center items-center"
                    >
                      <i className="bi text-white bi-arrow-up-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
             </div>
           ))}
         </Slider>
       </div>


      </div>
    </div>
  );
}
