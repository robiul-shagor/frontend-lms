"use client";
import Fancybox from "@/components/common/Fancybox";
import DropdownSeven from "@/components/search-dropdown/inner-dropdown/DropdownSeven";
import UseShortedProperty from "@/hooks/useShortedProperty";
import NiceSelect from "@/ui/NiceSelect";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, CSSProperties } from "react";
import ReactPaginate from "react-paginate";
import { IoGridOutline } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";
import { LiaBedSolid } from "react-icons/lia";
import { PiBathtub } from "react-icons/pi";
import { PiGarage } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiListPlus } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import SearchFilters from "./SearchFilters";
import { IoIosArrowDown } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { BiSortAlt2 } from "react-icons/bi";
import CustomDropdown from "@/components/common/CustomDropDown";
import PriceDropDown from "@/components/common/PriceDropDown";
import FilterMoreOptions from "@/components/common/FilterMoreOptions";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { fetchLisingPropertyData } from "@/services/api";
import { HiOutlineArrowLongRight, HiOutlineArrowLongLeft } from "react-icons/hi2";
import ClipLoader from "react-spinners/ClipLoader";

import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from "@googlemaps/markerclusterer";

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
  id: number; // or number, based on your data
  name: string;
  fullAddress: string;
  latitude: number; // Ensure this exists
  longitude: number; // Ensure this exists
  [key: string]: any; // For any other dynamic properties
  getClusters: any
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

const select_type: string[] = [
  "All",
  "Apartments",
  "Villa",
  "Mortgage",
  "Loft",
  "Home",
  "Flat",
  "Building",
  "Office",
  "Factory",
  "Industry",
];
const searchOptions = [
  {
    label: "City",
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
    label: "Type",
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
    label: "Beds",
    value: "beds",
    icon: <MdKeyboardArrowDown />,
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
    icon: <MdKeyboardArrowDown />,
    options: [
      { value: "1", text: "1+" },
      { value: "2", text: "2+" },
      { value: "3", text: "3+" },
      { value: "4", text: "4+" },
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
    ],
  },
];

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
    label: "Semi Detached",
    value: "Semi Detached",
  },
  {
    label: "Condo",
    value: "Condo",
  },
  {
    label: "Townhouse",
    value: "Townhouse",
  },
  {
    label: "Land",
    value: "Land",
  },
  {
    label: "Commercial",
    value: "Commercial",
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
  { value: "newest", text: "Popular" },
  { value: "newest", text: "Newest" },
  { value: "best_seller", text: "Best Seller" },
  { value: "best_match", text: "Best Match" },
  { value: "price_low", text: "Price Low" },
  { value: "price_high", text: "Price High" },
];

const advancedFilters = [...advancedOptions, ...searchOptions];


