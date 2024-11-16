import { CiSearch } from "react-icons/ci";
import { ImLocation } from "react-icons/im";

export default function Map() {
  return (
    <div className="md:w-[85%] w-[95%] mx-auto md:rounded-[12px] mb-4 relative group">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83088.3595592641!2d-105.54557276330914!3d39.29302101722867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x874014749b1856b7%3A0xc75483314990a7ff!2sColorado%2C%20USA!5e0!3m2!1sen!2sbd!4v1699764452737!5m2!1sen!2sbd"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-100 md:h-[70vh] h-[50vh] md:rounded-[12px] border-none outline-none"
      ></iframe>
      {/* The overlay div will only be visible on hover due to the 'group' class and CSS */}
      <div className="absolute top-0 left-0 bg-[#8f9091] z-[9999] bg-opacity-30 md:rounded-[12px] md:h-[70vh] h-[50vh] w-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex justify-between pr-2 items-center gap-1 max-w-[370px] rounded-[50px] bg-white h-[55px]">
          <div className="flex justify-start items-center gap-1">
            <CiSearch className="text-[#615353] text-[30px] ml-5 mt-5" />
            <input
              type="text"
              placeholder="Search for location"
              className="w-[90%] m-auto mt-5 p-2 rounded-[12px] bg-white"
            />
          </div>
          <ImLocation className="text-[#cccccc] text-[30px]" />
        </div>
      </div>
    </div>
  );
}
