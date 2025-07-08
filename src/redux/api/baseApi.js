import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://e-commerce-server-tawny-psi.vercel.app",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log("Unauthorized access");
    // Token refresh বা logout হ্যান্ডেল করবে
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product", "Category", "User", "Order"],
  endpoints: () => ({}),
});
