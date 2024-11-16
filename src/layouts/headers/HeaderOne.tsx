"use client";
import NavMenu from "./Menu/NavMenu";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import UseSticky from "@/hooks/UseSticky";
import LoginModal from "@/modals/LoginModal";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import menu_data from "@/data/home-data/MenuData";

import logo_1 from "@/assets/images/logo/logo_01.svg";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { usePathname } from "next/navigation";
import api from "@/lib/api";
import HeaderSearchbar from "./Menu/HeaderSearchbar";
import { set } from "mongoose";

const HeaderOne = ({ style }: any) => {
  const { sticky } = UseSticky();
  const [isOpen, setIsOpen] = useState(false);
  const { user }: any = useAuth();
  console.log("user", user);
  const pathname = usePathname();
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await api.get("/api/users/logout", {
        withCredentials: true,
      });
      if (pathname === "/") {
        window.location.reload();
      } else {
        window.location.href = "https://real-estate-web-zysoftec.vercel.app";
      }
    } catch (error) {}
  };
  return (
    <>
      <header
        className={`theme-main-menu menu-overlay menu-style-one sticky-menu bg-[#F8F8F8] ${
          sticky ? "fixed" : ""
        }`}
      >
        {isOpen && (
          <div className="fixed top-0 right-0 bg-black text-white min-w-[50vw] min-h-[100vh] z-[9999] shadow-lg">
            <div className="absolute top-2 right-2 w-full">
              <div className="mt-5 ] text-white relative p-4  w-full">
                <button
                  className="absolute top-1 right-1"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <IoMdClose className="text-white" />
                </button>
                <ul className="flex flex-col gap-3 w-full">
                  {menu_data.map((menu: any) => (
                    <li
                      key={menu.id}
                      className={`flex justify-start relative w-full ${menu.class_name}`}
                    >
                      <Link
                        href={menu.link}
                        className={`font-[500] text-[15px]  text-white `}
                      >
                        {menu.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {!style && (
          <div className="alert-wrapper text-center">
            <p className="fs-16 m0 text-white">
              The{" "}
              <Link href="/listing_01" className="fw-500">
                flash sale
              </Link>{" "}
              go on. The offer will end in — <span>This Sunday</span>
            </p>
          </div>
        )}
        <div className="inner-content gap-one">
          <div className="top-header position-relative">
            <div className="d-flex align-items-center justify-content-between">
              <div className="logo order-lg-0">
                <Link href="/" className="d-flex align-items-center">
                  <Image src={logo_1} width={100} height={100} alt="" />
                </Link>
              </div>
              {/* <HeaderSearchbar isSearch={isSearch} setIsSearch={setIsSearch} /> */}
              <div className="md:ml-[60px] ml-7 rounded-3xl border border-[#b4b4b4] px-2 py-2 flex justify-between items-center md:w-[600px] w-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border-none outline-none  bg-transparent text-[#a2abae] placeholder-[#a2abae] text-[14px]  md:block hidden w-fit"
                />
                <i
                  className="fa fa-search text-[#a2abae] md:ml-3 ml-0"
                  aria-hidden="true"
                ></i>
              </div>

              <div className="right-widget ms-auto ms-lg-0 me-3 me-lg-0 order-lg-3">
                <ul className="d-flex align-items-center style-none">
                  {user ? (
                    <li className="btn-one">
                      <Link href="/dashboard/dashboard-index">
                        <span>{user?.username}</span>
                      </Link>
                      <span
                        onClick={() => handleLogout()}
                        style={{ cursor: "pointer", marginLeft: "5px" }}
                      >
                        <i className="fa fa-sign-out" aria-hidden="true"></i>
                      </span>
                    </li>
                  ) : (
                    <li>
                      <Link
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#loginModal"
                        className="text-blue-500 border-blue-500 md:w-[130px] w-[100px] md:h-[55px] h-[40px]  outline-none border-2 rounded-xl flex justify-center items-center gap-1"
                      >
                        <i className="fa-regular fa-lock"></i>{" "}
                        <span>Login</span>
                      </Link>
                    </li>
                  )}
                  <li className="d-none d-md-inline-block ms-3">
                    <Link
                      href="/dashboard/add-property"
                      className="btn-two"
                      target="_blank"
                    >
                      <span>Add Listing</span>{" "}
                      <i className="fa-thin fa-arrow-up-right"></i>
                    </Link>
                  </li>
                </ul>
              </div>

              <NavMenu />
              <div className="d-lg-none d-block order-1">
                <button className="btn-menu" onClick={() => setIsOpen(!isOpen)}>
                  <AiOutlineMenu />
                </button>
              </div>

              {/* <nav className="w-fit  lg:flex lg:items-center lg:justify-between p-0 order-2 relative">
                <button
                  className="lg:hidden block focus:outline-none"
                  type="button"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  onClick={() => {
                    if (isOpen) {
                      setIsOpen(false);
                      return;
                    }
                    setIsOpen(false);
                  }} // You would need state to handle this
                >
                  <span className="block w-6 h-1 bg-gray-800 mb-1"></span>
                  <span className="block w-6 h-1 bg-gray-800 mb-1"></span>
                  <span className="block w-6 h-1 bg-gray-800"></span>
                </button>

                <div
                  className={`w-full lg:flex lg:items-center absolute top-0 right-0 lg:justify-between transition-all duration-300 ease-in-out ${
                    isOpen ? "block" : "hidden"
                  }`} // Manage collapse with a state
                  id="navbarNav"
                >
                  {/* <input type="search" className="border-[1px]-black w-[300px]" /> */}
              {/* <NavMenu /> */}
              {/* </div>
              </nav> */}
            </div>
          </div>
        </div>
      </header>
      <LoginModal />
    </>
  );
};

export default HeaderOne;