const ListingFourteenArea = () => {
  const itemsPerPage = 4;
  const page = "listing_7";
  const [filters, setFilters] = useState({
    location: "",
    type: "",
    price: "",
    beds: "",
    baths: "",
    status: "",
  });
  const {
    itemOffset,
    sortedProperties,
    currentItems,
    pageCount,
    handlePageClick,
    handleBathroomChange,
    handleBedroomChange,
    handleSearchChange,
    handlePriceChange,
    maxPrice,
    priceValue,
    resetFilters,
    selectedAmenities,
    handleAmenityChange,
    handleLocationChange,
    handleStatusChange,
    handleTypeChange,
    handlePriceDropChange,
  } = UseShortedProperty({ itemsPerPage, page });

  const handleResetFilter = () => {
    resetFilters();
  };

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const key: any = router.get("search");
  const propertyType: any = router.get("propertyType");
  const routerMain = useRouter();
  const pathname = usePathname();

  const [propertiesData, setpropertiesData] = useState<Property[]>([]);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [showSort, setShowSort] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [propertyTypePages, setPropertyTypePages] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPages, setItemsPerPages] = useState(20); // Defaults to 10
  const [totalProperties, setTotalProperties] = useState(0);
  const [forSale, setForSale] = useState(false);
  const [distanceTime, setDistanceTime] = useState<number | null | undefined>(
    undefined
  );

  const [selectedForSaleValue, setselectedForSaleValue] = useState<string>('');
  const [forSold, setForSold] = useState(false);
  const [selectedSoldValue, setselectedSoldValue] = useState<string>('');
  const [selectedPropertySubType, setselectedPropertySubType] = useState<string>('');
  const [distanceSoldTime, setDistanceSoldTime] = useState<number | null | undefined>(
    undefined
  );

  const [minPrice, setMinPrice] = useState<number | null>(null);

  const [bedRooms, setBedRooms] = useState<string>('');  
  const [bathRooms, setBathRooms] = useState<string>('');  
  const [error, setError] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [highlightedProperty, setHighlightedProperty] = useState(null);
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null);
  const [markerClusterer, setMarkerClusterer] = useState<MarkerClusterer | null>(null);



  const mapRef = useRef(null);

  const apiKey = "AIzaSyBP-6bgmDYXRRWdOHP8EkTJpaZhZ7yc73w";

  const getLatLngFromAddress = async (address:any) => {
    
    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;
  
    const response = await fetch(endpoint);
    const data = await response.json();
  
    if (data.status === "OK" && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      console.error("Geocoding failed:", data.status, data.error_message);
      return null;
    }
  };

  const getAddress = (propertyDetails: any) => {
      const { StreetNumber, StreetName, StreetSuffix, UnitNumber, PostalCode, City, StateOrProvince } = propertyDetails;
      return `${UnitNumber ? UnitNumber + " - " : ""}${StreetNumber} ${StreetName} ${StreetSuffix}, ${City}, ${StateOrProvince}, ${PostalCode}`;
  };

  //Property Fetch
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
  
        if (!response || response.properties.length === 0) {
          setErrorText("No items found with the selected filters.");
          setpropertiesData([]); 
        } else {  
          // const enrichedProperties = response.properties.map((property: any) => {
          //   const address = getAddress(property.propertyDetails); // Use address function
          //   return { ...property, fullAddress: address };
          // });

          const enrichedProperties = await Promise.all(
            response.properties.map(async (property: any) => {
              const address = getAddress(property.propertyDetails);
              const geoLocation = await getLatLngFromAddress(address);
              return { ...property, fullAddress: address, geoLocation };
            })
          );

          // const enrichedProperties = response.properties.map((property: any) => ({
          //   const address = getAddress(property.propertyDetails);

          //   ...property
          // }));
  
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

  // Initialize Google Maps and Marker Clusterer
  const mapRefs = useRef<HTMLDivElement>(null);
  const mapMains = () => {
    const map = new google.maps.Map(mapRefs.current!, {
        zoom: 8,
    });

    const bounds = new google.maps.LatLngBounds();

    const markers = propertiesData.map((property) => {
        if (property.geoLocation.latitude && property.geoLocation.longitude) {
          const marker = new google.maps.Marker({
            position: { lat: property.geoLocation.latitude, lng: property.geoLocation.longitude },
            title: property.fullAddress, // Add property details to the marker
            map, // Attach the marker to the map (optional for MarkerClusterer)
          });

          // Extend bounds for each marker
          bounds.extend(marker.getPosition()!);

          // Store marker in property data
          property.marker = marker;

          return marker;
        }
        return null;
    }).filter(marker => marker !== null);

    // Adjust the map to fit all markers
    if (markers.length > 0) {
      map.fitBounds(bounds);
    } else {
      // If no markers, set default center and zoom
      map.setCenter({ lat: 43.651070, lng: -79.347015 });
      map.setZoom(9);
    }

    // Add clustering
    const clusterer = new MarkerClusterer({ markers, map });
    setMarkerClusterer(clusterer);

    // Create a single InfoWindow instance
    const newInfoWindow = new google.maps.InfoWindow();
    setInfoWindow(newInfoWindow);
  };

  useEffect(() => {
      if (!mapRefs.current || propertiesData.length === 0) return;

      const loader = new Loader({
          apiKey: apiKey,
          version: 'weekly',
      });

      loader.load().then(() => {
        mapMains();
      });
  }, [propertiesData, apiKey]);

  const handleMouseEnter = (property: any) => {
    if (!infoWindow || !property.marker) return;

    const marker = property.marker;
    const map = marker.getMap();
    const position = marker.getPosition();

    setHighlightedProperty(property);
  
    if (map && position) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(position);

      map.fitBounds(bounds);

      infoWindow.setContent(`
        <div>
          <h4>${property.fullAddress}</h4>
          <p>Price: $${property.propertyDetails.ListPrice}</p>
          <p>Type: ${property.propertyDetails.PropertySubType}</p>
        </div>
      `);
      infoWindow.open(property.marker.getMap(), property.marker);
    }
  };
  
  const handleMouseLeave = () => {
    setHighlightedProperty(null);

    if (infoWindow) {
      infoWindow.close();
      mapMains();
    }
  }; 
  

  // Modify enrichment
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
  

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: number]: string;
  }>({});

  const handleSelectChange = (value: string, index: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [index]: value,
    }));
    setOpenDropdownIndex(null);
  };
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  const handleDropdownClick = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const [styleView, setStyleView] = useState("grid");
  const handleStyleView = () => {
    setStyleView(styleView === "grid" ? "list" : "grid");
  };

  const [activeTab, setActiveTab] = useState("detached");

  const handleActiveTab = (value: string) => {
    setActiveTab(value);
  };
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
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

  // Calculate and pagination
  const startIndex = (currentPage - 1) * itemsPerPages + 1;
  const endIndex = Math.min(currentPage * itemsPerPages, totalProperties);
  const totalPages = Math.ceil(totalProperties / itemsPerPages); // Calculate total pages

  const forSaleOptions = ['7 Days', '30 Days', '60 Days', '90 Days']
  const bathOptions = ['0', '1+', '2+', '3+', '4+', '5+', '6+']
  const typeOptions = [
    {
      heading: "Freehold",
      options: ["Detached", "Semi Detached", "Link", "Townhouse", "Rural", "Cottage","Farm", "Mobile/Trailer", "Other" ],
    },
    {
      heading: "Condominiums",
      options: ["Apartment", "Townhouse", "Detached", "Townhouse", "Leasehold","Semi Detached", "Common Element", "Time Share", "Other" ],
    },
    {
      heading: "Commercial & Industrial",
      options: ["Office", "Retail", "Industrial", "Business Sale", "Store with Apartment/Office", "Investment", "Farm", "Land", "Other"],
    },
  ];

  const minOptions = ["$0", "$150000", "$200000", "$250000", "$300000", "$350000" ,"$400000","$450000","$500000","$550000","$600000","$650000","$700000","$750000","$800000","$850000","$950000","$1050000","$1300000","$1550000","$1800000","$2050000", '$2550000' ];
  const maxOptions = ["$500000", "$550000", "$600000", "$650000", "$700000", "$750000", "$800000","$850000","$950000","$1050000","$1300000","$1550000","$1800000","$2050000","$2550000","$3050000","$3550000","$4050000","$4550000","$5050000", "$5550000", "$6000000", "$6500000"];

  const searchOptions = ['Toronto', 'Mississauga, Peel', 'Brampton, Peel', 'Caledon, Peel', 'Vaughan, York', 'Richmond Hill, York', 'Markham, York'];

  const findActiveImageUrl = (media: Media[]): string => {
    const activeImage = media.find(
      (m) => m.MediaStatus === 'Active' && m.MediaType.startsWith('image')
    );
    return activeImage ? activeImage.MediaURL : ''; // Provide a fallback URL or handle
  };

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

  const handlePriceSelect = (min: string | null, max: string | null) => {
    const cleanedMin = min ? parseFloat(min.replace(/[$,]/g, '')) : null;
    const cleanedMax = max ? parseFloat(max.replace(/[$,]/g, '')) : null;

    setMinPrice(cleanedMin);
    //setLoading( true );
  };

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
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

  return (
    <div className="w-[100vw] mt-[130px]">
      <div className="w-[100vw] mx-auto">
        <div className="w-full mx-auto md:block hidden py-[2px] px-4">
          <div className="md:flex justify-between items-center w-full pr-1">
            <div className="md:flex justify-start items-center gap-2 w-full">
              {/* <div
                className="w-[288px] flex relative justify-center items-center px-2 rounded-[8px] border border-[#b3b3b3] h-[40px]"
              >
                <input
                  type="text"
                  placeholder="City, Keyword, MLS#"
                  className=" h-full  "
                />
                <CiSearch className="absolute z-[99] top-[20%]  right-2 text-[24px] text-[#b3b3b3]" />
              </div> */}
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
                    "text-[16px] text-black rounded-l-[8px]   pl-3 pr-1 flex justify-between items-center h-full cursor-pointer"
                  }
                />
                <span className="h-[20px] w-[1px] bg-[#acabab]"></span>
                <CustomDropdown
                  options={forSaleOptions}
                  placeholder="Sold"
                  width={"w-[50%]"}
                  style={
                    "text-[16px] text-black rounded-l-[8px]   pl-3 pr-1 flex justify-between items-center h-full cursor-pointer"
                  }
                  value={selectedSoldValue}
                  onSelect={(selectedValue) => {
                    handleSoldChanges(selectedValue);
                  }}
                />
              </div>

              <CustomDropdown
                options={typeOptions}
                placeholder="Type"
                width={""}
                style={
                  "h-[40px] flex px-2 justify-center items-center w-[95px] rounded-[8px] border border-[#b3b3b3] text-black cursor-pointer"
                }
                onSelect={(selectedValue) => {
                  handlePropertySubType(selectedValue);
                }}
              />

              <PriceDropDown minOptions={minOptions} maxOptions={maxOptions} onSelect={handlePriceSelect}  />

              <CustomDropdown
                options={bathOptions}
                placeholder="Bed"
                width={"95px"}
                arrow={false}
                style={
                  "h-[40px] px-6 flex w-[95px] justify-center items-center  rounded-[8px] border border-[#b3b3b3] text-black cursor-pointer"
                }
                onSelect={(selectedValue) => {
                  handlePropertySubType(selectedValue);
                }}
              />
              <CustomDropdown
                options={bathOptions}
                placeholder="Bath"
                width={"95px"}
                arrow={false}
                value={bedRooms}
                onSelect={(selectedValue) => {
                  handleBedRooms(selectedValue);
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
                onSelect={(selectedValue) => {
                  handleBathRooms(selectedValue);
                }}
              />
            </div>

            <div className="flex justify-end items-center w-full gap-2 ml-1">
              <div
                className="h-[40px] w-[89px] relative text-[16px] text-black rounded-[8px]  border border-[#b3b3b3] flex justify-center gap-1 items-center cursor-pointer"
                onClick={() => handleShowSort()}
              >
                Sort by
                <BiSortAlt2 className="text-[16px] text-black" />
                {showSort && (
                  <div className="z-[999] absolute top-10 right-0 w-full border border-gray-300 rounded-lg shadow-lg bg-white">
                    {sortOptions.map((option, index) => (
                      <div
                        key={index}
                        className={`p-1 text-[#999999] text-[15px] font-[400] font-urbanist hover:text-[#938fff]  cursor-pointer rounded-[20px]`}
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
                  <p>Grid</p>
                </div>
                <div
                  className={`w-[50%] text-[16px] cursor-pointer h-full text-black rounded-r-[8px]  flex justify-center items-center ${
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

      {/* <div className="listing-type-filter border-0">
            <div className="wrapper">
               <ul className="style-none d-flex flex-wrap align-items-center justify-content-center justify-content-xxl-between">
                  <li>Select Type:</li>
                  {select_type.map((select, i) => (
                     <li key={i}>
                        <Link
                           href="#"
                           className={selectedType === select ? "active" : ""}
                           onClick={() => handleTypeClick(select)}
                        >
                           {select}
                        </Link>
                     </li>
                  ))}
               </ul>
            </div>
         </div> */}
     
      <div className="w-full mx-auto md:flex hidden justify-between items-center flex-wrap gap-3 md:pt-[30px] py-4 pb-2 relative px-4">
        {mapTabs.map((tab, index) => (
          <div
            key={index}
            className={`flex justify-center px-8 h-[32px] rounded-[20px]  md:text-[18px] text-[15px] md:w-[190px] w-[31%]  font-urbanist  items-center cursor-pointer ${activeTab === tab.value
              ? "bg-[#6965fd] text-white font-[600]"
              : "border-1 border-[#b3b3b3] text-black font-normal"
              } `}
          >
            <p onClick={() => handleActiveTab(tab.value)}>{tab.label}</p>
          </div>
        ))}
      </div>

      <div className="md:flex justify-between items-center pl-5 pt-3 ">
        <div className=" text-[14px] text-black font-[500]">
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

      <div className="md:flex">
        <div className="md:w-[50%] w-full max-h-[100vh] overflow-y-auto">
          <div className="w-full">
            <div className="px-3 py-0 ">
              {styleView === "grid" ? (
                <div className="flex justify-center items-center mt-0">
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 ">
                    { propertiesData
                      ?.filter((item: any) => findActiveImageUrl(item.media))?.map(
                        (item: any, index: any) => (
                          <div
                            key={index}
                            className={`property-item rounded-lg shadow-md ${highlightedProperty === item ? 'highlighted' : ''}`}
                            onMouseEnter={() => handleMouseEnter(item)}
                            onMouseLeave={handleMouseLeave}
                            // data-wow-delay={item.data_delay_time}
                          >
                             <div className="listing-card-one style-two ">
                              <div className="img-gallery">
                                <div className="relative overflow-hidden pt-[6px]">
                                  <div className="absolute w-full top-5 left-0 px-[7px]  flex justify-between items-center">
                                    <div className={` font-[500] rounded-r-[8px] text-[12px] font-urbanist px-2 w-auto h-[21.0px] flex justify-center items-center text-white text-black-500 ${item?.type === 'SOLD 02/20/2024' ? 'bg-[#EB272A]' : item?.type === 'For Rent' ? 'bg-[#6965FD]': 'bg-[#6CCFAC]'} `}>
                                      {item.propertyDetails.PropertySubType}
                                    </div>
                                    <Link
                                      href="#"
                                      className="bg-white text-black rounded-l-[8px] px-2 py-[2px] text-[12px]"
                                    >
                                      {/* <i className="fa-light fa-heart hover:font-bold text-white hover:text-[#807def]"></i> */}
                                      Detached
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
                                    {`${item.propertyDetails?.StreetNumber !== null ? `${item.propertyDetails?.StreetNumber} -` : ""} ${item.propertyDetails?.StreetName ? item.propertyDetails.StreetName.charAt(0).toUpperCase() + item.propertyDetails.StreetName.slice(1).toLowerCase() : ""} ${item.propertyDetails?.StreetSuffix}`}
                                  </Link>
                                  <p className="text-[12px] text-[#999999]">
                                    1 hour old
                                  </p>
                                </div>
                                <div className="d-flex flex-wrap align-items-center mt-1 justify-content-between ">
                                  <p className="text-[14px] text-[#999999]">
                                  {`${item.propertyDetails?.UnparsedAddress !== null ? `${item.propertyDetails?.UnparsedAddress}` : ""}`}
                                  </p>
                                  <p className="text-[14px] text-[#999999]">
                                    {`- ${item?.City !== null ? `${item?.City}` : ""}`}
                                  </p>
                                </div>

                                <ul className="flex justify-between items-center mt-2">
                                  <li className="flex justify-start items-start gap-1">
                                    <LiaBedSolid className="text-black text-xl mt-1" />
                                    <p className="text-black text-[16px]  font-[400]">
                                      {item.propertyDetails.BedroomsTotal ? `${item.propertyDetails.BedroomsTotal}` : ""}
                                    </p>
                                    <p className="text-[#999999] text-[16px] font-[400] font-urbanist">
                                      bed
                                    </p>
                                  </li>
                                  <li className="flex justify-start items-start gap-1">
                                    <PiBathtub className="text-black text-xl mt-1" />
                                    <p className="text-black text-[16px]  font-[400]">
                                      {item.propertyDetails.BathroomsTotalInteger ? `${item.propertyDetails.BathroomsTotalInteger}` : ""}
                                    </p>
                                    <p className="text-[#999999]  text-[16px] font-[400] font-urbanist">
                                      bath
                                    </p>
                                  </li>
                                  <li className="flex justify-start items-start gap-1">
                                    <PiGarage className="text-black text-xl mt-1" />
                                    <p className="text-black text-[16px]  font-[400]">
                                      {item.propertyDetails.ParkingSpaces ? `${item.propertyDetails.ParkingSpaces}` : ""}
                                    </p>
                                    <p className="text-[#999999] text-[16px] font-[400] font-urbanist">
                                      garage
                                    </p>
                                  </li>
                                </ul>

                                <div className="pl-footer py-1 border-t  border-[#a8a8a8] border-dashed d-flex align-items-center justify-content-between">
                                  <div className=" text-[32px] font-[500]  text-[#000] ">
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
                                {/* <div className="flex justify-between items-center text-[16px] text-[#7f7f7f]  font-[400]">
                                  <p>Detached</p>
                                  <p>4 dags</p>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        )
                      )}
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
                      className="md:flex justify-start items-start md:h-[200px] h-auto w-full bg-[#f4f4f4]"
                    >
                      <div className="md:w-[55%] w-full h-full relative">
                        <Image
                          alt=""
                          src={findActiveImageUrl(item.media)}
                          width={400}
                          height={300}
                          className="w-full h-full bg-contain"
                        />
                        <div className="absolute left-0  top-3 px-2 flex justify-center font-[500] text-[12px]  bg-[#ffffff] w-[68.94px] h-[21.0px] items-center">
                          {item.propertyDetails.TransactionType}
                        </div>
                      </div>
                      <div className=" px-3 py-3 w-full">
                        <div className="md:w-[95%] w-full mx-auto flex justify-between items-center">
                        <h2 className="text-[26px] text-black  font-[500]">
                          {item.propertyDetails.CrossStreet}
                          </h2>
                          <div className="flex justify-end items-center gap-2">
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
                            <p className="text-[16px] text-black font-[400]">
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
                            <p className="text-[16px] text-center text-black font-[400]">
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
                            <p className="text-[16px]  text-center text-black font-[400]">
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
                            <p className="text-[16px]  text-center text-black font-[400]">
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
                            <p className="text-[16px]  text-center text-black font-[400]">
                              {item.propertyDetails.LivingAreaRange ? `${item.propertyDetails.LivingAreaRange}` : ""}
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
                            <p className="text-[16px]  text-center text-black font-[400]">
                              {item.propertyDetails.GarageParkingSpaces ? `${item.propertyDetails.GarageParkingSpaces}` : ""}
                            </p>
                            <p className="text-[#626262] text-[16px] ">
                              Garages
                            </p>
                          </div>
                        </div>
                        <div className="md:w-[95%] w-full mx-auto flex justify-between items-center mt-[15px]">
                          <p className=" text-[20px] text-black font-[500]">
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
                          </p>
                          <Link href={`/listing_details_01?id=${item.propertyDetails.ListingKey}`}>
                            <div className="flex bg-[#6965FD]  justify-center items-center w-[37.37px] h-[37.37px]">
                              <GoArrowUpRight className="text-white text-[17px]" />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

        <div className="md:w-[50%] w-full h-[100vh]">
          <div id="google-map-area" className="h-100" ref={mapRefs}>
          </div>
        </div>
        {/* <div className="col-xxl-6 col-lg-7">
          <div className="bg-light pl-40 pr-40 pt-35 pb-60">
            <div className="listing-header-filter d-sm-flex justify-content-between align-items-center mb-40 lg-mb-30">
              <div>
                Showing{" "}
                <span className="color-dark fw-500">
                  {itemOffset + 1}–{itemOffset + currentItems.length}
                </span>{" "}
                of{" "}
                <span className="color-dark fw-500">
                  {sortedProperties.length}
                </span>{" "}
                results
              </div>
              <div className="d-flex align-items-center xs-mt-20">
                <div className="short-filter d-flex align-items-center">
                  <div className="fs-16 me-2">Short by:</div>
                  <NiceSelect
                    className="nice-select"
                    options={[
                      { value: "newest", text: "Newest" },
                      { value: "best_seller", text: "Best Seller" },
                      { value: "best_match", text: "Best Match" },
                      { value: "price_low", text: "Price Low" },
                      { value: "price_high", text: "Price High" },
                    ]}
                    defaultCurrent={0}
                    onChange={handleTypeChange}
                    name=""
                    placeholder=""
                  />
                </div>
                <Link
                  href="/listing_15"
                  className="tran3s layout-change rounded-circle ms-auto ms-sm-3"
                  data-bs-toggle="tooltip"
                  title="Switch To List View"
                >
                  <i className="fa-regular fa-bars"></i>
                </Link>
              </div>
            </div>

            <div className="row">
              {currentItems.map((item: any) => (
                <div
                  key={item.id}
                  className="col-md-6 d-flex mb-40 wow fadeInUp"
                >
                  <div className="listing-card-one style-three border-30 w-100 h-100">
                    <div className="img-gallery p-15">
                      <div className="position-relative border-20 overflow-hidden">
                        <div className="tag bg-white text-dark fw-500 border-20">
                          {item.tag}
                        </div>
                        <Image
                          src={item.thumb ? item.thumb : ""}
                          className="w-100 border-20"
                          alt="..."
                        />
                        <Link
                          href="/listing_details_06"
                          className="btn-four inverse rounded-circle position-absolute"
                        >
                          <i className="bi bi-arrow-up-right"></i>
                        </Link>
                        <div className="img-slider-btn">
                          03 <i className="fa-regular fa-image"></i>
                          <Fancybox
                            options={{
                              Carousel: {
                                infinite: true,
                              },
                            }}
                          >
                            {item.carousel_thumb.map(
                              (thumb: any, index: any) => (
                                <a
                                  key={index}
                                  className="d-block"
                                  data-fancybox="gallery5"
                                  href={`/assets/images/listing/img_large_0${thumb.id}.jpg`}
                                ></a>
                              )
                            )}
                          </Fancybox>
                        </div>
                      </div>
                    </div>
                    <div className="property-info pe-4 ps-4">
                      <Link href="/listing_details_06" className="title tran3s">
                        {item.title}
                      </Link>
                      <div className="address">{item.address}</div>
                      <div className="pl-footer m0 d-flex align-items-center justify-content-between">
                        <strong className="price fw-500 color-dark">
                          $
                          {item.price.toLocaleString({
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{" "}
                          {item.price_text && (
                            <>
                              / <sub>m</sub>
                            </>
                          )}
                        </strong>
                        <ul className="style-none d-flex action-icons">
                          <li>
                            <Link href="#">
                              <i className="fa-light fa-heart"></i>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <i className="fa-light fa-bookmark"></i>
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <i className="fa-light fa-circle-plus"></i>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-5">
              <ReactPaginate
                breakLabel="..."
                nextLabel={<i className="fa-regular fa-chevron-right"></i>}
                onPageChange={handlePageClick}
                pageRangeDisplayed={pageCount}
                pageCount={pageCount}
                previousLabel={<i className="fa-regular fa-chevron-left"></i>}
                renderOnZeroPageCount={null}
                className="pagination-two d-inline-flex align-items-center justify-content-center style-none"
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ListingFourteenArea;
