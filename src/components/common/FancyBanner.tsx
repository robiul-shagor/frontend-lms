"use client"
import Image from "next/image"
import Link from "next/link"
import titleShape from "@/assets/images/shape/title_shape_06.svg"
import rope from '@/assets/images/rope.svg'
import bnner from '@/assets/images/banner-bg.svg'

const FancyBanner = ({ style }: any) => {
   return (
      <div className="bg-gradient-banner  position-relative z-1 pt-90 lg-pt-50 pb-90 lg-pb-50">
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-6">
                  <div className="title-one text-center text-lg-start md-mb-40 pe-xl-5 flex justify-end">
                     {/* <h3 className="text-white m0 text-5xl">Start your <span>Journey{style ? "" : <Image width={100} height={100} src={rope} alt="" className="lazy-img" />}</span> As a Retailer.</h3> */}
                    <div className="w-[80%]">
                     <h3 className="text-white lg:text-start text-start  md:text-5xl sm:mr-0 mr-10 text-3xl">Start your Real Estate
                        <span className=" lg:flex inline-block items-center md:ml-0 ml-5 lg:gap-6">
                           Journey
                              <Image  src={rope} alt="" className="inline-block lg:h-5 lg:ml-10" />
                        </span>
                     </h3>
                     </div>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="form-wrapper me-auto ms-auto me-lg-0">
                     <div onSubmit={(e) => e.preventDefault()} className="rounded-full bg-white justify-between flex items-center pl-8 px-6 p-2">
                        <input type="email" placeholder="Email address" className={`text-[20px] pl-3 ${style ? "rounded-0" : ""}`} />
                        <div className='bg-[#6965fd] text-white p-2 text-center rounded-full px-4'>Get Started</div>
                     </div>
                     {/* <div className="fs-16 mt-10 text-white">Already a Agent? <Link href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Sign in.</Link></div> */}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FancyBanner
