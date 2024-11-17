"use server";
import { TOKEN_IDX, WEB_URL } from "../constant/constant";

// export const fetchMediaData = async () => {
//   try {
//     const response = await axios.get(`${WEB_URL}/odata/Media`, {
//       headers: {
//         Authorization: `Bearer ${TOKEN_IDX}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching Media data:", error);
//     const errorMessage =
//       error.response?.data?.message ||
//       "An error occurred during  fetching Media data.";
//     throw new Error(errorMessage);
//   }
// };

// export const fetchPropertyData = async (skipValue = 0) => {
//   try {
//     const response = await axios.get(
//       `${WEB_URL}/odata/Property?$skip=${skipValue}&$top=10&$count=true`,
//       {
//         headers: {
//           Authorization: `Bearer ${TOKEN_IDX}`,
//         },
//         // params: {
//         //     $filter: "ImageSizeDescription eq 'Large' and ResourceName eq 'Property' and ModificationTimestamp ge 2023-07-27T04:00:00Z",
//         //     $orderby: 'ModificationTimestamp,MediaKey',
//         // },
//       }
//     );
//     console.log("res", response);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching Property data:", error);
//     const errorMessage =
//       error.response?.data?.message ||
//       "An error occurred during  fetching Property data.";
//     throw new Error(errorMessage);
//   }
// };

export const fetchSoldPropertyData = async (key) => {
  try {
    const response = await fetch(`https://query.ampre.ca/odata/Property?$filter=MlsStatus eq 'Sold Conditional'`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2ZW5kb3IvdHJyZWIvNjI4OSIsImF1ZCI6IkFtcFVzZXJzUHJkIiwicm9sZXMiOlsiQW1wVmVuZG9yIl0sImlzcyI6InByb2QuYW1wcmUuY2EiLCJleHAiOjI1MzQwMjMwMDc5OSwiaWF0IjoxNzMxNTg3OTI5LCJzdWJqZWN0VHlwZSI6InZlbmRvciIsInN1YmplY3RLZXkiOiI2Mjg5IiwianRpIjoiOTIzZThlY2RlNTc0YTIzZiIsImN1c3RvbWVyTmFtZSI6InRycmViIn0.wviAjx4NMbmiRWupFM3MNjKryEGqL06uXlGDj5OFmq8`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching Individual Property data:", error);
    throw new Error(error.message || "An error occurred during fetching Individual Property data.");
  }
};

export const fetchMediaPropertyData = async(listingKeys) => {
  const fetchPromises = listingKeys.map(async (key) => {
    const response = await fetch(`https://query.ampre.ca/odata/Media?$filter=ImageSizeDescription eq 'Large' and ResourceRecordKey eq '${key}'`, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2ZW5kb3IvdHJyZWIvNjI4OSIsImF1ZCI6IkFtcFVzZXJzUHJkIiwicm9sZXMiOlsiQW1wVmVuZG9yIl0sImlzcyI6InByb2QuYW1wcmUuY2EiLCJleHAiOjI1MzQwMjMwMDc5OSwiaWF0IjoxNzMxNTg3OTI5LCJzdWJqZWN0VHlwZSI6InZlbmRvciIsInN1YmplY3RLZXkiOiI2Mjg5IiwianRpIjoiOTIzZThlY2RlNTc0YTIzZiIsImN1c3RvbWVyTmFtZSI6InRycmViIn0.wviAjx4NMbmiRWupFM3MNjKryEGqL06uXlGDj5OFmq8`,
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

// export const fetchMediaPropertyData = async (key) => {
//   try {
//     const response = await fetch(`https://query.ampre.ca/odata/Media?$filter=ImageSizeDescription eq 'Large' and ResourceRecordKey eq '${key}'`, {
//       headers: {
//         Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2ZW5kb3IvdHJyZWIvNjI4OSIsImF1ZCI6IkFtcFVzZXJzUHJkIiwicm9sZXMiOlsiQW1wVmVuZG9yIl0sImlzcyI6InByb2QuYW1wcmUuY2EiLCJleHAiOjI1MzQwMjMwMDc5OSwiaWF0IjoxNzMxNTg3OTI5LCJzdWJqZWN0VHlwZSI6InZlbmRvciIsInN1YmplY3RLZXkiOiI2Mjg5IiwianRpIjoiOTIzZThlY2RlNTc0YTIzZiIsImN1c3RvbWVyTmFtZSI6InRycmViIn0.wviAjx4NMbmiRWupFM3MNjKryEGqL06uXlGDj5OFmq8`,
//       },
//     });
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching Individual Property data:", error);
//     throw new Error(error.message || "An error occurred during fetching Individual Property data.");
//   }
// };

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
