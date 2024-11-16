"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface GetOtpFormData {
  email: string;
}

const GetOtpForm = ({
  handleGetOtp,
}: {
  handleGetOtp: (data: GetOtpFormData) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GetOtpFormData>();

  const onSubmit = (data: GetOtpFormData) => {
    handleGetOtp(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="reset-form">
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Email*</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Youremail@gmail.com"
            />
            <p className="form_error">{errors.email?.message}</p>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="btn-two w-100 text-uppercase d-block mt-20"
      >
        {isSubmitting ? "Sending..." : "Get OTP"}
      </button>
    </form>
  );
};

export default GetOtpForm;
