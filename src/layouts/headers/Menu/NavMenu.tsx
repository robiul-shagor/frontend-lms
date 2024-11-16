"use client";
import menu_data from "@/data/home-data/MenuData";
import Link from "next/link.js";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import logo from "@/assets/images/logo/logo_01.svg";
import { useAuth } from "@/context/AuthContext";
import HeaderSearchbar from "./HeaderSearchbar";

const NavMenu = () => {
  const pathname = usePathname();
  const currentRoute = usePathname();
  const [navTitle, setNavTitle] = useState("");
  const { user }: any = useAuth();

  const isMenuItemActive = (menuLink: string) => {
    return currentRoute === menuLink;
  };

  const isSubMenuItemActive = (subMenuLink: string) => {
    return currentRoute === subMenuLink;
  };

  //openMobileMenu
  const openMobileMenu = (menu: any) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };

  return (
    <ul className="md:flex flex-col lg:flex-row lg:items-center hidden">
      <li className="block lg:hidden">
        <div className="logo">
          <Link href="/" className="block">
            <Image src={logo} alt="" />
          </Link>
        </div>
      </li>
      {/* <li className="nav-item dashboard-menu">
        <Link
          className="nav-link"
          href="/dashboard/dashboard-index"
          target="_blank"
        >
          Dashboard
        </Link>
      </li> */}
      <div className=" flex justify-end items-center gap-[25px]">
        {menu_data.map((menu: any) => (
          <li
            key={menu.id}
            className={`flex justify-end relative ${menu.class_name}`}
          >
            <Link
              href={menu.link}
              className={`text-[18px] mr-4  font-[500] text-[#0f2a37] `}
            >
              {menu.title}
            </Link>
          </li>
        ))}
      </div>
      {/* {menu_data.map((menu: any) => (
        <li
          key={menu.id}
          className={`flex justify-end relative ${menu.class_name}`}
        >
          <Link
            href={menu.link}
            className={`text-[18px] mr-8  font-[500] text-[#0f2a37] `}
          >
            {menu.title}
          </Link>
        </li>
      ))} */}
    </ul>
  );
};

export default NavMenu;
