"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";

import OpenEye from "@/assets/images/icon/icon_68.svg";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const schema = yup
    .object({
      name: yup.string().required().label("Name"),
      email: yup.string().required().email().label("Email"),
      password: yup.string().required().label("Password"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Registering user:", data);
      const response = await fetch("https://api.houseton.ca/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      console.log("Registration response:", response);
  
      if (response.ok) {
        toast.success("Registration successful", { position: "top-center" });
  
        reset();
        window.location.reload();
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Registration failed", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration", {
        position: "top-center",
      });
    }
  };
  

  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12">
          <div className="input-group-meta position-relative mb-25">
            <label>Name*</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Zubayer Hasan"
            />
            <p className="form_error">{errors.name?.message}</p>
          </div>
        </div>
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
        <div className="col-12">
          <div className="input-group-meta position-relative mb-20">
            <label>Password*</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              {...register("password")}
              placeholder="Enter Password"
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
        <div className="col-12">
          <div className="agreement-checkbox d-flex justify-content-between align-items-center">
            <div>
              <input type="checkbox" id="remember2" />
              <label htmlFor="remember2">
                By hitting the &quot;Register&quot; button, you agree to the{" "}
                <Link href="#">Terms conditions</Link> &{" "}
                <Link href="#">Privacy Policy</Link>
              </label>
            </div>
          </div>
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn-two w-100 text-uppercase d-block mt-20"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
