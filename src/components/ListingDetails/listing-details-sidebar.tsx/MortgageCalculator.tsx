"use client";
const MortgageCalculator = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="">
      <div className="input-box-three mb-25">
        <div className="text-[16px] text-black mb-2">Home Price*</div>
        <input type="tel" placeholder="1,32,789" className="type-input" />
      </div>
      <div className="input-box-three mb-25">
        <div className="text-[16px] text-black mb-2">Down Payment*</div>
        <input type="tel" placeholder="$" className="type-input" />
      </div>
      <div className="input-box-three mb-25">
        <div className="text-[16px] text-black mb-2">Interest Rate*</div>
        <input type="tel" placeholder="3.5%" className="type-input" />
      </div>
      <div className="input-box-three mb-25">
        <div className="text-[16px] text-black mb-2">Loan Terms (Years)</div>
        <input type="tel" placeholder="24" className="type-input" />
      </div>
      <button className=" bg-[#6965fd] text-white py-3 rounded-xl text-uppercase sm rounded-3 w-100 mb-3">
        CALCULATE
      </button>
    </form>
  );
};

export default MortgageCalculator;
