import { baseApi } from "../../api/baseApi"

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),

    // Get single product by ID
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // Create new product
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Product"],
    }),

    // Delete product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // Fake order submission endpoint
    submitOrder: builder.mutation({
      queryFn: async (orderData) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Simulate successful response
        return {
          data: {
            success: true,
            orderId: "ORD-" + Date.now().toString().slice(-8),
            message: "Order placed successfully!",
            orderData: orderData,
          },
        }
      },
      invalidatesTags: ["Order"],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useSubmitOrderMutation,
} = productsApi