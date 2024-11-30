import Link from "next/link";

const CommonBanner = ({ style_3, data }: any) => {
  const calculateDurationToToday = (contractDate: string): string => {
    // Parse the contract date as a Date object
    const startDate = new Date(contractDate);
    const today = new Date();
  
    // Validate if the start date is valid
    if (isNaN(startDate.getTime())) {
      return 'Invalid start date';
    }
  
    // Calculate the difference in milliseconds
    const difference = today.getTime() - startDate.getTime();
  
    // Convert difference from milliseconds to days
    const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
  
    // Ensure daysDifference is a finite number
    if (!isFinite(daysDifference)) {
      return 'Date difference is not finite';
    }
  
    // Return the number of days as a string
    return `${Math.abs(daysDifference)} days`;
  };
 
  return (
    <div className="w-full font-poppins mb-">
      <div className="flex justify-between items-start ">
        <div className="flex flex-col justify-start items-start gap-0">
          <h2 className="font-medium md:text-[26px] sm:text-[16px] text-sm !capitalize">
            {`${data?.StreetNumber !== null ? `${data?.StreetNumber} -` : ""} ${data?.StreetName ? data.StreetName.charAt(0).toUpperCase() + data.StreetName.slice(1).toLowerCase() : ""} ${data?.StreetSuffix}`}
          </h2>
          <p className="md:text-[22px] sm:text-[16px] text-[12px]  text-[#7a7a7a] font-[500]">
            {`${data?.City !== null ? `${data?.City}` : ""}`} {`${data?.CityRegion !== null ? `, ${data?.CityRegion}` : ""}`}
          </p>
          <div className="flex gap-2 items-center">
          <div className="hidden justify-center items-center text-[#7a7a7a] sm:text-[16px] text-[12px] bg-[#F8f8f8] border-1 border-[#7a7a7a]  rounded-[23px] w-fit h-[28px] px-2">
            {`${data?.PropertyType !== null ? `${data?.PropertyType}` : ""}`}
            </div>
          </div>
          {/* <p className="md:text-[15px] text-[13px] text-[#7a7a7a] font-[500]"></p> */}
        </div>

        <div className=" md:mt-0 ">
          {
            data?.ClosePrice !== null && (
              <div className="text-black md:text-[26px] sm:text-[24px] text-[16px] font-[500] md:flex justify-end items-center">
                Sold: ${`${data?.ClosePrice !== null ? `${data?.ClosePrice.toLocaleString()}` : ""}`}
              </div>
            )
          }
          <div className="flex md:flex-row flex-col md:justify-end justify-start md:items-center gap-2">
            { data?.ClosePrice == null && (
              <>
                { data?.OriginalListPriceUnit !== null && (
                  <div className="sm:flex hidden justify-center items-center text-white text-[12px] bg-[#6FE0A2] rounded-[23px] w-[80.21px] h-[22px]">
                    {`${data?.OriginalListPriceUnit !== null ? `${data?.OriginalListPriceUnit}` : ""}`}
                  </div>
                ) }
              </>
            ) }
            <div className={`text-black ${data?.ClosePrice !== null ? '' : 'md:text-[26px] sm:text-[24px]'}  text-[16px] font-[500] md:flex justify-end items-center`}>
              Price: ${`${data?.ListPrice !== null ? `${data?.ListPrice.toLocaleString()}` : ""}`}
            </div> 
          </div>

          { data?.TaxAnnualAmount !== null && (
          <p className=" text-[#7a7a7a] font-[500] md:text-[16px] sm:text-[14px] text-[12px] flex  justify-end md:text-right text-left">
            Property Taxes: <span className="text-black ">${`${data?.TaxAnnualAmount !== null ? `${data?.TaxAnnualAmount.toLocaleString()}` : ""}`} {`(${data?.TaxYear})`}</span>
          </p>
          ) }
        </div>
      </div>
      <div className="flex justify-between items-center mt-1 ">
       
        <p className="md:text-[18px] text-[14px] font-[400] text-[#7c7c7c] md:mt-[50px] mt-2">
          { data?.DaysOnMarket && (
            <>          
              On Market:{" "}
              <span
                className="text-black md:text-[22px]
              "
              >
                {data?.DaysOnMarket} Days
              </span>
            </>
          )}
        </p>

        <div className="md:flex justify-end items-start gap-[120px] sm:mt-5 mt-1">
          <ul className="flex md:justify-end justify-start items-center sm:gap-3 gap-2 mt-2">
            <li className="">
              <Link
                href=""
                className="sm:text-[18px] text-sm font-abhaya  text-black flex items-center gap-1 sm:mr-6 mr-3"
              >
                <i
                  className="fa-sharp fa-regular md:text-[18px] sm:text-[16px] text-sm fa-share-nodes"
                ></i>{" "}
                Share
              </Link>
            </li>
            <li>
              <Link
                href=""
                // style={{ width: "32px", height: "32px", fontSize: "16px" }}
                className={`  rounded-[50%] flex justify-center bg-[#6965fd] p-2 sm:text-[16px] text-xs items-center hover:bg-[#6965fd] hover:border-none text-white`}
              >
                <i className="fa-light fa-heart text-white"></i>
              </Link>
            </li>
            <li>
              <Link
                href=""
                className={` rounded-[50%] bg-[#6965fd] flex justify-center p-2 px-2.5 sm:text-[16px] text-xs items-center hover:bg-[#6965fd] hover:border-none text-white`}
              >
                <i className="fa-light fa-bookmark text-white"></i>
              </Link>
            </li>
            <li>
              <Link
                href=""
                className={`border border-black text-black rounded-[50%] p-2 sm:text-[16px] text-xs flex justify-center items-center hover:bg-[#6965fd] hover:border-none hover:text-white`}
              >
                <i className="fa-light fa-circle-plus hover:text-white"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;
