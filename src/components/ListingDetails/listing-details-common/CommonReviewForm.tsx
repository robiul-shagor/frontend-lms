import AgencyFormOne from "@/components/forms/AgencyFormOne";
import LoginModal from "@/modals/LoginModal";
import Link from "next/link";
import { useState } from "react";

const CommonReviewForm = () => {
  const [loginModal, setLoginModal] = useState<boolean>(false);

  return (
    <div className="bg-white p-4 rounded-[18px] shadow-lg  ">
      <h4 className="md:mb-3 font-abhaya mb-2 md:text-[24px]  ">
        Ask a Question
      </h4>
      <p className="md:text-[18px] font-lato text-[16px] text-[#717171] mb-3 ">
        <Link
          href="#"
          data-bs-toggle="modal"
          data-bs-target="#loginModal"
          className="text-black md:text-[18px] text-[16px] font-abhaya fw-500 text-decoration-underline"
        >
          Sign in
        </Link>{" "}
        to post your comment or signup if you don&apos;t have any account.
      </p>

      <AgencyFormOne style={true} />

      <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
    </div>
  );
};

export default CommonReviewForm;
