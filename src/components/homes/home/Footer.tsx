import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { ImFacebook } from "react-icons/im";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterLine } from "react-icons/ri";
import { FaLinkedinIn } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#110b23] w-full pb-20 font-urbanist">
      <div className="md:w-[85%] w-[92%] mx-auto">
        <div className="md:flex justify-start items-center md:py-[65px] py-[40px] md:gap-[180px] border-b border-b-[#515151]">
          <div>
            <Image
              src="/assets/images/hero/logo-white.png"
              width={100}
              height={80}
              alt="logo"
              className="mb-3"
            />
            <ul className="flex flex-col gap-3 mt-5">
              <li className="flex justify-start items-center gap-3">
                <div className="w-[39px] h-[39px] rounded-full bg-[#7D7AED] flex justify-center items-center">
                  <MdOutlineEmail className="text-white text-xl" />
                </div>
                <Link
                  href="mailto:info@homecraze.com"
                  className="text-[#D6D6D6] text-[18px]"
                >
                  info@homecraze.com
                </Link>
              </li>
              <li className="flex justify-start items-center gap-3">
                <div className="w-[39px] h-[39px] rounded-full bg-[#7D7AED] flex justify-center items-center">
                  <FiPhone className="text-white text-xl" />
                </div>
                <Link href="" className="text-[#D6D6D6] text-[18px]">
                  25225211, 22425221
                </Link>
              </li>
              <li className="flex justify-start items-center gap-3">
                <div className="w-[39px] h-[39px] rounded-full bg-[#7D7AED] flex justify-center items-center">
                  <IoLocationOutline className="text-white text-xl" />
                </div>
                <Link href="" className="text-[#D6D6D6] text-[18px]">
                  This will be Your Address
                </Link>
              </li>
            </ul>
          </div>
          <div
            className="flex flex-wrap md:justify-start justify-between items-center
           md:gap-[135px]  md:mt-3 mt-9"
          >
            <div className="text-white md:w-auto w-[50%]">
              <label className="text-[25px] font-urbanist font-bold">
                Explore
              </label>
              <ul className="text-[#D6D6D6] text-[18px] flex justify-between flex-col md:gap-[13px] gap-[8px] md:mt-6 mt-4">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/listing_13">Browse Listings</Link>
                </li>
                <li>
                  <Link href="/listing_13">Map Search</Link>
                </li>
                <li>
                  <Link href="/">Home Evalutaion</Link>
                </li>
              </ul>
            </div>
            <div className="text-white md:w-auto w-[50%]">
              <label className="text-[25px] font-urbanist font-bold">
                Learn More
              </label>
              <ul className="text-[#D6D6D6] text-[18px] flex justify-between flex-col md:gap-[13px] gap-[8px] md:mt-6 mt-4">
                <li>
                  <Link href="/">Home Craze AI</Link>
                </li>
                <li>
                  <Link href="/">Careers</Link>
                </li>
                <li>
                  <Link href="/">Blogs</Link>
                </li>
                <li>
                  <Link href="/">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="text-white md:w-auto w-[50%] md:mt-0 mt-6">
              <label className="text-[25px] font-urbanist font-bold">
                My Account
              </label>
              <ul className="text-[#D6D6D6] text-[18px] flex justify-between flex-col md:gap-[13px] gap-[8px] md:mt-6 mt-4">
                <li>
                  <Link href="/">Profile</Link>
                </li>
                <li>
                  <Link href="/">Favorites</Link>
                </li>
                <li>
                  <Link href="/">Watched Listings</Link>
                </li>
                <li>
                  <Link href="/">Watched Area</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col justify-between items-center py-10">
          <ul className="flex justify-start items-center gap-3">
            <li>
              <Link
                href="/"
                className="bg-[#1b1638] rounded-full w-[40px] h-[40px] flex justify-center items-center"
              >
                <ImFacebook className="text-[22px] text-[#7D7AED]" />
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="bg-[#1b1638] rounded-full w-[40px] h-[40px] flex justify-center items-center"
              >
                <FaInstagram className="text-[22px] text-[#7D7AED]" />
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="bg-[#1b1638] rounded-full w-[40px] h-[40px] flex justify-center items-center"
              >
                <RiTwitterLine className="text-[22px] text-[#7D7AED]" />
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="bg-[#1b1638] rounded-full w-[40px] h-[40px] flex justify-center items-center"
              >
                <FaLinkedinIn className="text-[30px] text-[#7D7AED]" />
              </Link>
            </li>
          </ul>
          <div className="text-[#D6D6D6] text-[18px] md:mt-0 mt-3">
            © Home Craze
          </div>
          <ul className="text-[#D6D6D6] text-[18px] flex md:flex-row flex-col justify-start items-center gap-3 md:mt-0 mt-3">
            <li>
              <Link href="/">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
        <div className="text-[#D6D6D6] text-[18px] md:text-left text-center md:mt-0 mt-1">
          The trademarks REALTOR®, REALTORS®, and the REALTOR® logo are
          controlled by The Canadian Real Estate Association (CREA) and identify
          real estate professionals who are members of CREA. The trademarks
          MLS®, Multiple Listing Service® and the associated logos are owned by
          CREA and identify the quality of services provided by real estate
          professionals who are members of CREA. Used under license.
        </div>
      </div>
    </footer>
  );
}
