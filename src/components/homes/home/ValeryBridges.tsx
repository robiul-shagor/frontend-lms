import Image from "next/image";
import { BsChatDots } from "react-icons/bs";

export default function ValeryBridges() {
  return (
    <div className="md:w-[88%] w-[95%] mx-auto my-[70px] font-urbanist">
      <h1 className="text-center md:text-[50px] text-[25px] text-black font-bold font-urbanist">
        Valery Bridges The Gap <br /> Between Data And People
      </h1>
      <p className="md:block hidden text-center text-[18px] text-[#595959]">
        Lörem ipsum geol nystartsjobb milingar. Krokatt stenorade.
        <br /> Poliitet jymäde ekotes. Sonera håtär men kavar för dock
      </p>
      <p className="md:hidden block text-center text-[18px] text-[#595959]">
        Lörem ipsum geol nystartsjobb milingar. Krokatt stenorade. Poliitet
        jymäde ekotes. Sonera håtär men kavar för dock
      </p>
      <div className="w-full md:flex justify-between items-center mt-10">
        <div className="md:w-[45%] w-full md:h-[471px] h-[251.12px]">
          <Image
            src="/assets/images/hero/valery.png"
            alt="valery"
            width={595}
            height={251.12}
            className="w-full min-h-full bg-cover"
          />
        </div>
        <div className="md:w-[55%] md:mt-0 mt-[90px] w-full  md:px-[140px] ">
          <div className="flex justify-start gap-4">
            <div className="md:w-[98px] w-[61px] md:h-[98px] h-[61px] rounded-full bg-white flex justify-center items-center">
              {/* <MdEdit className="text-[#aba9f9] text-[30px]" /> */}
              <div className="md:w-[50.8px] w-[31px] md:h-[50.8px] h-[31px]">
                <Image
                  src="/assets/images/hero/edit.png"
                  alt="edit"
                  width={51}
                  height={51}
                  className="w-full h-full bg-cover"
                />
              </div>
            </div>
            <div>
              <p className="md:text-[30px]  text-[18.87] font-semibold font-urbanist text-black">
                Home Evaluation Reports
              </p>
              <p className="md:text-[18px] text-[11.32px] text-[#595959]">
                Data-Driven Insights
              </p>
            </div>
          </div>
          <div className="flex justify-start gap-4 mt-3">
            <div className="md:w-[98px] w-[61px] md:h-[98px] h-[61px] rounded-full bg-white flex justify-center items-center">
              {/* <MdMapsHomeWork className="text-[#aba9f9] text-[30px]" /> */}
              <div className="md:w-[50.8px] w-[31px] md:h-[50.8px] h-[31px]">
                <Image
                  src="/assets/images/hero/locate.png"
                  alt="edit"
                  width={51}
                  height={51}
                  className="w-full h-full bg-cover"
                />
              </div>
            </div>
            <div>
              <p className="md:text-[30px] text-[18.87] font-semibold font-urbanist text-black">
                Market Report
              </p>
              <p className="md:text-[18px] text-[11.32px] text-[#595959]">
                Access Properties with Ease
              </p>
            </div>
          </div>
          <div className="flex justify-start gap-4 mt-3">
            <div className="md:w-[98px] w-[61px] md:h-[98px] h-[61px] rounded-full bg-white flex justify-center items-center">
              {/* <MdPerson3 className="text-[#aba9f9] text-[30px]" />*/}
              <div className="md:w-[50.8px] w-[31px] md:h-[50.8px] h-[31px]">
                <Image
                  src="/assets/images/hero/speaker.png"
                  alt="edit"
                  width={51}
                  height={51}
                  className="w-full h-full bg-cover"
                />
              </div>
            </div>
            <div>
              <p className="md:text-[30px] text-[18.87] font-semibold font-urbanist text-black">
                Neighborhood Guides{" "}
              </p>
              <p className="md:text-[18px] text-[11.32px] text-[#595959]">
                Data-Driven Insights
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-center md:text-[35px] text-[25px] font-urbanist font-bold text-black mt-[55px]">
          What To Get More Insights?
        </p>
        <div className="flex justify-start gap-3 px-2 items-center md:w-[418.7px] w-[313.22px] md:h-[92px] h-[68.83px] mt-5 bg-[#f0efff] rounded-[50px]">
          <div className="md:w-[76.84px] w-[52.67] h-[51.49px] md:h-[68.82px] relative bg-transparent">
            <Image
              src="/assets/images/hero/user.png"
              alt="arrow-left"
              width={77}
              height={69}
              className="w-full h-full bg-cover"
            />
            <div className="absolute bottom-1 rounded-full right-2 bg-[#2AEAAD] min-w-[24.31px] min-h-[21.77px]"></div>
          </div>
          <div>
            <p className="md:text-[25px] text-[18.7px] font-bold text-black font-urbanist">
              Home Craze AI Assistant
            </p>
            <p className="md:text-[18px] text-[13.47px] text-black">
              Ashley Smith
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4 w-[196.4px] h-[59.73px] bg-gradient5 gap-3 text-white rounded-[50px]">
          <BsChatDots className="text-[#ffffff] text-[30px] mt-5" />
          Chat Now
        </div>
      </div>
    </div>
  );
}
