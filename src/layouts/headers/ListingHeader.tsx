"use client";

import LoginModal from "@/modals/LoginModal";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { LuMenu } from "react-icons/lu";

const navItems = [
  { title: "Home", link: "/" },
  { title: "Map Search", link: "/listing_14" },
  { title: "Home Valuation", link: "/listing_13" },
  { title: "Blog", link: "/market" },
  { title: "Contact us", link: "/contact" },
];

export default function ListinHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const handleShowNav = () => {
    setShowNav(!showNav);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
const [openLoginModal, setopenLoginModal] = useState(false)
  return (
    <>
    {openLoginModal === true && <LoginModal />}
    <div
      className={`bg-transparent fixed top-0 left-0 w-full z-[99]  font-urbanist  ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-transparent  py-[2px] lg:pt-6 pt-2 w-full"
      } `}
    >
      <div
        className={`flex justify-between items-center px-4 mx-auto gap-7 ${
          isScrolled
            ? "bg-white py-[2px] lg:pt-6 pt-2 w-full px-6"
            : "bg-transparent"
        }`}
      >
        <Link
          href={'/'}
          >
        
        </Link>
        <Image
          src="/assets/images/logo/logo_01.svg"
          width={134}
          height={73}
          alt="logo"
          className="lg:w-[134px] w-[110px] lg:h-[73px] sm:h-[63px] h-[40px]"
        />

        <div className="lg:flex hidden justify-between items-center gap-5">
          {navItems.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="text-[#000000] hover:border-b-[3px] hover:border-b-[#6965fd]  text-[16px] font-[500] flex justify-between items-center"
            >
              {item.title}
            </Link>
          ))}
        </div>
<div className="flex items-center gap-4">
        <div className=" lg:flex hidden border-2 border-[#b3b3b3] h-[40px]  px-[10px] rounded-[8px]  justify-end items-center">
          <input
            type="text"
            placeholder="Search"
            className="border-none outline-none bg-transparent text-[#7f7f7f] placeholder-[#7f7f7f]  text-[16px] font-[400]"
          />
          <CiSearch className="text-[#595959] text-[19px] font-[400]" />
        </div>

        <div className="flex justify-start items-center gap-2">
          <div className="text-white lg:flex hidden px-6 py-2 font-urbanist text-[16px] font-[500] rounded-[8px] justify-center items-center bg-[#6965fd]">
            Download App
          </div>
          <div onClick={() => setopenLoginModal(true)}  className="text-white lg:flex hidden px-6 py-2 font-urbanist text-[16px] font-[500] rounded-[8px] justify-center items-center bg-[#6965fd]">
            Login
          </div>
          <div onClick={() => setopenLoginModal(true)} className="text-white lg:flex hidden px-6 py-2 font-urbanist text-[16px] font-[500] rounded-[8px] justify-center items-center bg-[#6965fd]">
            Sign up
          </div>
        </div>
        <div className="lg:hidden flex gap-2 justify-end items-center">
          <div className="border-2 border-[#b3b3b3] py-[4px] w-[150px]  px-1 rounded-[8px] flex justify-between  items-center">
            <input
              type="text"
              placeholder="Search"
              className="border-none outline-none bg-transparent w-[70%] text-[#7f7f7f] placeholder-[#7f7f7f] lg:text-[18px] text-[16px] font-[400]"
            />
            <CiSearch className="text-[#595959] text-[18px] font-[400]" />
          </div>
          <LuMenu
            className="text-[#595959] text-[24px] lg:hidden block"
            onClick={() => handleShowNav()}
          />
        </div>
      </div>
      </div>
      {showNav && (
        <div className="fixed top-0 right-0 w-[50vw] z-[9999] h-[100vh] bg-white shadow-lg lg:hidden block">
          <div className="w-full h-full relative px-2 py-5">
            <IoMdClose
              className="text-[#595959] text-[24px] absolute top-[12px] right-[12px] cursor-pointer"
              onClick={() => handleShowNav()}
            />

            {
              <div className="flex flex-col gap-4 mt-0">
                <Link href="" className="text-[#595959] text-[16px] font-[400]">
                  Signup
                </Link>
                <Link className="text-[#595959] text-[16px] font-[400]" href="">
                  Login
                </Link>
                {navItems.map((item, index) => (
                  <Link
                    href={item?.link || ""}
                    key={index}
                    className="text-[#595959] text-[16px] font-[400]"
                  >
                    {item.title}
                  </Link>
                ))}
                <div className="absolute w-full bottom-5 right-0 flex justify-center items-center">
                  <div className="text-white lg:hidden flex  font-urbanist text-[16px] font-[500] rounded-[8px]  justify-center items-center bg-[#6965fd] px-3 py-2">
                    Download App
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      )}
    </div>
    </>
  );
}
