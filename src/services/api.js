"use server";
import { TOKEN_IDX, TOKEN_VOW, WEB_URL } from "../constant/constant";

export const fetchPropertyData = async (skipValue = 0) => {
  try {
    const response = await fetch(`${WEB_URL}/odata/Property?$skip=${skipValue}&$top=10&$count=true&$filter=MlsStatus eq 'New'`, {
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

export const fetchLisingPropertyData = async ({
  page = 1, // Default to the first page
  pageSize = 20, // Number of items per page
  searchQuery = '',
  propertyType = '',
  isSold = false,
  minPrice = null, // Optional minimum price
  maxPrice = null  
} = {}) => {
  try {
    const skipValue = (page - 1) * pageSize; // Calculate the number of items to skip
    let filterConditions = [`MlsStatus eq 'New'`]; // Default filter condition

    // Determine the type of the search query and add the appropriate filter
    if (searchQuery) {
      // Check if the searchQuery is likely an MLS ID (assuming MLS IDs are numeric)
      if (/^[A-Za-z]\d+$/.test(searchQuery)) {
        filterConditions.push(`MlsId eq '${searchQuery}'`);
      }
      // Check if the searchQuery might be a city name (assuming no digits and possibly spaces)
      else if (/^[A-Za-z\s]+$/.test(searchQuery)) {
        filterConditions.push(`City eq '${searchQuery}'`);
      }
      // // Assume the input is a keyword if it does not meet the other criteria
      // else {
      //   filterConditions.push(`substringof('${searchQuery}', Description)`);
      // }
    }

    if (propertyType) {
      filterConditions.push(`PropertySubType eq '${propertyType}'`);
    }
    if (isSold) {
      filterConditions.push(`MlsStatus eq 'Sold'`);
    }

    // Join all filter conditions with 'and'
    const filterQuery = filterConditions.join(' and ');

    console.log(filterQuery);

    const response = await fetch(`${WEB_URL}/odata/Property?$skip=${skipValue}&$top=${pageSize}&$count=true&$filter=${encodeURIComponent(filterQuery)}`, {
      headers: {
        Authorization: `Bearer ${TOKEN_VOW}`,
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
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
