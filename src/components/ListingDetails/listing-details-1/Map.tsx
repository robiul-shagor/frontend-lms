import map from "@/assets/images/listing/map.png";
import Image from "next/image";

import { CiLocationArrow1 } from "react-icons/ci";

export default function Map() {
  return (
    <div className=" my-1">
      <h1 className="md:text-[24px] font-abhaya  font-semibold text-dark mb-3 ">
        Location
      </h1>
      <div className="bg-white px-3 py-3 rounded-xl w-full relative">
        <Image
          src={map}
          alt="map"
          className="lazy-img rounded-2xl"
          layout="responsive"
          width={500} // Adjust this to your desired width
          height={300} // Adjust this to your desired height
        />
        <div>
          <button className="bg-[#6965FD] px-3 font-lato py-2 hidden  font-medium text-[15px]   rounded-md text-white absolute md:bottom-[30px] bottom-5 md:left-[30px] left-5 md:flex justify-center items-center gap-1">
            <CiLocationArrow1 className="text-white md:text-xl text-md" />
            Get Direction
          </button>
          <button className="bg-[#6965FD] px-3 font-lato py-2  flex  font-medium text-[15px]   rounded-md text-white absolute md:bottom-[30px] bottom-5 md:left-[30px] left-5 md:hidden justify-center items-center gap-1">
            <CiLocationArrow1 className="text-white md:text-xl text-md" />
            Get Direction
          </button>
        </div>
      </div>
    </div>
  );
}
