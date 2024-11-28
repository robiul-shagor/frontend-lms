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
    const params = new URLSearchParams();

    // Add default parameters
    params.append('page', page);
    if (pageSize) params.append('pageSize', pageSize);

    // Handle search query
    if (searchQuery) {
      if (/^[A-Za-z]\d+$/.test(searchQuery)) {
        params.append('MlsId', searchQuery);
      } else if (/^[A-Za-z\s]+$/.test(searchQuery)) {
        params.append('City', searchQuery);
      }
    }

    // Add sold or new status
    params.append('MlsStatus', isSold ? 'Sold' : 'New');

    // Add filters
    if (bedRooms) {
      params.append('BedroomsTotal', bedRooms.replace('+', ''));
    }
    if (bathRooms) {
      params.append('BathroomsTotalInteger', bathRooms.replace('+', ''));
    }
    if (propertyType && propertyType !== 'All') {
      params.append('PropertyType', propertyType);
    }
    if (propertySubType) {
      params.append('PropertySubType', propertySubType);
    }

    // Handle price filters
    if (minPrice > 0) {
      params.append('minPrice', minPrice);
    }
    if (maxPrice > 0) {
      params.append('maxPrice', maxPrice);
    }

    //console.log(`${minPrice} - ${maxPrice}`);
    // Price filter should be problem

    // Handle date filters
    if (isSold && daysSoldSinceChange > 0) {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() - daysSoldSinceChange);
      params.append('MajorChangeTimestamp', endDate.toISOString());
    }

    if (forSale && daysSinceChange > 0) {
      const endDate = new Date();
      endDate.setDate(endDate.getDate() - daysSinceChange);
      params.append('ListPriceUnit', 'For Sale');
      params.append('MajorChangeTimestamp', endDate.toISOString());
    }

    // Join all filter conditions with 'and'
    // const filterQuery = filterConditions.join('&');

    // console.log(`https://api-lms-alpha.vercel.app/api/properties/all-properties/?page=${page}&${encodeURIComponent(filterQuery)}`);

    const response = await fetch(`https://api-lms-alpha.vercel.app/api/properties/all-properties/?${params.toString()}`);

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