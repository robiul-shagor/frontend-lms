"use client";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useState } from "react";
import OpenEye from "@/assets/images/icon/icon_68.svg";
import api from "@/lib/api";

interface FormData {
  password: string;
}

const VerifyOtpPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    handleResetPassword(data);
  };

  // Handle Password reset
  const handleResetPassword = async (data: FormData) => {
    try {
      const response = await api.post(
        "/api/users/reset-password",
        { userId: id, password: data?.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(
        "Password reset successful, you can login with new password",
        { position: "top-center" }
      );

      router.push("/");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Something went wrong during password reset", {
        position: "top-center",
      });
    }
  };

  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return (
    <div className="reset-password-page">
      <h5>Reset Password</h5>

      <form onSubmit={handleSubmit(onSubmit)} className="reset-form">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>New Password*</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              {...register("password")}
              placeholder="Enter New Password"
              className="pass_log_id"
            />
            <span className="placeholder_icon">
              <span
                className={`passVicon ${isPasswordVisible ? "eye-slash" : ""}`}
              >
                <Image
                  onClick={togglePasswordVisibility}
                  src={OpenEye}
                  alt=""
                />
              </span>
            </span>
            <p className="form_error">{errors.password?.message}</p>
          </div>
        </div>
        <button
          type="submit"
          className="btn-two w-100 text-uppercase d-block mt-20"
        >
          {isSubmitting ? "Reseting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpPage;
