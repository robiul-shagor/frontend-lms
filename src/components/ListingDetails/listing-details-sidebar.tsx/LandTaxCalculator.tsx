"use client";

import IncrementNumber from "@/utils/IncrementNumber";

const LandTaxCalculator = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="">
      <div className="input-box-three mb-25">
        <div className="text-[16px] text-black mb-2">Purchase Price*</div>
        <input type="tel" placeholder="$11,32,000" className="type-input" />
      </div>
      <div className="input-box-three mb-25">
        <div className="text-[16px] text-black mb-2">City*</div>
        <input type="text" placeholder="Branton" className="type-input" />
      </div>
      <div className="input-box-three mb-25">
        <input type="radio" value={'I am a first time home buyer'} className="&nbsp;" />  <label>I am a first time home buyer</label>
      </div>
      <div className="flex items-center justify-between gap-5">
        <div className="input-box-three mb-25">
          <div className="text-[16px] text-black mb-2">Provincial Tax</div>
          {/* <input type="tel" placeholder="6000" className="type-input" /> */}
          <p>$6000</p>
        </div>
        <div className="input-box-three mb-25">
          <div className="text-[16px] text-black mb-2">Municipal Tax</div>
          <p>$7000</p>
          {/* <input type="radio" value="7000" /> */}
          {/* <input type="tel" placeholder="7000" className="type-input" /> */}
        </div>
      </div>
      <div className="input-box-three mb-25">
        <div className="text-[16px] text-black mb-2">Total Land Transfer Tax</div>
        <p className="font-bold text-[30px]">$<IncrementNumber start={0} end={11000} style="inline-block" duration={2} /></p>
        {/* <input type="tel" placeholder="24" className="type-input" /> */}
      </div>
      <button className=" bg-[#6965fd] text-white py-3 rounded-xl text-uppercase sm rounded-3 w-100 mb-3">
        CALCULATE
      </button>
    </form>
  );
};

export default LandTaxCalculator;
