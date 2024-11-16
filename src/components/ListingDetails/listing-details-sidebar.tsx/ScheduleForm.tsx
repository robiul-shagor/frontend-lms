"use client";

import { toast } from "react-toastify";
import { useState } from "react";

const ScheduleForm = ({ tourType, date }: { tourType: string; date: any }) => {
  const [tourData, setTourData] = useState({
    tourType: tourType,
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTourData({ ...tourData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (
      tourData.tourType === "" ||
      tourData.date === "" ||
      tourData.time === "" ||
      tourData.name === "" ||
      tourData.phone === "" ||
      tourData.email === "" ||
      tourData.message === ""
    ) {
      toast.error("All fields are mandatory");
    } else {
      toast.success("Schedule request submitted successfully");
      console.log(tourData);
      // Optionally reset the form
      setTourData({
        tourType: "",
        date: "",
        time: "",
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <form onSubmit={submitHandler} className="font-urbanist">
      <div className="input-box-three mb-25">
        <div className="text-[14px] text-[#070707] font-[600] mb-3">Time*</div>
        <input
          type="time"
          name="time"
          value={tourData.time}
          onChange={handleChange}
          className="bg-[#f8f8fa] border-none rounded-md outline-none text-[#a2abae] p-2 placeholder-[#a2abae] text-[16px] w-full"
        />
      </div>
      <div className="input-box-three mb-25">
        <div className="text-[14px] text-[#070707] font-[600] mb-3">Name*</div>
        <input
          type="text"
          name="name"
          value={tourData.name}
          onChange={handleChange}
          placeholder="Your full name"
          className="bg-[#f8f8fa] border-none rounded-md outline-none text-[#a2abae] p-2 placeholder-[#a2abae] text-[16px] w-full"
        />
      </div>
      <div className="input-box-three mb-25">
        <div className="text-[14px] text-[#070707] font-[600] mb-3">Phone*</div>
        <input
          type="tel"
          name="phone"
          value={tourData.phone}
          onChange={handleChange}
          placeholder="Your phone number"
          className="bg-[#f8f8fa] border-none rounded-md outline-none text-[#a2abae] p-2 placeholder-[#a2abae] text-[16px] w-full"
        />
      </div>
      <div className="input-box-three mb-25">
        <div className="text-[14px] text-[#070707] font-[600] mb-3">Email*</div>
        <input
          type="email"
          name="email"
          value={tourData.email}
          onChange={handleChange}
          placeholder="Enter mail address"
          className="bg-[#f8f8fa] border-none outline-none rounded-md text-[#a2abae] p-2 placeholder-[#a2abae] text-[16px] w-full"
        />
      </div>
      <div className="input-box-three mb-1">
        <div className="text-[14px] text-[#070707] font-[600] mb-3">
          Message*
        </div>
        <textarea
          name="message"
          value={tourData.message}
          onChange={handleChange}
          placeholder="Hello, I am interested in [California Apartments]"
          className="bg-[#f8f8fa] border-none outline-none rounded-md focus:ring-0 text-[#a2abae]"
        ></textarea>
      </div>
      <p className="text-[#777980] text-[16px] mb-9">
        By Submitting this form I agree to Terms of Use
      </p>
      <button
        type="submit"
        className="btn-nine text-uppercase rounded-3 w-100 mb-3"
      >
        Submit a Tour Request
      </button>
    </form>
  );
};

export default ScheduleForm;
