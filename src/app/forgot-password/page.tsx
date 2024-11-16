"use client";
import { toast } from "react-toastify";
import GetOtpForm from "./get_otp"; // import the GetOtpForm
import ResetPasswordForm from "./reset"; // import the ResetPasswordForm
import { useRouter } from "next/navigation";
import axios from "axios";
import api from "@/lib/api";

const ResetPasswordPage = () => {
  const router = useRouter();
  // Handle OTP request
  const handleGetOtp = async (data: { email: string }) => {
    try {
      const response = await api.post(
        "/api/users/send-otp",
        { email: data.email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      router.push(`/verify_otp?id=${response.data?.user}`);

      // if (response.ok) {
      //   toast.success("OTP sent to your email", { position: "top-center" });
      // } else {
      //   const errorData = await response.json();
      //   toast.error(errorData.error || "Failed to send OTP", {
      //     position: "top-center",
      //   });
      // }
    } catch (error) {
      console.error("Get OTP error:", error);
      toast.error("Something went wrong, please try later", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="reset-password-page">
      <h5>Reset Password</h5>

      <p>Please enter your email to verify</p>

      {/* Form to request OTP */}
      <GetOtpForm handleGetOtp={handleGetOtp} />

      {/* Form to reset password */}
      {/* <ResetPasswordForm handleResetPassword={handleResetPassword} /> */}
    </div>
  );
};

export default ResetPasswordPage;
