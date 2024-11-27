"use server";
import { TOKEN_IDX, TOKEN_VOW, WEB_URL } from "../constant/constant";

export const fetchPropertyTypes = async () => {
  try {
    const response = await fetch(`https://query.ampre.ca/odata/Lookup?$filter=LookupName eq 'PropertyType'`, {
      headers: {
        Authorization: `Bearer ${TOKEN_IDX}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Property Types:", error);
    throw new Error("Error fetching Property Types.");
  }
};

export const fetchPropertySubTypes = async () => {
  try {
    const response = await fetch(`https://query.ampre.ca/odata/Lookup?$filter=LookupName eq 'PropertySubType'`, {
      headers: {
        Authorization: `Bearer ${TOKEN_IDX}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Property SubTypes:", error);
    throw new Error("Error fetching Property SubTypes.");
  }
};

export const fetchFilteredProperties = async (propertyType, propertySubType, skipValue = 0) => {
  try {
    const filterConditions = [];
    if (propertyType) filterConditions.push(`PropertyType eq '${propertyType}'`);
    if (propertySubType) filterConditions.push(`PropertySubType eq '${propertySubType}'`);

    const filterQuery = filterConditions.length > 0 ? `&$filter=${filterConditions.join(" and ")}` : "";
    const response = await fetch(
      `${WEB_URL}/odata/Property?$skip=${skipValue}&$top=10&$count=true${filterQuery}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN_IDX}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching filtered Property data:", error);
    throw new Error("Error fetching filtered Property data.");
  }
};


export const fetchPropertyData = async (skipValue = 0) => {
  try {
    const response = await fetch(`${WEB_URL}/odata/Property?$skip=${skipValue}&$top=10&$count=true&$filter=MlsStatus eq 'New'`, {
      headers: {
        Authorization: `Bearer ${TOKEN_IDX}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Property data:", error);
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred during  fetching Property data.";
    throw new Error(errorMessage);
  }
};

// Main Lising Query data
export const fetchLisingPropertyData = async ({
  page = 1, // Default to the first page
  pageSize = 20, // Number of items per page
  searchQuery = '',
  propertySubType = '',
  propertyType = '',
  propertyTypes = '',
  bedRooms = '',
  bathRooms = '',
  isSold = false,
  forSale = false,
  minPrice = 0, // Optional minimum price
  maxPrice = 0,
  daysSinceChange = 0,
  daysSoldSinceChange = 0,
} = {}) => {
  try {
    const skipValue = (page - 1) * pageSize; // Calculate the number of items to skip
    let filterConditions = []; // Default filter condition

    // Determine the type of the search query and add the appropriate filter
    if (searchQuery) {
      // Check if the searchQuery is likely an MLS ID (assuming MLS IDs are numeric)
      if (/^[A-Za-z]\d+$/.test(searchQuery)) {
        filterConditions.push(`MlsId='${searchQuery}'`);
      }
      // Check if the searchQuery might be a city name (assuming no digits and possibly spaces)
      else if (/^[A-Za-z\s]+$/.test(searchQuery)) {
        filterConditions.push(`City='${searchQuery}'`);
      }
      // // Assume the input is a keyword if it does not meet the other criteria
      // else {
      //   filterConditions.push(`substringof('${searchQuery}', Description)`);
      // }
    }

    if (isSold) {
      filterConditions.push(`MlsStatus=Sold`);
    } else {
      filterConditions.push(`MlsStatus=New`);
    }

    if (bedRooms) {
      const cleanedValueBed = bedRooms.replace('+', '');
      filterConditions.push(`BedroomsTotal=${cleanedValueBed}`);
    }
    
    if (bathRooms) {
      const cleanedValueBath = bathRooms.replace('+', '');
      filterConditions.push(`BathroomsTotalInteger=${cleanedValueBath}`);
    }

    
    if (propertyType) {
      if( propertyType !== 'All') {
        filterConditions.push(`PropertyType=${propertyType}`);
      }
    }

    if( propertySubType ) {
      filterConditions.push(`PropertySubType=${propertySubType}`);
    }

    if (isSold && typeof daysSoldSinceChange === 'number' && daysSoldSinceChange > 0) {
      // Calculate the date range (Today to Next 90 Days)
      const startDate = new Date(); // Start date is today
      const endDate = new Date();
      endDate.setDate(startDate.getDate() - daysSoldSinceChange); // Add 90 days to today

      // Convert both dates to ISO format strings
      const isoStartDate = startDate.toISOString();
      const isoEndDate = endDate.toISOString();

      // Apply the date range filter for MajorChangeTimestamp
      // it's work now need to apply sold data and page on pagination data should works also need to add preloader
      filterConditions.push(`MajorChangeTimestamp=${isoEndDate}`);
    }

    if (forSale && typeof daysSinceChange === 'number' && daysSinceChange > 0) {
      filterConditions.push(`ListPriceUnit=For Sale`);

      // Calculate the date range (Today to Next 90 Days)
      const startDate = new Date(); // Start date is today
      const endDate = new Date();
      endDate.setDate(startDate.getDate() - daysSinceChange); // Add 90 days to today

      // Convert both dates to ISO format strings
      const isoStartDate = startDate.toISOString();
      const isoEndDate = endDate.toISOString();

      // Apply the date range filter for MajorChangeTimestamp
      filterConditions.push(`MajorChangeTimestamp=${isoEndDate}`);
    }

    // Apply price filters only if propertyTypes is selected
    if (minPrice) {
      filterConditions.push(`minPrice=${minPrice}`);
    }
    if (maxPrice) {
      filterConditions.push(`maxPrice=${maxPrice}`);
    }

    // Join all filter conditions with 'and'
    const filterQuery = filterConditions.join('&');

    const response = await fetch(`https://api-lms-alpha.vercel.app/api/properties/all-properties/?page=${page}&${(filterQuery)}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const finalData = await response.json();
    return finalData;
  } catch (error) {
    console.error("Error fetching property data:", error);
    const errorMessage = 
      error.response?.data?.message ||
      "An error occurred during fetching property data.";
    throw new Error(errorMessage);
  }
};


export const fetchPropertyLuxuryData = async (skipValue = 0) => {
  try {
    const response = await fetch(`${WEB_URL}/odata/Property?$skip=${skipValue}&$top=10&$count=true`, {
      headers: {
        Authorization: `Bearer ${TOKEN_VOW}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Property data:", error);
    const errorMessage =
      error.response?.data?.message ||
      "An error occurred during  fetching Property data.";
    throw new Error(errorMessage);
  }
};

export const fetchIndividualProperty = async (key) => {
  try {
    const response = await fetch(`https://query.ampre.ca/odata/Property?$filter=ListingKey eq '${key}'`, {
      headers: {
        Authorization: `Bearer ${TOKEN_VOW}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Single Property data:", error);
    throw new Error(error.message || "An error occurred during fetching Individual Property data.");
  }
};


// Process and display the properties
export const displayLeaseProperties = async () => {
  try {
    const response = await fetch(`https://query.ampre.ca/odata/Property?filter=PortionPropertyLease&$top=50&$orderby=ModificationTimestamp,ListingKey`, {
      headers: {
        Authorization: `Bearer ${TOKEN_IDX}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Filter out properties where PortionPropertyLease is empty or not defined
    const filteredProperties = data.value.filter(
      (property) =>
        Array.isArray(property.PortionPropertyLease)
          ? property.PortionPropertyLease.length > 0
          : property.PortionPropertyLease === "Entire Property"
    );

    return filteredProperties;
  } catch (error) {
    console.error("Error fetching Individual Property data:", error);
    throw new Error(error.message || "An error occurred during fetching Lease Property data.");
  }
}


export const fetchSoldPropertyData = async (key) => {
  try {
    const response = await fetch(`https://query.ampre.ca/odata/Property?$filter=MlsStatus eq 'Sold Conditional'`, {
      headers: {
        Authorization: `Bearer ${TOKEN_VOW}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Individual Property data:", error);
    throw new Error(error.message || "An error occurred during fetching Individual Sold Property data.");
  }
};

export const fetchMediaPropertyData = async(listingKeys) => {
  const fetchPromises = listingKeys.map(async (key) => {
    const response = await fetch(`https://query.ampre.ca/odata/Media?$filter=ImageSizeDescription eq 'Large' and ResourceRecordKey eq '${key}'`, {
      headers: {
        Authorization: `Bearer ${TOKEN_VOW}`,
      },
    });
    const result = await response.json();
    return { key, media: result.value || [] };
  });

  const mediaResults = await Promise.all(fetchPromises);

  return mediaResults.reduce((acc, { key, media }) => {
    acc[key] = media;
    return acc;
  }, {});
}

export const fetchIndMediaPropertyData = async(listingKeys) => {
  try {
    const response = await fetch(`https://query.ampre.ca/odata/Media?$filter=ImageSizeDescription eq 'Largest' or ImageSizeDescription eq 'Thumbnail' and ResourceRecordKey eq '${listingKeys}'`, {
      headers: {
        Authorization: `Bearer ${TOKEN_IDX}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching Individual Property data:", error);
    throw new Error(error.message || "An error occurred during fetching Individual Property data.");
  }
}

export const fetchIndiviualPropertyData = async (key) => {
  try {
    const response = await fetch(`https://api-lms-alpha.vercel.app/api/properties/${key}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Individual Property data:", error);
    throw new Error(error.message || "An error occurred during fetching Individual Property data.");
  }
};
