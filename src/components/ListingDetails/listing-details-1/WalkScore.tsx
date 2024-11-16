import { LiaSchoolSolid } from "react-icons/lia";
import { CiMedicalCase, CiMoneyBill, CiShoppingBasket } from "react-icons/ci";

const walkScoreData = [
  {
    name: "Transit Score",
    value: "63/100 (Moderate Distance Walkable)",
    icon: <CiMoneyBill className="text-black text-[50px]" />,
  },
  {
    name: "School Score",
    value: "70/10 (Short Distance Walkable)",
    icon: <LiaSchoolSolid className="text-black text-[50px]" />,
  },
  {
    name: "Medical Score",
    value: "80/100 (Short Distance Walkable)",
    icon: <CiMedicalCase className="text-black text-[50px]" />,
  },
  {
    name: "Shopping Score",
    value: "90/100 (Long Distance Walkable)",
    icon: <CiShoppingBasket className="text-black text-[50px]" />,
  },
];

export default function Nearby() {
  return (
    <div className="bg-white rounded-xl p-4">
      <h1 className="md:text-[24px]  font-abhaya font-semibold text-dark mb-3 ">
        Walk Score
      </h1>
      {/* <p className="text-[#717171] font-lato  mb-4 md:text-[17px] text-[16px]">
        Risk management and compliance, when approached strategically, have the
        potential
      </p> */}

      <div className="flex justify-between items-center flex-wrap">
        {walkScoreData.map((item, index) => (
          <div
            key={index}
            className=" rounded-xl flex items-center gap-4 md:w-[45%] w-full mb-2"
          >
            {item.icon}
            <div>
              <h3 className="md:text-[17px] font-abhaya text-[14px] font-semibold text-dark ">
                {item.name}
              </h3>
              <p className="text-[#717171] font-lato md:text-[16px] text-[13px]">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
