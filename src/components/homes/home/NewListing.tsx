import {
  HiArrowLongRight,
  HiArrowLongDown,
  HiArrowLongUp,
} from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";
import { MdOutlineKingBed } from "react-icons/md";
import { PiBathtub } from "react-icons/pi";
import { BsTextarea } from "react-icons/bs";
import Image from "next/image";

// Define the Media type
interface Media {
  ClassName: string;
  MediaCategory: string;
  MediaKey: string;
  MediaModificationTimestamp: string;
  MediaObjectID: string;
  MediaStatus: string;
  MediaType: string;
  MediaURL: string;
  Order: number;
  PreferredPhotoYN: boolean;
  ResourceName: string;
  ResourceRecordKey: string;
  ShortDescription: string;
}

interface PropertyDetails {
  OriginalEntryTimestamp: string;
  PropertyType: string;
  MlsStatus: string;
  ListPrice: number;
  StreetNumber: string;
  StreetName: string;
  City: string;
  BedroomsTotal?: number;
  BathroomsTotalInteger?: number;
  LivingAreaRange?: string;
  BuildingAreaTotal?: number;
  PropertySubType: string;
  LotDepth?: number;
  LotSizeUnits?: string;
  LotSizeRangeAcres?: string;
}

// Define the Item type
interface Item {
  _id: string;
  ListingKey: string;
  media: Media[];
  address: string;
  bed: string;
  bath: string;
  sqft: string;
  price: string;
  market: string;
  trend: 'up' | 'down';
  propertyDetails: PropertyDetails;
}

// Define the component props type
interface CardProps {
  item: Item;
}

function timeAgo(date: string | number | Date): string {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

  let interval = seconds / 31536000; // Calculate the number of years

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000; // Calculate the number of months
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400; // Calculate the number of days
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600; // Calculate the number of hours
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60; // Calculate the number of minutes
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago"; // Seconds ago if less than a minute
}

function calculatePropertySize(details: PropertyDetails): string {
  if (details.PropertySubType === 'Vacant Land') {
    // Calculation for 'Vacant Land'
    if (details.LotDepth && details.LotSizeUnits === 'Feet') {
      // Ensure LotDepth is treated as a number and formatted to string
      const depth = typeof details.LotDepth === 'number' ? details.LotDepth.toFixed(2) : parseFloat(details.LotDepth).toFixed(2);
      return `${depth} ${details.LotSizeUnits}`;
    } else if (details.LotSizeRangeAcres) {
      return details.LotSizeRangeAcres;
    }
    return "Vacant Land Size Info N/A";
  } else {
    // Handle other properties, ensuring everything is returned as a string
    const livingArea = details.LivingAreaRange || "Area Info N/A";
    const buildingArea = details.BuildingAreaTotal ? details.BuildingAreaTotal.toString() : "Area Info N/A";
    return livingArea || buildingArea;
  }
}

