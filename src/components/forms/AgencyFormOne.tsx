"use client";
import { toast } from "react-toastify";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import NiceSelect from "@/ui/NiceSelect";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const schema = yup
  .object({
    name: yup.string().required().label("Name"),
    email: yup.string().required().email().label("Email"),
    message: yup.string().required().label("Message"),
  })
  .required();

const inputClass = "rounded-[10px] border border-black p-[10px]";

const AgencyFormOne = ({ style }: any) => {
  const selectHandler = (e: any) => {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const onSubmit = (data: FormData) => {
    const notify = () =>
      toast("Review submit successfully", { position: "top-center" });
    notify();
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={` ${style ? "font-lato" : "bg-white font-lato p-40"}`}
    >
      <div className="w-full">
        <div className="w-full">
          <div className="mb-30 w-full">
            <div className="text-[14px] text-[#808080] mb-2">Name*</div>
            <input
              type="text"
              {...register("name")}
              placeholder=""
              className={`${inputClass} w-full ${style ? "" : "rounded-0"}`}
            />
            <p className="form_error">{errors.name?.message}</p>
          </div>
        </div>
        <div className="md:flex justify-between items-center mb-30 w-full">
          <div className="md:w-[48%] w-full md:mb-0 mb-30">
            <div className="text-[14px] text-[#808080] mb-2">Email*</div>
            <input
              type="email"
              {...register("email")}
              placeholder=""
              className={`${inputClass} w-full ${style ? "" : "rounded-0"}`}
            />
          </div>
          <div className="md:w-[48%] w-full">
            <div className="text-[14px] text-[#808080] mb-2">Phone*</div>
            <input
              type="+tel"
              // {...register("phone")}
              placeholder=""
              className={`${inputClass} w-full ${style ? "" : "rounded-0"}`}
            />
          </div>
        </div>
        <div className="mb-30 w-full">
          <div className="w-full">
            <div className="text-[14px] text-[#808080] mb-2">Message*</div>
            <textarea
              {...register("message")}
              placeholder=""
              className={`${inputClass}  w-full ${style ? "" : "rounded-0"}`}
              rows={4}
            ></textarea>
            <p className="form_error">{errors.message?.message}</p>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={`bg-[#6965fd] md:w-[185px] w-[150px] md:h-[55px] h-[45px] flex justify-center items-center  rounded-[10px] text-white font-abhaya text-uppercase  sm ${
          style ? "" : "rounded-0"
        }`}
      >
        Submit
      </button>
    </form>
  );
};

export default AgencyFormOne;
