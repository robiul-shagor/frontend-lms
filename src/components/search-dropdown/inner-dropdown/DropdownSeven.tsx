import NiceSelect from "@/ui/NiceSelect";
import Link from "next/link";
import ListingDropdownModal from "@/modals/ListingDropdownModal";
import { CiSearch } from "react-icons/ci";

const DropdownSeven = ({
  handleBathroomChange,
  handleBedroomChange,
  handleSearchChange,
  handlePriceChange,
  maxPrice,
  priceValue,
  handleResetFilter,
  selectedAmenities,
  handleAmenityChange,
  handleLocationChange,
  handleStatusChange,
  handlePriceDropChange,
}: any) => {
  const selectHandler = (e: any) => {};

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="row gx-0 align-items-center bg-white py-4">
          <div className="col-xxl-2 col-xl-3 col-sm-6">
            <div className="input-box-one border-left">
              <div className="label">I’m looking to...</div>
              <NiceSelect
                className="nice-select fw-normal"
                options={[
                  { value: "apartments", text: "Buy Apartments" },
                  { value: "condos", text: "Rent Condos" },
                  { value: "houses", text: "Sell Houses" },
                  { value: "industrial", text: "Rent Industrial" },
                  { value: "villas", text: "Sell Villas" },
                ]}
                defaultCurrent={0}
                onChange={handleStatusChange}
                name=""
                placeholder=""
              />
            </div>
          </div>
          <div className="col-xl-3 col-sm-6">
            <div className="input-box-one border-left">
              <div className="label">Location</div>
              <NiceSelect
                className="nice-select location fw-normal"
                options={[
                  { value: "toronto", text: "Toronto" },
                  { value: "mississauga", text: "Mississauga" },
                  { value: "brampton", text: "Brampton" },
                  { value: "vaughan", text: "Vaughan" },
                  { value: "markham", text: "Markham" },
                  { value: "richmondhill", text: "Richmond Hill" },
                  { value: "oakville", text: "Oakville" },
                  { value: "burlington", text: "Burlington" },
                  { value: "milton", text: "Milton" },
                  { value: "pickering", text: "Pickering" },
                  { value: "ajax", text: "Ajax" },
                  { value: "whitby", text: "Whitby" },
                  { value: "oshawa", text: "Oshawa" },
                  { value: "aurora", text: "Aurora" },
                  { value: "newmarket", text: "Newmarket" },
                  { value: "kingcity", text: "King City" },
                  { value: "caledon", text: "Caledon" },
                ]}
                defaultCurrent={0}
                onChange={handleLocationChange}
                name=""
                placeholder=""
              />
            </div>
          </div>
          <div className="col-xl-3 col-sm-4">
            <div className="input-box-one border-left">
              <div className="label">Price Range</div>
              <NiceSelect
                className="nice-select fw-normal"
                options={[
                  { value: "1", text: "$100,000 - $500,000" },
                  { value: "2", text: "$500,001 - $1,000,000" },
                  { value: "3", text: "$1,000,001 - $2,000,000" },
                  { value: "4", text: "$2,000,001 - $3,000,000" },
                  { value: "5", text: "$3,000,001 - $4,000,000" },
                  { value: "6", text: "$4,000,001 - $5,000,000" },
                  { value: "7", text: "$5,000,001 - $6,000,000" },
                ]}
                defaultCurrent={0}
                onChange={(event) => handlePriceDropChange(event.target.value)}
                name=""
                placeholder=""
              />
            </div>
          </div>
          {/* <div className="col-xl-1 col-sm-4 col-6">
            <div className="input-box-one border-left">
              <div className="label">Bedroom</div>
              <NiceSelect
                className="nice-select fw-normal"
                options={[
                  { value: "0", text: "Any" },
                  { value: "1", text: "1+" },
                  { value: "2", text: "2+" },
                  { value: "3", text: "3+" },
                  { value: "4", text: "4+" },
                ]}
                defaultCurrent={0}
                onChange={handleBedroomChange}
                name=""
                placeholder=""
              />
            </div>
          </div>
          <div className="col-xl-1 col-sm-4 col-6">
            <div className="input-box-one border-left">
              <div className="label">Bath</div>
              <NiceSelect
                className="nice-select fw-normal"
                options={[
                  { value: "0", text: "Any" },
                  { value: "1", text: "1+" },
                  { value: "2", text: "2+" },
                  { value: "3", text: "3+" },
                  { value: "4", text: "4+" },
                ]}
                defaultCurrent={0}
                onChange={handleBathroomChange}
                name=""
                placeholder=""
              />
            </div>
          </div> */}
          <div className="col-xxl-2 col-xl-1">
            <div className="input-box-one lg-mt-20">
              <div className="d-flex align-items-center justify-content-center justify-content-xl-end">
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#advanceFilterModal"
                  className="flex justify-center items-center gap-[6px] border-2 py-[17px]  px-2 border-[#7e7bee]"
                >
                  <span className=" d-xl-none d-xxl-block">ADVANCE SEARCH</span>
                  <i className="fa-light fa-sliders-up"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xxl-1 w-[200px] col-sm-2 ">
            <div className="md:mb-0 mb-2 md:ml-0 ml-[112px] cursor-pointer  w-full flex justify-center  gap-3 py-[16px] mt-2 px-[9px] text-[20px] font-[500] font-urbanist text-white items-center  bg-[#7e7bee] relative">
              SEARCH
              <CiSearch className="text-[#ffffff] text-[20px] " />
            </div>
          </div>
        </div>
      </form>
      <ListingDropdownModal
        handleSearchChange={handleSearchChange}
        handleBedroomChange={handleBedroomChange}
        handleBathroomChange={handleBathroomChange}
        handlePriceChange={handlePriceChange}
        maxPrice={maxPrice}
        priceValue={priceValue}
        handleResetFilter={handleResetFilter}
        selectedAmenities={selectedAmenities}
        handleAmenityChange={handleAmenityChange}
        handleLocationChange={handleLocationChange}
        handleStatusChange={handleStatusChange}
      />
    </>
  );
};

export default DropdownSeven;
