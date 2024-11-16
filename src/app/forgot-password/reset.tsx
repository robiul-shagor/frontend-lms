"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Image from "next/image";
import OpenEye from "@/assets/images/icon/icon_68.svg";
interface ResetPasswordFormData {
  email: string;
  otp: string;
  newPassword: string;
}

const ResetPasswordForm = ({
  handleResetPassword,
}: {
  handleResetPassword: (data: ResetPasswordFormData) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const onSubmit = (data: ResetPasswordFormData) => {
    handleResetPassword(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group-meta position-relative mb-25">
        <label>Email*</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          placeholder="Youremail@gmail.com"
        />
        <p className="form_error">{errors.email?.message}</p>
      </div>

      <div className="input-group-meta position-relative mb-25">
        <label>OTP*</label>
        <input
          type="text"
          {...register("otp", { required: "OTP is required" })}
          placeholder="Enter OTP"
        />
        <p className="form_error">{errors.otp?.message}</p>
      </div>

      <div className="input-group-meta position-relative mb-20">
        <label>New Password*</label>
        <input
          type={isPasswordVisible ? "text" : "password"}
          {...register("newPassword", { required: "New Password is required" })}
          placeholder="Enter New Password"
        />
        <span className="placeholder_icon">
          <span className={`passVicon ${isPasswordVisible ? "eye-slash" : ""}`}>
            <Image onClick={togglePasswordVisibility} src={OpenEye} alt="" />
          </span>
        </span>
        <p className="form_error">{errors.newPassword?.message}</p>
      </div>

      <button
        type="submit"
        className="btn-two w-100 text-uppercase d-block mt-20"
      >
        RESET PASSWORD
      </button>
    </form>
  );
};

export default ResetPasswordForm;
