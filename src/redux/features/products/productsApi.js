import { baseApi } from "../../api/baseApi";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get all products
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),

    // ✅ Get single product by ID
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // ✅ Add a new product
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),

    // ✅ Delete product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // ✅ (Optional) Simulate order submission
    submitOrder: builder.mutation({
      queryFn: async (orderData) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return {
          data: {
            success: true,
            orderId: "ORD-" + Date.now().toString().slice(-8),
            message: "Order placed successfully!",
            orderData: orderData,
          },
        };
      },
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useSubmitOrderMutation,
} = productsApi;
