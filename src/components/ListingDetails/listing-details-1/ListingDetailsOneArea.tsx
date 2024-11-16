"use client";
import NiceSelect from "@/ui/NiceSelect";
import MediaGallery from "./MediaGallery";
import Review from "@/components/inner-pages/agency/agency-details/Review";
import Sidebar from "./Sidebar";
import CommonBanner from "../listing-details-common/CommonBanner";
import CommonPropertyOverview from "../listing-details-common/CommonPropertyOverview";
// import CommonPropertyFeatureList from "../listing-details-common/CommonPropertyFeatureList";
// import CommonAmenities from "../listing-details-common/CommonAmenities";
import CommonPropertyVideoTour from "../listing-details-common/CommonPropertyVideoTour";
// import CommonPropertyFloorPlan from "../listing-details-common/CommonPropertyFloorPlan";
// import CommonNearbyList from "../listing-details-common/CommonNearbyList";
// import CommonSimilarProperty from "../listing-details-common/CommonSimilarProperty";
// import CommonProPertyScore from "../listing-details-common/CommonProPertyScore";
// import CommonLocation from "../listing-details-common/CommonLocation";
import CommonReviewForm from "../listing-details-common/CommonReviewForm";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchIndiviualPropertyData } from "@/services/api";
import Map from "./Map";
// import { IoIosBed } from "react-icons/io";
// import {
//   IoWater,
//   IoScale,
//   IoPhonePortrait,
//   IoThermometer,
//   IoConstruct,
//   IoFlash,
//   IoWaterOutline,
// } from "react-icons/io5";
// import {
//   IoHomeOutline,
//   IoShirtOutline,
//   IoLayersOutline,
// } from "react-icons/io5";
// import { IoBusinessOutline, IoInformationCircleOutline } from "react-icons/io5";
// import DesciptionPoints from "./descriptionPoints";
import DistinctiveOtherFee from "./DistinctiveOtherFee";
import GarageParkings from "./GrageParking";
import Utilities from "./Utilities";
// import OtherFeatures from "./OtherFeatures";
import MoreFeatures from "./MoreFeatures";
import ListingHistory from "./ListingHistory";
import RoomInfoTable from "./RoomInfoTable";
import ComparableHomes from "./ComparableHomes";
import ListingInformation from "./ListingInformation";
import Nearby from "./Nearby";
import WalkScore from "./WalkScore";
import RoomsInfo from "./RoomsInfo";

type AnyObject = Record<string, any>;

