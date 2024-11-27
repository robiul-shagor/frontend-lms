"use client";
import { CSSProperties, useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
// import DropdownSix from "@/components/search-dropdown/inner-dropdown/DropdownSix";
import UseShortedProperty from "@/hooks/useShortedProperty";
import NiceSelect from "@/ui/NiceSelect";
import Image from "next/image";
// import ReactPaginate from "react-paginate";
import ClipLoader from "react-spinners/ClipLoader";
import { fetchMediaPropertyData, fetchLisingPropertyData, fetchPropertyTypes, fetchPropertySubTypes } from "@/services/api";
import { LiaBedSolid } from "react-icons/lia";
import { PiBathtub } from "react-icons/pi";
import { PiGarage } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiLocationOn } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiListPlus } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import timeAgo from "@/lib/timesAgo";

import DropdownSeven from "@/components/search-dropdown/inner-dropdown/DropdownSeven";
import { BiSortAlt2 } from "react-icons/bi";

import { IoGridOutline } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import SearchFilters from "../listing-14/SearchFilters";
import { HiOutlineArrowLongRight, HiOutlineArrowLongLeft } from "react-icons/hi2";
import { set } from "mongoose";
import CustomDropdown from "@/components/common/CustomDropDown";
import PriceDropDown from "@/components/common/PriceDropDown";
import FilterMoreOptions from "@/components/common/FilterMoreOptions";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

//Interface
interface ErrorState {
  message: string;
}
interface ApiResponse {
  success: boolean;
  value: Property[];
  properties: Property[];
  totalProperties: number  // Define 'properties' based on its structure in the API
}

interface Property {
  id: number;
  name: string;
}

interface TypeFilterItem {
  LegacyODataValue: string;
  LookupKey: string;
  LookupName: string;
  LookupStatus: string;
  LookupValue: string;
  ModificationTimestamp: string;
  Order: number;
  ReplacedByLookupKey: string | null;
  StatusDate: string;
}


interface Media {
  ClassName: string;
  MediaCategory: string;
  MediaKey: string;
  MediaModificationTimestamp: string;
  MediaObjectID: string;
  MediaStatus: string;
  MediaType: string;
  MediaURL: string;
}
type HandlePageChangePage = (page: number) => void;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChangePage: HandlePageChangePage;
}

//Const
const searchOptions = [
  {
    label: "City",
    value: "city",
    icon: <CiSearch />,
    options: [
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
    ],
  },
  {
    label: "Type",
    value: "type",
    options: [
      { value: "apartments", text: "Buy Apartments" },
      { value: "condos", text: "Rent Condos" },
      { value: "houses", text: "Sell Houses" },
      { value: "industrial", text: "Rent Industrial" },
      { value: "villas", text: "Sell Villas" },
    ],
  },
  {
    label: "Beds",
    value: "beds",
    options: [
      { value: "1", text: "1+" },
      { value: "2", text: "2+" },
      { value: "3", text: "3+" },
      { value: "4", text: "4+" },
    ],
  },
  {
    label: "Baths",
    value: "baths",
    options: [
      { value: "1", text: "1+" },
      { value: "2", text: "2+" },
      { value: "3", text: "3+" },
      { value: "4", text: "4+" },
    ],
  },
  {
    label: "Price",
    value: "price_range",
    options: [
      { value: "1", text: "$1000 - $5000" },
      { value: "2", text: "$5000 - $10000" },
      { value: "3", text: "$10000 - $15000" },
      { value: "4", text: "$15000 - $20000" },
    ],
  },
];

const advancedOptions = [
  {
    label: "Location",
    value: "city",
    icon: <CiLocationOn />,
    options: [
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
    ],
  },
  {
    label: "I am looking to...",
    value: "type",
    icon: <MdKeyboardArrowDown />,
    options: [
      { value: "apartments", text: "Buy Apartments" },
      { value: "condos", text: "Rent Condos" },
      { value: "houses", text: "Sell Houses" },
      { value: "industrial", text: "Rent Industrial" },
      { value: "villas", text: "Sell Villas" },
    ],
  },
  {
    label: "Price Range",
    value: "price_range",
    icon: <MdKeyboardArrowDown />,
    options: [
      { value: "1", text: "$1000 - $5000" },
      { value: "2", text: "$5000 - $10000" },
      { value: "3", text: "$10000 - $15000" },
      { value: "4", text: "$15000 - $20000" },
      { value: "5", text: "$20000 - $25000" },
      { value: "6", text: "$25000 - $30000" },
      { value: "7", text: "$30000 - $35000" },
      { value: "8", text: "$35000 - $40000" },
      { value: "9", text: "$40000 - $45000" },
      { value: "10", text: "$45000 - $50000" },
    ],
  },
];

const sortOptions = [
  { value: "newest", text: "High to low" },
  { value: "newest", text: "Low to high" },
  { value: "best_seller", text: "Newest" },
  { value: "best_match", text: "Oldest" },
];