const Card = ({ item }: { item: any }) => {
  // Function to find the first active image URL
  const findActiveImageUrl = (media: Media[]): string => {
    const activeImage = media.find(
      (m) => m.MediaStatus === 'Active' && m.MediaType.startsWith('image')
    );
    return activeImage ? activeImage.MediaURL : '/fallback-image-url.jpg'; // Provide a fallback URL or handle cases where no image is found
  };

  const imageUrl = findActiveImageUrl(item.media);
  const itemData = item.propertyDetails;

  // Only render the card if MlsStatus is 'New'
  if (itemData.MlsStatus !== 'New' || !itemData.PropertyType.includes('Residential')) {
    return null;  // Or return a placeholder component/message if needed
  }

  const bedrooms = itemData.BedroomsTotal ? `${itemData.BedroomsTotal} Bed` : "0Bed";
  const bathrooms = itemData.BathroomsTotalInteger ? `${itemData.BathroomsTotalInteger} Bath` : "0Bath";

  const area = itemData.LivingAreaRange || itemData.BuildingAreaTotal || "Area Info N/A";

  return (
    <div className="md:min-w-[369.93px] font-urbanist w-[330px] h-[424.52px] rounded-[20px] shadow-md relative group">
      <div className="w-full h-[283.24px] relative">
        <Image
          src={imageUrl}
          width={369.93}
          height={283.24}
          alt={'test'}
          className="rounded-[20px] w-full h-full object-cover"
        />
        <div className="absolute top-5 px-3 flex justify-between items-center w-full">
          <div className="h-[39px] rounded-[50px] px-2 bg-white text-black flex justify-center items-center">
            {itemData.PropertySubType}
          </div>
          <FaHeart className="text-[#78809c] text-[22px]" />
        </div>
      </div>
      <div className="w-full px-2 py-1">
        <p className="text-[17.56px] text-[#595959]">{timeAgo(itemData.ModificationTimestamp)}</p>
        <div className="h-[30px] truncate w-full text-black">
        {`${itemData.UnparsedAddress}, ${itemData.StreetName}, ${itemData.City}`}
        </div>
        <div className="flex justify-start gap-3 items-center mt-1">
          <div className="flex justify-start gap-1 pr-2 border-r border-[#595959] text-[#595959]">
            <MdOutlineKingBed className="text-[18px]" />
            <p className="text-[14px]">{bedrooms}</p>
          </div>
          <div className="flex justify-start gap-1 pr-2 border-r border-[#595959] text-[#595959]">
            <PiBathtub className="text-[18px]" />
            <p className="text-[14px]">{bathrooms}</p>
          </div>
          <div className="flex justify-start gap-1 pr-2 border-r border-[#595959] text-[#595959]">
            <BsTextarea className="text-[18px]" />
            <p className="text-[14px]">{calculatePropertySize(itemData)}</p>
          </div>
        </div>
        <div className="flex justify-start items-center gap-3 mt-1">
          <p className="text-[#7d7aed] font-semibold font-urbanist text-[25px]">
            ${itemData.ListPrice}
          </p>
          <div
            className={`w-[152.09px] h-[33.03px] flex justify-center items-center gap-1 rounded-[50px] ${
              item.trend === "down"
                ? "bg-[#DFFFEA] text-[#15973C]"
                : "bg-[#ffebeb] text-[#f76d57]"
            }`}
          >
            {item.trend === "up" ? (
              <HiArrowLongDown className="text-[#f76d57] text-[18px]" />
            ) : (
              <HiArrowLongUp className="text-[#15973C] text-[18px]" />
            )}
            <p className="text-[14px]">25% from Market</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 hidden group-hover:flex bg-[#c2c2cd] bg-opacity-60 text-white px-2 rounded-[20px] justify-center items-center font-urbanist">
        <div className="flex flex-col text-center justify-center items-center">
          <p className="text-[30px] font-bold">
            To View Listing please create account or Login
          </p>
          <div className="w-[220px] h-[52px] border border-white rounded-[50px] text-[18px] flex justify-center items-center mt-2 cursor-pointer">
            Signup
          </div>
          <p className="text-[18px] cursor-pointer mt-3">Login</p>
        </div>
      </div>
    </div>
  );
};

export default async function NewListing() {
  let data = await fetch('https://api-lms-alpha.vercel.app/api/properties/?page=1&PropertyType=Residential&MlsStatus=New&limit=8')
  let posts = await data.json();

  return (
    <div className="w-full mt-7 font-urbanist">
      <div className="flex justify-between items-center w-[88%] m-auto">
        <h1 className="md:text-[48px] text-[25px] text-black font-bold font-urbanist">
          New Listing
        </h1>
        <div className="flex justify-between items-center gap-4">
          <p className="text-[18px] text-[#595959] md:block hidden">SEE ALL</p>
          <div className="bg-[#2A1C4F] md:w-[55px] w-[39px] md:h-[55px] h-[39px] rounded-full flex justify-center items-center">
            <HiArrowLongRight className="text-white font-bold text-[27px]" />
          </div>
        </div>
      </div>
      <div className="my-6 flex justify-start items-center md:gap-5 gap-3 ml-[6vw] pr-4 overflow-x-auto scrollable py-1">
        {posts.properties.map((item: any, index: any) => (
          <Card key={index} item={item as any} />
        ))}
      </div>
    </div>
  );
}
