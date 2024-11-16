"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const navItems = [
  { title: "Browse Listings", link: "/listing_13" },
  { title: "Market Reports", link: "/market" },
  { title: "Tools", link: "/" },
];

export default function Header() {
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

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full h-[100px] transition-colors duration-300 ${
        isScrolled ? "bg-white" : "bg-transparent"
      } md:pt-6 pt-2 md:px-4 px-2`}
    >
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center gap-20">
          <Image
            src="/assets/images/hero/logo.png"
            width={134}
            height={73}
            alt="logo"
            className="md:w-[134px] w-[110px] md:h-[73px] h-[63px]"
          />
          <div className="text-white md:flex hidden w-[189px] h-[42px] font-urbanist text-[18px] font-[700] rounded-[50px]  justify-center items-center bg-gradient3">
            Download App
          </div>
          <div className="md:flex hidden justify-between items-center gap-4 ml-[60px]">
            {navItems.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className="text-[#595959] text-[18px] font-[400] flex justify-between items-center"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="md:flex hidden justify-center gap-5 items-center">
          <p className="text-[#595959] text-[18px] font-[400]">Login</p>
          <div className="text-white font-urbanist text-[18px] font-[700] rounded-[50px] flex justify-center items-center bg-gradient3 w-[133px] h-[49px]">
            Signup
          </div>
        </div>
        <div
          className="md:hidden block cursor-pointer"
          onClick={() => handleShowNav()}
        >
          <GiHamburgerMenu className="text-[#595959] text-[24px] cursor-pointer" />
        </div>
        {showNav && (
          <div className="fixed top-0 right-0 w-[50vw] z-[9999] h-[100vh] bg-white shadow-lg md:hidden block">
            <div className="w-full h-full relative px-2 py-5">
              <IoMdClose
                className="text-[#595959] text-[24px] absolute top-[12px] right-[12px] cursor-pointer"
                onClick={() => handleShowNav()}
              />

              {
                <div className="flex flex-col gap-4 mt-0">
                  <Link
                    href=""
                    className="text-[#595959] text-[18px] font-[400]"
                  >
                    Signup
                  </Link>
                  <Link
                    className="text-[#595959] text-[18px] font-[400]"
                    href=""
                  >
                    Login
                  </Link>
                  {navItems.map((item, index) => (
                    <Link
                      href={item?.link || ""}
                      key={index}
                      className="text-[#595959] text-[18px] font-[400]"
                    >
                      {item.title}
                    </Link>
                  ))}
                  <div className="absolute bottom-5 right-1 text-white md:hidden flex mt-6 w-[189px] h-[42px] font-urbanist text-[18px] font-[700] rounded-[50px]  justify-center items-center bg-gradient3">
                    Download App
                  </div>
                </div>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
