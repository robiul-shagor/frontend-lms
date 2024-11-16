"use client";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import api from "@/lib/api";

interface GetOtpFormData {
  otp: string;
}

const VerifyOtpPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const schema = yup
    .object({
      otp: yup.string().required().label("OTP"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GetOtpFormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: GetOtpFormData) => {
    handleGetOtp(data);
  };

  // Handle OTP request
  const handleGetOtp = async (data: GetOtpFormData) => {
    try {
      const response = await api.post(
        "/api/users/verify-otp",
        { otp: data.otp, userId: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      router.push(`reset_password/?id=${id}`);

      // if (response.ok) {
      //   toast.success("OTP sent to your email", { position: "top-center" });
      // } else {
      //   const errorData = await response.json();
      //   toast.error(errorData.error || "Failed to send OTP", {
      //     position: "top-center",
      //   });
      // }
    } catch (error: any) {
      console.error("Get OTP error:", error);

      toast.error(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Something went wrong, please try later",
        {
          position: "top-center",
        }
      );
    }
  };

  return (
    <div className="reset-password-page">
      <h5>Reset Password</h5>

      <p>We have sent an OTP to your email, please verify OTP</p>
      <form onSubmit={handleSubmit(onSubmit)} className="reset-form">
        <div className="row">
          <div className="col-12">
            <div className="input-group-meta position-relative mb-25">
              <label>Your OTP</label>
              <input type="text" {...register("otp")} placeholder="123456" />
              <p className="form_error">{errors.otp?.message}</p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="btn-two w-100 text-uppercase d-block mt-20"
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpPage;