const ListingDetailsOneArea = () => {
  const [propertyData, setpropertyData] = useState<AnyObject>({});
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useSearchParams();
  const key: any = params.get("id");

  useEffect(() => {
    const fetchIndiviualProperty = async () => {
      try {
        const data = await fetchIndiviualPropertyData(key);
        setpropertyData(data);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch property data");
      } finally {
        setLoading(false);
      }
    };
    fetchIndiviualProperty();
  }, [key]);

  console.log("propertyData", propertyData);

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const selectHandler = (e: any) => {};

  return (
    <div className="bg-[#f8f8f8] w-full">
      <div
        className="listing-details-one theme-details-one w-full mx-auto px-4 bg-pink sm:pt-31 mt-2 pt-20 lg-pt-80 md:pb-150"
        style={{ background: "#f8f8f8" }}
      >
        <div className="w-full ">
          <div className="md:w-[98%] w-full m-auto">
            <div className="flex sm:flex-col flex-col-reverse">
              <CommonBanner data={propertyData} />
              <MediaGallery data={propertyData} />
            </div>
            <CommonPropertyOverview data={propertyData.propertyDetails} />
          </div>
          <div className="md:flex justify-between items-start md:w-[98%] my-2 w-full m-auto">
            <div className="md:w-[70%] w-full">
              <div className="mb-3 bg-white shadow-lg  rounded-[18px] sm:py-[40px] py-4 px-4 sm:px-[35px] ">
                <h4 className="mb-3 text-[24px] fw-regular sm:block hidden font-abhaya">
                  Desription
                </h4>
                <p className=" md:text-[17px] text-[14px] font-lato text-[#4d4d4d]">
                  {propertyData.propertyDetails.PublicRemarks}
                </p>
              </div>

              <ListingHistory propertyData={propertyData.propertyDetails} />

              <div className=" bg-white shadow-lg rounded-[18px] md:py-[20px] md:px-[35px] px-[20px] py-[20px] mt-3">
                {/* DistinctiveOtherFee */}
                <ListingInformation propertyData={propertyData} />
                {/* <DistinctiveOtherFee propertyData={propertyData} /> */}

                {/* Garage & Parkings */}
                {/* <GarageParkings propertyData={propertyData} /> */}
                {/* <div className="mt-10">
                     <p className="fw-semibold text-dark fs-4 border-bottom border-1 border-dark">Garage & Parkings</p>
                     <div className="d-flex mt-10 gap-3 flex-wrap align-items-start bg-white p-3 rounded-2 justify-content-between" >

                        <div className="d-flex flex-column align-items-center border-end border-1 pe-3 border-dark">
                           <p className="fw-medium m-0 text-dark d-flex align-items-center gap-1"><IoIosBed className="text-secondary" /> Garages</p>
                           <p className="">{propertyData?.GarageParkingSpaces || '-'}</p>
                        </div>

                        <div className="d-flex flex-column align-items-center border-end border-1 pe-3 border-dark">
                           <p className="fw-medium m-0 text-dark d-flex align-items-center gap-1"><IoIosBed className="text-secondary" /> Garage type</p>
                           <p className="">{propertyData?.GarageType || '-'}</p>
                        </div>

                        <div className="d-flex flex-column align-items-center border-end border-1 pe-3 border-dark">
                           <p className="fw-medium m-0 text-dark d-flex align-items-center gap-1"><IoIosBed className="text-secondary" /> Garage Parkings</p>
                           <p className="">{propertyData?.GarageParkingSpaces || '-'}</p>
                        </div>

                        <div className="d-flex flex-column align-items-center border-end border-1 pe-3 border-dark">
                           <p className="fw-medium m-0 text-dark d-flex align-items-center gap-1"><IoIosBed className="text-secondary" /> Driveway
                              Parkings</p>
                           <p className="">{'-'}</p>
                        </div>

                        <div className="d-flex flex-column align-items-center border-end border-1 pe-3 border-dark">
                           <p className="fw-medium m-0 text-dark d-flex align-items-center gap-1"><IoIosBed className="text-secondary" /> Total
                              Parkings</p>
                           <p className="">{propertyData?.ParkingTotal || '-'}</p>
                        </div>

                     </div>
                  </div> */}

                {/* Utilities */}
                {/* <Utilities propertyData={propertyData} /> */}

                {/* Other features */}
                {/* <OtherFeatures propertyData={propertyData} /> */}

                {/* Mor features */}
                {/* <MoreFeatures propertyData={propertyData} /> */}

                {/* room info */}
                {/* <RoomInfoTable /> */}
              </div>

              {/* <div className="property-feature-accordion mt-10 bg-white shadow4 border-20 p-40 mb-50">
                     <h4 className="mb-20">Property Features</h4>
                     <p className="fs-20 lh-lg">- features?</p>
                     <div className="accordion-style-two mt-45">
                        <CommonPropertyFeatureList data={propertyData} />
                     </div>
                  </div> */}
              {/* <RoomsInfo propertyData={propertyData} /> */}
              {/* <div className="property-amenities bg-white shadow4 border-20 p-40 mb-50">
                     <CommonAmenities data={propertyData} />
                  </div> */}
              <div className="property-video-tour my-3">
                {/* <CommonPropertyVideoTour data={propertyData} /> */}
              </div>
              <div className="my-3">
                {/* <ComparableHomes /> */}
              </div>
              <div className="my-3">
                {/* <Map /> */}
              </div>
              <div className="my-3">
                {/* <Nearby /> */}
              </div>
              <div className="my-3">
                {/* <WalkScore /> */}
              </div>
              {/* <CommonPropertyFloorPlan style={false} />
                  <div className="property-nearby bg-white shadow4 border-20 p-40 mb-50">
                     <CommonNearbyList />
                  </div>
                  <CommonSimilarProperty />
                  <div className="property-score bg-white shadow4 border-20 p-40 mb-50">
                     <CommonProPertyScore />
                  </div>
                  <div className="property-location mb-50">
                     <CommonLocation />
                  </div> */}

              {/* <div className="review-panel-one bg-white shadow4 border-20 p-40 mb-4">
                <div className="position-relative z-1">
                  <div className="d-sm-flex justify-content-between align-items-center mb-10">
                    <h4 className="m0 xs-pb-30">Reviews</h4>
                    <NiceSelect
                      className="nice-select"
                      options={[
                        { value: "01", text: "Newest" },
                        { value: "02", text: "Best Seller" },
                        { value: "03", text: "Best Match" },
                      ]}
                      defaultCurrent={0}
                      onChange={selectHandler}
                      name=""
                      placeholder=""
                    />
                  </div>
                  <Review style={true} />
                </div>
              </div> */}
              {/* <CommonReviewForm /> */}
            </div>
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsOneArea;