const advancedFilters = [...advancedOptions, ...searchOptions];

const ListingThirteenArea = () => {
  const page = "listing_5";
  const maxPageBoxes = 10; // Limit to show max 15 page numbers

  const [data, setData] = useState<ApiResponse | null>(null); // Use the ApiResponse interface
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const mapTabs = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Detached",
      value: "Detached",
    },
    {
      label: "Commercial",
      value: "Commercial Retail",
    },
    {
      label: "Vacant Land",
      value: "Vacant Land",
    },
    {
      label: "Farm",
      value: "Farm",
    },
    {
      label: "Office",
      value: "Office",
    },
  ];

  const [pageCount, setPageCount] = useState(0);
  const [show, setShow] = useState(false);
  const [skipValue, setSkipValue] = useState(0);
  const [selectedType, setSelectedType] = useState("All");
  const [propertiesData, setpropertiesData] = useState<Property[]>([]);
  const [propertySubTypes, setPropertySubTypes] = useState<any[]>([]); 

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [selectedSort, setSelectedSort] = useState("newest");
  const [showSort, setShowSort] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string;
  }>({});

  const [typeFilter, setTypeFilter] = useState<TypeFilterItem[]>([]);;

  const router = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const key: any = router.get("search");
  const propertyType: any = router.get("propertyType");
  const routerMain = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPages, setItemsPerPages] = useState(20); // Defaults to 10
  const [totalProperties, setTotalProperties] = useState(0);
  const [forSale, setForSale] = useState(false);
  const [distanceTime, setDistanceTime] = useState<number | null | undefined>(
    undefined
  );

  const [styleView, setStyleView] = useState("grid");
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  const [selectedForSaleValue, setselectedForSaleValue] = useState<string>('');
  const [forSold, setForSold] = useState(false);
  const [selectedSoldValue, setselectedSoldValue] = useState<string>('');
  const [selectedPropertySubType, setselectedPropertySubType] = useState<string>('');
  const [distanceSoldTime, setDistanceSoldTime] = useState<number | null | undefined>(
    undefined
  );

  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);  

  const [bedRooms, setBedRooms] = useState<string>('');  
  const [bathRooms, setBathRooms] = useState<string>('');  

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  const [propertyTypePages, setPropertyTypePages] = useState<Record<string, number>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLookupData = async () => {
      try {
        const propertyTypes = await fetchPropertyTypes();

        const allOption = {
          LegacyODataValue: "All",
          LookupKey: "all",
          LookupName: "PropertyType",
          LookupStatus: "Active", 
          LookupValue: "All",
          ModificationTimestamp: new Date().toISOString(),
          Order: 0, 
          ReplacedByLookupKey: null,
          StatusDate: new Date().toISOString(),
        };
  
        // Prepend "All" option to the propertyTypes
        const combinedData = [allOption, ...propertyTypes.value];

        // Remove duplicates based on LookupValue
        const uniqueData = combinedData.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.LookupValue === value.LookupValue)
        );

        // Set the state with unique values
        setTypeFilter(uniqueData);
      } catch (error) {
        console.error("Error fetching lookup data:", error);
      }
    };
  
    fetchLookupData();
  }, []);

  useEffect(() => {
    const fetchSubPropertFilterData = async () => {
      try {
        const response = await fetchPropertySubTypes();
        // Transform the fetched data into the required structure
        const transformedData = response.value
                                .map((item: any) => item.LookupValue) // Extract the LookupValue
                                .filter((value: any, index: number, self: any[]) => self.indexOf(value) === index); // Remove duplicates
        
        // Wrap the data into the options format
        const typeOptions = [
          {
            options: transformedData,
          },
        ];
        
        setPropertySubTypes(typeOptions); 
      } catch (error) {
        console.error('Error fetching Property SubTypes:', error);
      }
      setLoading(false);
    };

    fetchSubPropertFilterData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [showFilters, setShowFilters] = useState({
    location: false,
    type: false,
    price: false,
    beds: false,
    baths: false,
    status: false,
  });

  const [filters, setFilters] = useState({
    location: "",
    type: "",
    price: "",
    beds: "",
    baths: "",
    status: "",
  });

  const [activeTab, setActiveTab] = useState("All");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleActiveTab = (value: string) => {
    setActiveTab(value);
    setLoading(true);
    routerMain.push( pathname + '?' + createQueryString('propertyType', value))
  };

  useEffect(() => {
    if (propertyType) {
        setActiveTab(propertyType);
    }
  }, [propertyType]); 

  const handleSelectChange = (value: string, index: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [index]: value,
    }));
    setOpenDropdownIndex(null);
  };

  const handleDropdownClick = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const handleStyleView = () => {
    setStyleView(styleView === "grid" ? "list" : "grid");
  };
  const handleResetFilter = () => {
    //resetFilters();
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams()
      params.set(name, value)
 
      return params.toString()
    },
    [routerMain]
  )

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    // Reset current page to 1 when the property type changes
    if (!propertyTypePages[propertyType]) {
      setCurrentPage(1); // Start from page 1 if no page history exists for this propertyType
    } else {
      setCurrentPage(propertyTypePages[propertyType]); // Restore the last page visited for this propertyType
    }
  
    const fetchData = async () => {
      setIsLoading(true);
  
      let posts: any = [];
      try {
        // Build filters dynamically based on available state
        const filters: any = {};
  
        if (key) {
          filters.searchQuery = key;
        }
  
        if (propertyType && propertyType !== 'All') {
          filters.propertyType = propertyType;
        }
  
        if (selectedPropertySubType) {
          filters.propertySubType = selectedPropertySubType;
        }
  
        if (forSale && distanceTime) {
          filters.daysSinceChange = distanceTime;
          filters.forSale = forSale;
        }
  
        if (forSold && distanceSoldTime) {
          filters.daysSoldSinceChange = distanceSoldTime;
          filters.isSold = forSold;
        }
  
        // Sanitize minPrice and maxPrice
        if (minPrice !== null && !isNaN(minPrice)) {
          filters.minPrice = minPrice;
        }
        if (maxPrice !== null && !isNaN(maxPrice)) {
          filters.maxPrice = maxPrice;
        }

        if( bedRooms ) {
          filters.bedRooms = bedRooms;
        }    
        
        if( bathRooms ) {
          filters.bathRooms = bathRooms;
        }
  
        // Add pagination parameters
        filters.page = currentPage;
        filters.pageSize = itemsPerPages;
  
        let response: any;
        response = await fetchLisingPropertyData(filters);

        console.log(response);
  
        if (!response || response.properties.length === 0) {
          setErrorText("No items found with the selected filters.");
          setpropertiesData([]); 
        } else {  
          const enrichedProperties = response.properties.map((property: any) => ({
            ...property
          }));
  
          posts = enrichedProperties;
  
          setpropertiesData(posts);
  
          if (response.totalProperties > 0 ) {
            setTotalProperties(response.totalProperties);
          }
  
          setErrorText("");
        }
  
        setLoading(false);
      } catch (err) {
        console.log(err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
      setIsLoading(false);
    };
  
    fetchData();
  }, [
    currentPage, 
    itemsPerPages, 
    key, 
    propertyType, 
    propertyTypePages, 
    distanceTime, 
    forSale, 
    forSold, 
    distanceSoldTime, 
    selectedPropertySubType, 
    maxPrice, 
    minPrice,
    bathRooms,
    bedRooms 
  ]);
  

  // Calculate and pagination
  const startIndex = (currentPage - 1) * itemsPerPages + 1;
  const endIndex = Math.min(currentPage * itemsPerPages, totalProperties);
  const totalPages = Math.ceil(totalProperties / itemsPerPages); // Calculate total pages

  // Function to calculate visible pages
  const getVisiblePages = (currentPage: number, totalPages: number): number[] => {
      const maxVisiblePages = 3; // Number of visible pages at a time
      const pages: number[] = [];
  
      // Determine start and end of range
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
      // Adjust range if close to edges
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }
  
      // Fill pages array
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
  };
  
  const visiblePages = getVisiblePages(currentPage, totalPages);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Save the current page for the selected propertyType
    setLoading(true);

    setPropertyTypePages((prevState) => ({
      ...prevState,
      [propertyType]: page, // Store page for current property type
    }));

    window.scrollTo({
      top: 0, // Scroll to the very top of the page
      behavior: "smooth", // Smooth scroll for a better user experience
    });
  };

  // Handle Dropdown Filters
  const handleDropdownChange = (value: string) => {
    setForSale( true );
    setLoading(  true );
    setselectedForSaleValue(value);
    setForSold(false); // Deactivate "For Sold"
    setselectedSoldValue(''); // Clear the selected value for "For Sold"
    setDistanceSoldTime(null); // Clear any numerical value for "For Sold"

    const numericValue = value !== '' ? parseInt(value, 10) : null;    
    setDistanceTime(numericValue);
  };

  const handleSoldChanges = ( value: string ) => {
    setForSold( true );
    setForSale( false );
    setselectedSoldValue( value );
    setLoading(  true );

    // Reset "For Sale" dropdown
    setselectedForSaleValue(''); // Clear the selected value for "For Sale"
    setDistanceTime(null); 

    const numericValue = value !== '' ? parseInt(value, 10) : null;    
    setDistanceSoldTime(numericValue);
  };

  const handlePropertySubType = ( value: string ) => {
    setLoading(  true );
    setselectedPropertySubType(value);
  };  
  
  const handleBedRooms = ( value: string ) => {
    setLoading(true);
    setBedRooms(value);
  };  
  const handleBathRooms = ( value: string ) => {
    setLoading(true);
    setBathRooms(value);
  };

  if (loading) {
    return (
      <div className="loading-spinner flex justify-center items-center text-center w-full h-[100vh]">
        {" "}
        <ClipLoader
          color={"#ffffff"}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  const handleShow = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  const handleShowSort = () => {
    if (showSort) {
      setShowSort(false);
    } else {
      setShowSort(true);
    }
  };

  const handleSortChange = (value: string, index: number) => {
    setSelectedSort(value);
    setShowSort(false);
  };

  const handlePriceSelect = (min: string | null, max: string | null) => {
    const cleanedMin = min ? parseFloat(min.replace(/[$,]/g, '')) : null;
    const cleanedMax = max ? parseFloat(max.replace(/[$,]/g, '')) : null;

    setMinPrice(cleanedMin);
    setMaxPrice(cleanedMax);
    //setLoading( true );
  };

  const forSaleOptions = ["7 Days", "30 Days", "60 Days", "90 Days"];
  const bathOptions = ["0", "1+", "2+", "3+", "4+", "5+", "6+"];
  const typeOptions = [
    {
      options: ["Detached", "Semi Detached", "Townhouse"],
    },
    {
      options: ["Apartment", "Detached", "Semi Detached", "Townhouse"],
    },
    {
      options: ["All Commercial", "Detached", "Semi Detached", "Townhouse"],
    },
  ];

  const minOptions = ["$0", "$20", "$5,000", "$10,000", "$1,000,00", "$10,000,000"];
  const maxOptions = ["$400", "$400,000", "$500,000", "$600,000", "$1,000,000", "$100,000,000"];

  const searchOptions = [
    "Toronto",
    "Mississauga, Peel",
    "Brampton, Peel",
    "Caledon, Peel",
    "Vaughan, York",
    "Richmond Hill, York",
    "Markham, York",
  ];

  const findActiveImageUrl = (media: Media[]): string => {
    const activeImage = media.find(
      (m) => m.MediaStatus === 'Active' && m.MediaType.startsWith('image')
    );
    return activeImage ? activeImage.MediaURL : ''; // Provide a fallback URL or handle
  };

  return (
    <div className="w-[100vw] mt-[115px]">
      <div className="w-[100vw] mx-auto">
      
        <div className="md:hidden block relative w-full m-auto px-4">
          <div
            onClick={() => handleShow()}
            className="flex rounded-md justify-between px-2 py-2 items-center bg-white shadow-lg "
          >
            <p>
              Advanced Filters{" "}
              {`(${Object.keys(selectedOptions)?.length})` || ""}
            </p>
            <MdKeyboardArrowDown />
          </div>
          {show && (
            <div className="absolute w-[95%] m-auto z-[999] px-4 py-1 top-8 left-[10px]  bg-white shadow-lg rounded-md">
              {advancedFilters.map((option, index) => (
                <div key={index} className="relative">
                  <div
                    onClick={() => handleDropdownClick(index)}
                    className="flex justify-between items-center py-1"
                  >
                    <p className="text-[13px]">
                      {selectedOptions[index] || option.label}
                    </p>
                    <MdKeyboardArrowDown />
                  </div>
                  <ul
                    className={`absolute w-full max-h-[200px] rounded-[8px] overflow-y-auto z-[9999] top-8 left-0 bg-white border border-[#717171] ${
                      openDropdownIndex === index ? "block" : "hidden"
                    }`}
                  >
                    {openDropdownIndex === index &&
                      option.options.map((opt, i) => (
                        <li
                          key={i}
                          className={`p-1 text-[#000000] text-[13px] font-[400] font-urbanist  hover:text-[#938fff] cursor-pointer`}
                          onClick={() => handleSelectChange(opt.text, index)}
                        >
                          {opt.text}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full mx-auto md:block hidden py-[2px] px-4">
          <div className="md:flex justify-between items-center w-full pr-1">
            <div className="md:flex justify-start items-center gap-2 w-full">
              <div
                ref={containerRef}
                className="w-[288px] flex relative justify-center items-center px-2 rounded-[8px] border border-[#b3b3b3] h-[40px]"
              >
                <input
                  type="text"
                  placeholder={"City, Keyword, MLS#"}
                  className="h-full w-full focus:outline-none"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                />
                <CiSearch className="absolute z-[99] top-[20%] right-2 text-[24px] text-[#b3b3b3]" />

                {/* Custom dropdown */}
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-full z-50">
                    <CustomDropdown
                      options={searchOptions}
                      placeholder="Select"
                      width="w-full"
                      style="bg-white border p-2 border-[#b3b3b3] rounded-md"
                      onSelect={(selectedValue) => {
                        setSearchValue(selectedValue);
                        setIsDropdownOpen(false); // Close dropdown after selecting an option
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="w-[230px] flex relative justify-center items-center rounded-[8px] border border-[#b3b3b3] h-[40px]">
                <CustomDropdown
                  options={forSaleOptions}
                  placeholder="For Sale"
                  width={"w-[50%]"}
                  value={selectedForSaleValue}
                  onSelect={(selectedValue) => {
                    handleDropdownChange(selectedValue);
                  }}
                  style={
                    "text-[16px] text-black rounded-l-[8px]   pl-3 pr-1 flex justify-around items-center h-full cursor-pointer"
                  }
                />
                <span className="h-[20px] w-[1px] bg-[#acabab]"></span>
                <CustomDropdown
                  options={forSaleOptions}
                  placeholder="Sold"
                  width={"w-[50%]"}
                  style={
                    "text-[16px] text-black rounded-l-[8px]   pl-3 pr-1 flex justify-around items-center h-full cursor-pointer"
                  }
                  value={selectedSoldValue}
                  onSelect={(selectedValue) => {
                    handleSoldChanges(selectedValue);
                  }}
                />
              </div>

              <CustomDropdown
                options={propertySubTypes}
                placeholder="Type"
                value={selectedPropertySubType}
                style={
                  "h-[40px] flex px-2 justify-center gap-3 items-center w-[95px] rounded-[8px] border border-[#b3b3b3] text-black cursor-pointer"
                }
                onSelect={(selectedValue) => {
                  handlePropertySubType(selectedValue);
                }}
              />

              <PriceDropDown 
                minOptions={minOptions} 
                maxOptions={maxOptions} 
                onSelect={handlePriceSelect} 
              />

              <CustomDropdown
                options={bathOptions}
                placeholder="Bed"
                width={"95px"}
                arrow={false}
                value={bedRooms}
                onSelect={(selectedValue) => {
                  handleBedRooms(selectedValue);
                }}
                style={
                  "h-[40px] px-6 flex w-[95px] justify-center items-center  rounded-[8px] border border-[#b3b3b3] text-black cursor-pointer"
                }
              />
              <CustomDropdown
                options={bathOptions}
                placeholder="Bath"
                width={"95px"}
                arrow={false}
                value={bathRooms}
                onSelect={(selectedValue) => {
                  handleBathRooms(selectedValue);
                }}
                style={
                  "h-[40px] px-6 flex w-[95px]  justify-center items-center  rounded-[8px] border border-[#b3b3b3] text-black cursor-pointer"
                }
              />

              {/* <div className="h-[40px] w-[79px] text-[16px] text-black rounded-[8px]  border border-[#b3b3b3] pl-3 pr-1 flex justify-between items-center cursor-pointer">
                Filter
                <CiFilter className="text-[16px] text-black" />
              </div> */}
              <FilterMoreOptions
                options={bathOptions}
                placeholder="Filter"
                width={""}
                arrow={false}
                style={
                  "h-[40px] px-6 flex w-[124px] justify-center items-center  rounded-[8px] border border-[#b3b3b3] text-black cursor-pointer"
                }
              />
            </div>

            <div className="flex justify-end items-center w-full gap-2 ml-1">
              <div
                className="h-[40px] w-[89px] relative text-[14px] text-black rounded-[8px]  border border-[#b3b3b3] flex justify-center gap-1 items-center cursor-pointer"
                onClick={() => handleShowSort()}
              >
                Sort by
                <BiSortAlt2 className="text-[16px] text-black" />
                {showSort && (
                  <div className="z-[999] absolute top-10 right-0 w-full border border-gray-300 rounded-lg shadow-lg bg-white">
                    {sortOptions.map((option, index) => (
                      <div
                        key={index}
                        className={`p-1 text-[#999999] text-[14px] font-[400] font-urbanist hover:text-[#938fff]  cursor-pointer rounded-[20px]`}
                        onClick={() => handleSortChange(option.text, index)}
                      >
                        {option.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="w-[188px] flex relative justify-center items-center rounded-[8px] border border-[#b3b3b3] h-[40px]">
                <div
                  className={`w-[50%]  text-[16px]  rounded-l-[8px]    flex justify-center items-center h-full cursor-pointer ${
                    styleView === "grid"
                      ? "bg-[#6965FD] text-white"
                      : "border-r border-r-[#b3b3b3] text-black"
                  }`}
                  onClick={() => setStyleView("grid")}
                >
                  <p className="text-[14px]">Grid</p>
                </div>
                <div
                  className={`w-[50%] text-[14px] cursor-pointer h-full text-black rounded-r-[8px]  flex justify-center items-center ${
                    styleView === "list"
                      ? "bg-[#6965FD] text-white"
                      : "border-r border-r-[#b3b3b3] "
                  }}`}
                  onClick={() => setStyleView("list")}
                >
                  <p className={`${styleView === "list" ? " text-white" : ""}`}>
                    List
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto md:flex hidden justify-between items-center flex-wrap gap-3 md:pt-[30px] py-4 pb-2 relative px-4">
        {typeFilter.map((tab, index) => (
          <div
            key={index}
            className={`flex justify-center px-8 py-1 rounded-[20px]  md:text-[18px] text-[15px] font-urbanist  items-center cursor-pointer ${
              activeTab === tab.LookupValue
                ? "bg-[#6965fd] text-white font-[500]"
                : "border-1 border-[#b3b3b3] text-black font-normal"
            } `}
          >
            <button onClick={() => handleActiveTab(tab.LookupValue)}>{tab.LookupValue}</button>
          </div>
        ))}
      </div>

      <div className="wrapper">
        <div className="row gx-0">
          <div className="w-full">
            <div className="ps-3 pe-3 ps-md-4 pe-md-4 ps-xxl-4 pe-xxl-4 pt-9 pb-11">
              <div className="w-full md:my-0 my-0 ">
                <div className="md:flex justify-between items-center  md:px-3 px-2  pt-[2px]">
                  { errorText ? (
                    <div className=" text-[14px] text-[#4d4d4d] font-[400]">
                      Showing{" "}
                      <span className="font-abhaya text-black">
                        0
                      </span>{" "}
                      results
                    </div>
                  ) : (
                    <div className=" text-[14px] text-[#4d4d4d] font-[400]">
                      Showing{" "}
                      <span className="font-abhaya text-black">
                        {" "}
                        {startIndex}-{endIndex} of {totalProperties}
                      </span>{" "}
                      results 
                    </div>
                  ) }
                </div>
              </div>
              {styleView === "grid" ? (
                <div className="flex justify-center items-center mt-0 w-full">
                  <>
                    <div className="grid grid-cols-1">
                      { errorText }
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
                      {propertiesData
                      ?.filter((item: any) => findActiveImageUrl(item.media))
                      .map((item: any, index: any) => (
                        <div
                          key={index}
                          className="rounded-xl shadow-md"
                          // data-wow-delay={item.data_delay_time}
                        >
                          <div className="listing-card-one style-two">
                            <div className="img-gallery">
                              <div className="relative overflow-hidden pt-[2px]">
                                <div className="absolute w-full top-5 left-0 px-[7px]  flex justify-between items-center">
                                  <div
                                    className={` font-[500] rounded-r-[8px] text-[12px] font-urbanist px-2 w-auto h-[21.0px] flex justify-center items-center text-white text-black-500 ${
                                      item.propertyDetails?.type === "SOLD 02/20/2024"
                                        ? "bg-[#EB272A]"
                                        : item?.type === "For Rent"
                                        ? "bg-[#6965FD]"
                                        : item?.type === "RENTED 02/20/2024"
                                        ? "bg-[#4169e1]"
                                        : "bg-[#6CCFAC]"
                                    } `}
                                  >
                                    {item.propertyDetails.TransactionType}
                                  </div>
                                  <Link
                                    href="#"
                                    className="bg-white text-black rounded-l-[8px] px-2 py-[2px] text-[12px]"
                                  >
                                    {item.propertyDetails.PropertySubType}
                                  </Link>
                                </div>

                                <div className="w-[96%] pt-1 mx-auto">
                                  <Image
                                    alt=""
                                    src={findActiveImageUrl(item.media)}
                                    width={400}
                                    height={300}
                                    className="h-[300px] object-cover w-full"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="property-info px-2 mt-1 pt-2 pb-[2px]">
                              <div className="d-flex flex-wrap align-items-start justify-content-between ">
                                <Link
                                  href={`/listing_details_01?id=${item.propertyDetails.ListingKey}`}
                                  className="text-[20px] text-black  font-urbanist font-[500]"
                                  style={{ maxWidth: "90%" }}
                                >
                                  {`${item.propertyDetails?.UnitNumber !== null ? `${item.propertyDetails?.UnitNumber} -` : ""} ${ item.propertyDetails?.StreetNumber} ${item.propertyDetails?.StreetName} ${item.propertyDetails?.StreetSuffix}`}
                                  
                                </Link>
                                <p className="text-[12px] text-[#999999]">
                                  {timeAgo(item.propertyDetails.ModificationTimestamp)}
                                </p>
                              </div>
                              <div className="d-flex flex-wrap align-items-center mt-1 justify-content-between ">
                                <p className="text-[14px] text-[#999999]">
                                  {`${item.propertyDetails?.UnparsedAddress !== null ? `${item.propertyDetails?.UnparsedAddress}` : ""}`} 
                                  {/* {`- ${item?.City !== null ? `${item?.City}` : ""}`} */}
                                </p>
                              </div>

                              <ul className="flex justify-between items-center mt-4">
                                <li className="flex justify-start items-start gap-1">
                                  <LiaBedSolid className="text-black text-xl mt-1" />
                                  <p className="text-black text-[16px] font-[400]">
                                    0{item.propertyDetails.BedroomsTotal ? `${item.propertyDetails.BedroomsTotal}` : ""}
                                  </p>
                                  <p className="text-[#999999] text-[16px] font-[400] font-urbanist">
                                    bed
                                  </p>
                                </li>
                                <li className="flex justify-start items-start gap-1">
                                  <PiBathtub className="text-black text-xl mt-1" />
                                  <p className="text-black text-[16px]  font-[400]">
                                    0{item.propertyDetails.BathroomsTotalInteger ? `${item.propertyDetails.BathroomsTotalInteger}` : ""}
                                  </p>
                                  <p className="text-[#999999]  text-[16px] font-[400] font-urbanist">
                                    bath
                                  </p>
                                </li>
                                <li className="flex justify-start items-start gap-1">
                                  <PiGarage className="text-black text-xl mt-1" />
                                  <p className="text-black text-[16px]  font-[400]">
                                    0{item.propertyDetails.ParkingSpaces ? `${item.propertyDetails.ParkingSpaces}` : ""}
                                  </p>
                                  <p className="text-[#999999] text-[16px] font-[400] font-urbanist">
                                    Parking
                                  </p>
                                </li>
                              </ul>

                              <div className="pl-footer py-1 border-t  border-[#a8a8a8] border-dashed d-flex align-items-center justify-content-between">
                                <div className=" text-[24px] font-[500]  text-[#000] ">
                                  {
                                    item.propertyDetails.PriceChangeTimestamp ? (
                                      <span className="flex items-center gap-2">
                                        <span className="line-through font-normal text-[#999] text-[24px]">
                                          ${item.propertyDetails.OriginalListPrice}
                                        </span>
                                        <span className="text-[#FF4A4A] font-semibold">
                                          ${item.propertyDetails.ListPrice}
                                        </span>
                                      </span>
                                    ) : (
                                      "$" + item.propertyDetails.ListPrice
                                    )
                                  }
                                </div>
                                <Link
                                  href={`/listing_details_01?id=${item.propertyDetails.ListingKey}`}
                                  className="h-10 w-10 bg-[#6965fd] flex justify-center items-center"
                                >
                                  <i className="bi text-white bi-arrow-up-right"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center gap-9 w-full m-auto">
                  {propertiesData
                  ?.filter((item: any) => findActiveImageUrl(item.media))
                  .map((item: any, index: any) => (
                    <div
                      key={index}
                      className="md:flex justify-start items-start md:h-[300px] h-auto w-full bg-[#f4f4f4]"
                    >
                      <div className="md:w-[35%] w-full h-full relative">
                        <Image
                          alt=""
                          src={findActiveImageUrl(item.media)}
                          width={400}
                          height={300}
                          className="w-full h-full bg-contain"
                        />
                        <div className="absolute left-0  top-3 px-2 flex justify-center font-[500] text-[12px] text-white  bg-[#6CCFAC] w-[68.94px] h-[21.0px] items-center rounded-tr-[10px] rounded-br-[10px]">
                          {item.propertyDetails.TransactionType}
                        </div>
                      </div>
                      <div className=" px-3 py-3 w-full">
                        <div className="md:w-[95%] w-full mx-auto flex justify-between items-center">
                          <h2 className="text-[26px] text-black  font-[500]">
                            {item.propertyDetails.CrossStreet}
                          </h2>
                          <div className="flex justify-end items-center gap-3">
                            <Link href="#">
                              <i className="fa-light fa-heart hover:font-bold text-black hover:text-[#807def]"></i>
                            </Link>
                            <Link href="#">
                              <i className="fa-light fa-bookmark hover:font-bold text-black hover:text-[#807def]"></i>
                            </Link>
                            <Link href="#">
                              <i className="fa-light fa-circle-plus hover:font-bold text-black hover:text-[#807def]"></i>
                            </Link>
                          </div>
                        </div>
                        {/* <div className="flex justify-end w-full"> */}
                          <div className="flex justify-between items-center w-full md:w-[95%] mx-auto">
                            <div className="  text-[18px] font-[400]  text-[#545454] mt-2">
                              {item.propertyDetails.UnparsedAddress}
                            </div>
                            <div className="  text-[18px] font-[400]  text-[#545454] mt-2">
                              {item.propertyDetails.City}
                            </div>
                          {/* </div> */}
                        </div>
                        <div className="md:w-[95%] w-full mx-auto flex flex-wrap justify-between items-center  md:mt-[40px] mt-[20px]">
                          <div className="md:w-auto w-[32%]">
                            <p className="text-[20px] text-black font-[400]">
                              {item.propertyDetails.PropertySubType}
                            </p>
                            <p className="text-[#626262] text-[16px] ">Type</p>
                          </div>
                          <div className="md:block hidden">
                            <Image
                              src={"/assets/images/listing/vector-line.png"}
                              width={10}
                              height={30}
                              className=""
                              alt="vector line"
                            />
                          </div>
                          <div className="md:w-auto w-[32%]">
                            <p className="text-[20px] text-black font-[400]">
                              0{item.propertyDetails.BedroomsTotal ? `${item.propertyDetails.BedroomsTotal}` : ""}
                            </p>
                            <p className="text-[#626262] text-[16px] ">bed</p>
                          </div>
                          <div className="md:block hidden">
                            <Image
                              src={"/assets/images/listing/vector-line.png"}
                              width={10}
                              height={30}
                              className=""
                              alt="vector line"
                            />
                          </div>
                          <div className="md:w-auto w-[32%]">
                            <p className="text-[20px] text-black font-[400]">
                              0{item.propertyDetails.BathroomsTotalInteger ? `${item.propertyDetails.BathroomsTotalInteger}` : ""}
                            </p>
                            <p className="text-[#626262] text-[16px] ">bath</p>
                          </div>
                          <div className="md:block hidden">
                            <Image
                              src={"/assets/images/listing/vector-line.png"}
                              width={10}
                              height={30}
                              className=""
                              alt="vector line"
                            />
                          </div>
                          <div className="md:w-auto w-[32%]">
                            <p className="text-[20px] text-black font-[400]">
                              0{item.propertyDetails.KitchensTotal ? `${item.propertyDetails.KitchensTotal}` : ""}
                            </p>
                            <p className="text-[#626262] text-[16px] ">
                              Kitchen
                            </p>
                          </div>
                          <div className="md:block hidden">
                            <Image
                              src={"/assets/images/listing/vector-line.png"}
                              width={10}
                              height={30}
                              className=""
                              alt="vector line"
                            />
                          </div>
                          <div className="md:w-auto w-[32%]">
                            <p className="text-[20px] text-black font-[400]">
                              1500-2000
                            </p>
                            <p className="text-[#626262] text-[16px] ">sqft</p>
                          </div>
                          <div className="md:block hidden">
                            <Image
                              src={"/assets/images/listing/vector-line.png"}
                              width={10}
                              height={30}
                              className=""
                              alt="vector line"
                            />
                          </div>
                          <div className="md:w-auto w-[32%]">
                            <p className="text-[20px] text-black font-[400]">
                              02
                            </p>
                            <p className="text-[#626262] text-[16px] ">
                              Garages
                            </p>
                          </div>
                        </div>
                        <div className="md:w-[95%] w-full mx-auto flex justify-between items-center mt-[40px]">
                          <p className=" text-[26px] text-black font-[500]">
                            {"$" + item.propertyDetails.ListPrice}
                          </p>
                          <Link href={`/listing_details_01?id=${item.propertyDetails.ListingKey}`}>
                            <div className="flex bg-[#6965FD] justify-center items-center w-[47.37px] h-[47.37px]">
                              <GoArrowUpRight className="text-white text-[20px]" />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* <div className="mt-10 flex justify-center">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={<i className="fa-regular fa-chevron-right"></i>}
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={Math.min(maxPageBoxes, pageCount)}
                  pageCount={pageCount}
                  previousLabel={<i className="fa-regular fa-chevron-left"></i>}
                  renderOnZeroPageCount={null}
                  className="pagination-two d-inline-flex align-items-center justify-content-center style-none"
                />
              </div> */}
            </div>
          </div>

          {/* <div className="col-xxl-3 col-lg-4 order-lg-first">
            <div className="advance-search-panel h-100 border-end">
              <div className="main-bg grey-bg h-100">
                <DropdownSix
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
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mb-[80px]">
        <div className="flex gap-2 justify-between items-center text-black">
          <div
          className={`flex justify-start gap-2 items-center text-[17px] cursor-pointer ${
            currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-black"
          }`}
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
        >
          <HiOutlineArrowLongLeft />
          <p>Prev</p>
        </div>
          {/* Render visible pages */}
          {visiblePages.map((page) => (
            <div
              key={page}
              className={`hover:text-white hover:bg-[#aeacff] hover:p-2 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-[17px] ${
                currentPage === page ? "bg-[#6965FD] text-white" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </div>
          ))}

          {/* Add ellipsis if not showing the last page */}
          {totalPages > visiblePages[visiblePages.length - 1] && (
            <div className="text-[17px]">...</div>
          )}

          {/* Render the last page if it's not in the visible range */}
          {totalPages > visiblePages[visiblePages.length - 1] && (
            <div
              className="hover:text-white hover:bg-[#aeacff] hover:p-2 w-[30px] h-[30px] flex justify-center items-center cursor-pointer text-[17px]"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </div>
          )}
        </div>

        {/* Last page navigation */}
        <div
          className="flex justify-start gap-2 items-center text-[17px] text-black cursor-pointer"
          onClick={() => handlePageChange(totalPages)}
        >
          <p>Next</p>
          <HiOutlineArrowLongRight />
        </div>
      </div>
    </div>
  );
};

export default ListingThirteenArea;
