import { baseApi } from "../../api/baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),

    // Get single product by ID

    // // Update product
    // updateProduct: builder.mutation({
    //   query: ({ id, ...patch }) => ({
    //     url: `/products/${id}`,
    //     method: "PUT",
    //     body: patch,
    //   }),
    //   invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    // }),

    // // Delete product
    // deleteProduct: builder.mutation({
    //   query: (id) => ({
    //     url: `/products/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Product"],
    // }),
  }),
});

// Export hooks for usage in components
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
} = productsApi;
